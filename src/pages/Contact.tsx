import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Music } from "lucide-react";
import Layout from "@/components/Layout";
import { client } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/queries";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Music, href: "#", label: "Spotify" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactPage, setContactPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(contactPageQuery).then(setContactPage).catch(console.error);
  }, []);

  const contactEmail = contactPage?.contactInfo?.email ?? "miss.L.hollows@gmail.com";
  const contactPhone = contactPage?.contactInfo?.phone ?? "+27 83 997 0398";
  const contactLocation = contactPage?.contactInfo?.location ?? "Johannesburg & Cape Town, South Africa";

  const socialHrefByLabel = new Map<string, string>(
    (contactPage?.socialLinks ?? []).map((link: any) => [String(link?.label ?? "").toLowerCase(), String(link?.href ?? "")]),
  );

  const resolvedSocialLinks = socialLinks.map((social) => {
    const href = socialHrefByLabel.get(social.label.toLowerCase()) || social.href;
    return {...social, href};
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(form.subject || `Message for ${contactPage?.title ?? "Lily Hollows"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        "",
        form.message,
      ].join("\n")
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <section className="relative h-[40vh] flex items-center justify-center bg-card">
        <div className="absolute inset-0 bg-overlay-dark" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">Contact</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl text-gold-gradient mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <textarea
                rows={5}
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
              <button type="submit" className="w-full py-4 bg-gold-gradient text-primary-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="p-8 bg-card rounded-sm gold-border">
              <h3 className="font-display text-2xl text-foreground mb-6">Contact Info</h3>
              <div className="space-y-4">
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors font-body text-sm">
                  <Mail size={18} className="text-primary" /> {contactEmail}
                </a>
                <a href={`tel:${contactPhone}`} className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors font-body text-sm">
                  <Phone size={18} className="text-primary" /> {contactPhone}
                </a>
                <p className="flex items-center gap-3 text-foreground/80 font-body text-sm">
                  <MapPin size={18} className="text-primary" /> {contactLocation}
                </p>
              </div>
            </div>

            <div className="p-8 bg-card rounded-sm gold-border">
              <h3 className="font-display text-2xl text-foreground mb-6">Follow Along</h3>
              <div className="flex gap-4">
                {resolvedSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    onClick={
                      social.href === "#"
                        ? (e) => {
                            e.preventDefault();
                          }
                        : undefined
                    }
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
