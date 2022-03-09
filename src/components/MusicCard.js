import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Inputs from './Inputs';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      listFavorite: [],
    };
  }

  componentDidMount() {
    this.requestFavoriteSongs();
  }

  requestFavoriteSongs = async () => {
    const returnGetFavoriteSongs = await getFavoriteSongs();
    this.setState({
      load: true,
      listFavorite: returnGetFavoriteSongs,
    }, () => this.setState({
      load: false,
    }));
  }

  // Obtive ajuda para fazer o requisito 08 das seguintes pessoas:
  // 1- Sugano me ajudou com as sintaxes para separar o componente Input deixando o código mais organizado.
  // 2- Lais Nametala me ajudou também com um bug.
  render() {
    const { songs, loading, addFavorite, favorites } = this.props;
    const { load, listFavorite } = this.state;
    return (
      <section>

        { load ? <Carregando /> : '' }
        { loading ? <Carregando />
          : (
            songs.map((music, index) => (
              <Inputs
                key={ index }
                { ...music }
                loading={ loading }
                listFavorite={ listFavorite }
                addFavorite={ addFavorite }
                favorites={ favorites }
              />
            ))
          ) }
      </section>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  addFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MusicCard;
