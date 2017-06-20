
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 10000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
});

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
global.storage = storage;
global.loginState = null;

// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了

import userLoginStatus from './Config/KeylConfig';
export default {
    initSet:(callBack)=>{
        //获取登录状态数据
        storage.load({
            key: userLoginStatus.userLoginStatus,
        }).then(ret => {
            global.loginState = ret;
            global.memberid = ret.memberid;
            if(callBack)callBack(ret);
        }).catch(err => {
            if(callBack)callBack(err);
            global.loginState = null;
            global.memberid = null;
        });
    }
};














