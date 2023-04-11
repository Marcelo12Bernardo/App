import React, { Component } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkCopied: false,
    };
  }

  handleClickFavorite = (id) => {
    const json = localStorage.getItem('favoriteRecipes');
    const favoriteRecipes = JSON.parse(json) || [];
    const newArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    const section = document.getElementById(`${id}`);
    section.parentNode.removeChild(section);
  };

  shareMeal = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    this.setState({ linkCopied: true });
  };

  shareDrink = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    this.setState({ linkCopied: true });
  };

  render() {
    const json = localStorage.getItem('favoriteRecipes');
    const favoriteRecipes = JSON.parse(json) || [];
    const { linkCopied } = this.state;
    return (
      <>
        <Header name="Favorite Recipes" />
        <div>
          <button
            data-testid="filter-by-all-btn"
            type="button"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
          >
            Drinks
          </button>
        </div>
        <div>
          {favoriteRecipes.map((recFavorite, index) => (
            recFavorite.type === 'meal' ? (
              <section key={ recFavorite.id } id={ recFavorite.id }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recFavorite.image }
                  alt={ `Imagem da receita ${recFavorite.name}` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{recFavorite.name}</p>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recFavorite.nationality} - ${recFavorite.category}`}
                </p>
                <button
                  type="button"
                  onClick={ () => this.shareMeal(recFavorite.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Share Button"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => this.handleClickFavorite(recFavorite.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Favorite Button"
                  />
                </button>
                {linkCopied && <p>Link copied!</p>}
              </section>
            )
              : (
                <section key={ recFavorite.id } id={ recFavorite.id }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recFavorite.image }
                    alt={ `Imagem do drink ${recFavorite.name}` }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recFavorite.name}</p>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recFavorite.alcoholicOrNot}`}
                  </p>
                  <button
                    type="button"
                    onClick={ () => this.shareDrink(recFavorite.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Share Button"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleClickFavorite(recFavorite.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="Favorite Button"
                    />
                  </button>
                  {linkCopied && <p>Link copied!</p>}
                </section>
              )
          ))}
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}
