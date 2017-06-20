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
    ToastAndroid,
    FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import ImmutableCompare from "../Common/ImmutableCompare";
import PageLoading from "../Common/PageLoading";
import HttpRequest from '../Common/HttpRequest';
import UrlConfig from '../Common/Config/UrlConfig';
import SizeConfig from '../Common/Config/SizeConfig';
import DoQuestion from '../Common/DoQuestion/DoQuestion';


export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        this.state = {
            ListArray:[],
            user:global.loginState,
        }

        let {navigate,goBack} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;

    }

    render() {
        if(this.state.ListArray.length<=0){
            return (
                <View style={styles.container}>
                    <View style={[styles.header,styles.borderFix]}>
                        <View style={{width:30}}>
                            <TouchableOpacity onPress={()=>{this.goBack()}}>
                                <Icon name="ios-arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>练习记录</Text>
                    </View>
                    <PageLoading />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={[styles.header,styles.borderFix]}>
                    <View style={{width:30}}>
                        <TouchableOpacity onPress={()=>{this.goBack()}}>
                            <Icon name="ios-arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>练习记录</Text>
                </View>
                <View style={[styles.moduleItemWrap]}>
                    <FlatList
                        style={[{flex:1,}]}
                        data={this.state.ListArray}
                        ListHeaderComponent={this._renderHeader.bind(this)}
                        renderItem={this._renderRow.bind(this)}
                        renderFooter={()=><View style={[{height:10}]}></View>}
                        refreshing={false}
                        onRefresh={this._onRefresh.bind(this)}
                        keyExtractor={(item, index) => item.practiceid}
                    />
                </View>
            </View>
        );
    }

    _renderHeader(){
        return (
            <View style={[{padding:0}]}></View>
        );
    }
    _onRefresh(){
        this.componentDidMount();
    }
    _renderRow( item ){
        let rowData = item.item;
        return (
            <View style={styles.bottomLine}>
                <TouchableNativeFeedback onPress={this.intoSubjectList.bind(this,rowData)} style={{flex:1}}>
                    <View style={[styles.borderFix]}>
                        <View style={[styles.subHeader]}>
                            <Text style={{fontSize:16,color:'#555555',marginRight:5,}}>{rowData.title}</Text>
                            {rowData.subjectname?<Text style={styles.subject}>{rowData.subjectname}</Text>:<Text></Text>}
                        </View>
                        <View style={[styles.subBody]}>
                            <Text style={[{color:'#999', fontSize:14}]}>{rowData.addtime}</Text>
                            <Text style={[{color:'#999', fontSize:14, marginLeft:10}]}>共{rowData.donumber}/{rowData.totalnumber}道</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.practice_list,{
            memberid:global.memberid,
        }).then((replayData)=>{
            if(replayData.code!=0){
                return;
            }
            InteractionManager.runAfterInteractions(() => {
                this.setState({
                    ListArray:replayData.data
                });
            });
        });
    }

    intoSubjectList(item){
        global.__EXAM__ = 'PRACTICE';
        this.navigate('Common/DoQuestion/DoQuestion',{
            submitUrl:UrlConfig.practice_question_save,
            getQuestionUrl:UrlConfig.practice_get_question_list,
            getQuestionDetail:UrlConfig.practice_get_question_detail,
            data:{
                memberid:global.memberid,
                treeid:item.treeid,
                practiceid:item.practiceid,
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
        flexDirection:'row',
        alignItems:'center',
    },
    moduleItemWrap:{
        flex:1
    },
    subBody:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    },
    subject:{
        borderColor:'#1682fb',
        borderWidth:0.5,
        padding:2,
        paddingTop:0,
        paddingBottom:0,
        borderRadius:3,
        color:'#1682fb',
    },
    bottomLine:{
        borderColor:'#eee',
        borderBottomWidth:0.7,
        padding:10,
        paddingLeft:0,
        paddingRight:0,
    }
});











