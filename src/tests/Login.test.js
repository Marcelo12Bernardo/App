/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testes da pagina de login', () => {
  it('Verifica se a pagina é carregada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Testa se o botão inicia desabilitado', async () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
  it('Testa se o botão é habilitado ao preencher os campos', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button');
    act(() => {
      userEvent.type(emailInput, 'teste@');
      expect(button).toBeDisabled();
      userEvent.type(emailInput, 'teste.com');
      expect(button).toBeDisabled();
      userEvent.type(passInput, '123456');
      expect(button).toBeDisabled();
      userEvent.type(passInput, '7');
      expect(button).not.toBeDisabled();
    });
  });

  it('Testa se ao clicar no botão é redirecionado para a page meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button');
    userEvent.type(emailInput, 'usuario@gmail.com');
    userEvent.type(passInput, 'user1234');

    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
