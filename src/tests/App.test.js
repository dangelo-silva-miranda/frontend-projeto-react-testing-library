import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
      test('if the first link has the text Home', () => {
        const { getByRole } = render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );
        const homeLink = getByRole('link', { name: /^home$/i });
        expect(homeLink).toBeInTheDocument();
      });

      test('if the second link has the text About', () => {
        const { getByRole } = render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );
        const aboutLink = getByRole('link', { name: /^about$/i });
        expect(aboutLink).toBeInTheDocument();
      });

      test('if the third link has the text Favorite Pokémons', () => {
        const { getByRole } = render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );
        const favoriteLink = getByRole('link', { name: /^Favorite Pokémons$/i });
        expect(favoriteLink).toBeInTheDocument();
      });
    },
  );

  test(`if the application is redirected to the home page,
  in the URL / by clicking on the Home link in the navigation bar`,
  () => {
    const { getByRole, history } = renderWithRouter(
      <App />,
    );

    const homeLink = getByRole('link', { name: /^home$/i });
    userEvent.click(homeLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  test.only(`if the application is redirected to the About page,
  in the URL /about by clicking on the About link in the navigation bar`,
  () => {
    const { getByRole, history } = renderWithRouter(
      <App />,
    );

    const aboutLink = getByRole('link', { name: /^about$/i });
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });
});
