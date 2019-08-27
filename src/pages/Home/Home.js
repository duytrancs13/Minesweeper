import React, { Component } from 'react';
import './Home.scss';
import { NavLink } from 'react-router-dom'

class Home extends Component {
    render() {
        const { match } = this.props;
        console.log(match)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="welcome">
                            Welcome to Minesweeps
                        </h1>
                        <div className="level-buttons">
                            <NavLink className="btn btn-primary" to={`${match.url}ingame/beginner`}>Beginner</NavLink>
                            <NavLink className="btn btn-primary" to={`${match.url}ingame/advantage`}>Advantage</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;