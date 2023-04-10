import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa o componente Search Bar', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  const idIconSearch = 'search-top-btn';
  const emailUser = 'usuario@gmail.com';
  const passUser = 'user1234';

  it('Verifica se possui todos elementos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, emailUser);
    userEvent.type(passInput, passUser);
    userEvent.click(button);

    renderWithRouterAndRedux('/meals');
    const iconSearch = screen.getByTestId(idIconSearch);
    userEvent.click(iconSearch);

    expect(screen.queryByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.queryByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.queryByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.queryByTestId('exec-search-btn')).toBeInTheDocument();
    // A terminar
  });
});
