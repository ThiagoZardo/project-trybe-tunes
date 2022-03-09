import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Inputs from './Inputs';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  componentDidMount() {
    this.requestFavoriteSongs();
  }

  requestFavoriteSongs = async () => {
    const returnGetFavoriteSongs = await getFavoriteSongs();
    return returnGetFavoriteSongs;
  }

  // Obtive ajuda para fazer o requisito 08 das seguintes pessoas:
  // 1- Sugano me ajudou com as sintaxes para separar o componente Input deixando o código mais organizado.
  // 2- Lais Nametala me ajudou também com um bug onde
  render() {
    const { songs, loading, addFavorite, favorites } = this.props;
    return (
      <section>
        { loading ? <Carregando />
          : (
            songs.map((music, index) => (
              <Inputs
                key={ index }
                { ...music }
                loading={ loading }
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
