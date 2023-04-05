import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class Meals extends Component {
  // state = {
  //   data: [],
  // };

  componentDidMount() {
    this.fetchMeals();
    this.fetchCategories();
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
    const categoriesData = await response.json();
    const categories = categoriesData.meals?.filter(
      (category, index) => index < categoriesQuantity && category.strCategory,
    );
    console.log(categories);
    // this.setState(
    //   { data: categories },
    // );
  };

  render() {
    const { meals } = this.props;
    // const { data } = this.state;
    return (
      meals ? (
        <>
          {/* {
            data.map((categoryName, categoryIndex) => (
              <button
                key={ `${categoryName}${categoryIndex}` }
                data-testid={ `${categoryName}-category-filter` }
              >
                { categoryName }
              </button>
            ))
          } */}
          {meals.map((meal, index) => (
            <div
              style={ { marginTop: '20px', padding: '10px' } }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                style={ { width: '100px', height: '100px' } }
              />
              <h1
                data-testid={ `${index}-card-name` }
                style={ { fontSize: '20px' } }
              >
                {meal.strMeal}

              </h1>
            </div>
          ))}
        </>
      ) : null
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
