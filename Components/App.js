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
    Platform,
    ToastAndroid
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import BottomTabBar from './BottomTabBar.android';
import SplashScreen from 'react-native-splash-screen';
import SizeConfig from './Common/Config/SizeConfig';
import Storage from './Common/Storage';
import userLoginStatus from './Common/Config/KeylConfig';

import AppConfig from './AppConfig';

class MainScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            init:false
        };
    }

    render() {
        if(!this.state.init){
            return <View />
        }

        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor={SizeConfig.statu_bar_background_color}
                    barStyle={SizeConfig.statu_bar_style}
                />
                <BottomTabBar {...this.props} />
            </View>
        );
    }

    componentDidMount() {
        Storage.initSet( () => {
            InteractionManager.runAfterInteractions(() => {
                // storage.remove({
                //     key: userLoginStatus.userLoginStatus
                // });
                // return;
                this.setState({
                    init:true
                },()=>{
                    setTimeout(()=>{
                        SplashScreen.hide();
                    },10);
                });
            });
        });
        // let lastClickTime = new Date().getTime();
        // this.backPressHandle = BackHandler.addEventListener('backPress', ()=>{
        //     if (Platform.OS === 'android') {
        //         let now = new Date().getTime();
        //
        //         if (now - lastClickTime < 1000 ) {
        //             return false;
        //         }
        //         lastClickTime = now;
        //         ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        //         return true;
        //     }
        //     return true;
        // });
    }

    componentWillUnmount(e) {
        this.backPressHandle && this.backPressHandle.remove();
    }
}


const AppNavigator = StackNavigator({
    Index:{
        screen:MainScreen
    },
    ...AppConfig
}, {
    initialRouteName: 'Index',
    // initialRouteName: 'Center/info/InfoList',
    headerMode: 'none',
    mode:'card',
});

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







