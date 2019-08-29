import React, { Component } from 'react';
import './InGame.scss';
// import GameService from './../../utils/Service';
import axios from 'axios';

import Board from './Board/Board';
import Popup from '../../components/Popup/Popup';
import Loading from '../../components/Loading/Loading';
import CountUpTime from '../../components/CountUpTime/CountUpTime';

class InGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0,
            mines: 0,
            minesPosition: [],
            loading: true,
            countUp: false,
            showModal: false,
            currentTimer:{}
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const level = match.params.level;
        if (level === 'beginner') {
            this.getInitData(9, 10)

        } else {
            this.getInitData(16, 40)
        }
        this.setState({
            loading: false
        })
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

    newGame = () => {
        this.setState({
            height: 0,
            width: 0,
            mines: 0,
            minesPosition: [],
            loading: true,
            countUp: false,
            showModal: false
        })
        const { match } = this.props;
        const level = match.params.level;
        if (level === 'beginner') {
            this.getInitData(9, 10)
        } else {
            this.getInitData(16, 40)
        }
        this.setState({
            loading: false
        })
    }

    countUp = () => {
        this.setState({
            countUp: true
        })
    }
    stopCountUp = () => {
        this.setState({
            countUp: false,
            showModal: true
        })
    }

    currentTimer = (timer) => {
        this.setState({
            currentTimer: timer
        })
    }

    renderBoard() {
        const { height, width, mines, minesPosition, countUp } = this.state;
        const { match } = this.props;
        return (
            <div className="in-game">
                <div style={match.params.level === 'beginner' ? { width: '405px' } : { width: '720px' }}>
                    <Board
                        height={height}
                        width={width}
                        mines={mines}
                        minesPosition={minesPosition}
                        countUp={this.countUp}
                        stopCountUp={this.stopCountUp}
                    />
                </div>
                <div className="time">
                    <CountUpTime countUp={countUp} currentTimer={this.currentTimer}/>
                </div>
            </div>
        )
    }

    render() {
        const { minesPosition, loading, showModal, currentTimer } = this.state;
        return (
            <div>
                {loading ? <Loading loading={loading} /> : minesPosition.length > 0 && this.renderBoard()}
                {showModal ? (<Popup newGame={this.newGame} currentTimer={currentTimer}/>) : null}
            </div>
        );
    }
}

export default InGame; 