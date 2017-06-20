

export default {
    //首页获取banner图
    getBannerList:'/android/banner/getBannerList',

    //考试试卷列表
    getSubjectExamList:'/android/Exam/getExamList',
    //考试获取试题列表
    ExamQuestionList:'/android/Exam/ExamQuestionList',
    //考试获取试题详细信息
    ExamQuestionDetail:'/android/Exam/ExamQuestionDetail',
    //考试答案提交地址
    ExamSubmitUrl:'/android/Exam/ExamSubmitUrl',

    //练习科目列表
    practice_get_subject_list:'/android/practice/getSubjectList',
    //练习获取章节列表
    practice_get_chapter_list:'/android/practice/getChapterList',
    //练习获取试题列表
    practice_get_question_list:'/android/practice/getQuestionList',
    //练习获取试题详细信息
    practice_get_question_detail:'/android/practice/getQuestionDetail',
    //练习交卷
    practice_question_save:'/android/practice/saveRecord',

    //获取强化科目列表
    getSubjectQuestionTypeList:'/android/strong/getSubjectQuestionTypeList',
    //获取强化章节列表
    getStrongSubjectList:'/android/strong/getChapterList',
    //获取强化试题列表
    getStrongQuestionList:'/android/strong/getQuestionList',
    //获取强化试题详细信息
    getStrongQuestionDetail:'/android/strong/getQuestionDetail',
    //保存强化记录
    strongQuestionSave:'/android/strong/saveRecord',

    //获取会计元素列表
    getAccelementsList:'/android/question/accelements',
    //试题信息反馈
    question_feedback:'/android/question/feedback',

    //我的科目
    MyCenterHasSubjectList:'/android/Center/MyCenterHasSubjectList',
    //未购买科目列表
    NoBuySubjectList:'/android/Center/NoBuySubjectList',
    //提交购买科目
    MyCenterSubjectPay:'/android/Center/MyCenterSubjectPay',
    //提交定制科目
    SubjectCustomization:'/android/Center/SubjectCustomization',
    getCenterInfo:'/android/Center/getCenterInfo',
    //考试记录
    exam_list:'/android/Record/examList',
    //模拟记录
    moni_list:'/android/Record/moniList',
    //练习记录
    practice_list:'/android/Record/practiceList',
    //强化记录
    strong_list:'/android/Record/strongList',
    //头像上传
    UploadFace:'/android/Center/UploadFace',

    //点击收藏试题
    question_collection:'/android/collection/collection',

    //获取收藏科目列表
    get_collection_subject_list:'/android/collection/collectionQuestionListSubject',
    //获取收藏试题列表并阅览
    CollectionQuestionList:'/android/collection/collectionQuestionList',
    //获取收藏试题详细地址
    CollectionQuestionDetail:'/android/collection/collectionQuestionDetail',

    //获取错题科目列表
    get_error_subject_list:'/android/Error/errorQuestionListSubject',
    //获取错题列表并阅览
    ErrorQuestionList:'/android/Error/ErrorQuestionList',
    //获取错题详细地址
    ErrorQuestionDetail:'/android/Error/ErrorQuestionDetail',
    //错题提交地址
    ErrorQuestionSubmit:'/android/Error/ErrorQuestionSubmit',

    //登录
    user_login:'/android/login/login',
    //注册获取手机验证码
    user_register_send_code:'/android/login/getRegisterCode',
    //注册地址
    user_register_url:'/android/login/register',
    //忘记密码
    user_findpassword_send_code:'/android/login/getFindPasswordCode',
    //设置密码
    user_findpassword_url:'/android/login/setPassword',

    //试题反馈
    feed_back_submit:'/android/feedback/feedBackSubmit',
    //修改手机号码获取验证码
    change_mobile_get_code:'/android/Center/ChangeMobilGetCode',
    //修改手机号码
    change_mobile:'/android/Center/ChangeMobil',
    //修改用户名
    change_username:'/android/Center/ChangeUsername',
    //修改性别
    change_sex:'/android/Center/ChangeSex',
}











