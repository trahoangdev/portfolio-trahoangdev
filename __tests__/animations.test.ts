import { AnimationController } from '@/lib/animations';

// Mock animejs
jest.mock('animejs', () => ({
  animate: jest.fn(() => ({
    pause: jest.fn(),
  })),
  stagger: jest.fn(() => 100),
}));

describe('AnimationController', () => {
  let controller: AnimationController;

  beforeEach(() => {
    controller = new AnimationController();
    jest.clearAllMocks();
  });

  afterEach(() => {
    controller.cleanup();
  });

  it('creates animation controller instance', () => {
    expect(controller).toBeInstanceOf(AnimationController);
  });

  it('calls fadeIn animation with correct parameters', () => {
    const target = '.test-element';
    const delay = 500;
    const duration = 1000;

    controller.fadeIn(target, delay, duration);

    const { animate } = require('animejs');
    expect(animate).toHaveBeenCalledWith({
      targets: target,
      opacity: [0, 1],
      translateY: [30, 0],
      duration,
      delay,
      easing: 'easeOutExpo',
    });
  });

  it('calls slideIn animation with correct parameters', () => {
    const target = '.test-element';
    const direction = 'left';
    const delay = 300;

    controller.slideIn(target, direction, delay);

    const { animate } = require('animejs');
    expect(animate).toHaveBeenCalledWith({
      targets: target,
      translateX: [-100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay,
      easing: 'easeOutExpo',
    });
  });

  it('calls staggeredReveal animation with correct parameters', () => {
    const target = '.test-elements';
    const delay = 600;

    controller.staggeredReveal(target, delay);

    const { animate, stagger } = require('animejs');
    expect(stagger).toHaveBeenCalledWith(100, { start: delay });
    expect(animate).toHaveBeenCalledWith({
      targets: target,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      delay: 100, // mocked stagger return value
      easing: 'easeOutExpo',
    });
  });

  it('creates hover effect with enter and leave functions', () => {
    const target = '.test-element';
    const hoverEffect = controller.hoverEffect(target);

    expect(hoverEffect).toHaveProperty('enter');
    expect(hoverEffect).toHaveProperty('leave');
    expect(typeof hoverEffect.enter).toBe('function');
    expect(typeof hoverEffect.leave).toBe('function');
  });

  it('calls hover enter animation', () => {
    const target = '.test-element';
    const hoverEffect = controller.hoverEffect(target);

    hoverEffect.enter();

    const { animate } = require('animejs');
    expect(animate).toHaveBeenCalledWith({
      targets: target,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutQuad',
    });
  });

  it('calls hover leave animation', () => {
    const target = '.test-element';
    const hoverEffect = controller.hoverEffect(target);

    hoverEffect.leave();

    const { animate } = require('animejs');
    expect(animate).toHaveBeenCalledWith({
      targets: target,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad',
    });
  });

  it('cleans up animations on cleanup', () => {
    const mockAnimation = { pause: jest.fn() };
    const { animate } = require('animejs');
    animate.mockReturnValue(mockAnimation);

    controller.fadeIn('.test');
    controller.cleanup();

    expect(mockAnimation.pause).toHaveBeenCalled();
  });
});
