import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class Drinks extends Component {
  componentDidMount() {
    this.fetchDrinks();
    this.fetchCategories();
  }

  fetchDrinks = async () => {
    const { dispatch } = this.props;
    const firstFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await firstFetch.json();
    dispatch(saveFetchAction(json));
  };

  fetchCategories = async () => {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
    const categories = await response.json();
    console.log(categories);
  };

  render() {
    const { drinks } = this.props;
    return (
      drinks ? (
        <>
          {drinks.map((drink, index) => (
            <div
              style={ { marginTop: '20px', padding: '10px' } }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                style={ { width: '100px', height: '100px' } }
              />
              <h1
                data-testid={ `${index}-card-name` }
                style={ { fontSize: '20px' } }
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
