import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import './Board.scss';


class Board extends Component {
    constructor(props) {
        super(props)
        const { height, width, minesPosition } = this.props;
        this.state = {
            boardData: this.initBoardData(height, width, minesPosition),
            clicked: false
        }
    }

    initBoardData(height, width, minesPosition) {
        let data = this.createEmptyArray(height, width)
        data = this.getMinesPosition(data, minesPosition)
        data = this.getNeighbours(data, height, width)
        return data;
    }

    createEmptyArray(height, width) {
        let data = [];
        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    
                }
            }
        }
        return data;
    }

    getMinesPosition(data, minesPosition) {
        minesPosition.map(p => {
            data[p.x][p.y].isMine = true
        })
        return data;
    }

    getNeighbours(data, height, width) {
        let updateData = data;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (!data[i][j].isMine) {
                    let mine = 0;
                    const area = this.surroundingCellNumber(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    })
                    if (mine === 0) {
                        updateData[i][j].isEmpty = true
                    } else {
                        updateData[i][j].neighbour = mine
                    }
                }
            }
        }
        return updateData;
    }

    surroundingCellNumber(x, y, data) {
        const el = [];
        //up
        if (x > 0) {
            el.push(data[x - 1][y]);
        }
        //down
        if (x < this.props.height - 1) {
            el.push(data[x + 1][y]);
        }
        //left
        if (y > 0) {
            el.push(data[x][y - 1]);
        }
        //right
        if (y < this.props.width - 1) {
            el.push(data[x][y + 1]);
        }
        // top left
        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }
        // top right
        if (x > 0 && y < this.props.width - 1) {
            el.push(data[x - 1][y + 1]);
        }
        // bottom right
        if (x < this.props.height - 1 && y < this.props.width - 1) {
            el.push(data[x + 1][y + 1]);
        }
        // bottom left
        if (x < this.props.height - 1 && y > 0) {
            el.push(data[x + 1][y - 1]);
        }
        return el;
    }

    handleCellClick(x, y) {
        const { boardData, clicked } = this.state;
        if (boardData[x][y].isRevealed) {
            return null;
        }
        if (boardData[x][y].isMine) {
            this.revealBoard();
            // alert("game over");
            this.props.stopCountUp()
        }
        if(!clicked) {
            if (!boardData[x][y].isMine) {
                this.props.countUp();
            }
            this.setState({
                clicked: true
            })
        }

        let updatedData = this.state.boardData;
        updatedData[x][y].isRevealed = true;
        if (updatedData[x][y].isEmpty) {
            updatedData = this.revealEmpty(x, y, updatedData);
        }
        if(this.getHidden(updatedData).length === this.props.mines) {
            this.revealBoard();
            // alert('You win')
            this.props.stopTimer();
        }

        this.setState({
            boardData: updatedData
        });


    }

    revealEmpty(x, y, data) {
        let area = this.surroundingCellNumber(x, y, data);
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    this.revealEmpty(value.x, value.y, data);
                }
            }
        });
        return data;
    }

    revealBoard() {
        let updatedData = this.state.boardData;
        updatedData.map((dataRow) => {
            dataRow.map((dataItem) => {
                dataItem.isRevealed = true;
            });
        });
        this.setState({
            boardData: updatedData
        })
    }

    getHidden(data) {
        let mineArray = [];
        data.map(dataRow => {
            dataRow.map(dataItem => {
                if (!dataItem.isRevealed) {
                    mineArray.push(dataItem)
                }
            })
        })
        return mineArray;
    }

    renderBoard(data) {
        return data.map((dataRow) => {
            return dataRow.map((dataItem) => {
                return (
                    <div key={dataItem.x * dataRow.length + dataItem.y} onClick={() => this.handleCellClick(dataItem.x, dataItem.y)} >
                        <Cell value={dataItem} />
                    </div>
                );
            })
        })
    }
    render() {
        const { boardData } = this.state;

        return (
            <div>
                {this.renderBoard(boardData)}
            </div>
        );
    }
}

export default Board;