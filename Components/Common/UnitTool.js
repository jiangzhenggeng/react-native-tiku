

let UnitToll = {

    isArray:function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    },
    isString:function (a) {
        return Object.prototype.toString.call(a) === '[object String]';
    },
    isNumber:function (a) {
        return Object.prototype.toString.call(a) === '[object Number]';
    },
    isFunction:function (a) {
        return Object.prototype.toString.call(a) === '[object Function]';
    },
    isNull:function (a) {
        return Object.prototype.toString.call(a) === '[object Null]';
    },
    isRegExp:function (a) {
        return Object.prototype.toString.call(a) === '[object RegExp]';
    },
    has:function (a,b) {
        if(Object.prototype.toString.call(a)==='[object Array]'){
            for(var i in a){
                if(i==b){
                    return true;
                }
            }
            return false;
        }
        if(Object.prototype.toString.call(a)==='[object Object]'){
            return b in a;
        }
    },
    getLength:function (a) {
        if(this.isArray(a)){
            return a.length;
        }
        var Length = 0;
        for (var item in a) {
            Length++;
        }
        return Length;
    },
    toArray:function (a) {
        if(this.isArray(a)){
            return a;
        }
        var temp = [];
        for (var item in a) {
            temp.push(a[item]);
        }
        return temp;
    }
};

export default UnitToll;



