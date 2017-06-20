import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';

export default class DecideButton extends Component{
    constructor(props, context){
        super(props, context)
        this.height = 30;
    }

    componentWillReceiveProps(nextProps){
		this.setState({
			selectedIndex: nextProps.selectedIndex
		})
	}

    getRadioStyle(){
        return {
            height: this.height,
	        width: this.height,
	        borderRadius: this.height / 2,
	        borderWidth: this.context.thickness,
	        borderColor: this.context.color,
        }
    }

    getRadioDotStyle(){
        return {
            height: this.height / 2,
            width: this.height / 2,
            borderRadius: this.height / 4,
            backgroundColor: this.props.color,
        }
    }

    isSelected(){
        if(this.props.isSelected)
            return <View style={this.getRadioDotStyle()}/>
    }
    render(){

        let disabled = this.props.wrap?this.props.wrap.disabled:false;

        var {children} = this.props;
        let inner = (
            <View style={[styles.container, this.props.style, this.props.isSelected?{backgroundColor: this.context.highlightColor}:null]}>
                <View style={[styles.radio, this.getRadioStyle()]}>
                    {this.isSelected()}
                </View>
                <View style={styles.item}>
                    {children}
                </View>
            </View>
        );
        let props = {
            underlayColor:'rgba(0,0,0,0.06)',
            onPress:() => this.context.onSelect(this.props.index, this.props.value)
        }
        let returnCompont = <View />;
        if( disabled ){
            returnCompont = (
                <View>
                    <TouchableWithoutFeedback {...props}>{inner}</TouchableWithoutFeedback>
                </View>
            );
        }else{
            returnCompont = (
                <View>
                    <TouchableHighlight {...props}>{inner}</TouchableHighlight>
                </View>
            );
        }
        return returnCompont;

    }
}

DecideButton.contextTypes = {
        onSelect: React.PropTypes.func.isRequired,
        size: React.PropTypes.number.isRequired,
        thickness: React.PropTypes.number.isRequired,
        color: React.PropTypes.string.isRequired,
        highlightColor: React.PropTypes.string
    }

let styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        flexDirection: 'row',
        paddingBottom:12,
        paddingTop:12,
    },
    radio:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex:1,
        marginLeft: 10,
        justifyContent: 'center',
    }
})