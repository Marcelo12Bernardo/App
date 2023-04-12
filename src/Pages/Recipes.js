import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meals from '../Components/Meals';
import Drinks from '../Components/Drinks';
import Header from '../Components/Header';
import { pushAction, saveFetchAction } from '../Redux/Actions';
import Footer from '../Components/Footer';

class Recipes extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { dispatch, history, history: { location: { pathname } } } = this.props;
    dispatch(pushAction(history.push));
    if (pathname === '/meals') {
      this.fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      this.fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }

  componentDidUpdate(prevProps) {
    const { history: { location: { pathname } } } = this.props;
    if (prevProps.match.path !== pathname) {
      if (pathname === '/meals') {
        this.fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else {
        this.fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
    }
  }

  fetchRecipes = async (api) => {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    const firstfetch = await fetch(api);
    const json = await firstfetch.json();
    dispatch(saveFetchAction(json));
    this.setState({ loading: false });
  };

  render() {
    const { history: { location: { pathname } } } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Header name={ pathname } />
        {loading ? <p>Carregando...</p> : (
          <div>
            {
              pathname === '/meals'
                ? <Meals />
                : <Drinks />
            }
          </div>
        )}
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Recipes);
