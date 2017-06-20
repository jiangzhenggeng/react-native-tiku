

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
    ActivityIndicator
} from 'react-native';


export default class extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoadMore:false
        };
    }

    render() {
        if (this.state.isLoadMore) {
            return (
                <View style={styles.footerContainer}>
                    <ActivityIndicator
                        style={[{height: 30}]}
                        size="small"
                    />
                    <Text style={styles.footerText}>
                        数据加载中······
                    </Text>
                </View>
            );
        }
        return <View />;
    }
    loadingMore(loading){
        this.setState({
            isLoadMore:loading
        });
    }
}

const styles = StyleSheet.create({
    footerContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 10,
        color:'#a3a3a3'
    },
});


