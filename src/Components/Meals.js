import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class Meals extends Component {
  state = {
    categoriesData: [],
    recipesByCategory: [],
    isFilter: false,
  };

  componentDidMount() {
    this.fetchMeals();
    this.fetchCategories();
    this.handleRenderRecipes();
  }

  componentDidUpdate(prevProps) {
    const { meals } = this.props;
    if (prevProps.meals !== meals) {
      this.setState({ recipesByCategory: meals });
    }
  }

  handleRenderRecipes() {
    const { meals } = this.props;
    this.setState({ recipesByCategory: meals });
  }

  fetchMeals = async () => {
    const { dispatch } = this.props;
    const firstfetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await firstfetch.json();
    dispatch(saveFetchAction(json));
  };

  fetchCategories = async () => {
    const categoriesQuantity = 5;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.meals?.filter(
      (category, index) => index < categoriesQuantity && category,
    );
    const categoryNames = categories.map((item) => item.strCategory);
    this.setState(
      { categoriesData: categoryNames },
    );
  };

  handleSearchByCategory = async (categoryName) => {
    const categoriesQuantity = 12;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const recipesData = await response.json();
    const filteredRecipes = recipesData.meals?.filter(
      (recipe, index) => index < categoriesQuantity && recipe,
    );
    this.setState(
      { recipesByCategory: filteredRecipes },
    );
  };

  render() {
    const { categoriesData, recipesByCategory, isFilter } = this.state;

    return (
      <>
        <div
          style={ {
            display: 'flex', justifyContent: 'center', gap: '2px',
          } }
        >
          {
            categoriesData && categoriesData.map((categoryName, categoryIndex) => (
              <button
                key={ `${categoryName}${categoryIndex}` }
                data-testid={ `${categoryName}-category-filter` }
                onClick={ () => {
                  this.setState((prevState) => ({ isFilter: !prevState.isFilter }));
                  if (isFilter) this.handleRenderRecipes();
                  else this.handleSearchByCategory(categoryName);
                } }
              >
                { categoryName }
              </button>
            ))
          }
          <button
            data-testid="All-category-filter"
            onClick={ () => this.handleRenderRecipes() }
          >
            All
          </button>
        </div>
        <div
          style={ {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '20px',
            flexDirection: 'column',
          } }
        >
          {
            recipesByCategory
              && recipesByCategory.map((recipe, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    style={ { width: '100px', height: '100px', marginRight: '10px' } }
                  />
                  <div
                    data-testid={ `${index}-card-name` }
                    style={ { fontSize: '10px' } }
                  >
                    {recipe.strMeal}

                  </div>
                </div>
              ))
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.saveFetchReducer.result,
});

Meals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meals: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Meals);
