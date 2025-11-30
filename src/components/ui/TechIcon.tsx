'use client';

import { ElementType } from 'react';
import { TECH_ICONS } from '@/lib/iconMapping';
import { cn } from '@/lib/utils';

interface TechIconProps {
  tech: string;
  className?: string;
  iconClassName?: string;
  size?: string | number;
  as?: React.ElementType;
  unstyled?: boolean;
}

export function TechIcon({
  tech,
  className,
  iconClassName,
  size = '1.5em',
  as: Wrapper = 'div',
  unstyled = false,
}: TechIconProps) {
  const normalizedTech = tech.trim().toLowerCase();
  const dotlessTech = normalizedTech.replace(/\./g, '');
  const Icon = TECH_ICONS[normalizedTech] || TECH_ICONS[dotlessTech];

  if (!Icon) {
    return null;
  }

  const wrapperClassName = cn(
    unstyled ? undefined : 'p-2 rounded-md bg-muted border border-border',
    className,
  );

  return (
    <Wrapper className={wrapperClassName}>
      <Icon size={size} className={iconClassName} />
    </Wrapper>
  );
}
