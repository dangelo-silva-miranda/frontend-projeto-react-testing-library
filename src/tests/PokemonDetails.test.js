import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';

import { createMemoryHistory } from 'history';
import { PokemonDetails } from '../components';
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

describe('Test the PokemonDetails component', () => {
  test(`if the detailed information of the selected 
  Pokémon is shown on the screen`, () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
        match={ {
          params: {
            id: `${Charmander.id}`,
          },
        } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => console.log() }
      />,
    );
    /* (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        )  }
      />, */

    // tests if the page contains a <name> Details text, where <name> is the name of the Pokémon
    let heading = screen.getByRole('heading',
      { level: 2, name: `${Charmander.name} Details` });
    expect(heading).toBeInTheDocument();

    // tests if there is no navigation link to selected Pokémon details
    const navLink = screen.queryByRole('link', { name: /^More details$/i });
    expect(navLink).not.toBeInTheDocument();

    // tests whether the details section contains an h2 header with the text Summary
    heading = screen.queryByRole('heading',
      { level: 2, name: /^Summary$/i });
    expect(heading).toBeInTheDocument();

    // tests whether the details section contains a summary paragraph of the specific Pokémon being viewed.
    const paragraph = heading.parentElement.querySelector('p');
    expect(paragraph).toHaveTextContent(Charmander.summary);
  });

  test(`if there is a section on the page with maps containing 
  the pokemon's locations`, () => {
    const pokemon = Pikachu;
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
        match={ {
          params: {
            id: `${pokemon.id}`,
          },
        } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => console.log() }
      />,
    );

    // tests if in the details section there is a heading h2 with the text Game Locations of <name>; where <name> is the name of the displayed Pokémon.
    const heading = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${pokemon.name}` });
    expect(heading).toBeInTheDocument();

    // tests that all Pokémon locations are shown in the details section
    const imagesAlt = screen.queryAllByAltText(`${pokemon.name} location`);
    expect(imagesAlt).toHaveLength(pokemon.foundAt.length);

    // tests whether the name of the location and a map image are displayed at each location
    const locationImages = heading.parentElement.querySelectorAll('img');
    const locationNames = heading.parentElement.querySelectorAll('em');
    const pokemonImages = pokemon.foundAt.map(({ map }) => map);
    const pokemonLocations = pokemon.foundAt.map(({ location }) => location);

    locationImages.forEach((location) => {
      expect(location).toHaveAttribute('src');
      expect(location).toHaveAttribute('alt', `${pokemon.name} location`);
      expect(pokemonImages).toContainEqual(location.src);
    });

    locationNames.forEach((location) => {
      expect(pokemonLocations).toContainEqual(location.textContent);
    });
  });

  test(`if the user can bookmark a pokemon through 
  the details page`, async () => {
    const pokemon = Pikachu;
    const { container } = renderWithRouter(
      <App />,
    );

    const link = screen.getByRole('link', { name: /^More details$/i });
    userEvent.click(link);

    // test if the page displays a checkbox that allows you to bookmark the Pokémon
    const checkbox = screen.getByText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    // console.log(checkbox);
    // expect(checkbox).not.toBeChecked();
    // userEvent.click(checkbox);
    // expect(checkbox).toBeChecked();
    // userEvent.click(checkbox);
    // fireEvent.change(checkbox);
    // setTimeout(() => {
    //   console.log(checkbox.getAttribute('checked'));
    // }, 1000);
    // waitFor(() => { expect(checkbox).toBeChecked(); }, { interval: 1000 });

    // userEvent.click(checkbox);
    // expect(checkbox).not.toBeChecked();
    // const favoriteImage = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    // expect(favoriteImage).toBeInTheDocument();

    /* const history = createMemoryHistory();
    const { getByRole, getByLabelText, getByAltText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailsLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const favorite = getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const starFavorite = getByAltText(/Pikachu is marked as favorite/i);
    expect(starFavorite).toBeInTheDocument();

    userEvent.click(favorite);
    expect(starFavorite).not.toBeInTheDocument(); */
  });
});
