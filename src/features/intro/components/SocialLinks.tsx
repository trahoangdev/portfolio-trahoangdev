'use client';

import { SOCIAL_LINKS, USER_HANDLES, generateSocialUrl } from '@/lib/constants';
import { SOCIAL_ICONS } from '@/lib/iconMapping';
import { trackSocialClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function SocialLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon];
        const handle = USER_HANDLES[link.handleKey];

        // Skip if handle is not defined
        if (!handle) return null;

        const url = generateSocialUrl(link.urlTemplate, handle);

        return (
          <a
            key={link.name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialClick(link.name)}
            className={cn(
              "group relative flex items-center justify-center w-10 h-10 rounded-full",
              "bg-background/50 border border-border/50",
              "hover:bg-foreground hover:text-background hover:scale-110",
              "hover:border-foreground hover:shadow-[0_0_20px_-5px_var(--foreground)]",
              "transition-all duration-300 ease-out"
            )}
            aria-label={link.name}
          >
            <span className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-20 transition-opacity blur-md"></span>
            {Icon && <Icon size="1.1em" className="relative z-10" />}
          </a>
        );
      })}
    </div>
  );
}