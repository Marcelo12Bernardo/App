import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    // const loginStorage = localStorage.getItem('user');
    // if (loginStorage) {
    //   history.push('/meals');
    // } else {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
    // }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (this.validation()) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  validation = () => {
    const { email, password } = this.state;
    const magicNumber = 5;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const returnRegex = regex.test(email);
    const returnPass = password.length > magicNumber;
    return !!(returnPass && returnRegex);
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ buttonDisabled }
          onClick={ (e) => this.handleClick(e) }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
