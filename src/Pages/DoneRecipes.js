import React, { Component } from 'react';
import Header from '../Components/Header';

export default class DoneRecipes extends Component {
  render() {
    const doneRecipes = localStorage.getItem('doneRecipes');

    return (
      <div>
        <Header name="Done Recipes" />
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        {doneRecipes && doneRecipes
          .map(({ category, name, image, doneDate, tags }, index) => (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {category}
              </p>

              <p data-testid={ `${index}-horizontal-name` }>{name}</p>

              <p data-testid={ `${index}-horizontal-done-date` }>
                {doneDate}
              </p>
              <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
              {tags
              && tags.map((elem, indexTag) => (
                <p key={ indexTag } data-testid={ `${index}-${elem}-horizontal-tag` }>
                  {elem}
                </p>
              ))}
            </div>
          ))}
      </div>
    );
  }
}
