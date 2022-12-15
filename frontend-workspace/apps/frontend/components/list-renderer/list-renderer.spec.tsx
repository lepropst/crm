import { render } from '@testing-library/react';

import ListRenderer from './list-renderer';

describe('ListRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
