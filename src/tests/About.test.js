import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe(`Test the About component: test if the page
 contains information about Pokédex`, () => {
  test('if the page contains a heading h2 with the text About Pokédex',
    () => {
      const { getByRole } = render(
        <About />,
      );

      const heading = getByRole('heading', { level: 2, name: /^About Pokédex$/i });
      expect(heading).toBeInTheDocument();
    });

  /*
    Créditos pela sugestão do getByText ao pesquisar em paragráfos: Paulo R Zambelli

    Fonte: https://testing-library.com/docs/react-testing-library/api/#container-1
  */
  test('if the page contains two paragraphs with text about a Pokédex',
    () => {
      const { container } = render(
        <About />,
      );
      const paragraph = container.querySelectorAll('p');

      expect(paragraph.length).toBe(2);
    });

  /*
    Créditos pela sugestão do toHaveAttribute: Marconi Moreira

    Fonte: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  */
  test('if the page contains a specific Pokédex image',
    () => {
      const { getByRole } = render(
        <About />,
      );

      const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

      const image = getByRole('img', { name: /^Pokédex$/i });

      expect(image).toHaveAttribute('src', imageSrc);
    });
});
