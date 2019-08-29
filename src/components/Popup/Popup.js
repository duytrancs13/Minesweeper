import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Popup.scss';
import $ from 'jquery';

class Popup extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { handleModalCloseClick } = this.props;
        $(this.modal).modal('show');
        $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    }
    handleCloseClick = () => {
        $(this.modal).modal('hide');
    }

    newGame = () => {
        this.handleCloseClick()
        this.props.newGame();
    }

    render() {
        const { currentTimer } = this.props
        return (
            <div>
                <div className="modal fade" data-keyboard="false" data-backdrop="static" ref={modal => this.modal = modal} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <h1 className="lose">You lose !!!</h1>
                            <h1 className="currentTimer">{`${currentTimer.h}:${currentTimer.m}:${currentTimer.s}`}</h1>
                            <button className="game-btn" onClick={this.newGame}>New game</button>
                            <NavLink className="game-btn" onClick={this.handleCloseClick} to={'/'}>Home page</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;