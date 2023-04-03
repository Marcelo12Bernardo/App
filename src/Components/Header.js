import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileIcon from './ProfileIcon';
import SearchIcon from './SearchIcon';
import SearchComponent from './SearchComponent';

class Header extends Component {
  render() {
    const { searchBar } = this.props;
    const { name } = this.props;
    return (
      <div>
        <header
          data-testid="page-title"
        >
          {name}
        </header>
        <ProfileIcon />
        {name === 'Meals' || name === 'Drinks' ? <SearchIcon /> : null}
        {searchBar && <SearchComponent /> }
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
