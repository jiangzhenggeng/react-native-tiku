import React from 'react';
import {
    ActivityIndicator,
    View,
    Dimensions,
    Modal
} from 'react-native';

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

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
    }

    open(){
        this.setState({
            loading:true
        });
    }

    close(){
        this.setState({
            loading:false
        });
    }

    render() {
        return (
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
        )
    }
}

