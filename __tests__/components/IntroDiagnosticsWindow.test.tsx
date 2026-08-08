import { fireEvent, render, screen } from '@testing-library/react';

import { IntroDiagnosticsWindow } from '@/features/intro/components/IntroDiagnosticsWindow';

describe('IntroDiagnosticsWindow', () => {
  it('dismisses the intro when the close control is clicked', () => {
    const onClose = jest.fn();

    render(
      <IntroDiagnosticsWindow
        phase="typing"
        targetLines={['Browser type: Chrome']}
        typedLines={['Browser type: Chrome']}
        activeLineIndex={0}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Skip intro' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
