//core
import React, { Component } from 'react';

import { delay, findWinner, findBestStep } from '../../helper';

import {store} from '../../init/store'
import { addItem, clear } from '../../bus/tictactoe/actions'

export default class Board extends Component {
    state = {
        users: ['circle', 'cross' ],
        currentUser: false,
        status: false,
        winner: false,
        matrix: false,
    };

    componentWillMount() {
        this._reset();
    }

    componentDidUpdate(prevProps, prevState) {
        const { matrix, users, currentUser } = this.state;

        //matrix did update
        if( prevState.matrix.join('') !== matrix.join('') ) {
            const winner = findWinner( matrix );

            if( winner.user !== false ) {
                this.setState({
                    status: false,
                    winner
                });

                store.dispatch(addItem(`${new Date().toTimeString().slice(0,5)} ${users[winner.user]} won!`));
            } else if( matrix.indexOf(null) === -1 ) {
                    this.setState({
                        status: false,
                    });

                    store.dispatch(addItem(`${new Date().toTimeString().slice(0,5)} it's a draw`));

            } else if(currentUser === 0) {
                this._goRobot();
            }

        }
    }

    _reset =()=>{
        this.setState({
            matrix: Array(9).fill(null),
            currentUser: 1,
            status: true,
            winner: {
                combination: [],
                user: false
            },
        });

        store.dispatch(clear());
    };

    _goRobot = () => {
        const { matrix, currentUser } = this.state;

        delay(500).then(()=>{
            //rival step
            const rival = findBestStep( matrix, currentUser ? 0 : 1 );

            //robot step
            const robot = findBestStep( matrix, currentUser );


            if( rival.countSteps === 1 && robot.countSteps !== 1 ) { //if a robot can lose
                this._selectCell( rival.step );
            } else {
                this._selectCell( robot.step );
            }
        });

    };

    _selectCell = (key) => {
        const { matrix, users, currentUser } = this.state;

        const rowText = `Row${ Math.ceil(key /3) }`;
        const colText = `Col${ (()=>{
            if( key % 3 == 0 ) return 1;
            if( key % 2 == 0 ) return 2;
            return 3;
        })() }`;

        store.dispatch(addItem(`${new Date().toTimeString().slice(0,5)} ${users[currentUser]} ${rowText} ${colText}`));


        this.setState({
            matrix: [...matrix].fill( currentUser, key, key+1 ),
            currentUser: currentUser ? 0 : 1
        } );
    };

    _clickOnCell = (key) => () => {
        const { matrix, currentUser, status } = this.state;

        if( matrix[key] !== null || !status || currentUser !== 1 ) return;

        this._selectCell(key);
    };

    _statusText = () => {
        const { matrix, users, winner: { user: winnerUser, combination: winnerCombination }, currentUser } = this.state;

        if( matrix.indexOf( null ) === -1 && winnerUser === false ) {
            return "It's a draw"
        }

        return winnerUser === false ? `Turn ${users[currentUser]}`: `Player ${users[winnerUser]} won!`;
    };

    render( ){
        const { matrix, users, winner: { combination: winnerCombination } } = this.state;
        const { showPopup: _showPopup } = this.props;

        const matrixJSX = matrix.map((user, key) => {
            let styleClass = 'tictactoe__cell';

            if ( winnerCombination.indexOf(key) !== -1 ) {
                styleClass += ' -won';
            }

            return <div key={key} onClick={ this._clickOnCell(key) } className={styleClass}>
                        <div className={ user !== null ? `-${users[user]}` : '' }></div>
                   </div>
        } );


        return (
            <div className="tictactoe">
                <div className="tictactoe__title">{ this._statusText() }</div>
                <div className="tictactoe__board">
                    {matrixJSX}
                </div>
                <div className="tictactoe__footer">
                    <button onClick={ this._reset }>Reset</button>
                    <button onClick={ _showPopup }>Show Logs</button>
                </div>
            </div>
        )
    }
}
