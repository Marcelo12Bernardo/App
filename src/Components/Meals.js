import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import iconMeals from '../images/icone-prato.png';
import '../Styles/Cards.css';

class Meals extends Component {
  state = {
    categoriesData: [],
    recipesByCategory: [],
    isFilter: false,
  };

  componentDidMount() {
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

  fetchCategories = async () => {
    const categoriesQuantity = 5;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.meals?.filter(
      (category, index) => index < categoriesQuantity && category,
    );
    const categoryNames = categories?.map((item) => item.strCategory);
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
      <div>
        <img
          src={ iconMeals }
          alt="Icone de prato"
          className="imgIconPage"
        />
        <div className="categorias">
          {categoriesData
            && categoriesData.map((categoryName, categoryIndex) => (
              <button
                className="brnCategoria"
                key={ `${categoryName}${categoryIndex}` }
                data-testid={ `${categoryName}-category-filter` }
                onClick={ () => {
                  this.setState((prevState) => ({
                    isFilter: !prevState.isFilter,
                  }));
                  if (isFilter) this.handleRenderRecipes();
                  else this.handleSearchByCategory(categoryName);
                } }
              >

                { categoryName }

              </button>
            ))}
          <button
            className="brnCategoria"
            data-testid="All-category-filter"
            onClick={ () => this.handleRenderRecipes() }
          >
            All
          </button>
        </div>
        <div
          id="recipes"
        >
          {recipesByCategory
            && recipesByCategory.map((recipe, index) => (
              <Link key={ index } to={ `/meals/${recipe.idMeal}` }>
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    className="imgFoods"
                  />
                  <div
                    data-testid={ `${index}-card-name` }
                    className="titleFood"
                  >
                    {recipe.strMeal}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.saveFetchReducer.result,
});

Meals.propTypes = {
  meals: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Meals);
