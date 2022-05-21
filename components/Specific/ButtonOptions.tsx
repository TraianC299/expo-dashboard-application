import React, {useEffect, useRef} from 'react'
import { View, StyleSheet, Text, Pressable, Animated, Modal } from 'react-native'
import { DARKGREY, LIGHTGREY, MAINCOLOR, WHITE, WHITEBLUE } from '../../constants/Colors'
import CircleButton from '../Buttons/CircleButton'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants/Layout';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { Ionicons } from '@expo/vector-icons'; 


interface Props{
  options: Array<object>;
  style: object;
  open: boolean;
  setOpen: Function;
} 

const ButtonOptions:React.FC<Props> = ({options, style, open, setOpen}) => {
    let fadeAnim = useRef(new Animated.Value(0)).current;

    const fade = (value) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: value,
          duration: 200,
          useNativeDriver:true
        }).start();
      };
    

      useDidMountEffect(()=>{
        fade(open ? 1 : 0)
      },[open])
    
  return (
    < View style={{...style}}>
        <CircleButton color={WHITEBLUE} icon={open?<Ionicons name="close" size={WINDOW_HEIGHT*0.02} color={DARKGREY}/>:<SimpleLineIcons name="options-vertical" size={WINDOW_HEIGHT*0.02} color={DARKGREY} />}  onPress={()=>setOpen(previous=>!previous)}></CircleButton>
        
              <Animated.View onTouchEndCapture={()=>setOpen(false)} hitSlop={1000} pointerEvents={open?"auto":"none"} style={{...styles.optionsContainer,opacity: fadeAnim, zIndex:22222} }>
                 {options.map((option, index)=><Pressable 
                  key={index}
                  onPress={option.onPress} 
                  color={option.color} 
                  style={{...styles.optionContainer, color: option.color, backgroundColor:`${option.color}20`}}>
                    
                    {option.icon}
                    <Text style={{color: option.color, fontWeight:"500", marginLeft:10}}>{option.title}</Text>
                </Pressable>)} 
            </Animated.View>
  
           
    </View>
  )
}


const styles = StyleSheet.create({
    optionsContainer: {
      width: WINDOW_WIDTH/2,
      position: "absolute",
      right: 0,
      backgroundColor: "#fff",
      padding: 10,
      paddingTop:5,
      paddingBottom:5,
      borderRadius: 10,
      top: "100%",
      flexWrap: "wrap",
      shadowColor: "#00000040",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 20,
elevation: 5,
      elevation: 3, // works on android

    },
    optionContainer: {
      marginTop:5,
      marginBottom:5,
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        width: "100%",
        fontSize: 18,
        padding: 10,
        borderRadius: 5,
        inlineSize: "max-content",
        width: "100%",
        fontWeight: 500,

    }
})

export default ButtonOptions