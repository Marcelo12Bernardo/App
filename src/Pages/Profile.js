import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

export default class Profile extends Component {
  handleClick = (rota) => {
    const { history } = this.props;
    history.push(`/${rota}`);
  };

  clickLogout = () => {
    localStorage.clear();
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const emailUser = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header name="Profile" />
        <h3 data-testid="profile-email">{emailUser.email}</h3>
        <section>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => this.handleClick('done-recipes') }
          >
            Done Recipes

          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => this.handleClick('favorite-recipes') }
          >
            Favorite Recipes

          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => this.clickLogout() }
          >
            Logout

          </button>
        </section>

      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
