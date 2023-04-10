import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class Drinks extends Component {
  state = {
    categoriesData: [],
    recipesByCategory: [],
    isFilter: false,
  };

  componentDidMount() {
    this.fetchDrinks();
    this.fetchCategories();
    this.handleRenderRecipes();
  }

  componentDidUpdate(prevProps) {
    const { drinks } = this.props;
    if (prevProps.drinks !== drinks) {
      this.setState({ recipesByCategory: drinks });
    }
  }

  handleRenderRecipes() {
    const { drinks } = this.props;
    this.setState({ recipesByCategory: drinks });
  }

  fetchDrinks = async () => {
    const { dispatch } = this.props;
    const firstFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await firstFetch.json();
    dispatch(saveFetchAction(json));
  };

  fetchCategories = async () => {
    const categoriesQuantity = 5;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.drinks?.filter(
      (category, index) => index < categoriesQuantity && category,
    );
    const categoryNames = categories.map((item) => item.strCategory);
    this.setState(
      { categoriesData: categoryNames },
    );
  };

  handleSearchByCategory = async (categoryName) => {
    const categoriesQuantity = 12;
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const recipesData = await response.json();
    const filteredRecipes = recipesData.drinks?.filter(
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
            display: 'flex',
            justifyContent: 'center',
            gap: '2px',
            flexDirection: 'column',
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
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    style={ { width: '100px', height: '100px', marginRight: '10px' } }
                  />
                  <div
                    data-testid={ `${index}-card-name` }
                    style={ { fontSize: '10px' } }
                  >
                    {recipe.strDrink}

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
  drinks: state.saveFetchReducer.result,
});

Drinks.propTypes = {
  drinks: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Drinks);
