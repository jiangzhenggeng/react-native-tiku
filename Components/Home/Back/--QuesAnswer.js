
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
import SearchView from '../Search/SearchView';
import SearchKeyShow from '../Search/SearchKeyShow';

export default class extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.searchWrap}>
                        <View style={styles.searchBox}>
                            <TouchableWithoutFeedback onPress={this.onPressSearch.bind(this)}>
                                <View style={styles.searchInner}>
                                    <Icon name='ios-search' size={20} color="#d5e8f7"/>
                                    <TextInput
                                        style={styles.searchText}
                                        onChangeText={ text => this.TextInputValue = text }
                                        placeholder= "请输入搜索关键字"
                                        placeholderTextColor="#d5e8f7"
                                        defaultValue="搜索"
                                        underlineColorAndroid='transparent'
                                        selectionColor="#d5e8f7"
                                        editable={false}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <SearchKeyShow />
                </View>
            </View>
        );
    }

    onPressSearch(){
        this.props.navigator.push({
            component: SearchView
        });
    }
}


const header_height = 50;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:header_height,
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


