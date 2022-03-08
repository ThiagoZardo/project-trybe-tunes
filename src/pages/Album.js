import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     estadoInicial: '',
  //   };
  // }

  componentDidMount() {
    this.functionTeste();
  }

  functionTeste = async () => {
    const response = await getMusics('1115155635');
    console.log(response);
  }

  render() {
    const { collectionId } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        {
        //   collectionId.map((element, index) => (
        //     <div key={ index } className="card">
        //       <p data-testid="artist-name">Nome do Artista</p>
        //       <p data-testid="album-name">Nome do album</p>
        //       <MusicCard />
        //     </div>
        //   ))
        //
        }
      </div>
    );
  }
}

export default Album;
