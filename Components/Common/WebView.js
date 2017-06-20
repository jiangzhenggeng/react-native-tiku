/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    WebView,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SizeConfig from '../Common/Config/SizeConfig';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class extends Component {

    constructor(props){
        super(props);
        let {navigate,goBack,state} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.props_state = state;
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {this.props_state.params.hideNav?<View/>:
                <View style={[styles.header,styles.borderFix]}>
                    <View style={{width:30}}>
                        <TouchableNativeFeedback onPress={()=>{
                            this.Back();
                        }}>
                            <Icon name="ios-arrow-back" size={30} color="#fff" />
                        </TouchableNativeFeedback>
                    </View>
                    <Text style={styles.title}>支付订单</Text>
                </View>}

                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.props_state.params.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={false}
                    onMessage={this._onMessage.bind(this)}
                />
            </View>
        );
    }
    onNavigationStateChange(){

    }
    onShouldStartLoadWithRequest(){

    }

    _onMessage(event){
        if(event.nativeEvent.data=='back'){
            this.Back();
        }
    }
    Back(){
        this.goBack();
        RCTDeviceEventEmitter.emit('center_subject_refresh');
        RCTDeviceEventEmitter.removeListener('center_subject_refresh');
    }
}

const styles = StyleSheet.create({
    webView:{
        flex:1,
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    borderFix:{
        paddingLeft:16,
        paddingRight:16,
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",

    },
});


