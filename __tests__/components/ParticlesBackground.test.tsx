import { act, render } from '@testing-library/react';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';

jest.mock('next-themes', () => ({ useTheme: () => ({ resolvedTheme: 'light' }) }));

describe('ParticlesBackground motion preference', () => {
  let reduced: boolean;
  let changeListener: (() => void) | undefined;
  let removeListener: jest.Mock;
  let frame: jest.SpyInstance;
  let cancel: jest.SpyInstance;

  beforeEach(() => {
    reduced = false;
    removeListener = jest.fn();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: jest.fn(() => ({
        get matches() { return reduced; },
        addEventListener: (_event: string, listener: () => void) => { changeListener = listener; },
        removeEventListener: removeListener,
      })),
    });
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: jest.fn(), beginPath: jest.fn(), arc: jest.fn(), fill: jest.fn(),
      moveTo: jest.fn(), lineTo: jest.fn(), stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D);
    frame = jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(17);
    cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => jest.restoreAllMocks());

  it('does not animate when reduced motion is enabled before mounting', () => {
    reduced = true;
    const { container } = render(<ParticlesBackground />);
    expect(container.querySelector('canvas')).toHaveAttribute('hidden');
    expect(frame).not.toHaveBeenCalled();
  });

  it('stops and resumes animation when the preference changes', () => {
    const { container, unmount } = render(<ParticlesBackground />);
    expect(frame).toHaveBeenCalledTimes(1);
    act(() => { reduced = true; changeListener?.(); });
    expect(cancel).toHaveBeenCalledWith(17);
    expect(container.querySelector('canvas')).toHaveAttribute('hidden');
    expect(frame).toHaveBeenCalledTimes(1);
    act(() => { reduced = false; changeListener?.(); });
    expect(container.querySelector('canvas')).not.toHaveAttribute('hidden');
    expect(frame).toHaveBeenCalledTimes(2);
    unmount();
    expect(removeListener).toHaveBeenCalledWith('change', changeListener);
  });
});
