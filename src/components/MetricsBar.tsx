import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const MetricsBar: React.FC = () => {
  return (
    <section className="border-y border-white/[0.07] bg-[#0A0C11]/60 py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs font-semibold text-zinc-300 mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
