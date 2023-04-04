import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meals from '../Components/Meals';
import Drinks from '../Components/Drinks';
import Header from '../Components/Header';
import { pushAction } from '../Redux/Actions';

class Recipes extends Component {
  componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(pushAction(history.push));
    console.log(history.push);
    console.log(typeof history.push);
  }

  render() {
    const { history: { location: { pathname } } } = this.props;
    return (
      <div>
        <Header name={ pathname } />
        {pathname === '/meals' ? <Meals /> : <Drinks />}
      </div>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Recipes);
