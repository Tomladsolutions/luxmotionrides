import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  image: string;
  imageAlt: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  showDivider?: boolean;
  overlayClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  dividerClassName?: string;
}

/**
 * Full-width hero banner used at the top of content pages: a background image
 * with an overlay and an animated, centered title block.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  image,
  imageAlt,
  title,
  eyebrow,
  subtitle,
  showDivider = false,
  overlayClassName = 'bg-black/60',
  imageClassName = 'w-full h-full object-cover',
  contentClassName = 'relative z-10 text-center px-6',
  eyebrowClassName = 'text-[#FA0000] uppercase tracking-[0.2em] font-semibold text-xs mb-4 block',
  titleClassName = 'font-serif text-5xl md:text-7xl font-bold text-white mb-6',
  subtitleClassName = 'text-gray-200 text-lg',
  dividerClassName = 'w-24 h-1 bg-[#FA0000] mx-auto rounded-full',
}) => {
  return (
    <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={image} alt={imageAlt} className={imageClassName} referrerPolicy="no-referrer" />
        <div className={`absolute inset-0 ${overlayClassName}`}></div>
      </div>

      <div className={contentClassName}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {eyebrow && <span className={eyebrowClassName}>{eyebrow}</span>}
          <h1 className={titleClassName}>{title}</h1>
          {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
          {showDivider && <div className={dividerClassName}></div>}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;
