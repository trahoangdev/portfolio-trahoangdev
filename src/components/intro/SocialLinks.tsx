'use client';

import { SOCIAL_LINKS, USER_HANDLES, generateSocialUrl } from '@/lib/constants';
import { SOCIAL_ICONS } from '@/lib/iconMapping';
import { trackSocialClick } from '@/lib/analytics';

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-6">
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
            className="social-icon w-8 h-8 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
            aria-label={link.name}
          >
            {Icon && <Icon size="1.2em" />}
          </a>
        );
      })}
    </div>
  );
}