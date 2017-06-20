

import React, { Component } from 'react'
import {
    Text,
    View,
    Animated,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    BackAndroid,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import SizeConfig from '../Common/Config/SizeConfig';

export default class SearchView extends Component {
    constructor(props){
        super(props)
    }
    render(){

        return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchWrap}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={ ()=>this.props.navigator.pop() }>
                            <Icon name="ios-arrow-round-back-outline" size={40} color="#d5e8f7" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchBox}>
                        <View style={styles.searchInner}>
                            <Icon name='ios-search' size={20} color="#d5e8f7"/>
                            <TextInput
                                style={styles.searchText}
                                onChangeText={ text => this.TextInputValue = text }
                                placeholder= "请输入搜索关键字"
                                placeholderTextColor="#d5e8f7"
                                defaultValue=""
                                clearButtonMode="while-editing"
                                underlineColorAndroid='transparent'
                                selectionColor="#ffffff"
                                enablesReturnKeyAutomatically={true}
                                autoFocus={true}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex:1}}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.head}>
                        <Text style={{fontSize: 13, color: "#585858"}}>{"历史搜索"}</Text>
                        <TouchableOpacity>
                            <Icon name={"ios-trash"} size={18} color="#585858" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.queryList}>
                        {["小恒水饺", "贡茶", "麻辣小龙虾", "油焖大虾", "龙虾", "黄焖鸡"].map((item, i) => {
                            return (
                                <View key={i} style={{marginRight: 12,marginBottom:12}}>
                                    <TouchableOpacity>
                                        <Text style={styles.queryItem}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                    <View style={styles.head}>
                        <Text style={{fontSize: 13, color: "#1682fb"}}>{"热门搜索"}</Text>
                    </View>
                    <View style={styles.queryList}>
                        {["贡茶", "大排档", "第一大排档", "果麦", "星巴克", "周黑鸭"].map((item, i) => {
                            return (
                                <View key={i} style={{marginRight: 12,marginBottom:12}}>
                                    <TouchableOpacity>
                                        <Text style={styles.queryItem}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
        )
    }


    _onPressSearch(){
        this.props.navigator.push({
            component: SearchView
        });
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', ()=>{
                const routers = this.props.navigator.getCurrentRoutes();
                if (routers.length > 1) {
                    this.props.navigator.pop();
                    return true;
                }
                return true;
            });
        }
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,
    },
    searchWrap:{
        flex:1,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:16,
        paddingRight:16,
    },
    searchBox:{
        flex: 1,
        height: 35,
    },
    searchInner:{
        flex: 1,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchText:{
        borderWidth: 0,
        color:'#d5e8f7',
        padding:0,
        flex: 1,
        fontSize: 15,
        marginLeft:10,
    },
    back:{
        width:35,
    },
    head:{
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    queryList:{
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    queryItem: {
        flex: 1,
        fontSize: 13,
        color: "#666",
        borderWidth:1,
        borderColor: "#bbb",
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 4
    },
    scrollView: {

    }
})
