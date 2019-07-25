//core
import React, { Component } from 'react';

import {store} from '../../init/store'

export default class Popup extends Component {

    render( ){
        const { tictactoe: {history} } = store.getState();

        return (
            <div className="popup">
                <div className="popup__inner">
                    <h3>Logs</h3>
                    <div className="popup__list">
                        <ol>
                            { history.length ? history.map( (txt, key) => <li key={key}>{txt}</li> ) : 'Plz, go to play!' }
                        </ol>
                    </div>
                    <button onClick={this.props.closePopup}>Close</button>
                </div>
            </div>
        )
    }
}