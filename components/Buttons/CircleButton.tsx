import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { WINDOW_HEIGHT } from '../../constants/Layout'


interface Props{
  color:string,
  icon:any,
  style:object,
  props:any,
  onPress:Function
}
const CircleButton:React.FC<Props> = ({color, icon, style, onPress, ...props}) => {
  return (
    <Pressable {...props} onPress={()=>onPress()} style={{...styles.container, backgroundColor:color, ...style}} >
      {icon}
    </Pressable>
  )
}



const styles = StyleSheet.create({
    container:{
height: WINDOW_HEIGHT*0.045,
padding: WINDOW_HEIGHT*0.01,
width: WINDOW_HEIGHT*0.045,
borderRadius:333,
alignItems: "center",
justifyContent: "center"
}

})
export default CircleButton