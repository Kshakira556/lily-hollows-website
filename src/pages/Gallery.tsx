import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import { client } from "@/sanity/client";
import { galleryPageQuery } from "@/sanity/queries";
import heroBg from "@/assets/hero-bg.jpg";
import aboutPortrait from "@/assets/about-portrait.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";
import bookingHero from "@/assets/booking-hero.jpg";

const fallbackImages = [
  heroBg, aboutPortrait, gallery1, gallery2, gallery3, gallery4, videoThumb1, videoThumb2, bookingHero,
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [galleryPage, setGalleryPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(galleryPageQuery).then(setGalleryPage).catch(console.error);
  }, []);

  const heroHeading = galleryPage?.heroHeading ?? "Gallery";
  const images: string[] = (galleryPage?.images ?? []).map((img: any) => img?.url).filter(Boolean);
  const resolvedImages = images.length ? images : fallbackImages;

  return (
    <Layout>
      <section className="relative h-[40vh] flex items-center justify-center bg-card">
        <div className="absolute inset-0 bg-overlay-dark" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">{heroHeading}</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {resolvedImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-sm gold-border hover:gold-glow transition-all"
              onClick={() => setSelected(i)}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors" onClick={() => setSelected(null)}>
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={resolvedImages[selected]}
              alt="Gallery full view"
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
