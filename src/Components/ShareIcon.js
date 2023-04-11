import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clipboardCopy from 'clipboard-copy';
import share from '../images/shareIcon.svg';
import { loadingFavoriteAction } from '../Redux/Actions';

class ShareIcon extends Component {
  setTrueCopied = () => {
    const { dispatch, path, setTrue } = this.props;
    dispatch(loadingFavoriteAction());
    const copystring = `http://localhost:3000${path}`;
    clipboardCopy(copystring.replace('/in-progress', ''));
    setTrue();
    dispatch(loadingFavoriteAction());
  };

  render() {
    return (
      <button
        type="button"
        onClick={ this.setTrueCopied }
        style={ { backgroundColor: 'white', border: 'none' } }
      >
        <img
          data-testid="share-btn"
          src={ share }
          alt="share Button"
        />
      </button>
    );
  }
}

ShareIcon.propTypes = {
  setTrue: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.recipeDetailsReducer,
});

export default connect(mapStateToProps)(ShareIcon);
