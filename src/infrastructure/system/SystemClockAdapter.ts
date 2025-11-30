import type { SystemClock } from '@/domain/system/SystemClock';

const DEFAULT_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export class SystemClockAdapter implements SystemClock {
  now(): Date {
    return new Date();
  }

  format(date: Date): string {
    return DEFAULT_FORMATTER.format(date);
  }
}
