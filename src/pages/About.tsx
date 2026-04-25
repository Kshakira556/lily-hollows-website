import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { aboutPageQuery } from "@/sanity/queries";
import aboutPortrait from "@/assets/about-portrait.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

type PortableTextBlock = {
  children?: {
    text?: string;
  }[];
};

type AboutPage = {
  heroBackgroundImageUrl?: string;
  heroHeading?: string;
  portraitImageUrl?: string;
  heading?: string;
  bio?: PortableTextBlock[];
  accolades?: PortableTextBlock[];
  pressQuote?: string;
  pressAttribution?: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const portableTextToParagraphs = (blocks: PortableTextBlock[] | undefined) => {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .map((block) =>
      (block?.children ?? [])
        .map((child) => child?.text ?? "")
        .join("")
        .trim()
    )
    .filter(Boolean);
};

const About = () => {
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null);

  useEffect(() => {
    client.fetch(aboutPageQuery).then(setAboutPage).catch(console.error);
  }, []);

  const heroBackground = aboutPage?.heroBackgroundImageUrl ?? gallery1;
  const heroHeading = aboutPage?.heroHeading ?? "About";
  const portraitImage = aboutPage?.portraitImageUrl ?? aboutPortrait;
  const heading = aboutPage?.heading ?? "Meet the Enchantress";

  const bioParagraphs = portableTextToParagraphs(aboutPage?.bio);
  const accoladeParagraphs = portableTextToParagraphs(aboutPage?.accolades);

  const pressQuote =
    aboutPage?.pressQuote ??
    `"Lily's voice is a spell — tender, powerful, and utterly enchanting. She doesn't just sing, she transforms."`;
  const pressAttribution = aboutPage?.pressAttribution ?? "— Press Review";

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-overlay-darker" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">{heroHeading}</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeInUp}>
              <img src={portraitImage} alt="Lily Hollows" className="w-full rounded-sm gold-border gold-glow" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-4xl sm:text-5xl text-gold-gradient mb-6">{heading}</h2>
              <div className="space-y-4 text-foreground/80 font-body leading-relaxed">
                <p>
                  {bioParagraphs[0] ?? "Born from a deep devotion to storytelling and performance, Lily's music feels like a spell cast under moonlight. It's tender and unafraid to transform. Her lyrics move through themes of love, healing, feminine power, and spiritual rebirth, tracing the quiet alchemy of becoming someone new."}
                </p>
                <p>
                  {bioParagraphs[1] ?? "Guided by intuition and lived experience, she writes from the in-between spaces: where identities shed, and softer, truer selves emerge… enchanted."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-card">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Accolades" subtitle="A journey of recognition and excellence" />
          <motion.div {...fadeInUp} className="text-foreground/80 font-body leading-relaxed space-y-4">
            <p>
              {accoladeParagraphs[0] ?? "Her love for performance stretches beyond the musical stage, with numerous accolades from the Randfontein Arts and Culture Association, Talent Africa, and the South African Championships of Performing Arts (SACOPA), where she has received multiple gold awards and obtained provincial colours for performance."}
            </p>
            <p>
              {accoladeParagraphs[1] ?? "She has performed nationally and internationally, gracing stages at Splashy Fen, Canal Fest (UK), and opening for Monark at Ruimsig Stadium, as well as many benefits and cultural events. She recently returned from her performance at Coyote Ugly Bristol."}
            </p>
            <p>
              {accoladeParagraphs[2] ?? "Lily's artistry has also brought her to television and radio, with appearances on YoTV, Morning Live, Expresso, Jacaranda FM, Cape Talk, and Mix FM. Whether through song, poetry, or live performance, she continues to enchant audiences with her blend of heartfelt storytelling and timeless soul."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Quote */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.blockquote {...fadeInUp} className="gold-border p-8 sm:p-12 rounded-sm">
            <p className="font-display text-2xl sm:text-3xl italic text-foreground/90 leading-relaxed mb-6">
              {pressQuote}
            </p>
            <cite className="text-primary font-body text-sm uppercase tracking-wider">{pressAttribution}</cite>
          </motion.blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default About;
