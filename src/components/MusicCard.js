import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songs } = this.props;
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
            </div>
          </div>
        )) }
      </section>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
