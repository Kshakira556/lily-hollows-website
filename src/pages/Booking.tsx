import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { bookingPageQuery } from "@/sanity/queries";
import bookingHero from "@/assets/booking-hero.jpg";

type BookingPage = {
  heroBackgroundImageUrl?: string;
  heroHeading?: string;
  heroSubheading?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
    whatsAppUrl?: string;
  };
  eventTypes?: string[];
  quoteCard?: {
    headline?: string;
    quote?: string;
    note?: string;
    signature?: string;
  };
};

const Booking = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", type: "", budget: "", message: "" });
  const [bookingPage, setBookingPage] = useState<BookingPage | null>(null);

  useEffect(() => {
    client.fetch(bookingPageQuery).then(setBookingPage).catch(console.error);
  }, []);

  const heroBackground = bookingPage?.heroBackgroundImageUrl ?? bookingHero;
  const heroHeading = bookingPage?.heroHeading ?? "Booking";
  const heroSubheading = bookingPage?.heroSubheading ?? "Book the enchantress for your next event";

  const contactEmail = bookingPage?.contactInfo?.email ?? "miss.L.hollows@gmail.com";
  const contactPhone = bookingPage?.contactInfo?.phone ?? "+27 83 997 0398";
  const contactLocation = bookingPage?.contactInfo?.location ?? "JHB · CPT · South Africa";
  const whatsAppUrl = bookingPage?.contactInfo?.whatsAppUrl ?? "https://wa.me/27839970398";

  const eventTypes: string[] =
    bookingPage?.eventTypes?.length ? bookingPage.eventTypes : ["festival", "private", "corporate", "wedding", "collaboration", "other"];

  const quoteHeadline = bookingPage?.quoteCard?.headline ?? "People love to pay me well to perform";
  const quoteText = bookingPage?.quoteCard?.quote ?? "I make a gorgeous living off music";
  const quoteNote = bookingPage?.quoteCard?.note ?? "For live bookings, festivals, private events & collaborations";
  const quoteSignature = bookingPage?.quoteCard?.signature ?? "Love, Lily Xx";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Booking request: ${heroHeading}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Event Date: ${form.date}`,
        `Event Type: ${form.type}`,
        `Budget: ${form.budget}`,
        "",
        "Message:",
        form.message,
      ].join("\n")
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">{heroHeading}</h1>
          <p className="text-foreground/80 font-body mt-4 text-lg">{heroSubheading}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl text-gold-gradient mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name" as const, type: "text" },
                { label: "Email", name: "email" as const, type: "email" },
                { label: "Phone", name: "phone" as const, type: "tel" },
                { label: "Event Date", name: "date" as const, type: "date" },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="text-foreground/80 text-xs font-body uppercase tracking-wider mb-1 block">{field.label}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
              <div>
                <label className="text-foreground/80 text-xs font-body uppercase tracking-wider mb-1 block">Event Type</label>
                <select
                    id="event-type"
                    aria-label="Event type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-foreground/80 text-xs font-body uppercase tracking-wider mb-1 block">Budget</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="Your budget range"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-foreground/80 text-xs font-body uppercase tracking-wider mb-1 block">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <button type="submit" className="w-full py-4 bg-gold-gradient text-primary-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity">
                Send Booking Request
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="p-8 bg-card rounded-sm gold-border">
              <h3 className="font-display text-2xl text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                  <Mail size={18} className="text-primary" /> {contactEmail}
                </a>
                <a href={`tel:${contactPhone}`} className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                  <Phone size={18} className="text-primary" /> {contactPhone}
                </a>
                <p className="flex items-center gap-3 text-foreground/80">
                  <MapPin size={18} className="text-primary" /> {contactLocation}
                </p>
              </div>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[hsl(142,70%,35%)] text-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} /> Book via WhatsApp
            </a>

            <div className="p-8 bg-card rounded-sm gold-border">
              <h3 className="font-display text-2xl text-gold-gradient mb-4">{quoteHeadline}</h3>
              <p className="text-foreground/80 font-display text-xl italic">
                {quoteText}
              </p>
              <p className="text-muted-foreground font-body text-sm mt-4">
                {quoteNote}
              </p>
              <p className="text-primary font-display text-lg italic mt-4">{quoteSignature}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
