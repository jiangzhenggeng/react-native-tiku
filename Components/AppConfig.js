
// common
import Login from './Common/Login/Login';
import Register from './Common/Login/Register';
import FindPassword from './Common/Login/FindPassword';
import DoQuestion from './Common/DoQuestion/DoQuestion';
import WebView from './Common/WebView';
import ShowAnswerResult from './Common/DoQuestion/ShowAnswerResult';
import DoQuestionShowAnswer from './Common/DoQuestion/DoQuestionShowAnswer';

//Home
import Home from './Home/Home';
import Practice from './Home/Practice';
import Strong from './Home/Strong';
import Exam from './Home/Main/Exam';
import Moni from './Home/Main/Moni';
// import Information from './Home/Information';
// import Course from './Home/Course';
// import Consultant from './Home/Consultant';
import MyCenter from './Home/MyCenter';
import PracticeChapterList from './Home/PracticeChapterList';
import StrongChapterList from './Home/StrongChapterList';

//Center
import MyPractice from './Center/MyPractice';
import MyExam from './Center/MyExam';
import MyCollection from './Center/MyCollection';
import MyError from './Center/MyError';
import MySimulation from './Center/MySimulation';
import BuySubject from './Center/BuySubject';
import MyOrder from './Center/MyOrder';
import MySubject from './Center/MySubject';
import MyStrong from './Center/MyStrong';
import InfoList from './Center/info/InfoList';
import ChangeMobile from './Center/info/ChangeMobile';
import ChangeSex from './Center/info/ChangeSex';
import ChangeUsername from './Center/info/ChangeUsername';
import About from './Center/About';


const config = {
    'Common/Login/Login':{screen: Login,},
    'Common/Login/Register':{screen: Register,},
    'Common/Login/FindPassword':{screen: FindPassword,},
    'Common/DoQuestion/DoQuestion':{screen: DoQuestion,key:'DoQuestion'},
    'Common/WebView':{screen:WebView},
    'Common/DoQuestion/ShowAnswerResult':{screen: ShowAnswerResult},
    'Common/DoQuestion/DoQuestionShowAnswer':{screen:DoQuestionShowAnswer},

    'Home/Home':{screen: Home,},
    'Home/Practice':{screen: Practice,},
    'Home/Strong':{screen: Strong,},
    // 'Home/Information':{screen: Information,},
    // 'Home/Course':{screen: Course,},
    // 'Home/Consultant':{screen: Consultant,},
    'Home/MyCenter':{screen: MyCenter,},
    'Home/PracticeChapterList':{screen: PracticeChapterList,},
    'Home/StrongChapterList':{screen: StrongChapterList,},
    'Home/Main/Exam':{screen:Exam,},
    'Home/Main/Moni':{screen:Moni,},

    'Center/MyPractice':{screen: MyPractice,},
    'Center/MyExam':{screen: MyExam,},
    'Center/MyCollection':{screen:MyCollection},
    'Center/MyError':{screen:MyError},
    'Center/MySimulation':{screen: MySimulation,},
    'Center/BuySubject':{screen: BuySubject,},
    'Center/MyOrder':{screen:MyOrder},
    'Center/MySubject':{screen:MySubject},
    'Center/MyStrong':{screen:MyStrong},
    'Center/info/InfoList':{screen:InfoList},
    'Center/info/ChangeMobile':{screen:ChangeMobile},
    'Center/info/ChangeSex':{screen:ChangeSex},
    'Center/info/ChangeUsername':{screen:ChangeUsername},
    'Center/About':{screen:About},

};
export default config;


