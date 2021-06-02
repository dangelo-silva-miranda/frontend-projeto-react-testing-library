import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Test the FavoritePokemons component', () => {
  test.only(`if the message No favorite pokemon found is displayed on 
  the screen, if the person does not have favorite pokemons`,
  () => {
    const { container } = render(
      <FavoritePokemons />,
    );

    const paragraph = container.querySelector('p');

    expect(paragraph).toHaveTextContent(/^No favorite pokemon found$/i);
  });
});
