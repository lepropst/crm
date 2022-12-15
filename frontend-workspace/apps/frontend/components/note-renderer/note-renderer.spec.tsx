import { render } from '@testing-library/react';

import NoteRenderer from './note-renderer';

describe('NoteRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoteRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
