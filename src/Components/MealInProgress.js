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
    buttonDesactivated: true,
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
    console.log(json.meals);
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

  isButtonEnabled = () => {
    const { id } = this.props;
    const { ingredients } = this.state;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage.meals[id] !== undefined) {
      if (storage.meals[id].length === ingredients.length) {
        this.setState({ buttonDesactivated: false });
      } else {
        this.setState({ buttonDesactivated: true });
      }
    }
  };

  finishRecipeButton = () => {
    const { meal } = this.state;
    const { push } = this.props;
    const finishDate = new Date();
    const recipeFinished = {
      id: meal.idMeal,
      nationality: meal.strArea,
      name: meal.strMeal,
      category: meal.strCategory,
      image: meal.strMealThumb,
      type: 'meal',
      alcoholicOrNot: '',
      doneDate: finishDate.toISOString(),
      tags: meal.strTags.split(','),
    };
    const doneRecipes = localStorage.getItem('doneRecipes');
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
    const { loading, ingredients, meal, buttonDesactivated } = this.state;
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

MealInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(MealInProgress);
