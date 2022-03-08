import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      param: {},
      loading: false,
    };
  }

  requestGetMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      param: response,
    });
  }

  addFavorite = async () => {
    const { param } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(param);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { songs } = this.props;
    const { loading } = this.state;
    return (
      <section>
        { songs.map((music, index) => (
          <div key={ index }>
            { music.trackName }
            <div>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label
                htmlFor={ `checkbox-music-${music.trackId}` }
              >
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  type="checkbox"
                  onClick={ this.addFavorite }
                />
              </label>
            </div>
          </div>
        )) }
        { loading ? <Carregando /> : '' }
      </section>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.string).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MusicCard;
