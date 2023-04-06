import React, { Component } from 'react';
import Header from '../Components/Header';

export default class DoneRecipes extends Component {
  render() {
    // localStorage.setItem('doneRecipes', JSON.stringify([
    //   {
    //     id: '52771',
    //     type: 'meal',
    //     nationality: 'Italian',
    //     category: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     name: 'Spicy Arrabiata Penne',
    //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '23/06/2020',
    //     tags: ['Pasta', 'Curry'],
    //   }]));

    const json = localStorage.getItem('doneRecipes');
    const doneRecipes = JSON.parse(json) || [];
    return (
      <div>
        <Header name="Done Recipes" />
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        {doneRecipes
          && doneRecipes.map(
            (
              {
                type,
                category,
                name,
                image,
                doneDate,
                tags,
                nationality,
                alcoholicOrNot,
              },
              index,
            ) => (
              <div key={ index }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
                {type === 'meal' ? (
                  <div>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${nationality} - ${category}`}
                    </p>
                    <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
                      {tags[0]}
                    </p>
                    <p data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
                      {tags[1]}
                    </p>
                  </div>
                ) : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {alcoholicOrNot}
                  </p>
                )}
                <p data-testid={ `${index}-horizontal-name` }>{name}</p>

                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  src="../images/shareIcon.svg"
                >
                  Share
                </button>
                {/* {tags
                  && tags.map(
                    (elem, indexTag) => indexTag > 2 && (
                      <p
                        key={ indexTag }
                        data-testid={ `${index}-${elem}-horizontal-tag` }
                      >
                      </p>
                    ),
                  )} */}
              </div>
            ),
          )}
      </div>
    );
  }
}
