/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

export default class extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Icon name="ios-construct-outline" size={50} color="#1682fb"/>
                    <Text style={{color:'#1682fb',fontSize:18,marginLeft:15}}>{this.props.title||'你还没有定制科目'}</Text>
                    {!this.props.noBtn?
                    <View style={styles.btn}>
                        <TouchableHighlight onPress={this.dingZhiSubject.bind(this)}>
                            <Text style={styles.btnText}>点击定制科目</Text>
                        </TouchableHighlight>
                    </View>:<View />}
                </View>
            </View>
        );
    }
    dingZhiSubject(){
        let {navigate} = this.props.navigation;
        navigate('Center/BuySubject',{

        });

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
        flexDirection:"column",
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
    btn:{
        backgroundColor:'#1682fb',
        borderRadius:5,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        marginTop:10,
    },
    btnText:{
        color:'#fff',
        fontSize:15,
    }
});


