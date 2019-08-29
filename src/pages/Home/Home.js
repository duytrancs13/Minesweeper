import React, { Component } from 'react';
import './Home.scss';
import { NavLink } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="welcome">
                    Welcome to Minesweeps game
                </h1>
                <br />
                <br />
                <h3 className="select-level">
                    Please to select level
                </h3>
                <div className="level-buttons">
                    <NavLink className="game-btn" to={'/beginner'}>Beginner</NavLink>
                    <NavLink className="game-btn" to={'/advantage'}>Advantage</NavLink>
                </div>
            </div>
        );
    }
}

export default Home;