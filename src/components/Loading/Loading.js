import React, { Component } from 'react';
import { CircleLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css `
    display: block;
    margin: 0 auto;
`
class Loading extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <CircleLoader 
                css={override}
                size={50}
                color={'#123abc'}
                loading={this.props.loading}
            />
        );
    }
}

export default Loading;