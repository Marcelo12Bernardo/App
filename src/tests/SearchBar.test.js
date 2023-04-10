import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const testIDButtonSearch = 'exec-search-btn';
describe('testando componente searchBar', () => {
  it('verificando presença dos componentes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /name/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'Arrabiata');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    const shareIcon = await screen.findByRole('img', { name: /share button/i });
    expect(shareIcon).toBeVisible();
  });
  it('testando outro elemento do', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /ingredient/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'lemon');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    const shareIcon = await screen.findByRole('img', { name: /baked salmon with fennel & tomatoes/i });
    expect(shareIcon).toBeVisible();
  });
  it('testando ultimo elemento do searchbar', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /first letter/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = screen.getByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'a');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    const shareIcon = await screen.findByRole('img', { name: /apple frangipan tart/i });
    expect(shareIcon).toBeVisible();
  });
  it('testando rota profile', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    act(() => {
      userEvent.click(profileIcon);
    });
    expect(history.location.pathname).toBe('/profile');
  });
  it('testando alertas 1', async () => {
    const mockAlert = jest.fn();
    global.alert = mockAlert;
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /first letter/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'as');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    expect(mockAlert).toHaveBeenCalled();
  });
  it('verificando presença dos componentes na page drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /name/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'aquamarine');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    const shareIcon = await screen.findByRole('img', { name: /share button/i });
    expect(shareIcon).toBeVisible();
  });
  it('verificando na page drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /ingredient/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'vodka');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    const shareIcon = await screen.findByRole('img', { name: /155 belmont/i });
    expect(shareIcon).toBeVisible();
  });
  it('verificando na page drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /first letter/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'a');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
    const shareIcon = await screen.findByRole('img', { name: /a1/i });
    expect(shareIcon).toBeVisible();
  });
  it('alertas 2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /name/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'xablau');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
  });
  it('alertas 3', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const profileIcon = await screen.findByRole('img', { name: /profile icon/ });
    const searchIcon = await screen.findByRole('img', { name: /search icon/ });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(searchIcon);
    });
    const name = await screen.findByRole('radio', { name: /ingredient/i });
    expect(name).toBeVisible();
    const textBox = await screen.findByRole('textbox');
    const searchButton = await screen.findByTestId(testIDButtonSearch);
    expect(textBox).toHaveValue('');
    act(() => {
      userEvent.type(textBox, 'xablau');
      userEvent.click(name);
      expect(name).toBeChecked();
      userEvent.click(searchButton);
    });
  });
});
