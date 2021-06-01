import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test the App component', () => {
  test('renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      // <MemoryRouter>
      <App />,
      // </MemoryRouter>,
    );

    /*
      Forma equivalente usando <MemoryRouter>:

      const { getByText } = renderWithRouter(<App />);
      history.push('/');
    */
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    /*
      Forma equivalente usando renderWithRouter:

      const { getByText, history } = renderWithRouter(<App />);
      history.push('/');
    */

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe(
    'checks if the top of the application contains a fixed set of navigation links',
    () => {
      test.only('if the first link has the text Home', () => {
        const { getByRole } = render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );
        const homeLink = getByRole('link', { name: /^home$/i });
        expect(homeLink).toBeInTheDocument();
      });
    },
  );
});
