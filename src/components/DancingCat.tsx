import React, { useState } from 'react';
import { motion } from 'motion/react';

interface DancingCatProps {
  onClick?: () => void;
  className?: string;
  size?: number;
  showSpeechBubble?: boolean;
}

export const DancingCat: React.FC<DancingCatProps> = ({
  onClick,
  className = '',
  size = 64,
  showSpeechBubble = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer select-none group flex flex-col items-center ${className}`}
      title="Click to chat with Waqas AI"
    >
      {/* Floating Animated Speech Bubble */}
      {showSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-10 right-0 sm:right-auto whitespace-nowrap px-2.5 py-1 rounded-full bg-card/95 backdrop-blur-md border border-accent/40 shadow-lg text-[11px] font-mono text-foreground flex items-center gap-1.5 pointer-events-none group-hover:border-accent group-hover:scale-105 transition-all"
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-accent">Waqas AI</span>
          <span className="text-muted-foreground text-[10px]">· Click to chat!</span>
          {/* Bubble tail pointer */}
          <div className="absolute -bottom-1.5 right-6 sm:left-1/2 sm:-translate-x-1/2 w-2 h-2 bg-card border-r border-b border-accent/40 rotate-45" />
        </motion.div>
      )}

      {/* Floating Music Notes when dancing */}
      <motion.div
        animate={{
          y: [-2, -14, -2],
          opacity: isHovered ? [0, 1, 0] : [0, 0.7, 0],
          x: [0, 4, -4],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: 'easeInOut',
        }}
        className="absolute -top-4 -left-1 text-xs text-accent pointer-events-none"
      >
        ♪
      </motion.div>

      <motion.div
        animate={{
          y: [-1, -12, -1],
          opacity: isHovered ? [0, 1, 0] : [0, 0.6, 0],
          x: [0, -5, 3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.1,
          delay: 0.6,
          ease: 'easeInOut',
        }}
        className="absolute -top-5 right-1 text-[11px] text-emerald-400 pointer-events-none"
      >
        ♫
      </motion.div>

      {/* The Dancing Cat SVG Body with Keyframe Motions */}
      <motion.div
        animate={{
          rotate: isHovered ? [-6, 6, -6] : [-3, 3, -3],
          y: isHovered ? [0, -6, 0] : [0, -3, 0],
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          repeat: Infinity,
          duration: isHovered ? 0.45 : 0.9,
          ease: 'easeInOut',
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        >
          {/* Animated Tail */}
          <motion.path
            d="M 28 72 C 16 68, 10 52, 14 42 C 17 34, 25 38, 22 46 C 20 52, 22 62, 30 68"
            stroke="#D97706"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: isHovered ? [-16, 20, -16] : [-8, 12, -8],
              originX: '30px',
              originY: '70px',
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0.4 : 0.8,
              ease: 'easeInOut',
            }}
          />

          {/* Dancing Feet / Paws Bottom */}
          {/* Left Foot */}
          <motion.ellipse
            cx="40"
            cy="84"
            rx="7"
            ry="4"
            fill="#F59E0B"
            animate={{
              y: isHovered ? [-4, 0, -4] : [-2, 0, -2],
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0.45 : 0.9,
              ease: 'easeInOut',
            }}
          />
          {/* Right Foot */}
          <motion.ellipse
            cx="60"
            cy="84"
            rx="7"
            ry="4"
            fill="#F59E0B"
            animate={{
              y: isHovered ? [0, -4, 0] : [0, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0.45 : 0.9,
              ease: 'easeInOut',
            }}
          />

          {/* Cat Main Body (Warm Golden/Amber Calico cat) */}
          <ellipse cx="50" cy="62" rx="22" ry="20" fill="#FBBF24" />
          {/* Belly Patch (Creamy) */}
          <ellipse cx="50" cy="64" rx="14" ry="13" fill="#FEF3C7" />

          {/* Left Dancing Arm / Paw */}
          <motion.path
            d="M 32 58 C 24 50, 22 42, 28 38 C 32 35, 36 42, 36 50"
            fill="#F59E0B"
            animate={{
              rotate: isHovered ? [-25, 10, -25] : [-15, 5, -15],
              originX: '35px',
              originY: '56px',
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0.45 : 0.9,
              ease: 'easeInOut',
            }}
          />

          {/* Right Dancing Arm / Paw */}
          <motion.path
            d="M 68 58 C 76 50, 78 42, 72 38 C 68 35, 64 42, 64 50"
            fill="#F59E0B"
            animate={{
              rotate: isHovered ? [10, -25, 10] : [5, -15, 5],
              originX: '65px',
              originY: '56px',
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0.45 : 0.9,
              ease: 'easeInOut',
            }}
          />

          {/* Cat Head */}
          <circle cx="50" cy="38" r="19" fill="#FBBF24" />

          {/* Left Ear */}
          <motion.polygon
            points="34,26 42,12 47,24"
            fill="#F59E0B"
            animate={{
              rotate: isHovered ? [-6, 6, -6] : [-2, 2, -2],
              originX: '40px',
              originY: '25px',
            }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <polygon points="36,25 42,15 45,24" fill="#F472B6" />

          {/* Right Ear */}
          <motion.polygon
            points="66,26 58,12 53,24"
            fill="#F59E0B"
            animate={{
              rotate: isHovered ? [6, -6, 6] : [2, -2, 2],
              originX: '60px',
              originY: '25px',
            }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <polygon points="64,25 58,15 55,24" fill="#F472B6" />

          {/* Cute Cat Face */}
          {/* Cheerful Happy Eyes (^ ^) */}
          <path
            d="M 41 36 Q 44 32 47 36"
            stroke="#1F2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 53 36 Q 56 32 59 36"
            stroke="#1F2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Little Pink Nose */}
          <polygon points="48,41 52,41 50,43" fill="#F472B6" />

          {/* W-Shaped Cat Mouth (:3) */}
          <path
            d="M 46 43 Q 48 47 50 44 Q 52 47 54 43"
            stroke="#1F2937"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cute Rosy Cheeks */}
          <circle cx="39" cy="42" r="3" fill="#F43F5E" opacity="0.45" />
          <circle cx="61" cy="42" r="3" fill="#F43F5E" opacity="0.45" />

          {/* Whiskers Left */}
          <line x1="33" y1="40" x2="25" y2="39" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="34" y1="43" x2="26" y2="44" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />

          {/* Whiskers Right */}
          <line x1="67" y1="40" x2="75" y2="39" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="66" y1="43" x2="74" y2="44" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />

          {/* AI Robot / Tech Headphone / Little Bowtie */}
          <circle cx="50" cy="54" r="3.5" fill="#10B981" />
          <polygon points="46,54 42,51 42,57" fill="#059669" />
          <polygon points="54,54 58,51 58,57" fill="#059669" />
        </svg>

        {/* Dancing Shadow under Cat */}
        <motion.div
          animate={{
            scaleX: isHovered ? [0.85, 1.15, 0.85] : [0.9, 1.1, 0.9],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 0.45 : 0.9,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/40 rounded-full blur-[2px] pointer-events-none"
        />
      </motion.div>
    </div>
  );
};
