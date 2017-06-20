import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import DecideButton from './DecideButton'

const defaultSize = 20
const defaultThickness = 1
const defaultColor = '#007AFF'

export default  class DecideGroup extends Component{
    constructor(props, context){
        super(props, context)

        this.state = {
            selectedValue: this.props.selectedValue,
        }

        this.onSelect = this.onSelect.bind(this)
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
        if( this.props.wrap && this.props.wrap.disabled ) return;

        if(this.props.onSelect){
            this.props.onSelect(index, value)
        }

        this.setState({
            selectedValue: value
        })
    }

    render(){
        var radioButtons = React.Children.map(this.props.children, (radioButton, index) => {
            return (
                <DecideButton
                    color={this.props.color}
                    {...radioButton.props}
                    index={index}
                    isSelected={this.state.selectedValue == radioButton.props.value}
                    wrap={this.props.wrap}
                >
                    {radioButton.props.children}
                </DecideButton>
            )
        })

        return(
            <View style={this.props.style}>
                {radioButtons}
            </View>
        )
    }
}

DecideGroup.childContextTypes = {
    onSelect: React.PropTypes.func.isRequired,
    size: React.PropTypes.number.isRequired,
    thickness: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    highlightColor: React.PropTypes.string,
}

DecideGroup.defaultProps = {
    size: defaultSize,
    thickness: defaultThickness,
    color: defaultColor,
    highlightColor: null,
}