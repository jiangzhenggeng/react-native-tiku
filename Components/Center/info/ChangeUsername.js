


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from "../../Common/ImmutableCompare";
import SizeConfig from "../../Common/Config/SizeConfig";
import HttpRequest from "../../Common/HttpRequest";
import UrlConfig from "../../Common/Config/UrlConfig";
import KeylConfig from "../../Common/Config/KeylConfig";

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.navigate = this.props.navigation;
        this.username = this.navigate.state.params.username || '';
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={ ()=>this.navigate.goBack() }>
                            <Icon name="ios-arrow-back-outline" size={30} color="#d5e8f7" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleWrap}>
                        <Text style={[styles.title,{textAlign:'center'}]}>修改用户名</Text>
                    </View>
                    <View style={styles.forward}></View>
                </View>

                <View style={styles.container2}>
                    <View style={[styles.topTips]}>
                        <Text style={[{color:'#999',fontSize:16}]}>用户名为1-16个字符组成</Text>
                    </View>
                    <View style={[{paddingLeft:16,paddingRight:16}]}>
                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:80}]}>
                                <Text style={{color:"#808080",fontSize:16}}>用  户  名</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="输入新用户名"
                                    placeholderTextColor="#ccc"
                                    underlineColorAndroid='transparent'
                                    autoFocus={true}
                                    onChange={ (event) =>{this.username = event.nativeEvent.text}}
                                    keyboardType="numeric"
                                    defaultValue={this.username}
                                />
                            </View>
                        </View>

                        <View style={{marginTop:50}}>
                            <View style={[styles.loginBtn]}>
                                <TouchableOpacity onPress={this.settingUsername.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:"#fff",fontSize:18}}>确认修改</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

    settingUsername(){
        this.username = String(this.username).replace(/^\s+|\s+$/,'');
        if(this.username==''){
            ToastAndroid.show('请输入用户名',ToastAndroid.SHORT);
            return;
        }

        HttpRequest.request(UrlConfig.change_username,{
            username:this.username,
            memberid:global.loginState.memberid
        }).then((replayData)=>{
            if(replayData.code==0){
                ToastAndroid.show('修改成功',ToastAndroid.LONG);

                global.loginState.username = this.username;
                global.storage.save({
                    key: KeylConfig.userLoginStatus,
                    rawData: global.loginState,
                    expires: null
                });
                this.navigate.state.params.parent &&
                this.navigate.state.params.parent.update();

                this.navigate.goBack();
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }
        }).catch((error)=>{
            ToastAndroid.show(error.message,ToastAndroid.LONG);
        });
    }


}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    container2:{
        flex:1,
        position:'relative',
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",

        paddingLeft:16,
        paddingRight:16,
    },
    back:{
        width:35,
    },
    titleWrap:{
        flex:1,
        justifyContent:'center',
    },
    forward:{
        width:35,
    },
    topTips:{
        backgroundColor:'#f7f7f7',
        height:40,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:16,
        paddingRight:16
    },

    inputWrap:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
    },
    borderBottom:{
        borderBottomWidth:0.5,
        borderColor:'#e6e6e6',
    },
    input:{
        flex:1,
        fontSize:16,
    },
    loginBtn:{
        backgroundColor:'#1682fb',
        height:45,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    longinTypeWrap:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:20,
    }
});

