import React from 'react'
import { Pressable, StyleSheet,Text } from 'react-native'
import { BORDERCOLOR, MAINCOLOR } from '../../constants/Colors'





const selectedStyle = {
    borderWidth: 2,
    borderColor: MAINCOLOR,
}

const Option = ({children, id , selected, setSelected, singleOption, style}) => {
    const chosen = singleOption? selected==id : selected.includes(id)
    const selectOption  =() => {
        if(!singleOption){
            selected.includes(id)?setSelected(previous=>[...previous.filter(item=>item!=id)]):setSelected(previous=>[...previous, id])
        }else{
            selected==id?setSelected(null):setSelected(id)
        }
    }
    return (
        <Pressable onPress={selectOption} style={{...styles.container, ...chosen?selectedStyle:null, ...style}}  >
            <Text>{children}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        borderRadius: 14,
        margin:"auto",
        width: "100%",
        borderWidth: 0.5,
        borderColor: BORDERCOLOR,
        
        // border: 0.5px solid ${BORDERCOLOR},
    },
    text: {
        fontWeight: 600,
        fontSize: 16,
        color: MAINCOLOR,

    }
    
})


export default Option