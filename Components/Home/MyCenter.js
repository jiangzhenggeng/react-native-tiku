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
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from '../Common/ImmutableCompare';
import SizeConfig from '../Common/Config/SizeConfig';
import UrlConfig from '../Common/Config/UrlConfig';
import userLoginStatus from '../Common/Config/KeylConfig';
import BottomTabBar from '../BottomTabBar.android';
import HttpRequest from '../Common/HttpRequest';
import { NavigationActions } from 'react-navigation';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
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
            isRefreshing:false
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
    update(){
        this._onRefresh();
    }

    render() {

        let face = this.state.user?{uri:this.state.user.facepicture}:require('../../images/public/XMKOH81.jpg'),
            username = this.state.user && this.state.user.username?this.state.user.username:'未登录';

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>个人中心</Text>
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
                        <TouchableView onPress={this.InFo.bind(this)}>
                            <View style={[styles.loginStatus,styles.common,{position:'relative'}]}>
                                <View style={[styles.moduleFace,styles.moduleFaceWrap]}>
                                    <Image
                                        resizeMode='stretch'
                                        style={styles.moduleFace}
                                        source={face}
                                    />
                                </View>
                                <View style={{marginLeft:5}}>
                                    <Text style={{color:'#585858',fontSize:16}}>{username}</Text>
                                </View>
                                <View style={{position:'absolute',right:16,top:25}}>
                                    <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                </View>
                            </View>
                        </TouchableView>
                    </View>

                    <View>
                        <View><Text style={[styles.fixText]}>考试</Text></View>
                        <View style={[styles.border]}>

                            <TouchableView onPress={this.MyExam.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-desktop-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>考试记录</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.paper_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>
                            <TouchableView onPress={this.MySimulation.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-easel-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>模拟记录</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.moni_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>


                        </View>
                    </View>

                    <View>
                        <View><Text style={[styles.fixText]}>统计</Text></View>
                        <View style={[styles.border]}>

                            <TouchableView onPress={this.MyPractice.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-create-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>练习记录</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.practice_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>

                            <TouchableView onPress={this.MyStrong.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-briefcase-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>强化记录</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.strong_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>

                            <TouchableView onPress={this.collectionLook.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-heart-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>试题收藏</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.favorite_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>

                            <TouchableView onPress={this.errorLook.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-close-circle-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>错题记录</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.error_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableView>

                        </View>
                    </View>

                    <View>
                        <View><Text style={[styles.fixText]}>科目</Text></View>
                        <View style={[styles.border]}>
                            <TouchableView onPress={this.MySubject.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-folder-open-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>我的科目</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.subject_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                    <View style={{height:0.8,backgroundColor:'#f1f1f1',position:'absolute',bottom:0,width:width,left:16}}></View>
                                </View>
                            </TouchableView>
                            <TouchableView onPress={this.BuySubject.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-cart-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>定制科目</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{''}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableView>
                            {/*
                            <TouchableView onPress={this.MyOrder.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-paper-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>我的订单</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Text style={[styles.text,styles.tips]}>{this.state.info.order_number}</Text>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableView>
                            */}
                        </View>
                    </View>

                    <View style={{marginBottom:16}}>
                        <View><Text style={[styles.fixText]}>关于</Text></View>
                        <View style={[styles.border]}>
                            <TouchableView onPress={this.toDevelopers.bind(this)}>
                                <View  style={[styles.common,{position:'relative'}]}>
                                    <View style={[styles.itemWrap]}>
                                        <View style={[styles.itemLeft]}>
                                            <Icon name='ios-help-circle-outline' size={22} color="#1682fb"/>
                                            <Text style={[styles.text]}>关于开发者</Text>
                                        </View>
                                        <View style={[styles.itemRight]}>
                                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableView>
                        </View>
                    </View>

                    {global.loginState &&
                    <View style={{marginBottom:16,}}>
                        <View style={[styles.border]}>
                            <TouchableView onPress={this.LoginOut.bind(this)}>
                                <View  style={[styles.common,{alignItems:'center'}]}>
                                    <Text style={[styles.text,{padding:12,color:'#fe5342'}]}>退出登录</Text>
                                </View>
                            </TouchableView>
                        </View>
                    </View>}
                </ScrollView>
            </View>
        );
    }

    componentDidMount(){
        if(!global.loginState){
            if(!global._defind_events_) global._defind_events_ = {};
            global._defind_events_['userLogin'] = RCTDeviceEventEmitter.addListener('userLogin',()=>{
                this.setState({
                    user: global.loginState
                })
            });
        }
    }
    IsLogin(){
        if(!global.loginState || !global.memberid){
            ToastAndroid.show('你未登录',ToastAndroid.LONG);

            this.listener = RCTDeviceEventEmitter.addListener('userLogin',()=>{
                this.state.user = global.loginState;
                this._onRefresh();
            });
            this.navigate('Common/Login/Login');
            return false;
        }else{
            return true;
        }
    }
    componentWillUnmount(){
        this.listener && this.listener.remove();
    }

    LoginOut(){
        if(!this.IsLogin())return;
        // 删除单个数据
        storage.remove({
            key: userLoginStatus.userLoginStatus
        }).then(()=>{
            global.loginState = null;
            global.memberid = null;
            ToastAndroid.show('退出成功',ToastAndroid.SHORT);
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Index'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        });
    }
    toDevelopers(){
        this.navigate('Center/About',{
            parent:this
        });
    }

    InFo(){
        if(!this.IsLogin())return;
        this.navigate('Center/info/InfoList',{
            parent:this
        });
    }

    MyExam(){
        if(!this.IsLogin())return;
        this.navigate('Center/MyExam');
    }
    MySimulation(){
        if(!this.IsLogin())return;
        this.navigate('Center/MySimulation');
    }

    MyPractice(){
        if(!this.IsLogin())return;
        this.navigate('Center/MyPractice');
    }

    MyStrong(){
        if(!this.IsLogin())return;
        this.navigate('Center/MyStrong');
    }

    collectionLook(){
        if(!this.IsLogin())return;
        global.__EXAM__ = 'SHOW_ANSWER';
        this.navigate('Center/MyCollection');
    }


    errorLook(){
        if(!this.IsLogin())return;
        this.navigate('Center/MyError');
    }

    BuySubject(){
        if(!this.IsLogin())return;
        this.navigate('Center/BuySubject',{
            parent:this
        });
    }

    MyOrder(){
        if(!this.IsLogin())return;
        this.navigate('Center/MyOrder');
    }

    MySubject(){
        if(!this.IsLogin())return;
        this.navigate('Center/MySubject');
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
        marginLeft:16,
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
        justifyContent:"center",

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
        justifyContent:"flex-start",
    },
    moduleFaceWrap:{
        height:face_height,
        width:face_height,
    },
    moduleFace:{
        height:face_height,
        width:face_height
    },
});


