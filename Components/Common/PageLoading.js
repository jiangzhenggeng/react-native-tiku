

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';


export default class extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={[styles.intoloading,this.props.style]}>
                <ActivityIndicator
                    size="large"
                    color="#1682fb"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    intoloading:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
});


