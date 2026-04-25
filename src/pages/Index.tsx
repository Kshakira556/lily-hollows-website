import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Music, Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { contactPageQuery, homePageQuery } from "@/sanity/queries";
import heroBg from "@/assets/hero-bg.jpg";
import newsletterBg from "@/assets/newsletter-bg.jpg";
import albumCover1 from "@/assets/album-cover-1.jpg";
import videoThumb1 from "@/assets/video-thumb-1.jpg";

type HomePage = {
  hero?: {
    backgroundImageUrl?: string;
    tagline?: string;
    headline?: string;
    subheadline?: string;
  };
  featuredMusic?: {
    title?: string;
    subtitle?: string;
    coverImageUrl?: string;
    releaseType?: string;
  };
  latestVideo?: {
    thumbnailUrl?: string;
    videoUrl?: string;
  };
  upcomingShows?: {
    date: string;
    venue: string;
    city: string;
  }[];
  newsletter?: {
    headline?: string;
    description?: string;
    backgroundImageUrl?: string;
  };
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const fallbackUpcomingShows = [
  { date: "Mar 15, 2026", venue: "Baze Lounge", city: "Johannesburg" },
  { date: "Apr 02, 2026", venue: "Splashy Fen Festival", city: "KwaZulu-Natal" },
  { date: "May 10, 2026", venue: "Canal Fest", city: "Bristol, UK" },
];

const Index = () => {
  const [homePage, setHomePage] = useState<HomePage | null>(null);
  const [newsletterEmailTo, setNewsletterEmailTo] = useState<string>("miss.L.hollows@gmail.com");

  useEffect(() => {
    client.fetch(homePageQuery).then(setHomePage).catch(console.error);
    client
      .fetch(contactPageQuery)
      .then((contactPage: any) => {
        const next = String(contactPage?.contactInfo?.email ?? "").trim();
        if (next) setNewsletterEmailTo(next);
      })
      .catch(() => {});
  }, []);

  const heroBackground = homePage?.hero?.backgroundImageUrl ?? heroBg;
  const heroTagline = homePage?.hero?.tagline ?? "Singer-Songwriter · Performer · Actress";
  const heroHeadline = homePage?.hero?.headline ?? "Lily Hollows";
  const heroSubheadline = homePage?.hero?.subheadline ?? "Meet the Enchantress";

  const featuredMusicSectionTitle = "Featured Music";
  const featuredMusicSectionSubtitle = homePage?.featuredMusic?.subtitle ?? "Latest releases and enchanting melodies";
  const featuredMusicCover = homePage?.featuredMusic?.coverImageUrl ?? albumCover1;
  const featuredMusicName = homePage?.featuredMusic?.title ?? "Siklus";
  const featuredMusicReleaseType = homePage?.featuredMusic?.releaseType ?? "Latest Single";

  const latestVideoThumb = homePage?.latestVideo?.thumbnailUrl ?? videoThumb1;
  const latestVideoUrl = homePage?.latestVideo?.videoUrl;

  const upcomingShows = homePage?.upcomingShows?.length ? homePage.upcomingShows : fallbackUpcomingShows;

  const newsletterBackground = homePage?.newsletter?.backgroundImageUrl ?? newsletterBg;
  const newsletterHeadline = homePage?.newsletter?.headline ?? "Join the Enchantment";
  const newsletterDescription =
    homePage?.newsletter?.description ?? "Be the first to know about new music, shows, and exclusive content.";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-primary mb-6"
          >
            {heroTagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl sm:text-7xl lg:text-9xl font-semibold text-gold-gradient mb-8 leading-tight"
          >
            {heroHeadline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-xl sm:text-2xl italic text-foreground/80 mb-10"
          >
            {heroSubheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/music"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-gradient text-primary-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity"
            >
              <Music size={16} />
              Listen Now
            </Link>
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:bg-primary/10 transition-colors"
            >
              <Play size={16} />
              Watch Video
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/30 text-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:border-primary hover:text-primary transition-colors"
            >
              <Calendar size={16} />
              Book Now
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-primary/50 rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Music */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title={featuredMusicSectionTitle} subtitle={featuredMusicSectionSubtitle} />
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="w-64 h-64 flex-shrink-0 rounded-sm overflow-hidden gold-border gold-glow">
              <img src={featuredMusicCover} alt={`${featuredMusicName} Album`} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="font-display text-3xl text-foreground mb-2">{featuredMusicName}</h3>
              <p className="text-primary font-body text-sm uppercase tracking-wider mb-4">{featuredMusicReleaseType}</p>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                A spellbinding journey through love, healing, and spiritual rebirth. Experience the enchanting sound that defines Lily Hollows.
              </p>
              <div className="bg-secondary rounded-sm p-4 gold-border">
                <div className="flex items-center gap-4">
                  <Link
                    to="/music"
                    className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground flex-shrink-0"
                    aria-label="Explore music"
                  >
                    <Play size={20} className="ml-0.5" />
                  </Link>
                  <div className="flex-1">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-gold-gradient rounded-full" />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>1:23</span>
                      <span>3:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Video */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Latest Video" subtitle="Watch the magic unfold" />
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto relative rounded-sm overflow-hidden gold-border">
            {latestVideoUrl ? (
              <a href={latestVideoUrl} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
                <img src={latestVideoThumb} alt="Latest music video" className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-background/30 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={32} className="ml-1 text-primary-foreground" />
                  </div>
                </div>
              </a>
            ) : (
              <div className="group">
                <img src={latestVideoThumb} alt="Latest music video" className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center">
                    <Play size={32} className="ml-1 text-primary-foreground" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Shows */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Upcoming Shows" subtitle="Catch the enchantress live" />
          <div className="max-w-3xl mx-auto space-y-4">
            {upcomingShows.map((show, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-card rounded-sm gold-border hover:gold-glow transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 mb-4 sm:mb-0">
                  <span className="text-primary font-body text-sm font-semibold uppercase tracking-wider">{show.date}</span>
                  <span className="text-foreground font-display text-xl">{show.venue}</span>
                  <span className="text-muted-foreground text-sm">{show.city}</span>
                </div>
                <Link
                  to="/shows"
                  className="px-6 py-2 border border-primary text-primary text-xs uppercase tracking-[0.15em] font-body rounded-sm hover:bg-primary/10 transition-colors"
                >
                  Tickets
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shows" className="inline-flex items-center gap-2 text-primary font-body text-sm uppercase tracking-wider hover:text-gold-light transition-colors">
              View All Shows <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${newsletterBackground})` }}
        />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
          <motion.div {...fadeInUp}>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-gold-gradient mb-4">
              {newsletterHeadline}
            </h2>
            <p className="text-foreground/80 font-body mb-8">
              {newsletterDescription}
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(`Newsletter signup: ${heroHeadline}`);
                const body = encodeURIComponent("Please add me to the newsletter list.\n\nEmail:");
                window.location.href = `mailto:${newsletterEmailTo}?subject=${subject}&body=${body}`;
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-secondary/80 border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold-gradient text-primary-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
