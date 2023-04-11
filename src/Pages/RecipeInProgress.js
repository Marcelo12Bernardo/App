import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShareIcon from '../Components/ShareIcon';
import WhiteHeartIcon from '../Components/WhiteHeartIcon';
import BlackHeartIcon from '../Components/BlackHeartIcon';
import DrinkInProgress from '../Components/DrinkInProgress';
import MealInProgress from '../Components/MealInProgress';

class RecipeInProgress extends Component {
  state = {
    copied: false,
  };

  setCopiedTrue = () => {
    this.setState({ copied: true });
  };

  isFavorite = () => {
    const { match: { params: { id } } } = this.props;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favorites?.some((favorite) => favorite.id === id);
  };

  render() {
    const { copied } = this.state;
    const { match: { params: { id }, url, path }, history, loading } = this.props;
    return (
      loading ? null : (
        <div>
          {copied && <p>Link copied!</p>}
          <ShareIcon
            setTrue={ this.setCopiedTrue }
            path={ url }
          />
          {this.isFavorite() ? <BlackHeartIcon /> : <WhiteHeartIcon />}
          {path.includes('drinks')
            ? <DrinkInProgress push={ history.push } id={ id } />
            : <MealInProgress id={ id } push={ history.push } />}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.recipeDetailsReducer.loading,
});

RecipeInProgress.propTypes = {
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(RecipeInProgress);
