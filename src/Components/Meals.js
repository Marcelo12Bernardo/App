import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class Meals extends Component {
  componentDidMount() {
    this.fetchMeals();
  }

  fetchMeals = async () => {
    const { dispatch } = this.props;
    const firstfetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await firstfetch.json();
    dispatch(saveFetchAction(json));
  };

  render() {
    const { meals } = this.props;
    return (
      meals ? (
        <>
          {meals.map((meal, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <h1
                data-testid={ `${index}-card-name` }
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
