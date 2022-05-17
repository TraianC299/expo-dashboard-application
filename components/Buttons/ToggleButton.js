import React from 'react'
import { StyleSheet, View,  } from 'react-native'
import { GREEN } from '../../constants/Colors'

const ToggleButton = ({on, setOn}) => {
  return (
    <View style={{...styles.container, background: on?GREEN:GREEN}} onClick={()=>setOn(previous=>!previous)}>
        <View style={styles.span} />
    </View>
  )
}


const styles =  StyleSheet.create({
    container:{
        position: "relative",
        background: GREEN,
        borderRadius: 40,
        width: 60,
        height: 35,
        padding: 5
    },
    span:{
        position: "absolute",
        borderRadius: 555,
        backgroundColor: "white",
        height: 25,
        width: 25
    }

})

export default ToggleButton