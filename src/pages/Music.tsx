import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { musicPageQuery } from "@/sanity/queries";
import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";

const fallbackAlbums = [
  { title: "Siklus", type: "Single", year: "2025", cover: albumCover1, tracks: ["Siklus"] },
  { title: "Melted Halo", type: "Demo (Unreleased)", year: "2026", cover: albumCover2, tracks: ["Melted Halo"] },
  { title: "Forbidden", type: "Demo (Unreleased)", year: "2026", cover: albumCover3, tracks: ["Forbidden"] },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const MusicPage = () => {
  const [musicPage, setMusicPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(musicPageQuery).then(setMusicPage).catch(console.error);
  }, []);

  const heroHeading = musicPage?.heroHeading ?? "Music";
  const heroSubheading = musicPage?.heroSubheading ?? "Explore the enchanting discography";

  const albums = musicPage?.albums?.length
    ? musicPage.albums.map((album: any) => ({
        ...album,
        cover: album?.coverImageUrl ?? album?.cover,
      }))
    : fallbackAlbums;

  return (
    <Layout>
      <section className="relative h-[40vh] flex items-center justify-center bg-card">
        <div className="absolute inset-0 bg-overlay-dark" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-gold-gradient">{heroHeading}</h1>
          <p className="text-muted-foreground font-body mt-4">{heroSubheading}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, i) => (
              <motion.div
                key={album.title}
                {...fadeInUp}
                transition={{ delay: i * 0.15 }}
                className="group bg-card rounded-sm overflow-hidden gold-border hover:gold-glow transition-all"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center">
                      <Play size={24} className="ml-1 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground mb-1">{album.title}</h3>
                  <p className="text-primary text-xs font-body uppercase tracking-wider mb-4">
                    {album.type} · {album.year}
                  </p>
                  {album.tracks.map((track) => (
                    <div key={track} className="flex items-center gap-3 py-2 border-t border-border">
                      <Play size={12} className="text-primary flex-shrink-0" />
                      <span className="text-foreground/80 text-sm font-body">{track}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MusicPage;
