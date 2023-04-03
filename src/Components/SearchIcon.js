import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import { searchBarAction } from '../Redux/Actions';

class SearchIcon extends Component {
  handleClick = () => {
    const { dispatch, searchBar } = this.props;
    dispatch(searchBarAction(!searchBar));
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
        style={ { backgroundColor: 'white', border: 'none' } }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search icon"
        />
      </button>

    );
  }
}

const mapStateToProps = (state) => ({
  searchBar: state.searchBar.active,
});

SearchIcon.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchBar: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(SearchIcon);
