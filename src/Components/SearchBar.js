import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

class SearchBar extends Component {
  state = {
    inputText: '',
    searchFilter: '',
  };

  // checkToRedirect = (json) => {
  //   const { history } = this.props;
  //   if (json) {
  //     if (json.meals?.length === 1) {
  //       history.push(`/meals/${json.meals.idMeal}`);
  //     }
  //     if (json.drinks?.length === 1) {
  //       history.push(`/drinks/${json.drinks.idDrink}`);
  //     }
  //   }
  // };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  fetchFunction = async (inputText, searchFilter, foodOrDrink) => {
    const { dispatch } = this.props;
    let firstFetch;
    let json;
    switch (searchFilter) {
    case 'ingredient':
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`);
        json = await firstFetch.json();
        break;
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`);
        json = await firstFetch.json();
        break;
      }
    case 'name':
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`);
        json = await firstFetch.json();
        break;
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`);
        json = await firstFetch.json();
        break;
      }
    case 'firstLetter':
      if (inputText.length > 1) {
        global
          .alert('Your search must have only 1 (one) character');
        break;
      }
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`);
        json = await firstFetch.json();
        break;
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`);
        json = firstFetch.json();
        break;
      }
    default:
      break;
    }
    dispatch(saveFetchAction(json));
    // return json;
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { inputText, searchFilter } = this.state;
    const { foodOrDrink } = this.props;
    this.fetchFunction(inputText, searchFilter, foodOrDrink);
    // this.checkToRedirect(json);
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
  foodOrDrink: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(SearchBar);
