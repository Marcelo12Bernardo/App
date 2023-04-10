import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa o componente Footer', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  const emailUser = 'usuario@gmail.com';
  const passUser = 'user1234';
  const idFooter = 'footer';
  const idInconDrinks = 'drinks-bottom-btn';
  const idInconFoods = 'meals-bottom-btn';

  it('Verifica se o Footer possui os elementos e ícones necessários e se está fixado', () => {
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
    const footer = screen.getByTestId(idFooter);
    const iconDrinks = screen.getByTestId(idInconDrinks);
    const iconFoods = screen.getByTestId(idInconFoods);
    expect(footer).toBeInTheDocument();
    expect(iconDrinks).toBeInTheDocument();
    expect(iconFoods).toBeInTheDocument();
    expect(iconDrinks.src).toContain('drinkIcon.svg');
    expect(iconFoods.src).toContain('mealIcon.svg');

    const footerStyle = window.getComputedStyle(footer);
    expect(footerStyle.position).toEqual('fixed');
  });

  it('Verifica se o footer está presente nas rotas corretas', () => {
    renderWithRouterAndRedux('/');
    const footer = screen.queryByRole('footer');
    expect(footer).toBeNull();

    renderWithRouterAndRedux('/meals/:id-da-receita');
    const footer1 = screen.queryByRole('footer');
    expect(footer1).toBeNull();

    renderWithRouterAndRedux('/drinks/:id-da-receita');
    const footer2 = screen.queryByRole('footer');
    expect(footer2).toBeNull();

    renderWithRouterAndRedux('/meals/:id-da-receita/in-progress');
    const footer3 = screen.queryByRole('footer');
    expect(footer3).toBeNull();

    renderWithRouterAndRedux('/drinks/:id-da-receita/in-progress');
    const footer4 = screen.queryByRole('footer');
    expect(footer4).toBeNull();

    renderWithRouterAndRedux('/done-recipes');
    const footer5 = screen.queryByRole('footer');
    expect(footer5).toBeNull();

    renderWithRouterAndRedux('/favorite-recipes');
    const footer6 = screen.queryByRole('footer');
    expect(footer6).toBeNull();

    // Deve ter footer
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
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    renderWithRouterAndRedux('/drinks');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    renderWithRouterAndRedux('/profile');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('Testa se o botão drinks leva a rota /drinks', async () => {
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
    const iconDrinks = screen.getByTestId(idInconDrinks);
    act(() => {
      userEvent.click(iconDrinks);
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });
  });

  it('Testa se o botão foods leva a rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idEmail);
    const passInput = screen.getByTestId(idPassword);
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, emailUser);
      userEvent.type(passInput, passUser);
      userEvent.click(button);
    });
    renderWithRouterAndRedux('/drnks');
    const iconFoods = screen.getByTestId(idInconFoods);
    act(() => {
      userEvent.click(iconFoods);
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });
  });
});
