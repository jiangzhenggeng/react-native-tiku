/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component} from 'react';

import {
    Text,
    View,
    InteractionManager,
    StatusBar,
    BackHandler,
    Image,
    ToastAndroid
} from 'react-native';
import { StackNavigator,TabNavigator,NavigationActions } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import SplashScreen from 'react-native-splash-screen';
import SizeConfig from './Common/Config/SizeConfig';
import Storage from './Common/Storage';
import AppConfig from './AppConfig';
import Home from './Home/Home';
import Practice from './Home/Practice';
import Strong from './Home/Strong';
import MyCenter from './Home/MyCenter';
import Icon from 'react-native-vector-icons/Ionicons';

class MainHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            init:false
        };
    }

    render() {
        return this.state.init?(
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor={SizeConfig.statu_bar_background_color}
                    barStyle={SizeConfig.statu_bar_style}
                />
                <Home {...this.props} />
            </View>
        ):<View />;
    }

    componentDidMount() {
        Storage.initSet( () => {
            InteractionManager.runAfterInteractions(() => {
                this.setState({
                    init:true
                },()=>{
                    setTimeout(()=>{
                        SplashScreen.hide();
                    },10);
                });
            });
        });
    }

    componentWillUnmount(e) {
        this.backPressHandle && this.backPressHandle.remove();
    }
}

const size = 30,color = 'rgb(128,128,128)',selectcolor = '#1682fb';

const  MainScreen = TabNavigator({
    MainHome: {
        screen: MainHome,
        navigationOptions : {
            tabBarLabel: '考试',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon
                    name={focused?'ios-bookmarks':'ios-bookmarks-outline'}
                    size={size}
                    color={tintColor}
                />
            ),
        }
    },
    Practice: {
        screen: Practice,
        navigationOptions : {
            tabBarLabel: '练习',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon
                    name={focused?'ios-appstore':'ios-appstore-outline'}
                    size={size}
                    color={tintColor}
                />
            ),
        }
    },
    Strong: {
        screen: Strong,
        navigationOptions : {
            tabBarLabel: '强化',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon
                    name={focused?'ios-book':'ios-book-outline'}
                    size={size}
                    color={tintColor}
                />
            ),
        }
    },
    MyCenter: {
        screen: MyCenter,
        navigationOptions : {
            tabBarLabel: '我的',
            tabBarIcon: ({focused,tintColor}) => (
                <Icon
                    name={focused?'ios-contact':'ios-contact-outline'}
                    size={size}
                    color={tintColor}
                />
            ),
        }
    },
},{
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: selectcolor, // 文字和图片选中颜色
        inactiveTintColor: color, // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0
        },
        style: {
            backgroundColor: '#ffffff', // TabBar 背景色
            height:56,
            borderColor:'#f1f1f1',
            borderTopWidth:0.5,
        },
        labelStyle: {
            fontSize: 12,
            top:-5,
            position:'relative',
        }
    },
});

const AppNavigator = StackNavigator({
    MainScreen:{
        screen:MainScreen
    },
    ...AppConfig
}, {
    headerMode: 'none',
    mode:'card',
    transitionConfig:()=>({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
});

/**
 * 处理安卓返回键
 */
const defaultStateAction = AppNavigator.router.getStateForAction;
let lastBackPressed = Date.now();
AppNavigator.router.getStateForAction = (action,state) => {
    if(state && action.type === NavigationActions.BACK && state.routes.length === 1) {
        if (lastBackPressed + 2000 < Date.now()) {
            ToastAndroid.show('点击两次退出',ToastAndroid.SHORT);
            lastBackPressed = Date.now();
            const routes = [...state.routes];
            return {
                ...state,
                ...state.routes,
                index: routes.length - 1,
            };
        }
    }
    return defaultStateAction(action,state);
};


export default () => <AppNavigator onNavigationStateChange={(prevState, currentState) => {

    const getCurrentRouteName = (navigationState) => {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return getCurrentRouteName(route);
        }
        return route.routeName;
    }

    const currentScreen = getCurrentRouteName(currentState);
    const prevScreen = getCurrentRouteName(prevState);

    if (prevScreen !== currentScreen) {

    }
}} />;







