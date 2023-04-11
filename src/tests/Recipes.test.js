import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testando a página Recipes', () => {
  it('verificando presença dos componentes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(await screen.findByRole('img', { name: /profile icon/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /search icon/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /search icon/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /meal icon/ })).toBeInTheDocument();

    act(() => {
      history.push('/drinks');
    });
    expect(await screen.findByRole('img', { name: /profile icon/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /search icon/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /search icon/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /meal icon/ })).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
});
