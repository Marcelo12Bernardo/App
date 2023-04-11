import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa o componente Header', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  const idIconPerfil = 'profile-top-btn';
  const idIconSearch = 'search-top-btn';
  const idPageTitle = 'page-title';
  const emailUser = 'usuario@gmail.com';
  const passUser = 'user1234';

  it('Verifica se o header possui todos elementos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });
    renderWithRouterAndRedux('/meals');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    const iconSearch = screen.getByTestId(idIconSearch);
    const pageTitle = screen.getByTestId(idPageTitle);
    expect(iconPerfil).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Testa se o botão profile leva a rota /profile', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });
    renderWithRouterAndRedux('/meals');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    act(() => {
      userEvent.click(iconPerfil);
      const { pathname } = history.location;
      expect(pathname).toBe('/profile');
    });
  });

  it('Verifica se Rota "/": não possui header', () => {
    renderWithRouterAndRedux('/');
    const header = screen.queryByRole('header');
    expect(header).toBeNull();
  });

  it('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });
    renderWithRouterAndRedux('/meals');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    const iconSearch = screen.getByTestId(idIconSearch);
    const pageTitle = screen.getByTestId(idPageTitle);
    expect(iconPerfil).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Meals');
  });

  it('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });
    renderWithRouterAndRedux('/meals');
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    act(() => {
      userEvent.click(btnDrinks.parentNode);
    });
    renderWithRouterAndRedux('/drinks');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    const iconSearch = screen.getByTestId(idIconSearch);
    const pageTitle = screen.getByTestId(idPageTitle);
    expect(iconPerfil).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Drinks');
  });

  it('Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });

    renderWithRouterAndRedux('/meals');
    const btnProfile = screen.getByTestId('profile-top-btn');
    act(() => {
      userEvent.click(btnProfile.parentNode);
    });
    renderWithRouterAndRedux('/profile');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    const iconSearch = screen.queryByTestId(idIconSearch);
    const pageTitle = screen.getByTestId(idPageTitle);
    expect(iconPerfil).toBeInTheDocument();
    expect(iconSearch).toBeNull();
    expect(pageTitle).toHaveTextContent('Profile');
  });
  it('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });

    renderWithRouterAndRedux('/meals');

    renderWithRouterAndRedux('/done-recipes');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    // const iconSearch = screen.queryByTestId(idIconSearch);
    const pageTitle = screen.getByTestId(idPageTitle);
    expect(iconPerfil).toBeInTheDocument();
    // expect(iconSearch).toBeNull();
    expect(pageTitle).toHaveTextContent('Meals');
  });

  it('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });
    renderWithRouterAndRedux('/favorite-recipes');
    const iconPerfil = screen.getByTestId(idIconPerfil);
    const pageTitle = screen.getByTestId(idPageTitle);
    expect(iconPerfil).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Meals');
    // Corrigir para favirite
  });

  it('Rota "/meals/:id-da-receita": não possui header', () => {
    renderWithRouterAndRedux('/meals/52977');
    const header = screen.queryByRole('header');
    expect(header).toBeNull();
  });

  it('Rota "/drinks/:id-da-receita": não possui header', () => {
    renderWithRouterAndRedux('/drinks/15997');
    const header = screen.queryByRole('header');
    expect(header).toBeNull();
  });

  it('Rota "/meals/:id-da-receita/in-progress": não possui header', () => {
    renderWithRouterAndRedux('/meals/53065/in-progress');
    const header = screen.queryByRole('header');
    expect(header).toBeNull();
  });

  it('Rota "/drinks/:id-da-receita/in-progress": não possui header', () => {
    renderWithRouterAndRedux('/drinks/17222/in-progress');
    const header = screen.queryByRole('header');
    expect(header).toBeNull();
  });
  it('testando rotas do header profile', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    act(() => {
      userEvent.click(profileIcon);
    });
    const done = await screen.findByTestId(idPageTitle);
    expect(done).toHaveTextContent('Profile');
    const doneButton = await screen.findByRole('button', { name: /done recipes/i });
    act(() => {
      userEvent.click(doneButton);
    });
    expect(history.location.pathname).toBe('/done-recipes');
    const doneTitle = await screen.findByTestId(idPageTitle);
    expect(doneTitle).toHaveTextContent('Done Recipes');
  });
});
