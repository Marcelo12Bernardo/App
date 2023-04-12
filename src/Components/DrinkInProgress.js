import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { favoriteRecipeDetails } from '../Redux/Actions';
import CheckboxWithLabel from './CheckBoxWithLabel';
import '../App.css';

class DrinkInProgress extends Component {
  state = {
    loading: true,
    ingredients: [],
    drink: [],
    buttonDesactivated: true,
  };

  componentDidMount() {
    this.fetchDrink();
  }

  gettingIngredients = (array) => {
    const magicNumber = 15;
    const ingredientes = [];
    array.forEach((drink) => {
      for (let i = 1; i <= magicNumber; i += 1) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredientes.push(`${ingredient} ${measure.trim()}`);
        }
      }
    });
    this.setState({ ingredients: ingredientes }, () => {
      this.setState({ loading: false });
    });
  };

  fetchDrink = async () => {
    const { id, dispatch } = this.props;
    const firstFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await firstFetch.json();
    this.setState({ drink: json.drinks[0] }, () => {
      this.gettingIngredients(json.drinks);
    });
    console.log(json.drinks[0]);
    const fRD = {
      id: json.drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: json.drinks[0].strCategory,
      alcoholicOrNot: json.drinks[0].strAlcoholic,
      name: json.drinks[0].strDrink,
      image: json.drinks[0].strDrinkThumb,
    };
    dispatch(favoriteRecipeDetails(fRD));
  };

  isButtonEnabled = () => {
    const { id } = this.props;
    const { ingredients } = this.state;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage.drinks[id] !== undefined) {
      if (storage.drinks[id].length === ingredients.length) {
        this.setState({ buttonDesactivated: false });
      } else {
        this.setState({ buttonDesactivated: true });
      }
    }
  };

  finishRecipeButton = () => {
    const { drink } = this.state;
    const { push } = this.props;
    const finishDate = new Date();
    const recipeFinished = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: finishDate.toISOString(),
      tags: [],
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, recipeFinished]),
      );
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeFinished]));
    }
    push('/done-recipes');
  };

  render() {
    const { loading, ingredients, drink, buttonDesactivated } = this.state;
    const { id } = this.props;
    return (
      loading ? null : (
        <div>
          <h1
            data-testid="recipe-title"
          >
            {drink.strDrink}
          </h1>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <h3
            data-testid="recipe-category"
          >
            {drink.strCategory}

          </h3>
          <p
            data-testid="instructions"
          >
            {drink.strInstructions}
          </p>
          {ingredients.map((ingredient, index) => (
            <CheckboxWithLabel
              key={ index }
              index={ index }
              ingredient={ ingredient }
              drinkOrMeal="drinks"
              id={ id }
              activateButton={ this.isButtonEnabled }
            />
          ))}
          <button
            disabled={ buttonDesactivated }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ this.finishRecipeButton }
          >
            Finish Recipe
          </button>
        </div>
      )
    );
  }
}

DrinkInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DrinkInProgress);
