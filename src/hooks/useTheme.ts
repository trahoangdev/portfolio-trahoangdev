import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { setTheme, resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return { isDark, toggleTheme };
}
