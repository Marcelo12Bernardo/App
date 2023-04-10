import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import '../App.css';

const maxCarrousel = 6;

export default class Drink extends Component {
  state = {
    drink: [],
    ingredients: [],
    loading: true,
    carrousel: [],
    startButton: true,
  };

  componentDidMount() {
    const { id } = this.props;
    const storageMeal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storageMeal.some((recipe) => recipe.id === id)) {
      this.setState({ startButton: false });
    }
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
    this.setState({ carrousel: json.meals.slice(0, maxCarrousel) });
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
    const { drink, loading, ingredients, carrousel, startButton } = this.state;
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
            <div className="carDiv">
              <motion.div className="carrousel" whileDrag={ { cursor: 'grabbing' } }>
                <motion.div
                  className="inner"
                  drag="x"
                  dragConstraints={ { right: 0, left: -764 } }
                >
                  {carrousel.map((meal, index) => (
                    <motion.div
                      className="iten"
                      data-testid={ `${index}-recommendation-card` }
                      key={ meal.idDrink + index + meal.strMeal }
                    >
                      <p data-testid={ `${index}-recommendation-title` }>
                        {meal.strMeal}
                      </p>
                      <img
                        // data-testid={ `${index}-recommendation-title` }
                        src={ meal.strMealThumb }
                        alt={ meal.idMeal }
                      />

                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            <br />
            {startButton ? (
              <button
                className="fixed"
                data-testid="start-recipe-btn"
              >
                Start Recipe

              </button>
            ) : null}
          </div>
        ))
      )
    );
  }
}

Drink.propTypes = {
  id: PropTypes.string.isRequired,
};
