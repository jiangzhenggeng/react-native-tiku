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
    ScrollView,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    ToastAndroid,
    InteractionManager,
    RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from '../../Common/ImmutableCompare';
import SizeConfig from '../../Common/Config/SizeConfig';
import UrlConfig from '../../Common/Config/UrlConfig';
import Storage from '../../Common/Storage';
import HttpRequest from '../../Common/HttpRequest';
import KeylConfig from "../../Common/Config/KeylConfig";
import CameraButton from "../../Common/CameraButton";

const { width } = Dimensions.get('window');
const TouchableView = Platform.OS=='ios'?TouchableOpacity:TouchableNativeFeedback;

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.state = {
            user: global.loginState,
            info:{},
            isRefreshing:false,
            face:'',
            username:'',
            sex:'',
        };
        //加载数量信息
        if(global.memberid){
            this.loadData();
        }

        let {navigate,goBack,state} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.props_state = state;

    }

    componentDidMount() {
        Storage.initSet( (info) => {
            this.setState({
                face:global.loginState.facepicture,
                username:global.loginState.username,
                mobile:global.loginState.mobile,
                sex:global.loginState.sex==1?'男':'女',
            });
        });
    }
    update(){
        this.componentDidMount();
    }

    loadData(){
        HttpRequest.request(UrlConfig.getCenterInfo,{
            memberid:global.memberid
        }).then((replayData)=>{
            if(replayData.code==0){
                this.setState({
                    info:replayData.data,
                    isRefreshing:false
                });
            }else{
                ToastAndroid.show(replayData.message || '网络错误',ToastAndroid.LONG)
            }
        });
    }

    _onRefresh(){
        this.setState({isRefreshing:true});
        this.loadData();
    }

    componentWillUnmount() {
        this.props_state.params.parent &&
        this.props_state.params.parent.update();
    }

    render() {

        if(!this.state.face){
            return <View></View>
        }
        return (
            <View style={styles.container}>
                <View style={[styles.header,styles.borderFix]}>
                    <View style={{width:30}}>
                        <TouchableOpacity onPress={()=>{this.goBack()}}>
                            <Icon name="ios-arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>基本信息</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="Loading..."
                            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    }
                >
                    <View style={[styles.border,{marginTop:16}]}>
                        <CameraButton callBack={this.UpLoadFaceCallBack.bind(this)}>
                            <View style={[styles.loginStatus,styles.common,{position:'relative'}]}>
                                <View style={[styles.itemLeft]}>
                                    <Text style={[styles.text]}>头像</Text>
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <View style={[styles.moduleFace,styles.moduleFaceWrap,{marginRight:10}]}>
                                        <TouchableOpacity onPress={this.ShowFaceImage.bind(this)}>
                                            <Image resizeMode='stretch' style={styles.moduleFace} source={{uri:this.state.face}}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                </View>
                            </View>
                        </CameraButton>
                    </View>

                    <View>
                        <View><Text style={[styles.fixText]}>基本信息</Text></View>
                        <View style={[styles.border]}>
                            <TouchableView onPress={this.ChangeUsername.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Text style={[styles.text]}>昵称</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.username}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>
                            <TouchableView onPress={this.ChangeMobile.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Text style={[styles.text]}>手机号码</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.mobile}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>
                            <TouchableView onPress={this.ChangeSex.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Text style={[styles.text]}>性别</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.sex}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>
                            <TouchableView onPress={this.ChangePassword.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Text style={[styles.text]}>修改密码</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>

                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }

    async UpLoadFaceCallBack(file,fileName,response){
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let data = new FormData();
        data.append('file', {
            uri: response.data,
            name: fileName,
            type: 'image/jpeg'
        });
        return HttpRequest.request(UrlConfig.UploadFace,{
            data:data,
            memberid:global.loginState.memberid
        }).then((replayData)=>{
            if( replayData.code==0 ){
                global.loginState.facepicture = replayData.data.url;
                global.storage.save({
                    key: KeylConfig.userLoginStatus,
                    rawData: global.loginState,
                    expires: null
                }).then(()=>{
                    Storage.initSet();
                    this.setState({
                        face:global.loginState.facepicture
                    });
                });
            }else{
                ToastAndroid.show(replayData.message || '保存失败',ToastAndroid.LONG);
            }
        });
    }

    ShowFaceImage(){
        //显示头像大图
    }
    ChangeUsername(){
        this.navigate('Center/info/ChangeUsername',{
            username:this.state.username,
            title:'修改用户名',
            parent:this
        });
    }
    ChangeMobile(){
        this.navigate('Center/info/ChangeMobile',{
            mobile:this.state.mobile,
            title:'修改手机号码',
            parent:this
        });
    }
    ChangeSex(){
        this.navigate('Center/info/ChangeSex',{
            sex:global.loginState.sex,
            title:'修改性别',
            parent:this
        });
    }
    ChangePassword(){
        this.navigate('Common/Login/FindPassword',{
            mobile:this.state.mobile,
            title:'修改密码',
            parent:this
        });
    }

}

const face_height = 38;
const item_height = 50;
const styles = StyleSheet.create({

    fixText:{
        padding:8,
        paddingTop:12,
        paddingLeft:16,
        paddingRight:16,
        fontSize:14,
        color:'#808080',
    },
    itemWrap:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",
        position:'relative',
        height:item_height,
    },
    itemLeft:{
        alignItems:'center',
        flexDirection:"row",
    },
    itemRight:{
        alignItems:'center',
        flexDirection:"row",
        position:'absolute',
        right:0,
        top:item_height/2 - 10
    },
    text:{
        color:'#585858',
        fontSize:16,
        marginRight:10
    },
    tips:{
        fontSize:14,
        color:'#808080',
    },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    common:{
        paddingLeft:16,
        paddingRight:16,
        backgroundColor:'#ffffff',
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingLeft:16,
        paddingRight:16,

    },
    title:{
        color:'#fff',
        fontSize:18
    },

    border:{
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderBottomWidth:0.8,
        borderTopWidth:0.8,
    },
    loginStatus:{
        paddingTop:16,
        paddingBottom:16,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"space-between",
    },
    moduleFaceWrap:{
        height:face_height,
        width:face_height,
    },
    moduleFace:{
        height:face_height,
        width:face_height,
    },
});


