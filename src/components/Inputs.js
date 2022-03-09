import React from 'react';
import PropTypes from 'prop-types';

class Inputs extends React.Component {
  render() {
    const {
      previewUrl, trackId, trackName, addFavorite, listFavorite, favorites,
    } = this.props;

    return (
      <div>
        { trackName }
        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor={ trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ favorites.includes(trackId) || listFavorite
                .some((itemFavorite) => itemFavorite.trackId === trackId) }
              onChange={ addFavorite }
              id={ trackId }
            />
          </label>
        </div>
      </div>
    );
  }
}

Inputs.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  listFavorite: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default Inputs;
