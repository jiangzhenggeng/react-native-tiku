

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
import styles from './BuySubject.styles';

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
                <Text style={styles.title}>我的定制科目</Text>
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
                    <View style={[styles.buyBottomBtn,{backgroundColor:'#808080'}]}>
                        <TouchableHighlight
                            style={{flex:1,alignItems:'center',justifyContent:'center'}}
                            onPress={this.buySelectItem.bind(this)}
                            underlayColor={'rgba(0,0,0,0.06)'}
                        >
                            <Text style={styles.buyBottomBtnText}>取消定制科目</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }

    //购买按钮
    buySelectItem(){
        //ToastAndroid.show('取消失败',ToastAndroid.LONG);
    }

    componentWillMount() {
        global.selectItemIds = [];
    }

    componentWillUnmount() {
        global.selectItemIds = null;
    }

    componentDidMount() {
        global.selectItemIds = [];
        HttpRequest.request(UrlConfig.MyCenterHasSubjectList,{
            memberid:global.memberid
        }).then((replayData)=>{
            if( replayData.code==0 && replayData.data.my_subject ) {

                if( replayData.data.my_subject.length<=0 ){
                    ToastAndroid.show('没有数据',ToastAndroid.LONG);
                    this.goBack();
                    return;
                }

                this.setState({
                    mySubjectListArray: replayData.data.my_subject,
                    subjectListArray: replayData.data.subject,
                    dataSource: this.dataSource.cloneWithRows(replayData.data.subject),
                    //取消刷新
                    isRefreshing: false
                });
            }else{
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
                this.goBack();
            }
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
                        <Icon name={"ios-checkbox"} size={22} color={'#808080'} />
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










