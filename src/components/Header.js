import React from 'react';
import { createUser } from '../services/userAPI';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <p>Cabeçalho Header</p>
        <p data-testid="header-user-name">{ createUser }</p>
      </header>
    );
  }
}

export default Header;
