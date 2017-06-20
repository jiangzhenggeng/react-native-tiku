const pickHeight = 32;
const styles = {
    header:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        height:50,
        paddingLeft:16,
        paddingRight:16,
        borderBottomWidth:0.8,
        borderColor:'#e9e9e9',
    },
    submitQuestionBtn:{
        flex:1,
        backgroundColor:'#1682fb',
        height:45,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },

    showAnswer:{
        borderTopWidth:0.5,
        borderColor:'#f1f1f1',
        padding:16,
        paddingTop:5,
        paddingBottom:10,
        flex:1,
    },
    anserText:{
        color:'#585858',
        fontSize:16,
        lineHeight:30
    },

    accWrap:{

    },
    accCellRow:{
        flexDirection:'row',
        marginBottom:10,
    },
    PickerWrap:{
        flex:1,
        borderColor:'#e6e6e6',
        borderWidth:0.5,
        height:pickHeight,
        borderRadius:3,
    },
    PickerAdd:{
        borderColor:'#e6e6e6',
        borderWidth:0.5,
        height:pickHeight,
        width:85,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    blankTextInputBox:{
        flex:1,
        borderColor:'#e6e6e6',
        borderWidth:0.5,
        height:pickHeight,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:3,
    },
    blankTextInput:{
        color:'#585858',
        fontSize:16,
        padding:0,
        margin:0,
        lineHeight:16,
    },
};

export default styles;

