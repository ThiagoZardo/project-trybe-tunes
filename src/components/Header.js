import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  async componentDidMount() {
    // const funcGetUser = await getUser();
    this.setState({
      loading: true,
    },
    async () => {
      const funcGetUser = await getUser();
      this.setState({
        user: funcGetUser.name,
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { !loading ? (
          <div>
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
              data-testis="link-to-profile"
            >
              Profile
            </Link>
            <p data-testid="header-user-name">{ user }</p>
          </div>
        ) : <Carregando /> }
      </header>
    );
  }
}

export default Header;
