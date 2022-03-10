import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      infosAlbum: [],
      songs: [],
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.requestGetMusic(id);
  }

  requestGetMusic = async (id) => {
    const response = await getMusics(id);
    const songs = response.filter((element) => element.kind === 'song');

    return this.setState({
      infosAlbum: response[0],
      songs,
    });
  }

  addFavorite = async ({ target }) => {
    const { songs } = this.state;
    const targetObject = songs.find((element) => element.trackId === Number(target.id));
    if (target.checked) {
      this.setState((prevState) => ({
        favorites: [...prevState.favorites, targetObject.trackId],
        loading: true,
      }), () => this.stateLoading(targetObject));
    } else {
      this.setState((prevState) => ({
        favorites:
          prevState.favorites.filter((element) => element !== targetObject.trackId),
        loading: true,
      }));
      await removeSong(targetObject);
      this.setState({
        loading: false,
      });
    }
  }

  stateLoading = async (targetObject) => {
    // const { songs } = this.state;
    await addSong(targetObject);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { infosAlbum, songs, loading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ infosAlbum.artistName }</h2>
        <h3 data-testid="album-name">{ infosAlbum.collectionName }</h3>
        <img
          src={ infosAlbum.artworkUrl100 }
          alt={ infosAlbum.collectionCensoredName }
        />
        <MusicCard
          songs={ songs }
          addFavorite={ this.addFavorite }
          loading={ loading }
          favorites={ favorites }
        />
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
