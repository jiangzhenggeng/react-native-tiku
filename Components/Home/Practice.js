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
import UnitTool from '../Common/UnitTool';
import UrlConfig from '../Common/Config/UrlConfig';
import styles from './Practice.styles';
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
            subjectListArray:[],
            dataSource:this.dataSource.cloneWithRows( [] ),
            init:false,
            user:global.loginState,
            isRefreshing:false,
        }
        this.navigate = this.props.navigation.navigate;
    }

    render() {
        if(this.state.subjectListArray.length<=0){
            if(this.state.init ){
                return (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>练习中心</Text>
                        </View>
                        <AddSubjectTipsPage {...this.props} />
                    </View>
                );
            }
            return (<PageLoading {...this.props} />);
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>练习中心</Text>
                </View>
                <View style={[styles.moduleItemWrap]}>
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

    _renderHeader(){
        return (
            <View style={[{padding:0}]}>
                <View style={[styles.borderBottom,styles.loginStatus]}>
                    <Text style={{fontSize:15}}>每个章节海量试题，无坚不摧</Text>
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
                <View style={[styles.borderFix,styles.subHeader]}>
                    <Text style={{fontSize:16,color:'#555555'}}>{rowData.majorname}</Text>
                </View>
                <View style={[styles.subBody]}>
                    {rowData.subject?rowData.subject.map((subject_item,subject_index)=>{
                        return (
                            <View style={[styles.subCellWrap]} key={subject_index}>
                                <TouchableNativeFeedback onPress={this.intoSubjectList.bind(this,subject_item)} style={{flex:1}}>
                                    <View style={[styles.subItemInner]}>
                                        <Icon style={styles.subject_icon} name={subject_item.icon} size={22} color={'#1682fb'} />
                                        <Text style={[styles.fixText]}>{subject_item.shortname||subject_item.subjectname.substr(0,5)}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        );
                    }):''}
                </View>
            </View>
        );
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.practice_get_subject_list).then((replayData)=>{
            if(replayData.code==0){
                replayData.data = UnitTool.toArray(replayData.data);
                this.setState({
                    subjectListArray:replayData.data,
                    dataSource:this.dataSource.cloneWithRows( replayData.data ),
                    isRefreshing:false,
                    init:true
                });
            }else if(replayData.code==-99){
                this.setState({
                    subjectListArray:[],
                    isRefreshing:false,
                    init:true
                });
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }
        });
    }

    intoSubjectList(item){

        if(!global.memberid){
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            this.navigate('Common/Login/Login');
            return;
        }
        this.navigate('Home/PracticeChapterList',{
            subjectid:item.subjectid,
            subjectname:item.subjectname
        });
    }
}














