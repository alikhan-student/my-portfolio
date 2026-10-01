import React from 'react';
import { LEADERSHIP } from '../data/portfolioData';
import { Award, BookOpen, Users, Compass, CheckCircle2 } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
              04. Community & Academics
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Leadership & Academic Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal">
            Directing community learning at Core Computing Society while advancing undergraduate artificial intelligence studies at University of Peshawar.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEADERSHIP.map((role, idx) => (
            <div
              key={idx}
              className="bg-[#0B0D14] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Role Header */}
                <div className="border-b border-white/[0.06] pb-4 mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>{role.period}</span>
                    <span>{role.location}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    {role.title}
                  </h3>
                  <div className="text-xs font-medium text-zinc-300 mt-1">
                    {role.organization}
                  </div>
                </div>

                {/* Core Responsibilities */}
                <div className="space-y-4 mb-6">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Initiatives & Scope
                  </div>
                  <ul className="space-y-2.5">
                    {role.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestones / Impact */}
                <div className="space-y-3 pt-4 border-t border-white/[0.04]">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Key Achievements
                  </div>
                  <div className="space-y-2">
                    {role.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="p-3 bg-black/30 rounded-xl border border-white/[0.04] text-xs text-zinc-300 leading-normal">
                        {ach}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Active Commitment</span>
                <span className="text-emerald-400">Ongoing Leadership</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
