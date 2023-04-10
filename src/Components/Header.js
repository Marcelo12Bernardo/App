import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileIcon from './ProfileIcon';
import SearchIcon from './SearchIcon';
import SearchBar from './SearchBar';

class Header extends Component {
  headerTitle = () => {
    const { name } = this.props;
    if (name === '/meals') {
      return 'Meals';
    }
    if (name === '/drinks') {
      return 'Drinks';
    }
    if (name === '/done-recipes') {
      return 'Done Recipes';
    }
    if (name === '/profile') {
      return 'Profile';
    }
    if (name === '/favorite-recipes') {
      return 'Favorite Recipes';
    }
    return name;
  };

  render() {
    const { searchBar } = this.props;
    const { name } = this.props;
    return (
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >

        <header
          data-testid="page-title"
          style={ {
            width: '100%',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-around',
          } }
        >
          {this.headerTitle()}
          {name === '/meals' || name === '/drinks' ? <SearchIcon /> : null}
          {searchBar && <SearchBar foodOrDrink={ name } /> }
          <ProfileIcon />
        </header>
      </div>
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
