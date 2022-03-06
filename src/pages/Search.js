import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        { this.getUser }
        <p>Search</p>
      </div>
    );
  }
}

export default Search;