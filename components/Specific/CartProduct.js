import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { BORDERCOLOR, DARKGREY, LIGHTGREY } from '../../constants/Colors'
import { WINDOW_HEIGHT } from '../../constants/Layout'

const CartProduct = ({image, quantity, title}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri:image}}></Image>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.quantity}>Quantity: {quantity}</Text>
        </View>
    </View>
  )
}

export default CartProduct


const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    image:{
        height: WINDOW_HEIGHT/12,
        width: WINDOW_HEIGHT/12,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: BORDERCOLOR
    },
    title:{
        fontSize: 18,
        fontWeight: "500",
    },
    quantity:{
        fontSize: 16,
        color:DARKGREY
    }
})