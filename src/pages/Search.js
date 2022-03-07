import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
    };
  }

  validation = ({ target }) => {
    const dois = 2;
    this.setState({
      isButtonDisabled: target.value.length < dois,
    });
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { this.getUser }

        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.validation }
        />

        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
