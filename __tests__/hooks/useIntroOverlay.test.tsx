import { renderHook } from '@testing-library/react';
import { useIntroOverlay } from '@/hooks/useIntroOverlay';

describe('useIntroOverlay storage fallback', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
  });

  afterEach(() => jest.restoreAllMocks());

  it.each(['getItem', 'setItem'] as const)('keeps the portfolio available when storage %s throws', (method) => {
    jest.spyOn(Storage.prototype, method).mockImplementation(() => {
      throw new DOMException('Storage access denied', 'SecurityError');
    });
    const { result } = renderHook(() => useIntroOverlay());
    expect(result.current.shouldRender).toBe(false);
    expect(result.current.isVisible).toBe(false);
  });

  it('skips the introduction when even the sessionStorage getter is blocked', () => {
    jest.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage access denied', 'SecurityError');
    });
    const { result } = renderHook(() => useIntroOverlay());
    expect(result.current.shouldRender).toBe(false);
  });

  it('still shows the introduction once when storage is available', () => {
    const firstVisit = renderHook(() => useIntroOverlay());
    expect(firstVisit.result.current.shouldRender).toBe(true);
    firstVisit.unmount();
    const nextVisit = renderHook(() => useIntroOverlay());
    expect(nextVisit.result.current.shouldRender).toBe(false);
  });
});
