import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      search: '',
      input: '',
      loading: false,
      mySearch: [],
    };
  }

  validation = ({ target }) => {
    const dois = 2;
    this.setState({
      search: target.value,
      input: target.value,
      isButtonDisabled: target.value.length < dois,
    });
  }

  // Lucas Cabral me ajudou a entender melhor o retorno da função.
  btnEnviar = () => {
    const { search } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const response = await searchAlbumsAPI(search);
      this.setState({
        input: '',
        mySearch: response,
        loading: false,
      });
    });
  }

  render() {
    const { isButtonDisabled, search, loading, input, mySearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { this.getUser }
        <div>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.validation }
            value={ input }
          />
        </div>

        <div>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ this.btnEnviar }
          >
            Pesquisar
          </button>
        </div>
        { loading
          ? <Carregando />
          : (
            <div>
              { `Resultado de álbuns de: ${search}` }
              {
                mySearch.map((element) => (
                  <div key={ element.artistId } className="container-resultado">
                    <img src={ element.artworkUrl100 } alt="capa" />
                    <p>{ element.collectionName }</p>
                    <p>{ element.artistName }</p>
                  </div>
                ))
              }
            </div>
          )}
      </div>
    );
  }
}

export default Search;
