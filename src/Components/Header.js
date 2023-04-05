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
    return name;
  };

  render() {
    const { searchBar } = this.props;
    const { name } = this.props;
    return (
      <div>
        <header
          data-testid="page-title"
        >
          {this.headerTitle()}
        </header>
        <ProfileIcon />
        {name === '/meals' || name === '/drinks' ? <SearchIcon /> : null}
        {searchBar && <SearchBar foodOrDrink={ name } /> }
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
