import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { favoriteRecipeDetails } from '../Redux/Actions/index';
import '../App.css';

class Meal extends Component {
  state = {
    meal: [],
    ingredients: [],
    loading: true,
    carrousel: [],
    startButton: true,
    recipeStarted: false,
  };

  componentDidMount() {
    const { id } = this.props;
    const storageMeal = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressMeal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageMeal?.some((recipe) => recipe.id === id)) {
      this.setState({ startButton: false });
    }
    if (inProgressMeal?.meals && inProgressMeal?.meals[id]) {
      this.setState({ recipeStarted: true });
    }
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
    const { id, dispatch } = this.props;
    const firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await firstFetch.json();
    this.setState({ meal: json.meals }, () => {
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
    const { meal,
      ingredients,
      loading,
      carrousel,
      startButton,
      recipeStarted,
    } = this.state;
    const { id, push } = this.props;
    return (
      <div>
        {loading ? null : (
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
                  key={ index }
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
            </div>)))}
        <div className="carDiv">
          <motion.div className="carrousel" whileDrag={ { cursor: 'grabbing' } }>
            <motion.div
              className="inner"
              drag="x"
              dragConstraints={ { right: 0, left: -764 } }
            >
              {carrousel.map((drink, index) => (
                <motion.div
                  className="iten"
                  data-testid={ `${index}-recommendation-card` }
                  key={ drink.idDrink + index }
                >
                  <p data-testid={ `${index}-recommendation-title` }>
                    {drink.strDrink}
                  </p>
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.idDrink }
                  />

                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        {startButton ? (
          <button
            className="fixed"
            data-testid="start-recipe-btn"
            onClick={ () => push(`/meals/${id}/in-progress`) }
          >
            {recipeStarted ? 'Continue Recipe' : 'Start Recipe'}

          </button>
        ) : null}
      </div>
    );
  }
}

Meal.propTypes = {
  id: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Meal);
