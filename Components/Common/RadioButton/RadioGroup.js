import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import RadioButton from './RadioButton'

const defaultSize = 20
const defaultThickness = 1
const defaultColor = '#007AFF'

export default  class RadioGroup extends Component{
    constructor(props, context){
        super(props, context)

        this.state = {
            selectedValue: this.props.selectedValue,
            disabled:this.props.disabled || false
        }
        this.onSelect = this.onSelect.bind(this);
    }

    getChildContext() {
        return {
            onSelect: this.onSelect , 
            size: this.props.size,
            thickness: this.props.thickness,
            color: this.props.color,
            highlightColor: this.props.highlightColor
        };
    }

    onSelect(index, value){
        if(this.state.disabled) return;

        this.setState({
            selectedValue: value
        })
        if(this.props.onSelect)
            this.props.onSelect(index, value)
    }
    setDisabled(){
        this.setState({
            disabled:true
        });
    }
    setAbled(){
        this.setState({
            disabled:false
        });
    }

    render(){
        var radioButtons = React.Children.map(this.props.children, (radioButton, index) => {
            return (
                <RadioButton
                    color={this.props.color}
                    {...radioButton.props}
                    index={index}
                    isSelected={this.state.selectedValue == radioButton.props.value}
                    wrap={this}
                >
                    {radioButton.props.children}
                </RadioButton>
            )
        })

        return(
            <View style={this.props.style}>
                {radioButtons}
            </View>
        )
    }
}

RadioGroup.childContextTypes = {
    onSelect: React.PropTypes.func.isRequired,
    size: React.PropTypes.number.isRequired,
    thickness: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    highlightColor: React.PropTypes.string,
}

RadioGroup.defaultProps = {
    size: defaultSize,
    thickness: defaultThickness,
    color: defaultColor,
    highlightColor: null,
}