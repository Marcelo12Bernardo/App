import React, { Component } from 'react';

export default class SearchComponent extends Component {
  state = {
    inputText: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { inputText } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          value={ inputText }
          name="inputText"
          onChange={ this.handleChange }
        />
      </div>
    );
  }
}
