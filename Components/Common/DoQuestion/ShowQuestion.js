

import React, { Component } from 'react'
import {View,InteractionManager} from 'react-native'

import UrlConfig from '../Config/UrlConfig';
import HttpRequest from '../../Common/HttpRequest';
import GetQuestionType from '../../Common/GetQuestionType';
import PageLoading from '../../Common/PageLoading';

import Accounting from '../DoQuestion/type/Accounting';
import Blank from '../DoQuestion/type/Blank';
import Checked from '../DoQuestion/type/Checked';
import Decide from '../DoQuestion/type/Decide';
import Essayques from '../DoQuestion/type/Essayques';
import Multiple from '../DoQuestion/type/Multiple';
import Radio from '../DoQuestion/type/Radio';
import Synthesis from '../DoQuestion/type/Synthesis';

export default class ShowQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionDetail:[],
            init:false,
            loading:false,
            hide:false,
        };
    }
    render(){
        if(!this.state.init && !this.state.loading) return (<View />);

        if(this.state.loading) return (<PageLoading />);

        if( this.state.hide) return (<View />);

        let typeObject = GetQuestionType(this.props.typeid),
            addtionProps = {
                typename:typeObject.name,
                questionDetail:this.state.questionDetail
            };

        if(this.props.typeid==1){
            return (<Radio {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==2){
            return (<Checked {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==3){
            return (<Decide {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==4){
            return (<Multiple {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==5){
            return (<Essayques {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==6){
            return (<Accounting {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==7){
            return (<Blank {...this.props} {...addtionProps} />);
        }else if(this.props.typeid==8){
            return (<Synthesis {...this.props} {...addtionProps} />);
        }
    }

    getQuestionDetail(callBack){
        if(!this.state.init){
            this.setState({
                loading:true,
            });

            const { params } = this.props.navigation.state;

            HttpRequest.request(params.getQuestionDetail,{
                questionid:this.props.questionid,
                memberid:global.loginState?global.loginState.memberid:0
            }).then((replayData)=>{
                InteractionManager.runAfterInteractions(() => {
                    this.setState({
                        init:true,
                        loading:false,
                        questionDetail:replayData.data
                    },()=>{
                        this.collection = replayData.data.collection||0;
                        if(typeof callBack=='function'){
                            callBack(this);
                        }
                    });
                });
            });
        }else if(typeof callBack=='function'){
            callBack(this);
        }

        if( this.state.hide ){
            this.setState({
                hide:false,
            });
        }
    }

    hide(){
        this.setState({
            hide:true,
            loading:false,
        });
    }

}



