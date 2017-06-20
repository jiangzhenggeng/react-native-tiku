

import SizeConfig from '../Config/SizeConfig';
const styles = {
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    container2: {
        flex: 1,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",
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
        justifyContent:"space-between",

    },
    subHeader:{
        backgroundColor:"#ffffff",
        position:'relative',
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        marginTop:5,
    },
    rightBtnWrap:{
        position:'absolute',
        right:0,
        top:0,
        bottom:0,
        justifyContent:'center',
    },
    rightBtnBox:{
        height:40,
        width:100,
        backgroundColor:'#1682fb',
        alignItems:'center',
        justifyContent:'center',
    },

    treeList:{
        flex:1,
    },
    treeItem:{
        backgroundColor:"#ffffff",
        paddingTop:5,
        paddingBottom:5,
        marginBottom:3,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },
    treeItemBox:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    rightIcon:{
        justifyContent:'center',
        alignItems:'center',
    },
};

export default styles;
