import { render } from '@testing-library/react';

import TodoRenderer from './todo-renderer';

describe('TodoRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
