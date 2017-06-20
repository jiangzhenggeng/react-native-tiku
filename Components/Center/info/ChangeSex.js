


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    ToastAndroid,
    Picker
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
        this.state = {
            sex : String(this.navigate.state.params.sex || 1),
        };
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
                        <Text style={[{color:'#999',fontSize:16}]}>选择性别</Text>
                    </View>
                    <View style={[{paddingLeft:16,paddingRight:16}]}>
                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:80}]}>
                                <Text style={{color:"#808080",fontSize:16}}>性        别</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <Picker
                                    selectedValue={this.state.sex}
                                    onValueChange={v=>this.setState({sex:v})}
                                    prompt={'请选择性别'}
                                    style={{flex:1}}
                                >
                                    <Picker.Item label='男' value='1'/>
                                    <Picker.Item label='女' value='2'/>
                                </Picker>
                            </View>
                        </View>

                        <View style={{marginTop:50}}>
                            <View style={[styles.loginBtn]}>
                                <TouchableOpacity onPress={this.settingChange.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:"#fff",fontSize:18}}>确认修改</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

    settingChange(){

        if(this.state.sex!=1 && this.state.sex!=2){
            ToastAndroid.show('请选择性别',ToastAndroid.SHORT);
            return;
        }

        HttpRequest.request(UrlConfig.change_sex,{
            sex:this.state.sex,
            memberid:global.loginState.memberid
        }).then((replayData)=>{
            if(replayData.code==0){
                ToastAndroid.show('修改成功',ToastAndroid.LONG);
                global.loginState.sex = this.state.sex;
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

