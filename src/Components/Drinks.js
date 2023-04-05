import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Drinks extends Component {
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
};

export default connect(mapStateToProps)(Drinks);
