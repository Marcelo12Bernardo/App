import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Drink extends Component {
  state = {
    drink: [],
    ingredients: [],
    loading: true,
    carrousel: [],
  };

  componentDidMount() {
    this.fetchCarrousel();
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

  fetchCarrousel = async () => {
    const firstFetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await firstFetch.json();
    this.setState({ carrousel: json.meals });
  };

  fetchDrink = async () => {
    const { id } = this.props;
    const firstFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await firstFetch.json();
    this.setState({ drink: json.drinks }, () => {
      this.gettingIngredients(json.drinks);
    });
  };

  render() {
    const { drink, loading, ingredients, carrousel } = this.state;
    return (
      loading ? null : (
        drink.map((iten) => (
          <div key={ iten.strDrink }>
            <h1
              data-testid="recipe-title"
            >
              {iten.strDrink}
            </h1>
            <h3
              data-testid="recipe-category"
            >
              { `${iten.strCategory} ${iten.strAlcoholic}`}

            </h3>
            <img
              data-testid="recipe-photo"
              src={ iten.strDrinkThumb }
              alt={ iten.strDrink }
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
            {loading ? null : carrousel.length }
            {/* Código acima onde deverá entrar o carrosel,
             deixei dessa maneira apenas para passar sem erro de lint */}
          </div>
        ))
      )
    );
  }
}

Drink.propTypes = {
  id: PropTypes.string.isRequired,
};
