import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SlideSectionProps {
  id: string;
  heading: string;
  subheading: string;
  aiMessage: string;
  ctaText: string;
  backgroundImage: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
}

export function SlideSection({
  id,
  heading,
  subheading,
  aiMessage,
  ctaText,
  backgroundImage,
  onCtaClick,
  children
}: SlideSectionProps) {
  return (
    <section id={id} className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={backgroundImage}
          alt={heading}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {heading}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              {subheading}
            </motion.p>

            {/* AI Speaker Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-white/80 mb-1">AI Travel Assistant</p>
                  <p className="text-white leading-relaxed">"{aiMessage}"</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onCtaClick}
                  size="lg"
                  className="text-lg px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-xl hover:shadow-amber-500/25 transition-all duration-300"
                >
                  {ctaText}
                </Button>
              </motion.div>
            </motion.div>

            {/* Additional Content */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}