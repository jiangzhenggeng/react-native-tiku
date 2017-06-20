'use strict';

import {ToastAndroid} from 'react-native';
const HOST = 'http://ac.jiangzg.com/index.php';

export default {

    request (url, body) {
        url = HOST + url;
        body = body || {};
        body.memberid = global.memberid || 0;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then((response) => {
                if(!response.ok){
                    ToastAndroid.show('数据错误', ToastAndroid.LONG);
                }
                return response.text();

            }).then(response => {
                response = String(response).replace(/^\s+|\s+$/,'');
                let first = response.substr(0,1);
                let last  = response.substr(-1,1);
                if( (first!='[' && first!='{') || (last!=']' && last!='}') ){
                    ToastAndroid.show('数据格式错误', ToastAndroid.LONG);
                    console.log(url + '?body=' + JSON.stringify(body));
                }
                resolve( JSON.parse(response) );

            }).catch(error => {
                reject(error);
                ToastAndroid.show('请求发生错误002', ToastAndroid.LONG);
            });
        });
    }
};


