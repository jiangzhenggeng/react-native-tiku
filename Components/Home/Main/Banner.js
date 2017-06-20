
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    TouchableWithoutFeedback,
    InteractionManager,
    Animated,
    Easing
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import UrlConfig from '../../Common/Config/UrlConfig';
import HttpRequest from '../../Common/HttpRequest';
import UnitTool from '../../Common/UnitTool';

const { width } = Dimensions.get('window')
const bili = 2.5;

const styles = {
    image: {
        width,
        flex: 1,
        height: width/bili,
        resizeMode: 'stretch'
    }
}

export default class extends Component {

    constructor(props){
        super(props);

        // 用于构建DataSource对象
        this.dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        // 实际的DataSources存放在state中
        this.state = {
            BANNER_IMGS:[],
            dataSource: this.dataSource.cloneWithPages([]),
            time:0
        }

    }

    _renderPage(data, pageID){
        return (
            <TouchableWithoutFeedback onPress={this.toWebView.bind(this,data.link)} style={{flex:1}}>
                <Image resizeMode='stretch' style={styles.image} source={{uri:data.image}} />
            </TouchableWithoutFeedback>
        );
    }

    render () {
        return (
            <View style={{height:width/bili}}>
                <ViewPager
                    style={{height:width/bili}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage.bind(this)}
                    isLoop={true}
                    autoPlay={true}
                    initialPage={0}
                    time={this.state.time}
                />
            </View>
        )
    }

    toWebView(url){
        let {navigate} = this.props.navigation;
        navigate('Common/WebView',{
            url:url,
            hideNav:true,
        });
    }

    componentDidMount() {
        HttpRequest.request(UrlConfig.getBannerList).then((replayData)=>{
            if(replayData.code==0 && UnitTool.getLength(replayData.data)){
                let data = UnitTool.toArray(replayData.data);
                this.setState({
                    BANNER_IMGS:data,
                    dataSource: this.dataSource.cloneWithPages( data ),
                });
            }
        });
        this.setState({
            time:3500
        });
    }
}