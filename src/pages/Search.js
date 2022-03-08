import React from 'react';
import { Link } from 'react-router-dom';
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
      notFound: false,
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
      if (response.length === 0) {
        this.setState({
          notFound: true,
        });
      }
      this.setState({
        mySearch: response,
        loading: false,
        input: '',
      });
    });
  }

  render() {
    const { isButtonDisabled, search, loading, input, mySearch, notFound } = this.state;
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
                mySearch.map((element, index) => (
                  <div key={ index } className="container-resultado">
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      <img src={ element.artworkUrl100 } alt="capa" />
                      <p>{ element.collectionName }</p>
                      <p>{ element.artistName }</p>
                    </Link>
                  </div>
                ))
              }
            </div>
          )}
        { notFound === true && 'Nenhum álbum foi encontrado' }
      </div>
    );
  }
}

export default Search;
