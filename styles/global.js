import { MAINCOLOR, WHITEBLUE } from "../constants/Colors";

export const globalStyles = {
    h1:{
        fontSize:80,
        fontWeight: "300",
        
    },
    h2:{
        fontSize:60,
        fontWeight: "300",
            },
    h3:{
        fontSize:42,
        fontWeight: "400",
        
    },
    h4:{
        fontSize:34,
        fontWeight: "400",
    },
    dashedBorder: {
        borderWidth: 2,
        borderStyle:"dashed",
        borderColor: MAINCOLOR,
    },
    h5:{
        fontWeight: "400",
        fontSize: 24,
        
    },
    h6:{
        fontWeight: "500",
        fontSize: 20,
           },
    p:{
        fontSize: 16,
      },
    whiteContainer: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection:"row",
        marginBottom:10,
    },
    screen:{
        flex:1, padding: 20, backgroundColor:WHITEBLUE
    }
   

}