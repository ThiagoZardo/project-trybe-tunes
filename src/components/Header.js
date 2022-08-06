import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/Header.css';
import logo from '../images/logoHeader.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  async componentDidMount() {
    // const funcGetUser = await getUser();
    const funcGetUser = await getUser();
    this.setState({
      user: funcGetUser.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header">
          <img className="logo" src={ logo } alt="logo" />
          <div className="user">
            <p className="user-name" data-testid="header-user-name">
              { user }
            </p>
          </div>
        </div>
        { !loading ? (
          <div className="menu">
            <Link
              className="link"
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>

            <Link
              className="link"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>

            <Link
              className="link"
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </div>
        ) : <Carregando /> }
      </header>
    );
  }
}

export default Header;
