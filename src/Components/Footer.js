import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    const { redirect } = this.props;
    return (
      <div
        data-testid="footer"
        style={ {
          bottom: 0,
          position: 'fixed',
          width: '100%',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-around',
        } }
      >
        <button
          type="button"
          onClick={ () => redirect('/drinks') }
          style={ { backgroundColor: 'white', border: 'none' } }
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
          style={ { backgroundColor: 'white', border: 'none' } }
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
