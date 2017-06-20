
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const header_height =50;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:header_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",

    },

    borderBottom:{
        backgroundColor:"#ffffff",
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        paddingLeft:16,
        paddingRight:16,
    },
    moduleCenter:{
    },
    loginStatus:{
        height:52,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    moduleFaceWrap:{
        height:32,
        width:32,
    },
    moduleFace:{
        height:32,
        width:32,
        borderRadius:16
    },
    moduleItemWrap:{
        flexDirection:"row",
        alignItems:"stretch",
        flexWrap:'wrap'
    },
    moduleItemList:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",
        width:(width - 32 ) / 3,
        height:55,
    },
    moduleWenda:{
        borderColor:'#f1f1f1',
        borderTopWidth:0.5,
        flexDirection:"row",
        alignItems:"stretch",
        flexWrap:'wrap',
        marginTop:15,
        marginBottom:15
    },
    itemWrap:{
        height:50,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        paddingLeft:16,
        paddingRight:16,
        justifyContent:'center',
    },
    itemBodyWrap:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    touchPress:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        borderRightWidth:0.5,
    },
    cellItem:{
        width:width/3,
        height:80,
    }
};


export default styles;














