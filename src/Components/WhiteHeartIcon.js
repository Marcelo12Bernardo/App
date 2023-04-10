import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { loadingFavoriteAction } from '../Redux/Actions';

class WhiteHeartIcon extends Component {
  addToFavorites = () => {
    const {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
      dispatch,
    } = this.props;
    dispatch(loadingFavoriteAction());
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeToAdd = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    if (favorites) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorites, recipeToAdd]),
      );
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToAdd]));
    }
    dispatch(loadingFavoriteAction());
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.addToFavorites }
        style={ { backgroundColor: 'white', border: 'none' } }
      >
        <img
          data-testid="favorite-btn"
          src={ whiteHeart }
          alt="Add to Favorites button"
        />
      </button>
    );
  }
}

WhiteHeartIcon.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.recipeDetailsReducer,
});

export default connect(mapStateToProps)(WhiteHeartIcon);
