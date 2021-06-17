import React from 'react';
import { /* render, */ screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pokedex } from '../components';
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

const POKEMON_NAME = 'pokemon-name';

const testIfAllPokemonsListed = (pokemonsList,
  POKEMON_NAME_DATATESTID, nextPokemonButton) => {
  pokemonsList.forEach(({ name }) => {
    const pokemonName = screen.getByTestId(POKEMON_NAME_DATATESTID);
    expect(pokemonName).toHaveTextContent(`${name}`);
    userEvent.click(nextPokemonButton);
  });
};

const pokemonTypesList = (pokemonsList) => [...new Set(
  pokemonsList.reduce((types, { type }) => [...types, type], []),
)];

/* const buttonPokemonTypesList = (buttonPokemonsList) => [...new Set(
  buttonPokemonsList.reduce((types, { textContent }) => [...types, textContent], []),
)]; */

describe('Test the Pokedex component', () => {
  test(`if the page contains a heading h2 with 
  the text "Encountered pokemons"`, () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    const heading = screen.getByRole('heading',
      { level: 2, name: /^Encountered pokémons$/i });
    expect(heading).toBeInTheDocument();
  });

  test(`whether the next Pokémon in the list is 
  displayed when the "Next Pokémon" button is clicked`, () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    // if the button contains the text "Next pokemon"
    const nextPokemonButton = screen.getByRole('button',
      { name: /^Próximo pokémon$/i });

    expect(nextPokemonButton).toBeInTheDocument();

    // if the next Pokémon in the list are shown, one by one, by successively clicking the button
    testIfAllPokemonsListed(pokemons, POKEMON_NAME, nextPokemonButton);

    // if the first Pokémon on the list is shown by clicking the "Next Pokémon" button when it is on the last Pokémon on the list
    const pokemonName = screen.getByTestId(POKEMON_NAME);
    expect(pokemonName).toHaveTextContent(`${pokemons[0].name}`);
  });

  test('if only one Pokemon is shown at a time', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    const nextPokemonButton = screen.getByRole('button',
      { name: /^Próximo pokémon$/i });

    pokemons.forEach(() => {
      const pokemonNameList = screen.getAllByTestId(POKEMON_NAME);
      expect(pokemonNameList).toHaveLength(1);
      userEvent.click(nextPokemonButton);
    });
  });

  test('if Pokédex has filter and reset buttons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    const nextPokemonButton = screen.getByRole('button',
      { name: /^Próximo pokémon$/i });

    // when loading the page, the selected filter is All
    testIfAllPokemonsListed(pokemons, POKEMON_NAME, nextPokemonButton);

    const pokemonTypeFilterButton = screen.getByRole('button',
      { name: /^Fire$/i });

    userEvent.click(pokemonTypeFilterButton);

    pokemons.filter(({ type }) => type === pokemonTypeFilterButton.textContent)
      .forEach(() => {
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toHaveTextContent(pokemonTypeFilterButton.textContent);
        userEvent.click(nextPokemonButton);
      });

    const pokemonTypeResetButton = screen.getByRole('button',
      { name: /^All$/i });

    userEvent.click(pokemonTypeResetButton);

    testIfAllPokemonsListed(pokemons, POKEMON_NAME, nextPokemonButton);
  });

  test('whether a filter button is dynamically created for each type of Pokémon', () => {
    const [Pikachu, Charmander] = pokemons;
    const pokemonsRestrictList = [Pikachu, Charmander];

    renderWithRouter(
      <Pokedex
        pokemons={ pokemonsRestrictList }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    const pokemonTypes = pokemonTypesList(pokemonsRestrictList);
    const buttonPokemonTypes = screen.getAllByTestId('pokemon-type-button');

    expect(buttonPokemonTypes).toHaveLength(pokemonTypes.length);
  });
  test('rrrr', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );

    const pokemonTypes = pokemonTypesList(pokemons);

    const buttonPokemonTypes = screen.getAllByTestId('pokemon-type-button');

    /* buttonPokemonTypes = buttonPokemonTypesList(
      screen.getAllByTestId('pokemon-type-button'),
    ); */

    /*     const botao = screen.getAllByTestId('pokemon-type-button');
    console.log(
      botao.map(({ textContent }) => textContent),
    ); */
    expect(buttonPokemonTypes).toHaveLength(pokemonTypes.length);
    // expect(buttonPokemonTypes).toEqual(expect.arrayContaining(pokemonTypes));
  });
});
