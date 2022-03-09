import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Inputs from './Inputs';

class MusicCard extends React.Component {
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
