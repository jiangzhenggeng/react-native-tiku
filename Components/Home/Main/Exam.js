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
    InteractionManager,
    ToastAndroid,
    ListView,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ImmutableCompare from "../../Common/ImmutableCompare";
import PageLoading from "../../Common/PageLoading";
import UnitTool from './../../Common/UnitTool';
import HttpRequest from '../../Common/HttpRequest';
import UrlConfig from '../../Common/Config/UrlConfig';
import AddSubjectTipsPage from '../../Common/AddSubjectTipsPage';
import TouchBtnWrap from '../../Common/TouchBtnWrap';

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
            ExamListArray:[],
            dataSource:this.dataSource.cloneWithRows( [] ),
            init:false,
            user:global.loginState,
            isRefreshing:false
        }
        this.navigate = this.props.navigation.navigate;
        this.goBack = this.props.navigation.goBack;
    }

    render() {
        let header = (
            <View style={[styles.header,{justifyContent:'flex-start'}]}>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={o=>this.goBack()}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>在线考试</Text>
            </View>
        );
        if( !this.state.init ){
            return (
                <View style={{flex:1}}>
                    {header}
                    <PageLoading />
                </View>
            );
        }else if( this.state.ExamListArray.length<=0 ){
            return (
                <View style={styles.container}>
                    {header}
                    {this.state.noPaper?
                        <AddSubjectTipsPage {...this.props} title="没有发布试卷" noBtn={true} />:
                        <AddSubjectTipsPage {...this.props} />
                    }
                </View>
            );
        }
        return (
            <View style={[styles.container,]}>
                {header}
                <View style={{flex:1}}>
                    <ListView
                        showsVerticalScrollIndicator={true}
                        style={[{flex:1}]}
                        initialListSize={10}

                        dataSource={this.state.dataSource}

                        renderHeader={this._renderHeader.bind(this)}
                        renderRow={this._renderRow.bind(this)}

                        renderFooter={()=><View style={[{height:0}]}></View>}

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

    _renderRow( item, sectionID, rowID ){
        return (
            <View key={sectionID+'-'+rowID} style={styles.moduleItemList}>
                <View
                    style={{flex:1,}}
                    onPress={this.doQuestion.bind(this,item.paperid)}
                >
                    <View style={styles.descWrap}>
                        <View style={styles.descWrapInner}>
                            <View>
                                <Text style={[styles.itemTitle,{lineHeight:26}]}>{item.papername}</Text>
                            </View>
                            <View style={styles.bottomBox}>
                                <View style={styles.rightBottom}>
                                    <View style={styles.bottomIcon}>
                                        <Icon name='ios-school-outline' color='#585858' size={16} />
                                        <Text style={[styles.itemSubTitle,{marginLeft:5}]}>{item.online_number}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.itemSubTitle]}>{item.subjectname.length>15?item.subjectname.substr(0,15)+'...':item.subjectname}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _onRefresh(){
        this.setState({isRefreshing:true});
        this.componentDidMount();
    }

    _renderHeader(){
        return <View {...this.props}></View>;
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.getSubjectExamList,{
            type:1
        }).then((replayData)=>{
            if(replayData.code==0){
                replayData.data = UnitTool.toArray(replayData.data);
                this.setState({
                    ExamListArray:replayData.data,
                    dataSource:this.dataSource.cloneWithRows( replayData.data ),
                    isRefreshing:false,
                    init:true,
                    //noPaper:true
                });
            }else if(replayData.code==-99){
                this.setState({
                    ExamListArray:[],
                    isRefreshing:false,
                    init:true
                });
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
            }
        });
    }

    doQuestion(paperid){

        let {navigate} = this.props.navigation;

        if(!global.memberid){
            navigate('Common/Login/Login');
            return;
        }
        global.__EXAM__ = 'EXAM';//'SHOW_ANSWER';//
        navigate('Common/DoQuestion/DoQuestion',{
            submitUrl:UrlConfig.ExamSubmitUrl,
            getQuestionUrl:UrlConfig.ExamQuestionList,
            getQuestionDetail:UrlConfig.ExamQuestionDetail,
            data:{
                paperid:paperid,
                memberid:global.memberid,
                type:1
            }
        });
    }

    login(){
        let {navigate} = this.props.navigation;
        if(this.state.user){
            navigate('Home/MyCenter');
        }else{
            navigate('Common/Login/Login');
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    header:{
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor:"#1682fb",
        position:'relative',
        height:50,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",

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
        overflow: 'hidden'
    },
    moduleFace:{
        height:32,
        width:32,
        overflow: 'hidden'
    },
    moduleItemWrap:{
    },
    moduleItemList:{
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },
    moduleWenda:{
        borderColor:'#f1f1f1',
        borderTopWidth:0.5,
        flexDirection:"row",
        alignItems:"stretch",
        flexWrap:'wrap',
        marginTop:15,
        marginBottom:15
    },


    itemContainer:{
    },
    itemWrap:{
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderBottomWidth:0.7,
        padding:10,
        paddingLeft:16,
        paddingRight:16,

        alignItems:'stretch',
        flexDirection:"row",
    },
    imageWrap:{

    },
    image:{
        height:80,
        width:120,
    },
    descWrap:{
        flex:1,
        padding:16,
        paddingTop:10,
        paddingBottom:10,
    },
    descWrapInner:{
        position:'relative',
    },
    itemTitle:{
        color:'#595959',
        fontSize:17,
        lineHeight:22
    },
    itemSubTitle:{
        color:'#a3a3a3',
        fontSize:12,
    },
    bottomBox:{
        marginTop:5,
        position:'relative',
    },
    rightBottom:{
        flex:1,
        alignItems:'center',
        flexDirection:"row",
        bottom:0,
        left:0,
        right:0,
        justifyContent:'space-between',
    },
    bottomIcon:{
        alignItems:'center',
        flexDirection:"row",
    },
});
