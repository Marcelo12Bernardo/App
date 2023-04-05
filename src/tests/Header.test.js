import React from 'react';
import { screen } from '@testing-library/react';
import Recipes from '../Pages/Recipes';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa o componente Header', () => {
  it('Verifica se o header possui todos elementos', () => {
    renderWithRouterAndRedux(<Recipes />);
    const iconPerfil = screen.getByTestId('profile-top-btn');
    const iconSearch = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    expect(iconPerfil).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
