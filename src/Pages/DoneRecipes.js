import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const copy = require('clipboard-copy');

const timeoutNumber = 3000;

export default class DoneRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkCopied: false,
      doneRecipes: [],
      filter: 'all',
    };

    this.filterState = this.filterState.bind(this);
  }

  componentDidMount() {
    const json = localStorage.getItem('doneRecipes');
    const doneRecipes = JSON.parse(json) || [];
    this.setState((prevState) => ({ ...prevState, doneRecipes }));
  }

  filterState(filter) {
    this.setState({ filter });
  }

  render() {
    // const { match: { url } } = this.props;
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

    const { linkCopied, doneRecipes, filter } = this.state;
    const filtedRecipes = filter === 'all'
      ? doneRecipes
      : doneRecipes.filter((recipe) => recipe.type === filter);

    return (
      <div>
        <Header name="Done Recipes" />
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => {
            this.filterState('all');
          } }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            this.filterState('meal');
          } }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            this.filterState('drink');
          } }
        >
          Drinks
        </button>
        {linkCopied && <p>Link copied!</p>}
        {filtedRecipes
          && filtedRecipes.map(
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
                  onClick={ () => {
                    copy(`http://localhost:3000/meals/${id}`);
                    this.setState({ linkCopied: true }, () => {
                      setTimeout(() => {
                        this.setState({ linkCopied: false });
                      }, timeoutNumber);
                    });
                  } }
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
        <Footer />
      </div>
    );
  }
}

// DoneRecipes.propTypes = {
//   match: PropTypes.shape({
//     url: PropTypes.string,
//   }).isRequired,
// };
