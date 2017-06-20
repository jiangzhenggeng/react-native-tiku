import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import CheckboxButton from './CheckboxButton'

const defaultSize = 20
const defaultThickness = 1
const defaultColor = '#007AFF'

export default  class CheckboxGroup extends Component{
    constructor(props, context){
        super(props, context)

        this.state = {
            selectedValue: this.props.selectedValue || [],
            disabled:this.props.disabled || false
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

    onSelect(isSelected, value){
        if(this.state.disabled) return;

        if(isSelected){
            this.state.selectedValue = [...this.state.selectedValue,value];
        }else{
            let temp = [];
            for(let i = 0;i<this.state.selectedValue.length;i++){
                if(this.state.selectedValue[i]!=value){
                    temp.push(this.state.selectedValue[i]);
                }
            }
            this.state.selectedValue = temp;
        }

        if(this.props.onSelect){
            this.props.onSelect( this.state.selectedValue );
        }
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
        var radioButtons = React.Children.map(this.props.children, (radioButton) => {
            let isSelected = false;
            for(let i = 0;i<this.state.selectedValue.length;i++){
                if(this.state.selectedValue[i]==radioButton.props.value){
                    isSelected = true;
                    break;
                }
            }

            return (
                <CheckboxButton
                    color={this.props.color}
                    {...radioButton.props}
                    isSelected={isSelected}
                    wrap={this}
                >
                    {radioButton.props.children}
                </CheckboxButton>
            )
        })

        return(
            <View style={this.props.style}>
                {radioButtons}
            </View>
        )
    }
}

CheckboxGroup.childContextTypes = {
    onSelect: React.PropTypes.func.isRequired,
    size: React.PropTypes.number.isRequired,
    thickness: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    highlightColor: React.PropTypes.string,
}

CheckboxGroup.defaultProps = {
    size: defaultSize,
    thickness: defaultThickness,
    color: defaultColor,
    highlightColor: null,
}