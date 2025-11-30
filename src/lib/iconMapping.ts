import type { ComponentType } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaPython,
  FaDocker,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiCplusplus,
  SiFastapi,
  SiPostgresql,
  SiSqlite,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

type IconComponent = ComponentType<{ size?: string | number; className?: string }>;

// Social media icon mapping
export const SOCIAL_ICONS: Record<string, IconComponent> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  discord: FaDiscord,
  github: FaGithub,
};

// Technology icon mapping
export const TECH_ICONS: Record<string, IconComponent> = {
  docker: FaDocker,
  html: FaHtml5,
  css: FaCss3Alt,
  js: FaJs,
  javascript: FaJs,
  typescript: SiTypescript,
  ts: SiTypescript,
  react: FaReact,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  'node.js': FaNode,
  nodejs: FaNode,
  python: FaPython,
  'c++': SiCplusplus,
  cpp: SiCplusplus,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  sqlite: SiSqlite,
  vscode: VscCode,
  'visual studio code': VscCode,
  github: FaGithub,
  'discord.py': FaDiscord,
  discordpy: FaDiscord,
};
