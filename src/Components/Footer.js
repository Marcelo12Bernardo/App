import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import drinkIcon from '../images/icone-bebida.png';
import mealIcon from '../images/icone-prato.png';
import '../Styles/Footer.css';

class Footer extends Component {
  render() {
    const { redirect } = this.props;
    return (
      <div
        data-testid="footer"
        id="rodape"
      >
        <button
          type="button"
          onClick={ () => redirect('/drinks') }
          id="btnDrink"
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink icon"
          />
        </button>

        <button
          type="button"
          onClick={ () => redirect('/meals') }
          id="btnMeal"
        >
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="meal icon"
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redirect: state.pushReducer.pushFunction,
});

Footer.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Footer);
