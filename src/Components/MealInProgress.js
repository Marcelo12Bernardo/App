import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { favoriteRecipeDetails } from '../Redux/Actions';
import CheckboxWithLabel from './CheckBoxWithLabel';
import '../App.css';

class MealInProgress extends Component {
  state = {
    loading: true,
    ingredients: [],
    meal: [],
  };

  componentDidMount() {
    this.fetchMeal();
  }

  gettingIngredients = (array) => {
    const magicNumber = 15;
    const ingredientes = [];
    array.forEach((Meal) => {
      for (let i = 1; i <= magicNumber; i += 1) {
        const ingredient = Meal[`strIngredient${i}`];
        const measure = Meal[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredientes.push(`${ingredient} ${measure.trim()}`);
        }
      }
    });
    this.setState({ ingredients: ingredientes }, () => {
      this.setState({ loading: false });
    });
  };

  fetchMeal = async () => {
    const { id, dispatch } = this.props;
    const firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await firstFetch.json();
    this.setState({ meal: json.meals[0] }, () => {
      this.gettingIngredients(json.meals);
    });
    const fRD = {
      id: json.meals[0].idMeal,
      type: 'meal',
      nationality: json.meals[0].strArea,
      category: json.meals[0].strCategory,
      alcoholicOrNot: '',
      name: json.meals[0].strMeal,
      image: json.meals[0].strMealThumb,
    };
    dispatch(favoriteRecipeDetails(fRD));
  };

  render() {
    const { loading, ingredients, meal } = this.state;
    const { id } = this.props;
    return (
      loading ? null : (
        <div>
          <h1
            data-testid="recipe-title"
          >
            {meal.strMeal}
          </h1>
          <img
            data-testid="recipe-photo"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
          <h3
            data-testid="recipe-category"
          >
            {meal.strCategory}

          </h3>
          <p
            data-testid="instructions"
          >
            {meal.strInstructions}
          </p>
          {ingredients.map((ingredient, index) => (
            <CheckboxWithLabel
              key={ index }
              index={ index }
              ingredient={ ingredient }
              drinkOrMeal="meals"
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

MealInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  // push: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(MealInProgress);
