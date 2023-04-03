import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import Drink from './Components/Drink';
import Meal from './Components/Meal';
import MealInProgress from './Components/MealInProgress';
import DrinkInProgress from './Components/DrinkInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
        <Route exact path="/meals/:id-da-receita" component={ Meal } />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ Drink }
        />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ MealInProgress }
        />
        <Route exact path="/favorite-recipes" component={ DrinkInProgress } />
      </Switch>
    </div>
  );
}

export default App;

// Tela de login: /;
// Tela principal de receitas de comidas: /meals;
// Tela principal de receitas de bebidas: /drinks;
// Tela de detalhes de uma receita de comida: /meals/:id-da-receita;
// Tela de detalhes de uma receita de bebida: /drinks/:id-da-receita;
// Tela de receita em progresso de comida: /meals/:id-da-receita/in-progress;
// Tela de receita em progresso de bebida: /drinks/:id-da-receita/in-progress;
// Tela de perfil: /profile;
// Tela de receitas feitas: /done-recipes;
// Tela de receitas favoritas: /favorite-recipes.
