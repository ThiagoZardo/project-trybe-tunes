import React from 'react';
import { Redirect } from 'react-router';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';
import '../css/Login.css';
import logo from '../images/logo.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      user: '',
      loading: false,
      redirection: false,
    };
  }

  // Imar Mendes me ajudou com a lógica de chamar uma callback dentro do setState e passar um novo state pra ele.

  btnLogin = async () => {
    const { user } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: user });
    this.setState({
      loading: false,
      redirection: true,
    });
  }

  nameValidation = ({ target }) => {
    const tres = 3;
    this.setState({
      isButtonDisabled: target.value.length < tres,
      user: target.value,
    });
  }

  render() {
    const { isButtonDisabled, loading, redirection } = this.state;
    return (
      <div data-testid="page-login">
        <img className="logo" src={ logo } alt="logo" />
        { !loading ? (
          <div>
            <div>
              <label htmlFor="loginInput">
                <input
                  name="loginInput"
                  placeholder="Nome"
                  data-testid="login-name-input"
                  type="text"
                  onChange={ this.nameValidation }
                />
              </label>
            </div>
            <div>
              <button
                name="loginBtn"
                data-testid="login-submit-button"
                type="submit"
                onClick={ this.btnLogin }
                disabled={ isButtonDisabled }
              >
                Entrar
              </button>
            </div>
          </div>
        ) : <Carregando /> }
        {redirection && <Redirect to="/search" /> }

      </div>
    );
  }
}

export default Login;
