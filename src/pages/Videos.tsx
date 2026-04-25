import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Layout from "@/components/Layout";
import { client } from "@/sanity/client";
import { videosPageQuery } from "@/sanity/queries";
import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const fallbackVideos = [
  { title: "What's Your Flava - Craig David", venue: "Baze Lounge", thumb: videoThumb1 },
  { title: "Fallin' - Alicia Keys", venue: "Baze Lounge", thumb: videoThumb2 },
  { title: "God Is A Woman - Ariana Grande", venue: "Women's Day", thumb: gallery1 },
  { title: "Fall In Line - Christina Aguilera", venue: "Skyline", thumb: gallery4 },
];

const VideosPage = () => {
  const [videosPage, setVideosPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(videosPageQuery).then(setVideosPage).catch(console.error);
  }, []);

  const heroHeading = videosPage?.heroHeading ?? "Videos";
  const heroSubheading = videosPage?.heroSubheading ?? "Watch the magic unfold";

  const videos = videosPage?.videos?.length
    ? videosPage.videos.map((video: any) => ({
        ...video,
        thumb: video?.thumbnailUrl ?? video?.thumb,
      }))
    : fallbackVideos;

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
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-8">
          {videos.map((video, i) => {
            const href = String(video?.videoUrl ?? "").trim();
            const clickable = href.length > 0;

            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group rounded-sm overflow-hidden gold-border hover:gold-glow transition-all ${clickable ? "cursor-pointer" : ""}`}
            >
              <div className="relative">
                <img src={video.thumb} alt={video.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                {clickable ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-background/20 transition-colors"
                    aria-label={`Open video: ${video.title}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} className="ml-1 text-primary-foreground" />
                    </div>
                  </a>
                ) : (
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center">
                      <Play size={24} className="ml-1 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-display text-lg text-foreground">{video.title}</h3>
                <p className="text-primary text-xs font-body uppercase tracking-wider mt-1">{video.venue}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default VideosPage;
