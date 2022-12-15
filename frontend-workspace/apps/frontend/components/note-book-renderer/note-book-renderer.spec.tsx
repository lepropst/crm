import { render } from '@testing-library/react';

import NoteBookRenderer from './note-book-renderer';

describe('NoteBookRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoteBookRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
