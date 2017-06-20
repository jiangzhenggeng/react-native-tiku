
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

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
        height:50,

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
        flex:1,
        flexDirection:"row",
        alignItems:"stretch",
        flexWrap:'wrap'
    },
    moduleItemList:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"center",
        width:(width - 32 ) / 3,
        height:60,
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
    subHeader:{
        height:50,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        paddingLeft:16,
        paddingRight:16,
        justifyContent:"center",
    },
    subBody:{
        backgroundColor:'#fff',
        flexDirection:"row",
        alignItems:"center",
        flexWrap:'wrap',
        flex:1,
    },
    subCellWrap:{
        width: width/ 3,
        height:60,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        borderRightWidth:0.5,
    },
    subItemInner:{
        flex:1,
        flexDirection:"row",
        justifyContent: 'flex-start',
        alignItems:"center",
        padding:16,
    },
    subject_icon:{
        marginRight:5,
    },
};


export default styles;














