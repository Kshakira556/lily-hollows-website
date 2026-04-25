import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = true }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-gold-gradient mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px bg-gold-gradient max-w-24 ${centered ? "mx-auto" : ""}`} />
    </motion.div>
  );
};

export default SectionHeading;
