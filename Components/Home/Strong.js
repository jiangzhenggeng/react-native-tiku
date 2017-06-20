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
    ListView,
    RefreshControl,
    TouchableNativeFeedback,
    TouchableOpacity,
    InteractionManager,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ImmutableCompare from "../Common/ImmutableCompare";
import PageLoading from "../Common/PageLoading";
import HttpRequest from '../Common/HttpRequest';
import UnitTool from '../Common/UnitTool';
import UrlConfig from '../Common/Config/UrlConfig';
import styles from './Strong.styles';
import AddSubjectTipsPage from '../Common/AddSubjectTipsPage';

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
            subjectQuestionTypeListArray:[],
            dataSource:this.dataSource.cloneWithRows( [] ),
            isRefreshing:false,
            init:false,
        }
    }

    render() {
        if(this.state.subjectQuestionTypeListArray.length<=0){
            if( this.state.init ){
                return (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>强化练习</Text>
                        </View>
                        <AddSubjectTipsPage {...this.props} />
                    </View>
                );
            }
            return (<PageLoading />);
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>强化练习</Text>
                </View>

                <View style={{flex:1}}>
                    <ListView
                        showsVerticalScrollIndicator={false}
                        style={[{flex:1,}]}
                        initialListSize={10}
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

    componentDidMount() {
        HttpRequest.request(UrlConfig.getSubjectQuestionTypeList).then((replayData)=>{
            if(replayData.code==0){
                replayData.data = UnitTool.toArray(replayData.data);
                this.setState({
                    subjectQuestionTypeListArray:replayData.data,
                    dataSource:this.dataSource.cloneWithRows( replayData.data ),
                    isRefreshing:false,
                    init:true
                });
            }else if(replayData.code==-99){
                this.setState({
                    subjectQuestionTypeListArray:[],
                    isRefreshing:false,
                    init:true
                });
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }
        });

    }

    _renderHeader(){
        return (
            <View style={[{padding:0}]}>
                <View style={[styles.borderBottom,styles.loginStatus]}>
                    <Text style={{fontSize:15}}>争对性强化各种考试题型</Text>
                </View>
            </View>
        );
    }
    _onRefresh(){
        this.setState({isRefreshing:true});
        this.componentDidMount();
    }

    _renderRow( rowData, sectionID, rowID ){
        return (
            <View key={sectionID+'-'+rowID}>
                <View style={[styles.itemWrap]}>
                    <Text style={{fontSize:16,color:'#555555'}}>{rowData.subjectname}</Text>
                </View>
                <View style={[styles.itemBodyWrap]}>
                    {rowData.question_type && rowData.question_type.map((sub_item,sub_index)=>{
                        return (
                            <View style={[styles.cellItem]} key={sectionID+'-'+rowID+'-'+sub_index}>
                                <TouchableOpacity
                                    onPress={this.intoSubjectList.bind(this,rowData,sub_item)}
                                    style={[styles.touchPress]}
                                >
                                    <Icon name={sub_item.icon} size={22} color="#1682fb" />
                                    <Text style={{color:'#808080',fontSize:14,marginTop:5}}>{sub_item.typename}</Text>
                                </TouchableOpacity>
                            </View>
                        );

                    })}
                </View>
            </View>
        );
    }

    intoSubjectList(item,sub_item){
        let {goBack,state,navigate} = this.props.navigation;
        if(!global.memberid){
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            setTimeout(()=>{
                navigate('Common/Login/Login');
            },800);
            return;
        }

        navigate('Home/StrongChapterList',{
            typeid:sub_item.typeid,
            subjectid:item.subjectid,
            subjectname:item.subjectname
        });
    }
}


