'use client';

import { FaPlus } from 'react-icons/fa';
import { Experience } from '@/lib/constants';
import { TechIcon } from '@/components/ui/TechIcon';
import { TECH_ICONS } from '@/lib/iconMapping';

interface ExperienceCardProps {
  job: Experience;
  index: number;
  activeSection: string;
}

const hasTechIcon = (techName: string) => {
  const normalized = techName.trim().toLowerCase();
  if (TECH_ICONS[normalized]) {
    return true;
  }

  const dotlessTech = normalized.replace(/\./g, '');
  return Boolean(TECH_ICONS[dotlessTech]);
};

export function ExperienceCard({
  job,
  index,
  activeSection,
}: ExperienceCardProps) {
  const border =
    index % 2 === 0 ? 'border-wave-animated' : 'border-pulse-animated';
  const CARD_BASE = [
    'group magnet-card border-border p-6 cursor-pointer',
    'transition-[transform,opacity,shadow,background-color,color] duration-500',
    'ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform will-change-opacity',
    'hover:-translate-y-1 hover:shadow-2xl hover:bg-muted/60',
  ].join(' ');

  return (
    <div
      className={`${CARD_BASE} ${border} opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0`}
      data-inview={activeSection === 'work' ? 'true' : undefined}
      style={{
        transitionDelay:
          activeSection === 'work' ? `${150 + index * 90}ms` : '0ms',
      }}
    >
      <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
        {/* YEAR */}
        <div className="lg:col-span-2">
          <div className="text-xl sm:text-2xl font-bold h-full flex items-center justify-center text-center leading-tight transition-all duration-500 group-hover:text-foreground group-hover:scale-110">
            {job.year}
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-6 space-y-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground group-hover:-translate-y-0.5">
              {job.role}
            </h3>
            <div className="text-muted-foreground font-medium">
              {job.company}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            {job.description}
          </p>
        </div>

        {/* TECH */}
        <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
          {job.tech.map((tech) => {
            const icon = hasTechIcon(tech) ? (
              <TechIcon
                tech={tech}
                as="span"
                unstyled
                className="inline-flex items-center justify-center w-3.5 h-3.5"
                size="1em"
              />
            ) : (
              <span className="inline-flex items-center justify-center w-3.5 h-3.5">
                <FaPlus className="h-3 w-3" aria-hidden="true" />
              </span>
            );

            return (
              <span
                key={tech}
                className="px-2 py-1 text-xs border border-border rounded-sm inline-flex items-center gap-1 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
                title={tech}
              >
                {icon}
                <span className="leading-none">{tech}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
