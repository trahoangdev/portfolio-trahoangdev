export interface SystemClock {
  now(): Date;
  format(date: Date): string;
}
