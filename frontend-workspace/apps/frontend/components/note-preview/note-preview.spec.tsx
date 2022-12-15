import { render } from '@testing-library/react';

import NotePreview from './note-preview';

describe('NotePreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotePreview />);
    expect(baseElement).toBeTruthy();
  });
});
