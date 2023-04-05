import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class Drinks extends Component {
  componentDidMount() {
    this.fetchDrinks();
  }

  fetchDrinks = async () => {
    const { dispatch } = this.props;
    const firstFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await firstFetch.json();
    dispatch(saveFetchAction(json));
  };

  render() {
    const { drinks } = this.props;
    return (
      drinks ? (
        <>
          {drinks.map((drink, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h1
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}

              </h1>
            </div>
          ))}
        </>
      ) : null
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
