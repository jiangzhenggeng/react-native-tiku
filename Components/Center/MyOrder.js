

import React, { Component } from 'react'
import {
    Text,
    View,
    Animated,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    BackAndroid,
    InteractionManager,
    LayoutAnimation,
    ToastAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import PageLoading from '../Common/PageLoading';
import UrlConfig from '../Common/Config/UrlConfig';
import SizeConfig from '../Common/Config/SizeConfig';
import HttpRequest from '../Common/HttpRequest';
import DoQuestion from '../Common/DoQuestion/DoQuestion';
import Login from '../Common/Login/Login';

class OpenChapter  extends Component {

    constructor(props){
        super(props);
        this.state = {
            icon:'ios-add-circle',
            init:false
        };

        let {navigate,goBack,state} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.props_state = state;

    }
    render(){
        return(
            <TouchableWithoutFeedback style={{flex:1}} onPress={this._openOrClose.bind(this)}>
                <Icon name={this.state.icon} size={24} color="#1682fb"/>
            </TouchableWithoutFeedback>
        );
    }

    _openOrClose(){

        this.state.init = this.props.parent.chapterSubHeight;

        if(this.state.icon=='ios-add-circle'){
            this.setState({
                'icon':'ios-remove-circle'
            });

            this.props.parent.chapterSub[this.props.index].setNativeProps({
                style:{
                    height:this.state.init[this.props.index],
                }
            });
        }else{
            this.setState({
                'icon':'ios-add-circle'
            });
            this.props.parent.chapterSub[this.props.index].setNativeProps({
                style:{
                    height: 0
                }
            });
        }
    }
}

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            chapterListArray:[],
            count:0
        };
    }
    render(){

        if(this.state.chapterListArray.length<=0){
            return (
                <View style={styles.container}>
                    <View style={[styles.header,styles.borderFix]}>
                        <View style={{width:30}}>
                            <TouchableOpacity onPress={()=>{this.props.navigator.pop()}}>
                                <Icon name="ios-arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>{this.props.subjectname}</Text>
                    </View>
                    <PageLoading />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={[styles.header,styles.borderFix]}>
                    <View style={{width:30}}>
                        <TouchableOpacity onPress={()=>{this.props.navigator.pop()}}>
                            <Icon name="ios-arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{this.props.subjectname}</Text>
                </View>
                <ScrollView style={{backgroundColor:'transparent'}}>
                    <View style={[{flex:1}]}>
                        <View style={[styles.subHeader,styles.borderFix]}>
                            <View style={[{flex:1,paddingTop:15,paddingBottom:10}]}>
                                <Text style={[{color:'#1682fb',marginBottom:5}]}>题海练习</Text>
                                <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                                    <Text style={[{color:'#808080',fontSize:12,marginBottom:3}]}>题目总数</Text>
                                    <Text style={[{color:'#1682fb',fontSize:20,marginLeft:10}]}>{this.state.count}</Text>
                                </View>
                                <View style={styles.rightBtnWrap}>
                                    <View style={styles.rightBtnBox}>
                                        <TouchableOpacity>
                                            <Text style={[{color:'#fff',fontSize:18}]}>智能抽题</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.treeList}>
                            {this._chapterCellList()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    chapterSub = [];
    chapterSubHeight = [];

    _chapterCellList(){
        let arr = [],sub = [],sub_array = [];
        for(let i in this.state.chapterListArray){
            let array = this.state.chapterListArray[i];
            sub = [];
            if(('child' in array) && array.child.length){
                for(let k in array.child) {
                    sub_array = array.child[k];
                    let w = 9;
                    let style = {left:48,top:0,right:0,backgroundColor:'#f1f1f1',height:0.8,position:'absolute'};

                    sub.push(
                        <View key={k} style={[styles.borderFix, styles.treeItemBox,{height:48,position:'relative'}]}>
                            <View style={{width:20}}>
                                <View style={{flex:1,alignItems:'center',justifyContent:'center', position:'relative'}}>
                                    <View style={{zIndex:1,width:w,height:w, borderRadius:w/2, backgroundColor:"#1682fb"}}></View>
                                    <View style={{zIndex:0,left:9.3,top:0,bottom:0,width:0.6,flex:1,backgroundColor:"#eee",position:'absolute'}}></View>
                                </View>
                            </View>
                            <View style={[{flex: 1, marginLeft: 10}]}>
                                <Text style={[{fontSize: 14, color: '#585858'}]}>{sub_array.chaptername}</Text>
                            </View>
                            <View style={[styles.rightIcon]}>
                                <TouchableOpacity onPress={this._doQuestion.bind(this,sub_array.treeid)} style={{alignItems:'center'}}>
                                    <Icon name="ios-create-outline" size={24} color="#1682fb"/>
                                    <Text style={[{fontSize: 12, color: '#1682fb'}]}>{sub_array.number}道</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style}></View>
                        </View>
                    );
                }
            }

            arr.push(
                <View style={[styles.treeItem]} key={i}>
                    <View style={[styles.borderFix,styles.treeItemBox]}>
                        <View>
                            <OpenChapter index={i} parent={this} />
                        </View>
                        <View style={[{flex:1,marginLeft:10}]}>
                            <Text style={[{fontSize:14,color:'#585858'}]}>{array.chaptername}</Text>
                        </View>
                        <View style={[styles.rightIcon]}>
                            <TouchableOpacity onPress={this._doQuestion.bind(this,array.treeid)} style={{alignItems:'center'}}>
                                <Icon name="ios-create-outline" size={24} color="#1682fb"/>
                                <Text style={[{fontSize:12,color:'#1682fb'}]}>{array.number}道</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View ref={o=>this.chapterSub[i]=o} onLayout={(e)=>{
                        if(!this.chapterSubHeight[i]){
                            this.chapterSubHeight[i]=e.nativeEvent.layout.height;
                            this.chapterSub[i].setNativeProps({
                                style:{
                                    height:0
                                }
                            });
                        }
                    }}>{sub}</View>
                </View>
            );
        }
        return arr;
    }

    componentWillMount() {
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.get_chapter_list,{
            subjectid:this.props.subjectid
        }).then((replayData)=>{
            InteractionManager.runAfterInteractions(() => {
                this.setState({
                    chapterListArray:replayData.data.chapterList,
                    count:replayData.data.count
                });
            });
        });
    }

    _doQuestion(treeid){
        if(!global.memberid){
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            setTimeout(()=>{
                this.props.navigator.push({
                    component: Login,
                });
            },800);
            return;
        }
        this.props.navigator.push({
            component: DoQuestion,
            args: {
                treeid:treeid
            }
        });
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
    subHeader:{
        backgroundColor:"#ffffff",
        position:'relative',
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        marginTop:5,
    },
    rightBtnWrap:{
        position:'absolute',
        right:0,
        top:0,
        bottom:0,
        justifyContent:'center',
    },
    rightBtnBox:{
        height:40,
        width:100,
        backgroundColor:'#1682fb',
        alignItems:'center',
        justifyContent:'center',
    },

    treeList:{
        flex:1,
    },
    treeItem:{
        backgroundColor:"#ffffff",
        paddingTop:5,
        paddingBottom:5,
        marginBottom:3,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },
    treeItemBox:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    rightIcon:{
        justifyContent:'center',
        alignItems:'center',
    },
});
