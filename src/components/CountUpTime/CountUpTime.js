import React, { Component } from 'react';

class CountTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countUp: this.props.countUp,
            count: 0,
            time: {
                h: 0,
                m: 0,
                s: 0
            }
        }
    }

    componentDidUpdate() {
        const { countUp } = this.props;
        if(countUp) {
            this.countUp();
        } else {
            this.stopCountUp();
        }
    }

    countUp() {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
        
    }
    tick() {
        this.setState({
            count: this.state.count + 1,
            time: this.secondsToTime(this.state.count + 1)
        })
        this.props.currentTimer(this.state.time)
    }

    stopCountUp() {
        clearInterval(this.timer)
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }


    render() {
        const { time } = this.state
        
        return (
            <div>
                <h1>{`${time.h}:${time.m}:${time.s}`}</h1>
            </div>
        );
    }
}

export default CountTime;