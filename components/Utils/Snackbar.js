import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Animated, Easing } from 'react-native'
import { WINDOW_WIDTH } from '../../constants/Layout'

const Snackbar = ({icon, color, textColor, open, setOpen, autoHideDuration}) => {
    let [hideAnim, setHideAnim] = useState(new Animated.Value(-100));


    const moveSnack = (value) => {
        Animated.timing(
            hideAnim,
          { 
              toValue: value,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver:true
             }
        ).start();
      }



    useEffect(()=>{
        if(open){
            moveSnack(0)
            if(autoHideDuration){
            setTimeout(()=>{
                moveSnack(-100)
                setOpen("")
            },autoHideDuration)
            
            }
            return
            
        }
    
    },[open])

    

    return (
        <Animated.View  style={{...styles.container,backgroundColor:color, transform: [{translateY: hideAnim}]}}>
            {icon}
            <Text style={{color:textColor, padding:8, fontWeight: "500"}}>{open}</Text>
        </Animated.View>
     
    )
}

const styles = StyleSheet.create({
    container: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left:WINDOW_WIDTH*0.05,
    width: WINDOW_WIDTH*0.9,
    height: "auto",
    paddingVertical: 6,
    paddingHorizontal:16,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 100000000000,
    borderRadius: 10,
    textAlign: "left",
    }
})
export default Snackbar