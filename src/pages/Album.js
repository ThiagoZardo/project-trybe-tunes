import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      infosAlbum: [],
      songs: [],
    };
  }

  componentDidMount() {
    this.requestGetMusic();
  }

  requestGetMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const response = await getMusics(id);
    const songs = response.filter((element) => element.kind === 'song');
    console.log(songs);
    console.log(response[0]);
    return this.setState({
      infosAlbum: response[0],
      songs,
    });
  }

  render() {
    const { infosAlbum, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ infosAlbum.artistName }</h2>
        <h3 data-testid="album-name">{ infosAlbum.collectionName }</h3>
        <img
          src={ infosAlbum.artworkUrl100 }
          alt={ infosAlbum.collectionCensoredName }
        />
        <MusicCard songs={ songs } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
