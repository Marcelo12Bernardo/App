import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import iconProfile from '../images/Perfil.png';
import iconLogout from '../images/logoutIcon.png';
import iconFav from '../images/favIcon.png';
import iconDone from '../images/doneIcon.png';
import '../Styles/Profile.css';

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
      <div className="tela">
        <Header name="Profile" />
        <img
          src={ iconProfile }
          alt="Icone de usuario"
          id="iconProfile"
        />
        <h2 id="textProfile">Profile</h2>
        <h3
          id="email"
          data-testid="profile-email"
        >
          {emailUser ? emailUser.email : null}

        </h3>
        <section>
          <div id="div1">
            <button
              className="btn"
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => this.handleClick('done-recipes') }
            >
              <img
                src={ iconDone }
                alt="Icone de usuario"
                className="img"
              />
              Done Recipes

            </button>
          </div>
          <div id="div2">
            <button
              className="btn"
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => this.handleClick('favorite-recipes') }
            >
              <img
                src={ iconFav }
                alt="Icone de usuario"
                className="img"
              />
              Favorite Recipes

            </button>
          </div>
          <div id="div3">
            <button
              className="btn"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => this.clickLogout() }
            >
              <img
                src={ iconLogout }
                alt="Icone de usuario"
                className="img"
              />
              Logout

            </button>
          </div>
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
