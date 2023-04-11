import React from 'react';
import PropTypes from 'prop-types';

class CheckboxWithLabel extends React.Component {
  state = {
    checked: false,
  };

  handleCheckboxChange = () => {
    const { id, ingredient, drinkOrMeal } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked });
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage !== null) {
      console.log(storage[drinkOrMeal][id].includes(ingredient));
      if (storage[drinkOrMeal][id].includes(ingredient)) {
        storage[drinkOrMeal][id] = storage[drinkOrMeal][id]
          .filter((unit) => unit !== ingredient);
      } else {
        storage[drinkOrMeal][id].push(ingredient);
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    } else {
      const creatingStorage = { [drinkOrMeal]: { [id]: [ingredient] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(creatingStorage));
    }
  };

  checkLocalStorage = () => {
    const { ingredient, id, drinkOrMeal } = this.props;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage) {
      return storage[drinkOrMeal][id].includes(ingredient);
    }
    return false;
  };

  render() {
    const { ingredient, index } = this.props;
    const labelStyle = {
      textDecoration: this.checkLocalStorage()
        ? 'line-through solid rgb(0, 0, 0)'
        : 'none',
    };

    return (
      <label
        className="ingredientsCheckbox"
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ index }
        style={ labelStyle }
      >
        <input
          type="checkbox"
          checked={ this.checkLocalStorage() }
          onChange={ this.handleCheckboxChange }
          id={ index }
        />
        {ingredient}
      </label>
    );
  }
}

CheckboxWithLabel.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  drinkOrMeal: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CheckboxWithLabel;
