import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Play, Music, Camera, Award } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { epkPageQuery } from "@/sanity/queries";
import aboutPortrait from "@/assets/about-portrait.jpg";
import albumCover1 from "@/assets/album-cover-1.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import epkPage1 from "@/assets/epk-page1.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const portableTextToParagraphs = (blocks: any[] | undefined) => {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block) => (block?.children ?? []).map((child: any) => child?.text ?? "").join("").trim())
    .filter(Boolean);
};

const EPK = () => {
  const [epkPage, setEpkPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(epkPageQuery).then(setEpkPage).catch(console.error);
  }, []);

  const heroBackground = epkPage?.heroBackgroundImageUrl ?? epkPage1;
  const heroHeading = epkPage?.heroHeading ?? "EPK";
  const heroSubheading = epkPage?.heroSubheading ?? "Electronic Press Kit";
  const pressKitPdfUrl = epkPage?.pressKitPdfUrl;

  const bioPortrait = epkPage?.biography?.portraitImageUrl ?? aboutPortrait;
  const bioParagraphs = portableTextToParagraphs(epkPage?.biography?.body);

  const pressImages: string[] = (epkPage?.pressImages ?? []).map((img: any) => img?.url).filter(Boolean);
  const resolvedPressImages = pressImages.length ? pressImages : [aboutPortrait, gallery1, gallery3];

  const featuredTrackTitle = epkPage?.featuredTrack?.title ?? "Siklus";
  const featuredTrackLabel = epkPage?.featuredTrack?.label ?? "Latest Single";
  const featuredTrackCover = epkPage?.featuredTrack?.coverImageUrl ?? albumCover1;
  const featuredTrackAudioUrl = epkPage?.featuredTrack?.audioUrl;

  const achievements: string[] = epkPage?.achievements?.length
    ? epkPage.achievements
    : [
        "Multiple Gold Awards — SACOPA",
        "Provincial Colours for Performance",
        "Opened for Monark — Ruimsig Stadium",
        "International Performances — UK",
        "TV: YoTV, Morning Live, Expresso",
        "Radio: Jacaranda FM, Cape Talk, Mix FM",
      ];

  return (
    <Layout>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">{heroHeading}</h1>
          <p className="text-foreground/80 font-body mt-4">{heroSubheading}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div {...fadeInUp}>
            <button className="inline-flex items-center gap-3 px-10 py-5 bg-gold-gradient text-primary-foreground font-body text-sm uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity" onClick={() => pressKitPdfUrl && window.open(pressKitPdfUrl, "_blank")} disabled={!pressKitPdfUrl}>
              <Download size={18} /> Download Full Press Kit (PDF)
            </button>
          </motion.div>
        </div>

        {/* Bio Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <SectionHeading title="Biography" />
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp}>
              <img src={bioPortrait} alt="Lily Hollows" className="w-full rounded-sm gold-border" />
            </motion.div>
            <motion.div {...fadeInUp} className="md:col-span-2 text-foreground/80 font-body leading-relaxed space-y-4">
              <p>
                {bioParagraphs[0] ?? "Born from a deep devotion to storytelling and performance, Lily's music feels like a spell cast under moonlight. Her lyrics move through themes of love, healing, feminine power, and spiritual rebirth."}
              </p>
              <p>
                {bioParagraphs[1] ?? "She has performed nationally and internationally, gracing stages at Splashy Fen, Canal Fest (UK), and opening for Monark at Ruimsig Stadium. Her television and radio appearances include YoTV, Morning Live, Expresso, Jacaranda FM, Cape Talk, and Mix FM."}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Images */}
        <div className="max-w-4xl mx-auto mb-16">
          <SectionHeading title="Press Images" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resolvedPressImages.map((img, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="overflow-hidden rounded-sm gold-border">
                <img src={img} alt={`Press photo ${i + 1}`} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Music */}
        <div className="max-w-4xl mx-auto mb-16">
          <SectionHeading title="Music" />
          <motion.div {...fadeInUp} className="flex items-center gap-6 p-6 bg-card rounded-sm gold-border">
            <img src={featuredTrackCover} alt={featuredTrackTitle} className="w-24 h-24 rounded-sm object-cover" />
            <div>
              <h3 className="font-display text-xl text-foreground">{featuredTrackTitle}</h3>
              <p className="text-primary text-xs font-body uppercase tracking-wider">{featuredTrackLabel}</p>
            </div>
            {featuredTrackAudioUrl ? (
              <a
                href={featuredTrackAudioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center"
                aria-label="Play"
              >
                <Play size={20} className="ml-0.5 text-primary-foreground" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="ml-auto w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center cursor-not-allowed"
                aria-label="Play"
              >
                <Play size={20} className="ml-0.5" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Achievements" />
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((item, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-4 bg-card rounded-sm gold-border">
                <Award size={16} className="text-primary flex-shrink-0" />
                <span className="text-foreground/80 font-body text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EPK;
