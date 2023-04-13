import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileIcon from './ProfileIcon';
import SearchIcon from './SearchIcon';
import SearchBar from './SearchBar';
import restaurant from '../images/restaurantIcon.svg';
import logo from '../images/logo.svg';

import '../Styles/Header.css';

class Header extends Component {
  headerTitle = () => {
    const { name } = this.props;
    if (name === '/meals') {
      return 'Meals';
    }
    if (name === '/drinks') {
      return 'Drinks';
    }
    return name;
  };

  render() {
    const { searchBar } = this.props;
    const { name } = this.props;
    return (
      <header
        data-testid="page-title"
        id="container"
      >
        <div id="icons-container">
          <div id="logo-container">
            <img src={ restaurant } alt="Icone restaurante" />
            <img src={ logo } alt="Logo Recipes App" />
          </div>
          <div id="search-profile-container">
            {name === '/meals' || name === '/drinks' ? <SearchIcon /> : null}
            {searchBar && <SearchBar foodOrDrink={ name } /> }
            <ProfileIcon />
          </div>
        </div>
        <div id="title-container">
          {this.headerTitle()}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  searchBar: state.searchBar.active,
});

export default connect(mapStateToProps)(Header);
