import { throttle, debounce } from '@/lib/utils/throttle';

describe('Throttle and Debounce Utilities', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('throttle', () => {
    it('executes function immediately on first call', () => {
      const mockFn = jest.fn();
      const throttled = throttle(mockFn, 100);

      throttled();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('throttles subsequent calls within delay period', () => {
      const mockFn = jest.fn();
      const throttled = throttle(mockFn, 100);

      throttled();
      throttled();
      throttled();

      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('passes arguments correctly', () => {
      const mockFn = jest.fn();
      const throttled = throttle(mockFn, 100);

      throttled('arg1', 'arg2');
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('allows execution after delay period', () => {
      const mockFn = jest.fn();
      const throttled = throttle(mockFn, 100);

      throttled();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttled();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('debounce', () => {
    it('delays function execution', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 100);

      debounced();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('resets timer on subsequent calls', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 100);

      debounced();
      jest.advanceTimersByTime(50);
      debounced();
      jest.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('passes arguments correctly', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 100);

      debounced('arg1', 'arg2');
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('only executes once after multiple rapid calls', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 100);

      debounced();
      debounced();
      debounced();
      debounced();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
