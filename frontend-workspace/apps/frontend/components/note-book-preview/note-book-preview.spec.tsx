import { render } from '@testing-library/react';

import NoteBookPreview from './note-book-preview';

describe('NoteBookPreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoteBookPreview />);
    expect(baseElement).toBeTruthy();
  });
});
