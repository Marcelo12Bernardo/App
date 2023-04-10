import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import blackHeart from '../images/blackHeartIcon.svg';
import { loadingFavoriteAction } from '../Redux/Actions';

class BlackHeartIcon extends Component {
  removeFromFavorites = () => {
    const { id, dispatch } = this.props;
    dispatch(loadingFavoriteAction());
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    dispatch(loadingFavoriteAction());
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.removeFromFavorites }
        style={ { backgroundColor: 'white', border: 'none' } }
      >
        <img
          data-testid="favorite-btn"
          src={ blackHeart }
          alt="Remove to Favorites button"
        />
      </button>
    );
  }
}

BlackHeartIcon.propTypes = {
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.recipeDetailsReducer,
});

export default connect(mapStateToProps)(BlackHeartIcon);
