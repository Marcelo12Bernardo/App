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

  render() {
    const { loading, ingredients, drink } = this.state;
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
            />
          ))}
          <button
            type="button"
            data-testid="finish-recipe-btn"
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
  // push: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DrinkInProgress);
