import { useEffect, useState } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(false); // Default to false to avoid hydration mismatch
  const [mounted, setMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    // Set the initial theme based on system preference or stored value
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme ? storedTheme === 'dark' : systemPrefersDark;
    
    setIsDark(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark, mounted]);

  const toggleTheme = () => {
    if (!mounted) return;
    setIsDark((prev) => !prev);
  };

  // Return mounted status so components can conditionally render
  return { isDark, toggleTheme, mounted };
}