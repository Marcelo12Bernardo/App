import React, { Component } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkCopied: false,
    };
  }

  render() {
    const json = localStorage.getItem('favoriteRecipes');
    const favoriteRecipes = JSON.parse(json) || [];
    const { linkCopied } = this.state;
    return (
      <div>
        <Header name="Favorite Recipes" />
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        {favoriteRecipes
          && favoriteRecipes.map(
            (
              {
                type,
                category,
                name,
                image,
                nationality,
                alcoholicOrNot,
                id,
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
                  </div>
                ) : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {alcoholicOrNot}
                  </p>
                )}
                <p data-testid={ `${index}-horizontal-name` }>{name}</p>

                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  src="../images/shareIcon.svg"
                  onClick={ () => {
                    copy(`http://localhost:3000/meals/${id}`);
                    this.setState({ linkCopied: true });
                  } }
                >
                  Share
                </button>
                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src="../images/shareIcon.svg"
                  onClick={ () => {
                    copy(`http://localhost:3000/meals/${id}`);
                    this.setState({ linkCopied: true });
                  } }
                >
                  Share
                </button>
                {linkCopied && <p>Link copied!</p>}
              </div>
            ),
          )}
        <Footer />
      </div>
    );
  }
}
// [{ id, type, nationality, category, alcoholicOrNot, name, image }]
