import { screen, act, waitFor } from '@testing-library/react';
import { meals } from '../../cypress/mocks/meals';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testando a página Recipes', () => {
  it('verificando presença dos componentes', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(meals) });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      // Testa chamada da API
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
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
