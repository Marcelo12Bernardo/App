import React, { Component } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Header name="Profile" />
        Profile
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
