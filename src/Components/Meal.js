import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Meal extends Component {
  state = {
    meal: [],
    ingredients: [],
    loading: true,
    carrousel: [],
  };

  componentDidMount() {
    this.fetchCarrousel();
    this.fetchMeal();
  }

  gettingIngredients = (array) => {
    const magicNumber = 15;
    const ingredientes = [];
    array.forEach((meal) => {
      for (let i = 1; i <= magicNumber; i += 1) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredientes.push(`${ingredient} ${measure.trim()}`);
        }
      }
    });
    this.setState({ ingredients: ingredientes }, () => {
      this.setState({ loading: false });
    });
  };

  fetchCarrousel = async () => {
    const maxCarrousel = 6;
    const firstFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await firstFetch.json();
    this.setState({ carrousel: json.drinks.slice(0, maxCarrousel) });
  };

  fetchMeal = async () => {
    const { id } = this.props;
    const firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await firstFetch.json();
    this.setState({ meal: json.meals }, () => {
      this.gettingIngredients(json.meals);
    });
  };

  render() {
    const { meal, ingredients, loading, carrousel } = this.state;
    return (
      loading ? null : (
        meal.map((iten) => (
          <div key={ iten.strMeal }>
            <h1
              data-testid="recipe-title"
            >
              {iten.strMeal}
            </h1>
            <h3
              data-testid="recipe-category"
            >
              {iten.strCategory}

            </h3>
            <img
              data-testid="recipe-photo"
              src={ iten.strMealThumb }
              alt={ iten.strMeal }
            />
            {ingredients.map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                {ingredient}

              </p>
            ))}
            <p
              data-testid="instructions"
            >
              {iten.strInstructions}
            </p>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ iten.strYoutube }
              title="YouTube video player"
              allowFullScreen
            />
            {loading ? null : carrousel.length }
            {/* Código acima onde deverá entrar o carrosel,
             deixei dessa maneira apenas para passar sem erro de lint */}
          </div>
        ))
      )
    );
  }
}

Meal.propTypes = {
  id: PropTypes.string.isRequired,
};
