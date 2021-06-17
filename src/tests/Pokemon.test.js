import React from 'react';
import { /* render, */ screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pokemon, Pokedex } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

jest.spyOn(App, 'setIsPokemonFavoriteById').mockImplementation(
  () => {
    const favoritePokemonIds = [];/* readFavoritePokemonIds(); */
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  },
);

const [Pikachu, Charmander] = pokemons;

describe('Test the Pokemon component', () => {
  test(`if a card with the information of a 
  certain Pokémon is rendered`, () => {
    const pokemon = Pikachu;
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );

    // tests if the correct Pokémon name is displayed on the screen
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);

    // tests if the correct type of pokemon is shown on the screen
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);

    // tests whether the average weight of the pokemon should be displayed with text in the format Average weight: <value> <measurementUnit>; where <value> and <measurementUnit> are, respectively, the average weight of the pokemon and its unit of measure
    const { averageWeight: { value, measurementUnit } } = pokemon;
    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    // tests if the Pokémon image is displayed and if it contains a src attribute with the image's URL and an alt attribute with the text <name> sprite, where <name> is the name of the pokémon
    const pokemonImage = screen.getByRole('img', { name: `${pokemon.name} sprite` });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src');
    // expect(pokemonImage).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  test(`if the Pokémon card indicated in the Pokédex contains a navigation 
  link to display details of this Pokémon, being the URL /pokemons/<id>, 
  where <id> is the id of the displayed Pokémon`, () => {
    const pokemon = Charmander;
    renderWithRouter(
      <Pokedex
        pokemons={ [Charmander] }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    /*
      Material consultado sobre como obter url de links
      https://medium.com/@sgpropguide/react-testing-library-and-jest-testing-for-href-tag-6ecb7dfc018a
    */
    const navLink = screen.queryByRole('link', { name: /^More details$/i });
    expect(navLink).toBeInTheDocument();

    expect(navLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  test('if there is a star icon in favorite Pokemons', () => {
    const pokemon = Charmander;
    const isFavorite = true;
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ isFavorite }
      />,
    );

    const pokemonImage = screen.getByRole('img', { name: /is marked as favorite$/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).not.toBe('');
    const allImages = Array.from(screen.getAllByRole('img'));

    allImages.forEach((i) => {
      expect(i.src).not.toBe('');
    });
  });
});
