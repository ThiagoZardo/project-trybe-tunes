import React from 'react';

class MusicCard extends React.Component {
  render() {
    return (
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
    );
  }
}

export default MusicCard;
