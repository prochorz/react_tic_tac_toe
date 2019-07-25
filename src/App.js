import React, {Component} from 'react';

//Components
import Board from './components/Board';
import Popup from './components/Popup';

import './App.css';

export default class App extends Component {
  state = {
    showPopup: false
  };

  _togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    } );
  };

  render( ){
    const {showPopup} = this.state;

    return (
        <>
          <Board showPopup={this._togglePopup}/>
          { showPopup ? <Popup closePopup={this._togglePopup} /> : ''}
        </>
    )
  }
}
