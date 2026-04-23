const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

export function formatMonthYear(value: string | undefined): string {
  if (!value) {
    return formatter.format(new Date());
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return formatter.format(new Date());
  }

  return formatter.format(date);
}

