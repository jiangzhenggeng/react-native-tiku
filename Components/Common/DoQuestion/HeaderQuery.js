/**
 * Created by jiangzg on 2017/5/29.
 */


import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from "../../Common/ImmutableCompare";

export default class extends Component{

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        this.state = {
            icon:'ios-heart-outline',
        };
    }

    render(){
        return (
            <Icon name={this.state.icon} size={26} color="#fff" />
        );
    }
    update(status){
        if(status==1){
            this.setState({
                icon:'ios-heart',
            });
        }else{
            this.setState({
                icon:'ios-heart-outline',
            });
        }
    }
}