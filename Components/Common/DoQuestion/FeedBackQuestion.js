

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    InteractionManager,
    ScrollView,
    Dimensions,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from "../../Common/ImmutableCompare";
import {DecideGroup,DecideButton} from '../../Common/RadioButton';
import HttpRequest from '../../Common/HttpRequest';
import UrlConfig from '../Config/UrlConfig';

import PageLoading from '../../Common/PageLoading';
const { width } = Dimensions.get('window');
export default class FeedBackQuestion extends Component {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.state = {
            visible:false,
            questionid:null
        };
    }

    render(){

        if(this.state.questionid<=0){
            return (
                <Modal
                    ref={o=>this.Modal=o}
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={this.closeSheet.bind(this)}
                >
                    <PageLoading />
                </Modal>
            );
        }

        this.type = 3;

        return (
            <Modal
                ref={o=>this.Modal=o}
                animationType={"slide"}
                transparent={false}
                visible={this.state.visible}
                onRequestClose={this.closeSheet.bind(this)}
            >
                <View style={{flex:1,}}>
                    <View style={styles.header}>
                        <View style={{width:40,height:40}}>
                            <TouchableOpacity onPress={this.closeSheet.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Icon name="ios-close" size={40} color="#585858"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>反馈信息填写</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[styles.wrapBox,styles.fix]}>
                            <View style={{marginBottom:20,}}>
                                <DecideGroup
                                    onSelect = { (index, value)=>{
                                        this.type = value;
                                    } }
                                    selectedValue={3}
                                    style={styles.ckeckBoxGroup}
                                >
                                    <DecideButton value={3} style={styles.DecideButton}>
                                        <Text style={{fontSize:16,color:'#808080'}}>答案错误</Text>
                                    </DecideButton>
                                    <DecideButton value={1} style={styles.DecideButton}>
                                        <Text style={{fontSize:16,color:'#808080'}}>题目错误</Text>
                                    </DecideButton>
                                    <DecideButton value={2} style={styles.DecideButton}>
                                        <Text style={{fontSize:16,color:'#808080'}}>题目歧义</Text>
                                    </DecideButton>
                                    <DecideButton value={4} style={styles.DecideButton}>
                                        <Text style={{fontSize:16,color:'#808080'}}>答案歧义</Text>
                                    </DecideButton>
                                    <DecideButton value={5} style={styles.DecideButton}>
                                        <Text style={{fontSize:16,color:'#808080'}}>其他</Text>
                                    </DecideButton>
                                </DecideGroup>
                            </View>
                            <View style={styles.blankTextInputBox}>
                                <TextInput
                                    style={styles.blankTextInput}
                                    onChangeText={ text => this.TextInputValue = text }
                                    placeholder= "填写反馈信息"
                                    placeholderTextColor="#bbb"
                                    defaultValue=""
                                    clearButtonMode="while-editing"
                                    underlineColorAndroid='transparent'
                                    selectionColor="#ffffff"
                                    enablesReturnKeyAutomatically={true}
                                    multiline={true}
                                    textAlignVertical="top"
                                />
                            </View>
                            <View style={styles.submitQuestionBtn}>
                                <TouchableOpacity onPress={this.submitFeedBack.bind(this)} style={{
                                    flex:1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <Text style={{color:'#fff',fontSize:16}}>提交</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    _submit = false;
    submitFeedBack(){

        if(this._submit){
            ToastAndroid.show('正在提交中~',ToastAndroid.LONG);
            return;
        }

        this._submit = true;

        HttpRequest.request(UrlConfig.feed_back_submit,{
            questionid:global.questionid,
            description: this.TextInputValue,
            type:this.type,
            memberid:global.memberid
        }).then((replayData)=>{
            if(replayData.code==0){
                ToastAndroid.show(replayData.message || '提交成功',ToastAndroid.LONG);
                this.closeSheet();
            }else{
                ToastAndroid.show(replayData.message || '提交出错',ToastAndroid.LONG);
            }
            this._submit = false;
        });
    }

    openFeedBack(o){
        this.setState({
            visible:true,
        });
        InteractionManager.runAfterInteractions(()=>{
            this.setState({
                visible:true,
                questionid:o.questionid
            });
        });
    }

    closeSheet(){
        this.setState({
            visible:false
        });
    }

}

const styles = StyleSheet.create({
    fix:{
        paddingLeft:16,
        paddingRight:16,
    },
    wrapBox:{
        flex:1,
        marginTop:16
    },
    ckeckBoxGroup:{
        flexDirection:'row',
        flexWrap:'wrap',
        overflow:'hidden',
        alignItems:'flex-start',
    },
    DecideButton:{
        width: (width - 32) / 3,
    },
    header:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },

    blankTextInputBox:{
        flex:1,
        borderColor:'#e6e6e6',
        borderWidth:0.8,
        height:120,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:3,
    },
    blankTextInput:{
        color:'#585858',
        fontSize:16,
        flex:1,
    },
    submitQuestionBtn:{
        backgroundColor:'#1682fb',
        height:45,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20,
    },
});
