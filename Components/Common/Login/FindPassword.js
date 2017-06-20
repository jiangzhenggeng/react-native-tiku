


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
import ImmutableCompare from "../ImmutableCompare";
import SizeConfig from "../Config/SizeConfig";
import HttpRequest from "../HttpRequest";
import UrlConfig from "../Config/UrlConfig";

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

let mobile = '';
let password = '';
let code = '';

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.navigate = this.props.navigation;
        this.mobile = mobile = this.navigate.state.params.mobile || '';
        this.title = this.navigate.state.params.title || '忘记密码';
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
                        <Text style={[styles.title,{textAlign:'center'}]}>{this.title}</Text>
                    </View>
                    <View style={styles.forward}></View>
                </View>

                <View style={styles.container2}>
                    <View style={[styles.topTips]}>
                        <Text style={[{color:'#999',fontSize:16}]}>输入正确手机号码获取手机验证码</Text>
                    </View>
                    <View style={[{paddingLeft:16,paddingRight:16}]}>
                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:80}]}>
                                <Text style={{color:"#808080",fontSize:16}}>手  机  号</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="输入手机号码"
                                    placeholderTextColor="#ccc"
                                    underlineColorAndroid='transparent'
                                    autoFocus={true}
                                    onChange={ (event) =>{mobile = event.nativeEvent.text}}
                                    keyboardType="numeric"
                                    defaultValue={this.mobile}
                                />
                            </View>
                        </View>

                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:80}]}>
                                <Text style={{color:"#808080",fontSize:16}}>验  证  码</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="输入短信验证码"
                                    placeholderTextColor="#ccc"
                                    underlineColorAndroid='transparent'
                                    onChange={ (event) =>{code = event.nativeEvent.text}}
                                    keyboardType="numeric"
                                />
                            </View>
                            <GetCode />
                        </View>

                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:80}]}>
                                <Text style={{color:"#808080",fontSize:16}}>设置密码</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="密码"
                                    placeholderTextColor="#ccc"
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    onChange={ (event) =>{password = event.nativeEvent.text}}
                                />
                            </View>
                        </View>

                        <View style={{marginTop:50}}>
                            <View style={[styles.loginBtn]}>
                                <TouchableOpacity onPress={this.settingPassword.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:"#fff",fontSize:18}}>确认设置</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }

    componentWillMount() {

    }

    settingPassword(){
        if(!/^1\d{10}$/.test(mobile)){
            ToastAndroid.show('请输入正确的手机号码',ToastAndroid.SHORT);
            return;
        }
        if(password.length<6 || password.length>16 ){
            ToastAndroid.show('密码长度为6-16位',ToastAndroid.SHORT);
            return;
        }
        if(!/^\d{6}$/.test(code)){
            ToastAndroid.show('请输入正确的手机验证码',ToastAndroid.SHORT);
            return;
        }

        HttpRequest.request(UrlConfig.user_findpassword_url,{
            user:{
                mobile:mobile,
                password:password,
                code:code,
            }
        }).then((replayData)=>{
            if(replayData.code==0){
                ToastAndroid.show('修改成功',ToastAndroid.LONG);
                InteractionManager.runAfterInteractions(() => {
                    this.navigate.goBack();
                });
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }
        }).catch((error)=>{
            ToastAndroid.show(error.message,ToastAndroid.SHORT);
        });
    }


}


class GetCode extends Component {

    constructor(props){
        super(props);
        this.state = {
            text:'获取验证码',
            color:'#1682fb',
        };
        this.timer = null;
        this.longTime2 = this.longTime = 60;
    }
    render() {
        return (
            <TouchableOpacity onPress={this.getCodeBtn.bind(this)}>
                <Text ref={o=>this.Text=o} style={{color:this.state.color,fontSize:15}}>{this.state.text}</Text>
            </TouchableOpacity>
        );
    }
    getCodeBtn(){
        if(this.timer) return;
        if(!/^1\d{10}$/.test(mobile)){
            ToastAndroid.show('请输入正确的手机号码',ToastAndroid.SHORT);
            return;
        }
        HttpRequest.request(UrlConfig.user_findpassword_send_code,{
            mobile:mobile
        }).then((replayData)=>{
            //倒计时
            if(replayData.code==0){
                this.sendMobileCodeShowTimer();
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }
        }).catch((error)=>{
            ToastAndroid.show('手机验证码发送失败，请稍后试试',ToastAndroid.SHORT);
        });
    }
    //发送验证码
    sendMobileCodeShowTimer(){
        let string = '',color = '#ccc';
        let loopFn = ()=>{
            if(this.longTime<=0){
                this.timer && clearInterval(this.timer);
                this.timer = null;
                string = '获取验证码';
                this.longTime = this.longTime2;
                color = '#1682fb';
            }else{
                this.longTime--;
                string = this.longTime+'秒后获取';
            }
            this.setState({
                text:string,
                color:color
            });
        };
        this.timer = setInterval(()=>{
            loopFn();
        },1000);
        loopFn();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
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

