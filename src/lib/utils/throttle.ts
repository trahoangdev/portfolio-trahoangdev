/**
 * Throttle utility to limit function execution frequency
 */

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per specified time period
 *
 * @param func - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecuted = 0;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted;

    const execute = () => {
      lastExecuted = now;
      func(...args);
    };

    if (timeSinceLastExecution >= delay) {
      execute();
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(execute, delay - timeSinceLastExecution);
    }
  };
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified time has elapsed since the last invocation
 *
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
