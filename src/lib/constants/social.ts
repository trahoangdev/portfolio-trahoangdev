export interface UserHandles {
  all: string;
  discordId: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

export const USER_HANDLES: UserHandles = {
  all: 'trahoangdev',
  discordId: '1195303714777468988',
  linkedin: 'trahoangdev',
};

export interface SocialLink {
  name: string;
  urlTemplate: string;
  handleKey: keyof UserHandles;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    urlTemplate: 'https://facebook.com/trahoangdev',
    handleKey: 'all',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    urlTemplate: 'https://instagram.com/trahoangdev',
    handleKey: 'all',
    icon: 'instagram',
  },
  {
    name: 'Twitter',
    urlTemplate: 'https://twitter.com/{handle}',
    handleKey: 'all',
    icon: 'twitter',
  },
  {
    name: 'Discord',
    //urlTemplate: 'https://discord.com/users/{handle}',
    urlTemplate: 'https://discord.com',
    handleKey: 'discordId',
    icon: 'discord',
  },
  {
    name: 'GitHub',
    urlTemplate: 'https://github.com/{handle}',
    handleKey: 'all',
    icon: 'github',
  },
];

export interface ConnectLink {
  name: string;
  handle: string;
  urlTemplate: string;
  handleKey: keyof UserHandles;
}

export const CONNECT_LINKS: ConnectLink[] = [
  {
    name: 'GitHub',
    handle: 'trahoangdev',
    urlTemplate: 'https://github.com/{handle}',
    handleKey: 'all',
  },
  {
    name: 'Discord',
    handle: 'trahoangdev',
    urlTemplate: 'https://discord.com/users/{handle}',
    handleKey: 'discordId',
  },
  {
    name: 'Dev.to',
    handle: 'trahoangdev',
    urlTemplate: 'https://dev.to/{handle}',
    handleKey: 'all',
  },
  {
    name: 'HuggingFace',
    handle: 'trahoangdev',
    urlTemplate: 'https://huggingface.co/{handle}',
    handleKey: 'all',
  },
  {
    name: 'HubSpot Community',
    handle: 'trahoangdev',
    urlTemplate: '#',
    handleKey: 'all',
  },
  {
    name: 'LinkedIn',
    handle: 'trahoangdev',
    urlTemplate: 'https://www.linkedin.com/in/{handle}',
    handleKey: 'linkedin',
  },
];

export const generateSocialUrl = (urlTemplate: string, handle: string): string =>
  urlTemplate.replace('{handle}', handle);

export const generateConnectUrl = (urlTemplate: string, handle: string): string =>
  urlTemplate.replace('{handle}', handle);
