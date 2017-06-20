/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ScrollView
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

export default class extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.container2}>
                    <Icon name="ios-construct-outline" size={50} color="#1682fb"/>
                    <Text style={{color:'#1682fb',fontSize:18,marginLeft:15}}>正在开发中...</Text>
                </View>
            </View>
        );
    }
}

const header_height = 50;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    container2: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:header_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",

    },
});


