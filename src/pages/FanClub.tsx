import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, Gift } from "lucide-react";
import Layout from "@/components/Layout";
import { client } from "@/sanity/client";
import { contactPageQuery, fanClubPageQuery } from "@/sanity/queries";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const FanClub = () => {
  const [fanClubPage, setFanClubPage] = useState<any | null>(null);
  const [contactEmail, setContactEmail] = useState<string>("miss.L.hollows@gmail.com");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    client.fetch(fanClubPageQuery).then(setFanClubPage).catch(console.error);
    client
      .fetch(contactPageQuery)
      .then((contactPage: any) => {
        const next = String(contactPage?.contactInfo?.email ?? "").trim();
        if (next) setContactEmail(next);
      })
      .catch(() => {});
  }, []);

  const heroBackground = fanClubPage?.heroBackgroundImageUrl ?? newsletterBg;
  const heroHeading = fanClubPage?.heroHeading ?? "Fan Club";
  const heroDescription =
    fanClubPage?.heroDescription ?? "Join the inner circle and get exclusive access to new music, behind-the-scenes content, and more.";

  const perkIcons = [Star, Gift, Heart];
  const perks: { title: string; description?: string }[] = fanClubPage?.perks?.length
    ? fanClubPage.perks
    : [
        { title: "Early Access", description: "Be the first to hear new releases" },
        { title: "Exclusive Content", description: "Behind-the-scenes and unreleased tracks" },
        { title: "VIP Experiences", description: "Meet & greets and priority tickets" },
      ];

  const ctaHeading = fanClubPage?.ctaHeading ?? "Join the Enchantment";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Fan club signup: ${heroHeading}`);
    const body = encodeURIComponent([`Name: ${name}`, `Email: ${email}`].join("\n"));
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient mb-4">{heroHeading}</h1>
            <p className="text-foreground/80 font-body text-lg mb-8">
              {heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {perks.map((perk, i) => {
              const Icon = perkIcons[i] ?? Star;

              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 bg-card rounded-sm gold-border"
              >
                <Icon size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">{perk.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{perk.description}</p>
              </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto text-center"
          >
            <h2 className="font-display text-3xl text-gold-gradient mb-6">{ctaHeading}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-secondary border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button type="submit" className="w-full py-4 bg-gold-gradient text-primary-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity">
                Join Fan Club
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FanClub;
