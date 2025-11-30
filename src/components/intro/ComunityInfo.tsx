'use client';

import { FaDiscord } from 'react-icons/fa';

export function CommunityInfo() {
  return (
    <div
      className="relative overflow-hidden p-6
                    group/community
                    border borrder-dashed-animated border-border
                    hover-lift hover:scale-110 hover:shadow-2xl transition-all duration-500 
                   
                    /* Light mode default */
                    bg-background text-foreground
                   
                    /* Dark mode default */  
                    dark:bg-background dark:text-foreground
                   
                    /* Light mode hover - becomes dark theme */
                    hover:bg-black hover:text-white hover:border-white
                   
                    /* Dark mode hover - becomes light theme */
                    dark:hover:bg-white dark:hover:text-black dark:hover:border-black
                   "
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 
                   bg-gradient-to-r from-transparent via-white/20 to-transparent 
                   dark:bg-gradient-to-r dark:from-transparent dark:via-black/20 dark:to-transparent
                   -translate-x-full group-hover/community:translate-x-full 
                   transition-transform duration-1000 ease-in-out"
      ></div>

      <a
        href="https://discord.gg/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Discord"
        className="block"
      >
        <div className="flex items-center gap-4">
          {/* Discord icon container */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl 
                       transition-all duration-500
                       
                       /* Light mode default */
                       bg-foreground text-background
                       
                       /* Dark mode default */
                       dark:bg-foreground dark:text-background
                       
                       /* Light mode hover - icon becomes light theme styled */
                       group-hover/community:bg-white group-hover/community:text-black 
                       group-hover/community:border group-hover/community:border-black
                       
                       /* Dark mode hover - icon becomes dark theme styled */
                       dark:group-hover/community:bg-black dark:group-hover/community:text-white
                       dark:group-hover/community:border dark:group-hover/community:border-white"
          >
            <FaDiscord className="w-8 h-8 transition-all" />
          </div>

          {/* Text content */}
          <div className="flex-1">
            {/* Main title */}
            <div
              className="text-2xl font-bold tracking-wide transition-all duration-500
                         /* Inherits color from parent card hover states */"
            >
              Join our community
            </div>

            {/* Subtitle */}
            <div
              className="text-sm transition-all duration-500
                         /* Light mode default */
                         text-muted-foreground
                         
                         /* Dark mode default */
                         dark:text-muted-foreground
                         
                         /* Light mode hover - muted version of white */
                         group-hover/community:text-white/80
                         
                         /* Dark mode hover - muted version of black */
                         dark:group-hover/community:text-black/80"
            >
              Hop in our Discord — build, learn, vibe together.
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
