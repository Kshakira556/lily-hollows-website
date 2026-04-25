import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar as CalendarIcon, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { showsPageQuery } from "@/sanity/queries";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";
import bookingHero from "@/assets/booking-hero.jpg";

const fallbackShows = [
  { date: "Mar 15, 2026", venue: "Baze Lounge", city: "Johannesburg, SA", image: gallery1, type: "Live Performance" },
  { date: "Apr 02, 2026", venue: "Splashy Fen Festival", city: "KwaZulu-Natal, SA", image: videoThumb2, type: "Festival" },
  { date: "May 10, 2026", venue: "Canal Fest", city: "Bristol, UK", image: gallery3, type: "International" },
  { date: "Jun 20, 2026", venue: "Coyote Ugly", city: "Bristol, UK", image: bookingHero, type: "Live Performance" },
];

const Shows = () => {
  const [showsPage, setShowsPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(showsPageQuery).then(setShowsPage).catch(console.error);
  }, []);

  const heroBackground = showsPage?.heroBackgroundImageUrl ?? videoThumb2;
  const heroHeading = showsPage?.heroHeading ?? "Shows";
  const heroSubheading = showsPage?.heroSubheading ?? "Catch the enchantress live";

  const shows = showsPage?.shows?.length
    ? showsPage.shows.map((show: any) => ({
        ...show,
        image: show?.imageUrl ?? show?.image,
      }))
    : fallbackShows;

  return (
    <Layout>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">{heroHeading}</h1>
          <p className="text-muted-foreground font-body mt-4">{heroSubheading}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-5xl mx-auto space-y-6">
          {shows.map((show, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-sm gold-border hover:gold-glow transition-all group"
            >
              <div className="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-sm">
                <img src={show.image} alt={show.venue} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-primary text-xs font-body uppercase tracking-wider mb-1">{show.type}</span>
                <h3 className="font-display text-2xl text-foreground mb-2">{show.venue}</h3>
                <div className="flex flex-wrap gap-4 text-muted-foreground text-sm font-body">
                  <span className="flex items-center gap-1"><CalendarIcon size={14} /> {show.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {show.city}</span>
                </div>
              </div>
              <div className="flex items-center">
                {show.ticketUrl ? (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gold-gradient text-primary-foreground text-xs font-body uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <ExternalLink size={14} /> Tickets
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="px-6 py-3 bg-muted text-muted-foreground text-xs font-body uppercase tracking-[0.15em] rounded-sm flex items-center gap-2 cursor-not-allowed"
                  >
                    <ExternalLink size={14} /> Tickets
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Shows;
