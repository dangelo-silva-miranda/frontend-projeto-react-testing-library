import React from 'react';
import { render, screen } from '@testing-library/react';

import { NotFound } from '../components';

describe('Test the NotFound component', () => {
  test(`if the page contains a heading h2 with the text 
  "Page requested not found"`, () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /^Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('if page shows a specific image', () => {
    render(<NotFound />);

    const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getByRole('img',
      {
        name: /^Pikachu crying because the page requested was not found$/i,
      });

    expect(image).toHaveAttribute('src', imageSrc);
  });
});
