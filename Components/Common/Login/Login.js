

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from "../../Common/ImmutableCompare";
import HttpRequest from '../../Common/HttpRequest';
import UrlConfig from "../Config/UrlConfig";
import SizeConfig from "../Config/SizeConfig";
import KeylConfig from "../Config/KeylConfig";
import Storage from "../../Common/Storage";
import { NavigationActions } from 'react-navigation';

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.mobile = '';
        this.password = '';
        this.navigate = this.props.navigation;
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
                        <Text style={styles.title}>登录/注册</Text>
                    </View>
                    <View style={styles.forward}></View>
                </View>

                <View style={styles.container2}>
                    <View style={[styles.topTips]}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{
                            this.navigate.navigate('Common/Login/Register',{
                                callBack:()=>{
                                    this.navigate.goBack();
                                },
                                mobile:this.mobile
                            })
                        }}>
                            <Text style={[{color:'#999',fontSize:16}]}>未注册？点击进行注册</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[{paddingLeft:16,paddingRight:16}]}>
                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:65}]}>
                                <Text style={{color:"#808080",fontSize:16}}>手机号</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="输入手机号码"
                                    placeholderTextColor="#ccc"
                                    underlineColorAndroid='transparent'
                                    autoFocus={true}
                                    onChange={ (event) =>{this.mobile = event.nativeEvent.text}}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={[styles.inputWrap,styles.borderBottom]}>
                            <View style={[{width:65}]}>
                                <Text style={{color:"#808080",fontSize:16}}>密    码</Text>
                            </View>
                            <View style={[{flex:1}]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="密码"
                                    placeholderTextColor="#ccc"
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    onChange={ (event) =>{this.password = event.nativeEvent.text}}
                                />
                            </View>
                        </View>
                        <View style={{marginTop:50}}>
                            <View style={[styles.loginBtn]}>
                                <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={this.loginIn.bind(this)}>
                                    <Text style={{color:"#fff",fontSize:18}}>登录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:20}}>
                            <View style={[styles.loginBtn,{backgroundColor:'#fff',borderWidth:1,borderColor:"#1682fb"}]}>
                                <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{
                                    this.navigate.navigate('Common/Login/Register',{
                                        callBack:()=>{
                                            this.navigate.goBack();
                                        },
                                        mobile:this.mobile
                                    })
                                }}>
                                    <Text style={{color:"#1682fb",fontSize:18}}>注册</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:20, flexDirection:'row',justifyContent:'flex-end'}}>
                            <TouchableOpacity onPress={()=>this.navigate.navigate('Common/Login/FindPassword',{
                                mobile:this.mobile
                            })}>
                                <Text style={{color:"#1682fb",fontSize:14}}>忘记密码？</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*
                    <View style={{marginTop:50,paddingLeft:16, paddingRight:16,}}>
                        <View style={{position:'relative',alignItems:'center'}}>
                            <Text style={{backgroundColor:'#fff',zIndex:2,padding:10,paddingTop:0,paddingBottom:0}}>第三方登录</Text>
                            <View style={{height:1,backgroundColor:'#e6e6e6',position:'absolute',top:10,left:0,right:0}}></View>
                        </View>
                        <View style={styles.longinTypeWrap}>
                            <View>
                                <TouchableOpacity>
                                    <IconAwesome name="wechat" size={34} color="#1682fb" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <IconAwesome name="qq" size={34} color="#1682fb" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <IconAwesome name="weibo" size={34} color="#1682fb" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                     */}
                </View>
            </View>
        );
    }

    componentWillMount() {

    }

    loginIn(){
        HttpRequest.request(UrlConfig.user_login,{
            mobile:this.mobile,
            password:this.password
        }).then((replayData)=>{
            if(replayData.code!=0 && replayData.code!=99 ){
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }else{
                global.storage.save({
                    key: KeylConfig.userLoginStatus,
                    rawData: replayData.data,
                    expires: null
                }).then(()=>{
                    Storage.initSet(()=>{

                        global.loginState = replayData.data;
                        ToastAndroid.show('登录成功',ToastAndroid.SHORT);
                        //没有科目
                        if(replayData.code==99){
                            const navigateAction = NavigationActions.navigate({
                                routeName: 'Center/BuySubject',
                            });
                            this.props.navigation.dispatch(navigateAction);
                        }else{
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'Index'})
                                ]
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                    });
                });
            }
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
        justifyContent:"space-between",

        paddingLeft:16,
        paddingRight:16,
    },
    back:{
        width:35,
    },
    titleWrap:{
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

