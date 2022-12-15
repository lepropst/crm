import { render } from '@testing-library/react';

import NoteDisplay from './note-display';

describe('NoteDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoteDisplay />);
    expect(baseElement).toBeTruthy();
  });
});
