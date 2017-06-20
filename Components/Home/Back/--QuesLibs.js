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
    InteractionManager
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ImmutableCompare from "../Common/ImmutableCompare";
import BannerSwiper from '../Common/BannerSwiper';
import PageLoading from "../Common/PageLoading";
import HttpRequest from '../Common/HttpRequest';
import Login from '../Common/Login/Login';
import ChapterList from '../Common/DoQuestion/ChapterList';
import UrlConfig from '../Common/Config/UrlConfig';
import MyCenter from './MyCenter';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
const { width } = Dimensions.get('window')

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        this.state = {
            selectedTab:'题库',
            subjectListArray:[],
            init:false,
            user:global.loginState
        }
    }

    render() {
        if(this.state.subjectListArray.length<=0){
            return (<PageLoading />);
        }

        let face = this.state.user?{uri:this.state.user.facepicture}:require('../../images/public/XMKOH81.jpg'),
            username = this.state.user && this.state.user.username?this.state.user.username:'未登录';
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <BannerSwiper />
                    <View style={styles.moduleCenter}>
                        <View style={[{padding:0}]}>
                            <TouchableHighlight onPress={this.login.bind(this)}>
                                <View style={[styles.borderBottom,styles.loginStatus]}>
                                    <View style={[styles.moduleFace,styles.moduleFaceWrap]}>
                                        <Image
                                            resizeMode='stretch'
                                            style={styles.moduleFace}
                                            source={face}
                                        />
                                    </View>
                                    <View style={{marginLeft:5}}><Text style={{color:'#1682fb',fontSize:16}}>{username}</Text></View>
                                    <View style={{marginLeft:5}}><Text style={{color:'#808080',fontSize:16}}>今日未练习</Text></View>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.moduleItemWrap,styles.borderBottom]}>{this.subjectList()}</View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.get_subject_list).then((replayData)=>{
            this.setState({
                subjectListArray:replayData.data
            });
        });
        global.loginState || RCTDeviceEventEmitter.addListener('userLogin',()=>{
            this.setState({
                user: global.loginState
            })
        });
    }

    subjectList(){
        let returnArray = [];
        for (let i in this.state.subjectListArray){
            let item = this.state.subjectListArray[i];
            returnArray.push(
                <View key={i} style={styles.moduleItemList}>
                    <TouchableOpacity style={styles.moduleItemList} onPress={this.intoSubjectList.bind(this,item)}>
                        <Icon name={item.icon} size={22} color="#1682fb" />
                        <Text style={{color:'#585858',marginLeft:8}}>{item.shortname||item.subjectname.substr(0,4)}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return returnArray;
    }

    intoSubjectList(item){
        this.props.navigator.push({
            component: ChapterList,
            args: item
        });
    }
    login(){
        if(this.state.user){
            this.props.navigator.push({
                component:MyCenter,
            });
        }else{
            this.props.navigator.push({
                component:Login,
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    borderBottom:{
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        paddingLeft:16,
        paddingRight:16,
    },
    moduleCenter:{
    },
    loginStatus:{
        height:52,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    moduleFaceWrap:{
        height:32,
        width:32,
    },
    moduleFace:{
        height:32,
        width:32,
        borderRadius:16
    },
    moduleItemWrap:{
        flexDirection:"row",
        alignItems:"stretch",
        flexWrap:'wrap'
    },
    moduleItemList:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",
        width:(width - 32 ) / 3,
        height:55,
    },
    moduleWenda:{
        borderColor:'#f1f1f1',
        borderTopWidth:0.5,
        flexDirection:"row",
        alignItems:"stretch",
        flexWrap:'wrap',
        marginTop:15,
        marginBottom:15
    }
});
