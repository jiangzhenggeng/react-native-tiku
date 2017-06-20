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
import PageLoading from "../Common/PageLoading";
import HttpRequest from '../Common/HttpRequest';
import UrlConfig from '../Common/Config/UrlConfig';
import SizeConfig from '../Common/Config/SizeConfig';
import UnitTool from '../Common/UnitTool';


export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            ListArray:[],
            dataSource:this.dataSource.cloneWithRows( [] ),
            init:false,
            user:global.loginState,
            isRefreshing:false,
        }

        let {navigate,goBack} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;

    }

    render() {
        let header = (
            <View style={[styles.header,styles.borderFix,{justifyContent:'flex-start'}]}>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={()=>{
                        this.goBack.call(this);
                    }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.title]}>我的试题</Text>
            </View>
        );
        if(this.state.ListArray.length<=0){
            return (
                <View style={styles.container}>
                    {header}
                    <PageLoading />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {header}
                <View style={[styles.moduleItemWrap]}>
                    <ListView
                        showsVerticalScrollIndicator={false}
                        style={[{flex:1,}]}
                        initialListSize={15}
                        dataSource={this.state.dataSource}
                        renderHeader={this._renderHeader.bind(this)}
                        renderRow={this._renderRow.bind(this)}
                        renderFooter={()=><View style={[{height:10}]}></View>}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                title="Loading..."
                                colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                            />
                        }
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
        this.setState({isRefreshing:true});
        this.componentDidMount();
    }
    _renderRow( rowData, sectionID, rowID ){
        return (
            <View key={sectionID+'-'+rowID} style={styles.bottomLine}>
                <TouchableNativeFeedback onPress={this.intoSubjectList.bind(this,rowData)}>
                    <View style={[styles.borderFix,{flex:1}]}>
                        <Icon name={rowData.icon} size={24} color="#1682fb" style={{marginRight:10}}/>
                        <View style={[styles.subHeader]}>
                            <Text style={{fontSize:16,color:'#555555',marginRight:5,}}>{rowData.subjectname}</Text>
                        </View>
                        <Text style={[{color:'#999', fontSize:14, marginRight:10}]}>{rowData.number}</Text>
                        <View>
                            <Icon name="ios-arrow-forward" size={18} color="#e6e6e6"/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.get_error_subject_list,{
            memberid:global.memberid,
        }).then((replayData)=>{
            if(replayData.code==0){
                replayData.data = UnitTool.toArray(replayData.data);
                if(replayData.data.length<=0){
                    ToastAndroid.show('你还没有定制科目',ToastAndroid.LONG);
                    this.goBack();
                    return;
                }
                this.setState({
                    ListArray:replayData.data,
                    dataSource:this.dataSource.cloneWithRows( replayData.data ),
                    isRefreshing:false
                });
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
                this.goBack();
            }
        });
    }

    intoSubjectList(item){
        global.__EXAM__ = 'PRACTICE';
        this.navigate('Common/DoQuestion/DoQuestion',{
            submitUrl:UrlConfig.ErrorQuestionSubmit,
            getQuestionUrl:UrlConfig.ErrorQuestionList,
            getQuestionDetail:UrlConfig.ErrorQuestionDetail,
            data:{
                memberid:global.memberid,
                subjectid:item.subjectid
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
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
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
        flexWrap:'wrap',
        flex:1,
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
        height:65,
        paddingLeft:0,
        paddingRight:0
    }
});











