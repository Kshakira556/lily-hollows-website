import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { client } from "@/sanity/client";
import { storePageQuery } from "@/sanity/queries";
import merch1 from "@/assets/merch-1.jpg";
import merch2 from "@/assets/merch-2.jpg";
import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";

const fallbackProducts = [
  { name: "Enchantress Tour Tee", price: "R 450", image: merch1 },
  { name: "Siklus Vinyl", price: "R 350", image: merch2 },
  { name: "Siklus Digital Album", price: "R 120", image: albumCover1 },
  { name: "Signed Poster", price: "R 250", image: albumCover2 },
];

const Store = () => {
  const [storePage, setStorePage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(storePageQuery).then(setStorePage).catch(console.error);
  }, []);

  const heroHeading = storePage?.heroHeading ?? "Store";
  const heroSubheading = storePage?.heroSubheading ?? "Official merchandise";

  const products = storePage?.products?.length
    ? storePage.products.map((product: any) => ({
        ...product,
        image: product?.imageUrl ?? product?.image,
      }))
    : fallbackProducts;

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
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-sm overflow-hidden gold-border hover:gold-glow transition-all"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-foreground mb-1">{product.name}</h3>
                <p className="text-primary font-body font-semibold mb-4">{product.price}</p>
                {product.productUrl ? (
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gold-gradient text-primary-foreground font-body text-xs uppercase tracking-[0.15em] rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} /> Buy
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 bg-muted text-muted-foreground font-body text-xs uppercase tracking-[0.15em] rounded-sm flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <ShoppingBag size={14} /> Add to Cart
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

export default Store;
