import { render } from '@testing-library/react';

import SlateRenderer from './slate-renderer';

describe('SlateRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SlateRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
