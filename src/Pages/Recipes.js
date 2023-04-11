import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meals from '../Components/Meals';
import Drinks from '../Components/Drinks';
import Header from '../Components/Header';
import { pushAction, saveFetchAction } from '../Redux/Actions';
import Footer from '../Components/Footer';

class Recipes extends Component {
  componentDidMount() {
    const { dispatch, history, history: { location: { pathname } } } = this.props;
    dispatch(pushAction(history.push));
    console.log(history.location.pathname);

    if (pathname === '/meals') {
      this.fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      this.fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }

  fetchRecipes = async (api) => {
    const { dispatch } = this.props;
    const firstfetch = await fetch(api);
    const json = await firstfetch.json();
    dispatch(saveFetchAction(json));
  };

  render() {
    const { history: { location: { pathname } } } = this.props;
    return (
      <div>
        <Header name={ pathname } />
        <div>
          {
            pathname === '/meals' ? <Meals /> : <Drinks />
          }
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Recipes);
