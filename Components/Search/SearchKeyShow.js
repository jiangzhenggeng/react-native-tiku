
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
    ViewPagerAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from '../Common/ImmutableCompare';

import {
    CoordinatorLayoutAndroid,
    AppBarLayoutAndroid,
    TabLayoutAndroid,
    NestedScrollViewAndroid,
    ExtraDimensionsAndroid,
    PopupWindowAndroid,
    GravityAndroid
} from 'mao-rn-android-kit';

const itemArray = [
    {
        name:"会计基础",
        selected:true,
    },
    {
        name:"财经法规",
        selected:false,
    },
    {
        name:"电算化",
        selected:false,
    },
    {
        name:"初级实务",
        selected:false,
    },
    {
        name:"中级实务",
        selected:false,
    },
    {
        name:"经济法基础",
        selected:false,
    },
    {
        name:"高级经济法",
        selected:false,
    }
];


export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        this.state = {
            viewPagerKey:null
        };

    }

    render() {
        if(this.state.viewPagerKey==null) return <View></View>;

        return (
            <View style={[styles.headerTab]}>
                <CoordinatorLayoutAndroid
                    style={{flex:1}}
                    ref={(component) => this.coordinatorLayout = component}
                    fitsSystemWindows={false} >
                    <AppBarLayoutAndroid
                        ref={(component) => this.appbar = component}
                        layoutParams={{height: 38}}
                        style={{ backgroundColor:"#f7f7f7" }}  >
                        <TabLayoutAndroid
                            ref={(component) => this.tabLayout = component}
                            tabMode="scrollable"
                            tabSelectedTextColor="#1682fb"
                            tabIndicatorColor="#1682fb"
                            tabTextColor="#808080"
                            tabIndicatorHeight={1}
                            tabTextSize={5}
                            tabSidePadding={10}
                            tabHeight={38} />
                    </AppBarLayoutAndroid>

                    <ViewPagerAndroid
                        ref={(compoent) => this.viewPager = compoent}
                        style={{ flex: 1 }}
                        key={this.state.viewPagerKey}
                    >
                        {itemArray.map((item, i) => {
                            return (
                                <View key={i} style={{flex:1}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="ios-construct-outline" size={50} color="#1682fb"/>
                                        <Text style={{color:'#1682fb',fontSize:18,marginLeft:15}}>{item.name}正在开发中...</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ViewPagerAndroid>
                </CoordinatorLayoutAndroid>
            </View>
        );
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                viewPagerKey:(new Date()).getTime()
            },()=>{
                this.coordinatorLayout.setScrollingViewBehavior(this.viewPager);
                let temp = [];
                for (let i in  itemArray){
                    temp.push({
                        text:itemArray[i].name
                    });
                }
                this.tabLayout.setViewPager(this.viewPager, temp, true);
            });

        });
    }
}

const styles = StyleSheet.create({
    headerTab:{
        flex:1,
    },
    queryItem:{
        fontSize:16,
    },
    headerTabItem:{
        marginRight:16,
    },
});


