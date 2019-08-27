import React, { Component } from 'react';
import './Cell.scss'

class Cell extends Component {
    getValue() {
        const { value } = this.props;
        if (!value.isRevealed) {
            return "";
        }
        if (value.isMine) {
            return "B";
        }
        if (value.neighbour === 0) {
            return null;
        }
        return value.neighbour;
    }
    render() {
        const { value } = this.props;
        let className =
            "cell" +
            (value.isRevealed ? "" : " hidden") +
            (value.isMine ? " is-mine" : "");
        return (
            <div className={className}>
                {this.getValue()}
            </div>
        );
    }
}

export default Cell;