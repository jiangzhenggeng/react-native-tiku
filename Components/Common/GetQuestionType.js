'use strict';

export default function getQuestionType(typeid) {
    if( Object.prototype.toString.call(typeid)=='[object String]' ){
        typeid = parseInt(typeid);
    }
    switch (typeid){
        case 1:
            return {
                'name':'单项选择题',
            };
        case 2:
            return {
                'name':'多项选择题',
            };
        case 3:
            return {
                'name':'判断题',
            };
        case 4:
            return {
                'name':'不定项选择题',
            };
        case 5:
            return {
                'name':'问答题',
            };
        case 6:
            return {
                'name':'会计分录题',
            };
        case 7:
            return {
                'name':'填空题',
            };
        case 8:
            return {
                'name':'综合题型',
            };
    }
}
