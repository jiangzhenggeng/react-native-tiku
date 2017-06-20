/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TouchableNativeFeedback,
    ViewPagerAndroid,
    Platform,
    BackAndroid,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home/Home';
import Practice from './Home/Practice';
import Strong from './Home/Strong';
import MyCenter from './Home/MyCenter';
import SizeConfig from './Common/Config/SizeConfig';
import ImmutableCompare from './Common/ImmutableCompare';


export default class extends Component {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <ViewPagerAndroid
                    style={{flex:1,}}
                    initialPage={0}
                    scrollEnabled={false}
                    ref={viewPager => { this.viewPager = viewPager; }}
                    keyboardDismissMode="on-drag"
                    onPageSelected={this.onPageSelected.bind(this) }
                >
                    <View style={{flex:1,}}>
                        <Home {...this.props} />
                    </View>
                    <View style={{flex:1}}>
                        <Practice {...this.props} />
                    </View>
                    <View style={{flex:1}}>
                        <Strong {...this.props} />
                    </View>
                    {/*<View style={{flex:1}}>*/}
                        {/*<Consultant {...this.props} />*/}
                    {/*</View>*/}
                    <View style={{flex:1}}>
                        <MyCenter {...this.props} />
                    </View>
                </ViewPagerAndroid>

                <View style={{height:SizeConfig.top_tab_bar_height}}>
                    <TabBarBottomButton
                        ref={ (o) => { this.TabBarBottom = o }}
                        parent={this}
                        height={SizeConfig.top_tab_bar_height}
                    />
                </View>
            </View>
        );
    }

    onPageSelected(event){
        this.TabBarBottom.onViewPagerAndroidScrollEnd(event);
    }
}



import BottomBarButton from './Common/Config/HomeBottomBarConfig';
const listArray = BottomBarButton.home_bottom_bar_tabs;

class TabBarBottomButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:listArray[props.index||0].name,
        }
    }

    _onPressButton(selectedTab,page,parent){
        parent.viewPager.setPage( parseInt(page) );
        this.setState({
            selectedTab:selectedTab
        });
    }
    onViewPagerAndroidScrollEnd(event){
        this.setState({
            selectedTab:listArray[event.nativeEvent.position].name
        });
    }

    render() {
        let returnArray = [];

        for (let i in listArray){
            let select = this.state.selectedTab == listArray[i].name;
            let icon = select?listArray[i].selecticon:listArray[i].icon;
            let color = select?BottomBarButton.selectcolor:BottomBarButton.color;

            returnArray.push(
                <TouchableNativeFeedback
                    key={i}
                    style={{flex:1}}
                    onPress={this._onPressButton.bind(this,listArray[i].name,i,this.props.parent)}
                >
                    <View style={styles.moduleItemList}>
                        <Icon
                            name={icon}
                            size={listArray[i].iconSize||30}
                            color={color} />
                        <Text style={[{color:color},styles.text]}>{listArray[i].name}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return (
            <View style={[styles.tabBar,{height:this.props.height}]}>
                {returnArray}
            </View>
        );

    }
}



const styles = StyleSheet.create({
    tabBar: {
        alignItems:'stretch',
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderTopWidth:0.5,
    },
    moduleItemList:{
        flex:1,
        alignItems:'center',
        flexDirection:"column",
        justifyContent:"center",
    },
    text:{
        fontSize:10
    },
});


