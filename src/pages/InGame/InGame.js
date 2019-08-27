import React, { Component } from 'react';
import './InGame.scss';
import Board from './Board/Board';
// import GameService from './../../utils/Service';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

class InGame extends Component {
    constructor(props) {
        super(props)
        // get height, width mines from api through url https://tiki-minesweeper.herokuapp.com/getMines?size=9&mines=10
        // https://tiki-minesweeper.herokuapp.com/getMines?size=16&mines=40
        this.state = {
            height: 0,
            width: 0,
            mines: 0,
            minesPosition: [
                // { x: 6, y: 0 },
                // { x: 8, y: 1 },
                // { x: 6, y: 4 },
                // { x: 1, y: 6 },
                // { x: 8, y: 2 },
                // { x: 5, y: 0 },
                // { x: 2, y: 2 }, 
                // { x: 5, y: 1 },
                // { x: 8, y: 5 },
                // { x: 5, y: 4 }
            ]
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const level = match.params.level;
        if(level === 'beginner') {
           this.getInitData(9, 10)
        } else {
           this.getInitData(16, 40)
        }
    }

    getInitData(size, mines) {
        axios.get(`https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`)
        .then(rs => {
            this.setState({
                height: size,
                width: size,
                mines: mines,
                minesPosition: rs.data.data
            })
        })
    }

    newGame() {
        this.setState({
            minesPosition:0
        })
        const { match } = this.props;
        const level = match.params.level;
        if(level === 'beginner') {
           this.getInitData(9, 10)
        } else {
           this.getInitData(16, 40)
        }
    }


    render() {
        const { height, width, mines, minesPosition } = this.state;
        return (
            <div className="ingame">
                <button className="btn btn-primary" onClick={() => this.newGame()}>New game</button>
                <NavLink className="btn btn-warning" to={'/'}>Home page</NavLink>
                <br/>
                <br/>
                {minesPosition.length > 0 && <Board height={height} width={width} mines={mines} minesPosition={minesPosition} />}
            </div>
        );
    }
}

export default InGame; 