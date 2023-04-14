import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import iconDrinks from '../images/icone-bebida.png';
import '../Styles/Cards.css';

class Drinks extends Component {
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
    const { drinks } = this.props;
    if (prevProps.drinks !== drinks) {
      this.setState({ recipesByCategory: drinks });
    }
  }

  handleRenderRecipes() {
    const { drinks } = this.props;
    this.setState({ recipesByCategory: drinks });
  }

  fetchCategories = async () => {
    const categoriesQuantity = 5;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.drinks?.filter(
      (category, index) => index < categoriesQuantity && category,
    );
    const categoryNames = categories?.map((item) => item.strCategory);
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
        <img
          src={ iconDrinks }
          alt="Icone de prato"
          className="imgIconPage"
        />
        <div className="categorias">
          {
            categoriesData && categoriesData.map((categoryName, categoryIndex) => (
              <button
                className="brnCategoria"
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
          {
            recipesByCategory
              && recipesByCategory.map((recipe, index) => (
                <Link key={ index } to={ `/drinks/${recipe.idDrink}` }>
                  <div
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strDrink }
                      className="imgFoods"
                    />
                    <div
                      data-testid={ `${index}-card-name` }
                      className="titleFood"
                    >
                      {recipe.strDrink}
                    </div>
                  </div>
                </Link>
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
};

export default connect(mapStateToProps)(Drinks);
