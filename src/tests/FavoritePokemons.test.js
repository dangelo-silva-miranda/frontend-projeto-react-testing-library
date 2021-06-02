import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

/*
  Material consultado sobre verificar se checkbox está checked
  https://stackoverflow.com/a/55178588
  https://www.cluemediator.com/check-a-checkbox-using-react-testing-library
*/
describe('Test the FavoritePokemons component', () => {
  test(`if the message No favorite pokemon found is displayed on 
  the screen, if the person does not have favorite pokemons`,
  () => {
    const { container } = render(
      <FavoritePokemons />,
    );

    const paragraph = container.querySelector('p');

    expect(paragraph).toHaveTextContent(/^No favorite pokemon found$/i);
  });

  test.only('if all favorite Pokemon cards are displayed',
    () => {
      renderWithRouter(<App />);
      const electricButton = screen.getByRole('button', { name: /^Electric$/i });
      userEvent.click(electricButton);

      const moreDetailsLink = screen.getByRole('link', { name: /^More details$/i });
      userEvent.click(moreDetailsLink);

      const favoriteCheckbox = screen.getByRole('checkbox'/* , { name: /^favorite$/i } */);

      expect(favoriteCheckbox).not.toBeChecked();
      userEvent.click(favoriteCheckbox);
      expect(favoriteCheckbox).toBeChecked(); // expect(favoriteCheckbox.checked).toEqual(true);

      const favoritesLink = screen.getByRole('link', { name: /^Favorite Pokémons$/i });
      userEvent.click(favoritesLink);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(/^Pikachu$/i);
    });
});
