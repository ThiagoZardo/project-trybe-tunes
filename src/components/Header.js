import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
            <p>Cabeçalho Header</p>
            <p data-testid="header-user-name">{ user }</p>
          </div>
        ) : <Carregando /> }
      </header>
    );
  }
}

export default Header;
