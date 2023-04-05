import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Meal from '../Components/Meal';
import Drink from '../Components/Drink';

export default class RecipeDetails extends Component {
  render() {
    const { match: { params: { id }, path } } = this.props;
    return (
      <div>
        {path === '/drinks/:id' ? <Drink id={ id } /> : <Meal id={ id } />}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
