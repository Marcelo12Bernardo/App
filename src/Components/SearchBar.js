import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveFetchAction } from '../Redux/Actions';

import '../Styles/SearchBar.css';

const notFound = 'Sorry, we haven\'t found any recipes for these filters.';

class SearchBar extends Component {
  state = {
    inputText: '',
    searchFilter: '',
  };

  componentDidUpdate() {
    const { push, result, foodOrDrink } = this.props;
    if (foodOrDrink === '/meals' && result?.length === 1) {
      push(`/meals/${result[0].idMeal}`);
    }
    if (foodOrDrink === '/drinks' && result?.length === 1) {
      push(`/drinks/${result[0].idDrink}`);
    }
  }

  fetchIngredients = async (inputText, foodOrDrink) => {
    const { dispatch } = this.props;
    let firstFetch;
    let json;
    try {
      if (foodOrDrink === '/meals') {
        firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`);
        json = await firstFetch.json();
        if (json.meals === null) {
          global.alert(notFound);
        }
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`);
        json = await firstFetch.json();
        // if (json.drinks === null) {
        //   global.alert(notFound);
        // }
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
        if (json.meals === null) {
          global.alert(notFound);
        }
      } else {
        firstFetch = await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`);
        json = await firstFetch.json();
        // if (json.drinks === null) {
        //   global.alert(notFound);
        // }
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
    // try {
    if (foodOrDrink === '/meals') {
      firstFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`);
      json = await firstFetch.json();
      if (json.meals === null) {
        global.alert(notFound);
      }
    } else {
      firstFetch = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`);
      json = await firstFetch.json();
      // if (json.drinks === null) {
      //   global.alert(notFound);
      // }
    }
    // } catch (error) {
    //   global.alert(notFound);
    // }
    dispatch(saveFetchAction(json));
  };

  fetchFunction = async (inputText, searchFilter, foodOrDrink) => {
    if (searchFilter === 'ingredient') {
      await this.fetchIngredients(inputText, foodOrDrink);
    }
    if (searchFilter === 'name') {
      await this.fetchNames(inputText, foodOrDrink);
    }
    if (searchFilter === 'firstLetter') {
      if (inputText.length > 1) {
        global
          .alert('Your search must have only 1 (one) character');
      }
      await this.fetchFirstLetter(inputText, foodOrDrink);
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
          id="search-input"
          value={ inputText }
          name="inputText"
          onChange={ this.handleChange }
        />
        <br />
        <div id="form-container">
          <div id="selectors-container">
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
          </div>
          <br />
          <button
            data-testid="exec-search-btn"
            id="exec-search-btn"
            onClick={ this.handleClick }
          >
            Search

          </button>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  push: PropTypes.func.isRequired,
  result: PropTypes.instanceOf(Array).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  result: state.saveFetchReducer.result,
  push: state.pushReducer.pushFunction,
});

export default connect(mapStateToProps)(SearchBar);
