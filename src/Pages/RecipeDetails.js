import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drink from '../Components/Drink';
import Meal from '../Components/Meal';

export default class RecipeDetails extends Component {
  render() {
    const { match: { params: { id }, path }, history } = this.props;
    return (
      <div>
        {path === '/drinks/:id'
          ? <Drink push={ history.push } id={ id } />
          : <Meal id={ id } push={ history.push } />}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
