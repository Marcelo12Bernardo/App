import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default class ProfileIcon extends Component {
  render() {
    return (
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
        />
      </Link>
    );
  }
}
