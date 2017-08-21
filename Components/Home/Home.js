
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
    Platform,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Banner from './Main/Banner';
import TouchBtnWrap from '../Common/TouchBtnWrap';

export default class extends Component {

    constructor(props){
        super(props);
        this.state = {
            init:false
        };
        this.scrollY = new Animated.Value(0);
        this.navigate = this.props.navigation.navigate;
    }

    render() {
        let size = 30,st = '-outline',color = '#1682fb';

        let keyOpaticy = this.scrollY.interpolate({
            inputRange: [0,180],
            outputRange: [0, 1]
        });

        return (
            <View style={{flex:1}}>
                <ScrollView
                    style={{flex:1}}
                    stickyHeaderIndices={[0,2]}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.scrollY}}}]
                    )}>

                    <View style={{position:'relative'}}>
                        <Animated.View style={[styles.headerAnimete,{
                            opacity: keyOpaticy
                        }]}>
                            <View style={[styles.header,{justifyContent:'flex-start'}]}>
                                <Text style={styles.title}>云题库</Text>
                            </View>
                        </Animated.View>
                    </View>

                    <Banner {...this.props}></Banner>
                    <View style={{position:'relative'}}>
                        <Text>哈哈哈哈</Text>
                    </View>
                    <View style={styles.wrap}>
                        <View style={[styles.wrapRow,]}>
                            <View style={[styles.wrapCell,]}>
                                <TouchBtnWrap onPress={this.toExam.bind(this)}>
                                    <View style={[styles.innerCell]}>
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
                        <View style={[styles.wrapRow,]}>
                            <View style={[styles.wrapCell,]}>
                                <TouchBtnWrap onPress={this.toExam.bind(this)}>
                                    <View style={[styles.innerCell]}>
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
                        <View style={[styles.wrapRow,]}>
                            <View style={[styles.wrapCell,]}>
                                <TouchBtnWrap onPress={this.toExam.bind(this)}>
                                    <View style={[styles.innerCell]}>
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
                        <View style={[styles.wrapRow,]}>
                            <View style={[styles.wrapCell,]}>
                                <TouchBtnWrap onPress={this.toExam.bind(this)}>
                                    <View style={[styles.innerCell]}>
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
    headerAnimete:{
        // position:'absolute',
        // top:0,
        // left:0,
        // right:0,
        // height:50,
        // zIndex:3,
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


