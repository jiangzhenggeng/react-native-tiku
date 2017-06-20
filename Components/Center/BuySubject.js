

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableHighlight,
    ListView,
    InteractionManager,
    ToastAndroid,
    RefreshControl
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import PageLoading from '../Common/PageLoading';
import UrlConfig from '../Common/Config/UrlConfig';
import HttpRequest from '../Common/HttpRequest';
import WebView from '../Common/WebView';
import styles from './BuySubject.styles';
import Login from '../Common/Login/Login';

import { NavigationActions } from 'react-navigation'
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


export default class extends Component {
    constructor(props){
        super(props);

        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            mySubjectListArray:[],
            subjectListArray:[],
            dataSource:this.dataSource.cloneWithRows([]),
            isRefreshing:true,
        };

        let {navigate,goBack,state} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.props_state = state;

    }
    render(){
        let header = (
            <View style={[styles.header,styles.borderFix]}>
                <View style={{width:30}}>
                    <TouchableNativeFeedback onPress={()=>{this.goBack()}}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" />
                    </TouchableNativeFeedback>
                </View>
                <Text style={styles.title}>定制我的科目</Text>
            </View>
        );
        if(this.state.subjectListArray.length<=0){
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
                <View style={[{flex:1,position:'relative'}]}>
                    <ListView
                        showsVerticalScrollIndicator={false}
                        style={[{flex:1,marginBottom:50,}]}
                        initialListSize={10}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        renderFooter={()=><View style={{height:10}}></View>}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                title="Loading..."
                                colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                            />
                        }
                    />
                    <View style={styles.buyBottomBtn}>
                        <TouchableHighlight
                            style={{flex:1,alignItems:'center',justifyContent:'center'}}
                            onPress={this.buySelectItem.bind(this)}
                            underlayColor={'rgba(0,0,0,0.06)'}
                        >
                            <Text style={styles.buyBottomBtnText}>定制选择科目</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }

    //购买按钮
    buySelectItem(){
        if(!global.selectItemIds.length){
            ToastAndroid.show('请先选择定制科目',ToastAndroid.LONG);
            return;
        }

        if(!global.memberid){
            this.navigate('Common/Login/Login',{
                callBack:this.buySelectItem,
            });
            return;
        }

        HttpRequest.request(UrlConfig.SubjectCustomization,{
            subject_ids:global.selectItemIds,
            memberid:global.memberid
        }).then((replayData)=>{
            if(replayData.code==0){
                ToastAndroid.show(replayData.message || '定制成功',ToastAndroid.LONG);
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Index'})
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }else{
                ToastAndroid.show(replayData.message || '系统错误',ToastAndroid.LONG);
            }
        });

        // HttpRequest.request(UrlConfig.MyCenterSubjectPay,{
        //     subject_ids:global.selectItemIds,
        //     memberid:global.memberid
        // }).then((replayData)=>{
        //     if(replayData.code!=0){
        //         ToastAndroid.show(replayData.message || '系统错误',ToastAndroid.LONG);
        //         return;
        //     }else if(replayData.data.url){
        //         this.navigate('Common/WebView',{
        //             url:replayData.data.url,
        //         });
        //
        //         RCTDeviceEventEmitter.addListener('center_subject_refresh',()=>{
        //             this.setState({
        //                 isRefreshing: true,
        //                 subjectListArray:[],
        //             },()=>{
        //                 this.componentDidMount();
        //             });
        //         });
        //
        //     }else{
        //         ToastAndroid.show(replayData.message || '系统错误',ToastAndroid.LONG);
        //     }
        // });
    }

    componentWillMount() {
        global.selectItemIds = [];
    }

    componentWillUnmount() {
        global.selectItemIds = null;
    }

    componentDidMount() {
        global.selectItemIds = [];
        HttpRequest.request(UrlConfig.NoBuySubjectList,{
            memberid:global.memberid
        }).then((replayData)=>{
            InteractionManager.runAfterInteractions(() => {
                this.setState({
                    mySubjectListArray:replayData.data.my_subject,
                    subjectListArray:replayData.data.subject,
                    dataSource:this.dataSource.cloneWithRows( replayData.data.subject ),
                    //取消刷新
                    isRefreshing:false
                });
            });
        });
    }
    _onRefresh(){
        this.setState({isRefreshing:true});
        this.componentDidMount();
    }

    _renderRow( rowData, sectionID, rowID ){
        return (
            <View key={sectionID+'-'+rowID}>
                <View style={[styles.subHeader]}>
                    <Text style={[styles.fixText]}>{rowData.majorname}</Text>
                </View>
                <View style={[styles.subBody]}>
                    {rowData.subject?rowData.subject.map((subject_item,subject_index)=>{
                        return (
                            <View style={[styles.subCellWrap]} key={subject_index}>
                                <SelectSubjectItem {...this.props} subject_item={subject_item} subject_index={subject_index} />
                            </View>
                        );
                    }):''}
                </View>
            </View>
        );
    }

}


class SelectSubjectItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected:false,
        };

        let {navigate,goBack,state} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.props_state = state;

    }
    selected(subjectid){
        this.setState({
            selected:!this.state.selected,
        },()=>{
            global.selectItemIds.forEach((item,index)=>{
                if( item==subjectid ){
                    global.selectItemIds.splice(index,1);
                }
            });
            this.state.selected && global.selectItemIds.push( subjectid );
        });
    }
    render() {
        return (
            <TouchableHighlight
                style={{flex:1}}
                onPress={this.selected.bind(this,this.props.subject_item.subjectid)}
                underlayColor={'rgba(0,0,0,0.06)'}
            >
                <View style={[styles.subItemWrap]}>
                    <View style={[styles.checkBox]}>
                        <Icon name={this.state.selected?"ios-checkbox":'ios-square-outline'} size={22} color={this.state.selected?'#1682fb':'#808080'} />
                    </View>
                    <View style={styles.subItemInner}>
                        <Text style={[styles.fixText]}>{this.props.subject_item.subjectname}</Text>
                    </View>
                    <View style={styles.borderBottom}></View>
                </View>
            </TouchableHighlight>
        );
    }
}










