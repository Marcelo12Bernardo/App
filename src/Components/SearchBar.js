import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

const notFound = 'Sorry, we haven\'t found any recipes for these filters.';

class SearchBar extends Component {
  state = {
    inputText: '',
    searchFilter: '',
  };

  componentDidUpdate() {
    this.checkToRedirect();
  }

  checkToRedirect = () => {
    const { push, results } = this.props;
    if (results.meals || results.drinks) {
      if (results.meals?.length === 1) {
        push(`/meals/${results.meals[0].idMeal}`);
      }
      if (results.drinks?.length === 1) {
        push(`/drinks/${results.drinks[0].idDrink}`);
      }
    }
  };

  fetchIngredients = async (inputText, foodOrDrink) => {
    const { dispatch } = this.props;
    let firstFetch;
    let json;
    try {
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`);
        json = await firstFetch.json();
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`);
        json = await firstFetch.json();
      }
    } catch (error) {
      global.alert(notFound);
    }
    dispatch(saveFetchAction(json));
  };

  fetchNames = async (inputText, foodOrDrink) => {
    const { dispatch } = this.props;
    let firstFetch;
    let json;
    try {
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`);
        json = await firstFetch.json();
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`);
        json = await firstFetch.json();
      }
    } catch (error) {
      global.alert(notFound);
    }
    dispatch(saveFetchAction(json));
  };

  fetchFirstLetter = async (inputText, foodOrDrink) => {
    const { dispatch } = this.props;
    let firstFetch;
    let json;
    try {
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`);
        json = await firstFetch.json();
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`);
        json = await firstFetch.json();
      }
    } catch (error) {
      global.alert(notFound);
    }
    dispatch(saveFetchAction(json));
  };

  fetchFunction = async (inputText, searchFilter, foodOrDrink) => {
    switch (searchFilter) {
    case 'ingredient':
      await this.fetchIngredients(inputText, foodOrDrink);
      break;
    case 'name':
      await this.fetchNames(inputText, foodOrDrink);
      break;
    case 'firstLetter':
      if (inputText.length > 1) {
        global
          .alert('Your search must have only 1 (one) character');
        break;
      }
      await this.fetchFirstLetter(inputText, foodOrDrink);
      break;
    default:
      break;
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { inputText, searchFilter } = this.state;
    const { foodOrDrink } = this.props;
    this.fetchFunction(inputText, searchFilter, foodOrDrink);
  };

  render() {
    const { inputText } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="search-input"
          value={ inputText }
          name="inputText"
          onChange={ this.handleChange }
        />
        <br />
        <label
          htmlFor="ingredient"
        >
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            id="ingredient"
            type="radio"
            name="searchFilter"
            value="ingredient"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="name"
        >
          Name
          <input
            data-testid="name-search-radio"
            id="name"
            type="radio"
            name="searchFilter"
            value="name"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="firstLetter"
        >
          First letter
          <input
            data-testid="first-letter-search-radio"
            id="firstLetter"
            type="radio"
            name="searchFilter"
            value="firstLetter"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Search

        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  push: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Object).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.saveFetchReducer.result,
  push: state.pushReducer.pushFunction,
});

export default connect(mapStateToProps)(SearchBar);
