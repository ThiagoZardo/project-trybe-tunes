import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import Inputs from './Inputs';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      param: {},
      loading: false,
      check: false,
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
        { loading ? <Carregando />
          : (
            songs.map((music, index) => (
              <Inputs
                key={ index }
                { ...music }
                loading={ loading }
                addFavorite={ this.addFavorite }
              />
            ))
          ) }
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
