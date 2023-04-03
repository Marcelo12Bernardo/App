import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testes da pagina de login', () => {
  it('verificação dos inputs e validação do botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
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
      userEvent.click(button);
      expect(history.location.pathname).toBe('/meals');
    });
  });
});
