import React from 'react';
import { render, screen } from '@testing-library/react';

import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
/*
  Material consultado sobre verificar se checkbox está checked
  https://stackoverflow.com/a/55178588
  https://www.cluemediator.com/check-a-checkbox-using-react-testing-library
*/
describe('Test the FavoritePokemons component', () => {
  const [Pikachu, Charmander] = pokemons;

  test(`if the message No favorite pokemon found is displayed on 
  the screen, if the person does not have favorite pokemons`,
  () => {
    const { container } = render(
      <FavoritePokemons pokemons={ [] } />,
    );

    const paragraph = container.querySelector('p');

    expect(paragraph).toHaveTextContent(/^No favorite pokemon found$/i);
  });

  test('if all favorite Pokemon cards are displayed',
    () => {
      renderWithRouter(
        <FavoritePokemons pokemons={ [Pikachu] } />,
      );

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(/^Pikachu$/i);

      //= ==========
      /* renderWithRouter(<App />);
      const electricButton = screen.getByRole('button', { name: /^Electric$/i });
      userEvent.click(electricButton);

      const moreDetailsLink = screen.getByRole('link', { name: /^More details$/i });
      userEvent.click(moreDetailsLink);

      const favoriteCheckbox = screen.getByRole(
        'checkbox', { name: /^favorite$/i }
      );

      expect(favoriteCheckbox).not.toBeChecked();
      userEvent.click(favoriteCheckbox);
      expect(favoriteCheckbox).toBeChecked();
      // expect(favoriteCheckbox.checked).toEqual(true);

      const favoritesLink = screen.getByRole('link', { name: /^Favorite Pokémons$/i });
      userEvent.click(favoritesLink);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(/^Pikachu$/i); */
    });

  test('if no Pokémon card is displayed, if it is not favorited',
    () => {
      renderWithRouter(
        <FavoritePokemons pokemons={ [Pikachu] } />,
      );

      const { name } = Charmander;

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).not.toHaveTextContent(`${name}`);

      /* const { getByRole, queryByTestId } = renderWithRouter(<App />);
      const fireButton = getByRole('button', { name: /^Fire$/i });
      userEvent.click(fireButton);

      const moreDetailsLink = getByRole('link', { name: /^More details$/i });
      userEvent.click(moreDetailsLink);

      const favoriteCheckbox = getByRole('checkbox');

      expect(favoriteCheckbox).not.toBeChecked();

      const favoritesLink = getByRole('link', { name: /^Favorite Pokémons$/i });
      userEvent.click(favoritesLink);

      const pokemonName = queryByTestId('pokemon-name');
      expect(pokemonName).toBeNull(); */
    });
});
