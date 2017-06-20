/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Navigator,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Exam from './Home/Exam';
import Practice from './Home/Practice';
import Strong from './Home/Strong';
import Consultant from './Home/Consultant';
import MyCenter from './Home/MyCenter';
import SizeConfig from './Common/Config/SizeConfig';
import ImmutableCompare from './Common/ImmutableCompare';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'题库'
        }

        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
    }

    render() {

        return (
            <TabBarIOS>
                <Icon.TabBarItem
                    title="题库"
                    selected={this.state.selectedTab === '题库'}
                    iconName="ios-bookmarks-outline"
                    selectedIconName="ios-bookmarks"
                    onPress={() => {
                        this.setState({
                            selectedTab: '题库',
                        });
                    }}
                >
                    <Exam {...this.props} />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="课程"
                    selected={this.state.selectedTab === '课程'}
                    iconName="ios-easel-outline"
                    selectedIconName="ios-easel"
                    onPress={() => {
                        this.setState({
                            selectedTab: '课程',
                        });
                    }}
                >
                    <Practice {...this.props}/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="问答"
                    selected={this.state.selectedTab === '问答'}
                    iconName="ios-chatbubbles-outline"
                    selectedIconName="ios-chatbubbles"
                    onPress={() => {
                        this.setState({
                            selectedTab: '问答',
                        });
                    }}
                >
                    <Strong {...this.props}/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="资讯"
                    selected={this.state.selectedTab === '资讯'}
                    iconName="ios-globe-outline"
                    selectedIconName="ios-globe"
                    onPress={() => {
                        this.setState({
                            selectedTab: '资讯',
                        });
                    }}
                >
                    <Consultant {...this.props}/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="我的"
                    selected={this.state.selectedTab === '我的'}
                    iconName="ios-contact-outline"
                    selectedIconName="ios-contact"
                    onPress={() => {
                        this.setState({
                            selectedTab: '我的',
                        });
                    }}
                >
                    <MyCenter {...this.props}/>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}


const styles = StyleSheet.create({
    navContainer: {

    },
});


