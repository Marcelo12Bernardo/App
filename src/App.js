import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import MealInProgress from './Components/MealInProgress';
import DrinkInProgress from './Components/DrinkInProgress';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route
          exact
          path="/meals/:id-da-receita"
          render={ (props) => (<RecipeDetails
            { ...props }
          />) }
        />
        <Route
          exact
          path="/drinks/:id-da-receita"
          render={ (props) => (<RecipeDetails
            { ...props }
          />) }
        />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ MealInProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ Favorites } />
      </Switch>

      {/* <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/favorite-recipes" component={ DrinkInProgress } />
        <Route
          exact
          path="/drinks/:id-da-receita"
          component={ RecipeDetails }
        />
        <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ MealInProgress }
        />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ Favorites } />
      </Switch> */}
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
