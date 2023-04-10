import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testes da pagina profile', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  const emailUser = 'usuario@gmail.com';
  const passUser = 'user1234';
  const idIconPerfil = 'profile-top-btn';

  it('Verifica se a pagina é carregada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, emailUser);
    userEvent.type(passInput, passUser);
    userEvent.click(button);
    renderWithRouterAndRedux('/meals');
    const iconProfile = screen.getByTestId(idIconPerfil);
    userEvent.click(iconProfile);
    renderWithRouterAndRedux('/profile');
    const lblEmail = screen.getByTestId('profile-email');
    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorites = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(lblEmail).toBeInTheDocument();
    expect(btnDone).toBeInTheDocument();
    expect(btnFavorites).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
    expect(lblEmail.innerHTML).toEqual('usuario@gmail.com');
  });
  it('Verifica o funcionamento do botão Done Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, emailUser);
    userEvent.type(passInput, passUser);
    userEvent.click(button);
    renderWithRouterAndRedux('/meals');
    const iconProfile = screen.getByTestId(idIconPerfil);
    userEvent.click(iconProfile);
    renderWithRouterAndRedux('/profile');
    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Verifica o funcionamento do botão Favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, emailUser);
    userEvent.type(passInput, passUser);
    userEvent.click(button);
    renderWithRouterAndRedux('/meals');
    const iconProfile = screen.getByTestId(idIconPerfil);
    userEvent.click(iconProfile);
    renderWithRouterAndRedux('/profile');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Verifica o funcionamento do botão Logout', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, emailUser);
    userEvent.type(passInput, passUser);
    userEvent.click(button);
    renderWithRouterAndRedux('/meals');
    const iconProfile = screen.getByTestId(idIconPerfil);
    userEvent.click(iconProfile);
    renderWithRouterAndRedux('/profile');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(localStorage.length).toBe(0);
  });
});
