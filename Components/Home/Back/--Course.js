

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
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FooterLoading from '../Common/FooterLoading';
import CourseShow from '../Course/CourseShow';

const listArrayData = require('../../data/course.list.json');
const stylesHeader = StyleSheet.create({
    subHeader:{
        backgroundColor:'#ffffff',
        borderColor:'#f1f1f1',
        borderBottomWidth:0.7,
        padding:20,
        paddingLeft:16,
        paddingRight:16,

        alignItems:'stretch',
        flexDirection:"row",
        justifyContent:'space-between',
    },
    subHeaderItem:{
        flex:1,
        alignItems:'center',
    },
    subHeaderTitle:{
        color:'#595959',
        fontSize:16,
        textAlign:'center'
    },
    subHeaderLine:{
        borderColor:'#f1f1f1',
        borderLeftWidth:0.7,
        borderRightWidth:0.7,
    },
    refreshControlBase: {
        backgroundColor: 'transparent'
    }
});

var dataSource;

export default class extends Component {

    constructor(props){
        super(props);

        dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(listArrayData),
            isRefreshing:false,
            isLoadMore:false
        };
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>视频课程</Text>
                </View>

                <ListView
                    style={styles.itemContainer}
                    initialListSize={1}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}

                    onEndReached={() => this._onEndReached()}
                    onEndReachedThreshold={100}
                    refreshControl={
                        <RefreshControl
                            ref={(o)=>this.RefreshControl = o}
                            style={styles.refreshControlBase}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="Loading..."
                            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    }
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID){
        rowData.number = String(Math.random() * 1000).replace(/\.\d+/g,'');
        return (
            <TouchableNativeFeedback
                key={rowData.cover}
                style={{flex:1}}
                onPress={this._onPressButton.bind(this,rowData.title)}
            >
                <View style={styles.itemWrap}>
                    <View style={styles.imageWrap}>
                        <Image style={styles.image} source={{uri:rowData.cover}} resizeMode='stretch'></Image>
                    </View>
                    <View style={styles.descWrap}>
                        <View>
                            <Text style={styles.itemTitle}>{rowData.title}</Text>
                        </View>
                        <View style={styles.rightBottom}>
                            <View style={styles.bottomIcon}>
                                <Icon name='ios-cart-outline' color='#585858' size={16} />
                                <Text style={[styles.itemSubTitle,{marginLeft:5}]}>{rowData.number}</Text>
                            </View>
                            <View>
                                <Text style={[styles.itemSubTitle]}>{rowData.name.length>10?rowData.name.substr(0,10)+'...':rowData.name}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
    _renderFooter(){
        return (
            <FooterLoading ref={(o)=>this.Loading = o} />
        );
    }
    _renderHeader(){
        return (

            <View style={stylesHeader.subHeader}>
                    <TouchableOpacity style={[stylesHeader.subHeaderItem]}>
                        <Icon name="ios-checkbox-outline" color="#1682fb" size={30}/>
                        <Text style={stylesHeader.subHeaderTitle}>实战课程</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylesHeader.subHeaderItem,stylesHeader.subHeaderLine]}>
                        <Icon name="ios-barcode-outline" color="#1682fb" size={30}/>
                        <Text style={stylesHeader.subHeaderTitle}>线下课程</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylesHeader.subHeaderItem]}>
                        <Icon name="ios-chatboxes-outline" color="#1682fb" size={30}/>
                        <Text style={stylesHeader.subHeaderTitle}>课程咨询</Text>
                    </TouchableOpacity>
            </View>
        );
    }

    _onEndReached(){
        this.Loading.loadingMore(true);

        setTimeout(()=>{
            this.setState({
                isRefreshing:false,
            });
            this.Loading.loadingMore(false);
        },2000);
    }

    _onRefresh(){

        this.setState({
            isRefreshing:true,
        });
        setTimeout(() => {
            this.setState({
                isRefreshing:false,
            });
            // this.RefreshControl.setNativeProps({
            //     isRefreshing:false,
            // });
        }, 3000);
    }

    _onPressButton(){
        this.props.navigator.push({
            component: CourseShow,
            args: {
                pageType: 0,
                title: "搜索面板"
            }
        });
    }
}

const header_height = 50;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:header_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",

    },

    itemContainer:{
    },
    itemWrap:{
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderBottomWidth:0.7,
        padding:10,
        paddingLeft:16,
        paddingRight:16,

        alignItems:'stretch',
        flexDirection:"row",
    },
    imageWrap:{

    },
    image:{
        height:80,
        width:120,
    },
    descWrap:{
        flex:1,
        position:'relative',
        marginLeft:10,
    },
    itemTitle:{
        color:'#595959',
        fontSize:16,
        lineHeight:22
    },
    itemSubTitle:{
        color:'#a3a3a3',
        fontSize:12,
    },
    rightBottom:{
        flex:1,
        alignItems:'center',
        flexDirection:"row",
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        justifyContent:'space-between',
    },
    bottomIcon:{
        alignItems:'center',
        flexDirection:"row",
    },
});


