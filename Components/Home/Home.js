
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    ListView,
    TouchableNativeFeedback,
    RefreshControl,
    TouchableOpacity,
    TextInput,
    Navigator,
    TouchableWithoutFeedback,
    ViewPagerAndroid,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from '../Common/ImmutableCompare';
import Banner from './Main/Banner';
import TouchBtnWrap from '../Common/TouchBtnWrap';

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.state = {
            init:false
        };
        this.navigate = this.props.navigation.navigate;
    }

    render() {
        let size = 30,st = '-outline',color = '#1682fb';
        return (
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    <Banner {...this.props}></Banner>
                    <View style={styles.wrap}>
                        <View style={styles.wrapRow}>
                            <View style={[styles.wrapCell]}>
                                <TouchBtnWrap onPress={this.toExam.bind(this)}>
                                    <View style={styles.innerCell}>
                                        <Icon color={color} name={'ios-bookmarks'+st} size={size} />
                                        <Text>考试</Text>
                                    </View>
                                </TouchBtnWrap>
                            </View>
                            <View style={styles.wrapCellLine} />
                            <View style={styles.wrapCell}>
                                <TouchBtnWrap onPress={this.toMoni.bind(this)}>
                                    <View style={styles.innerCell}>
                                        <Icon color={color} name={'ios-browsers'+st} size={size} />
                                        <Text>模拟</Text>
                                    </View>
                                </TouchBtnWrap>
                            </View>
                        </View>
                        <View style={styles.wrapRow}>
                            <View style={styles.wrapCell}>
                                <TouchBtnWrap onPress={this.toWenDa.bind(this)}>
                                    <View style={styles.innerCell}>
                                        <Icon color={color} name={'ios-help-circle'+st} size={size} />
                                        <Text>问答</Text>
                                    </View>
                                </TouchBtnWrap>
                            </View>
                            <View style={styles.wrapCellLine} />
                            <View style={styles.wrapCell}>
                                <TouchBtnWrap onPress={this.toDaGang.bind(this)}>
                                    <View style={styles.innerCell}>
                                        <Icon color={color} name={'ios-cube'+st} size={size} />
                                        <Text>大纲</Text>
                                    </View>
                                </TouchBtnWrap>
                            </View>
                        </View>
                        <View style={styles.wrapRow}>
                            <View style={styles.wrapCell}>
                                <TouchBtnWrap onPress={this.toKeCheng.bind(this)}>
                                    <View style={styles.innerCell}>
                                        <Icon color={color} name={'ios-desktop'+st} size={size} />
                                        <Text>课程</Text>
                                    </View>
                                </TouchBtnWrap>
                            </View>
                            <View style={styles.wrapCellLine} />
                            <View style={styles.wrapCell}></View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    checkogin(){
        if(!global.memberid){
            this.navigate('Common/Login/Login');
            return false;
        }
        return true;

    }

    toExam(){
        this.checkogin() && this.navigate('Home/Main/Exam');
    }
    toMoni(){
        this.checkogin() && this.navigate('Home/Main/Moni');
    }
    toWenDa(){
        this.tips();
    }
    toDaGang(){
        this.tips();
    }
    toKeJian(){
        this.tips();
    }
    toKeCheng(){
        this.tips();
    }

    tips(){
        this.checkogin() && alert('努力开发中');
    }
}

const styles = StyleSheet.create({
    wrap:{
        flex:1,
        marginTop:10,
    },
    wrapRow:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#fff',
        height:110,
        alignItems:'center',
        borderColor:'#f1f1f1',
        borderBottomWidth:1,
    },
    wrapCellLine:{
        backgroundColor:'#f1f1f1',
        width:1,
        alignSelf:'stretch',
    },
    wrapCell:{
        flex:1,
        alignItems:'stretch',
    },
    innerCell:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});


