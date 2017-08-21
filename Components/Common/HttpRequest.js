
import {
    Platform
} from 'react-native';
let HOST;
if(Platform.OS=='ios'){
    HOST = 'https://ac.jiangzg.com/index.php';
}else{
    HOST = 'http://ac.jiangzg.com/index.php';
}


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
                    alert('数据错误');
                }
                return response.text();

            }).then(response => {
                response = String(response).replace(/^\s+|\s+$/,'');
                let first = response.substr(0,1);
                let last  = response.substr(-1,1);
                if( (first!='[' && first!='{') || (last!=']' && last!='}') ){
                    //alert('数据格式错误');
                }
                resolve( JSON.parse(response) );

            }).catch(error => {
                console.log(url+'\r请求发生错误002\r'+error);
            });
        });
    }
};


