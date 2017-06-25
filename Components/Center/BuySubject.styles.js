
import { Dimensions } from 'react-native';
import SizeConfig from '../Common/Config/SizeConfig';
const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex:1,
        backgroundColor:'#f7f7f7',
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    borderFix:{
        paddingLeft:16,
        paddingRight:16,
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",

    },
    back:{
        flex:1,
        justifyContent:'center',
    },
    no_subject_tips:{
        fontSize:16,
        color:'#585858',
    },
    fixText:{
        fontSize:16,
        color:'#585858',
    },

    my:{
        height:30,
        justifyContent:'center',
    },
    my_majorname:{
        backgroundColor:'#f7f7f7',
        height:50,
    },
    major_title:{

    },

    subHeader:{
        height:50,
        justifyContent:'center',
        paddingLeft:16,
        paddingRight:16,
    },
    subBody:{
        backgroundColor:'#fff',
        borderTopWidth:0.8,
        borderColor:'#f1f1f1',
    },
    subCellWrap:{
        height:50,
        position:'relative',
    },
    subItemWrap:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:"row",
        paddingLeft:16,
        paddingRight:16,
    },

    checkBox:{
        width:30,
    },
    subItemInner:{
        flex:1,
    },
    borderBottom:{
        borderBottomWidth:0.8,
        borderColor:'#f1f1f1',
        position:'absolute',
        bottom:0,
        left:16,
        right:0,
    },
    //购买按钮
    buyBottomBtn:{
        bottom:0,
        left:0,
        right:0,
        height:50,
        position:'absolute',
        backgroundColor:"#1682fb",
    },
    buyBottomBtnText:{
        color:'#fff',
        fontSize:16,
    },
};


export default styles;














