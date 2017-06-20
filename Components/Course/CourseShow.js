

import React, { Component } from 'react';

import {
    Platform,
    BackAndroid
} from 'react-native';

import DevelTips from '../Common/DevelTips';

export default class extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <DevelTips title="正在开发中" />
        );
    }

    componentWillMount() {

    }
}


