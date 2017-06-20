import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    ActivityIndicator,
    View,
    Text,
    ToastAndroid,
    Dimensions,
    Modal
} from 'react-native'

var ImagePicker = require('react-native-image-picker');

const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const { width,height } = Dimensions.get('window');

let my_styles = {
    wrap:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0)',
    },
    loading:{
        position:'absolute',
        width:100,
        height:100,
        flex:1,
        left:width/2 - 50,
        top:height/2 - 50,
        zIndex:99999,
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:10,
    }
}

class CameraButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
    }
    render() {
        return (
            <TouchableOpacity
                onPress={this.showImagePicker.bind(this)}
                style={[this.props.style,styles.cameraBtn]}>
                <View>
                    {this.props.children}
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.loading}
                    onRequestClose={() => {
                        this.setState({
                            loading:false
                        });
                    }}
                    style={my_styles.loading}
                >
                    <View style={my_styles.wrap}>
                        <ActivityIndicator
                            size="large"
                            color="#1682fb"
                            style={my_styles.loading}
                        />
                    </View>
                </Modal>
            </TouchableOpacity>
        )
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }

            else {
                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }

                this.setState({
                    loading:true
                });
                this.props.callBack && this.props.callBack(file,response.fileName,response)
                    .then(result=>{
                        this.setState({
                            loading:false
                        })
                    })
            }
        });
    }
}
const styles = StyleSheet.create({
    cameraBtn: {
        padding:5
    },
    count:{
        color:'#fff',
        fontSize:12
    },
    fullBtn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    countBox:{
        position:'absolute',
        right:-5,
        top:-5,
        alignItems:'center',
        backgroundColor:'#34A853',
        width:16,
        height:16,
        borderRadius:8,
        justifyContent:'center'
    }
});

export default CameraButton;