
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

const { width,height} = Dimensions.get('window');

const itemArray = [
    {
        name:"贡茶",
        selected:true,
    },
    {
        name:"大排档",
        selected:false,
    },
    {
        name:"第一大排档",
        selected:false,
    },
    {
        name:"果麦",
        selected:false,
    },
    {
        name:"星巴克",
        selected:false,
    },
    {
        name:"周黑鸭",
        selected:false,
    }
];

import ImmutableCompare from '../Common/ImmutableCompare';

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

    }

    TabText = [];
    TabView = [];
    bottomView = [];

    render() {

        return (
            <View style={[styles.headerTab,{backgroundColor:'#f7f7f7'}]}>
                <ScrollView
                    ref={ScrollView => { this.TabScrollView = ScrollView; }}
                    horizontal={true}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={[{backgroundColor:'#f7f7f7'}]}
                >
                    {itemArray.map((item, i) => {
                        let style = [styles.queryItem];
                        if(item.selected) style.push({color:'#1682fb'});
                        return (
                            <View ref={o=>this.TabView[i] = o} key={i} style={[styles.headerTabItem,{backgroundColor:'#f7f7f7'}]}>
                                <TouchableOpacity onPress={this._onPress.bind(this,i)}>
                                    <Text ref={ o => this.TabText[i] = o} style={style}>{item.name}</Text>
                                    <View ref={o=>this.bottomView[i] = o} style={{
                                        height: item.selected ? 1.5:0,
                                        backgroundColor:'#1682fb',
                                    }}></View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {

    }

    _onPress(i){
        this.props.parent.ScrollView.scrollTo({x : i * width});
        this.setPosition.apply(this,arguments);
    }

    setPosition(i){
        this.TabText.forEach((o,i)=>{
            o.setNativeProps({
                style:{
                    color:'#808080'
                }
            });
            this.bottomView[i].setNativeProps({
                style:{
                    height:0
                }
            });
        });
        this.TabText[i].setNativeProps({
            style:{
                color:'#1682fb'
            }
        });

        this.TabView[i].measure((x,y,w,h,px,py)=>{
            this.TabScrollView.scrollTo({x : px - 100 });

        });

        this.bottomView[i].setNativeProps({
            style:{
                height:1.5
            }
        });

    }
}

const styles = StyleSheet.create({
    headerTab:{
        height:45,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:16,
    },
    queryItem:{
        fontSize:16,
    },
    headerTabItem:{
        marginRight:16,
    },
});


