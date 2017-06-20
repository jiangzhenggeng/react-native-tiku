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
    ListView,
    TouchableNativeFeedback,
    TouchableOpacity,
    RefreshControl,
    InteractionManager,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from "../Common/ImmutableCompare";
import SizeConfig from '../Common/Config/SizeConfig';

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        let {navigate,goBack,state} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.props_state = state;

    }

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.header,styles.borderFix]}>
                    <View style={{width:30}}>
                        <TouchableOpacity onPress={()=>{this.goBack()}}>
                            <Icon name="ios-arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>关于我</Text>
                </View>
                <View style={[styles.moduleItemWrap]}>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                        <Image style={{width:120,height:130}} source={require('../../images/public/my_face.jpg')}></Image>
                        <View style={styles.cell}>
                            <View style={styles.row}>
                                <Text style={styles.t1}>Email：</Text>
                                <Text style={styles.t2}>2992265870@qq.com</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.t1}>微  信：</Text>
                                <Text style={styles.t2}>jzg2992265870</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.t1}>QQ：</Text>
                                <Text style={styles.t2}>2992265870</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomTxt}>2017.06.13 release v0.1.0 @all</Text>
                    </View>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    borderFix:{
        paddingLeft:16,
        paddingRight:16,
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",

    },
    moduleItemWrap:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    cell:{
        marginTop:10,
    },
    row:{
        flexDirection:'row',
        marginTop:10,
    },
    t1:{
        fontSize:16,
        color:'#333',
    },
    t2:{
        fontSize:16,
    },
    bottom:{
        marginBottom:10,
    },
    bottomTxt:{
        textAlign:'center'
    }
});











