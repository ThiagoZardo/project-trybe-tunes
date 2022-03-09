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
    console.log(returnGetFavoriteSongs);
    return returnGetFavoriteSongs;
  }

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
