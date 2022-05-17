import React, { useEffect } from 'react'
import useDidMountEffect from '../hooks/useDidMountEffect';
import {useState} from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CircleButton from '../components/Buttons/CircleButton';
import { DARKGREY, LIGHTGREY, MAINCOLOR } from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons'; 
import { useData } from '../contexts/DataContext';
import { convertTimestampToDate } from '../components/Specific/Order';
import { customerDeliveryOptions, getStatus } from '../constants/Vars';
import Product from '../components/Specific/CartProduct';
import { useRoute } from '@react-navigation/native';
import { getItemById } from '../components/utilityFunctions';
import { WINDOW_HEIGHT } from '../constants/Layout';
import { globalStyles } from '../styles/global';
const isEmpty = (obj:Object)=>{
    return Object.keys(obj).length === 0;
}

const OrderViewModal = ({}) => {
    const route = useRoute()
    const { orderId } = route.params;

    const [selectedOrderObject, setSelectedObject] = useState<Object>({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const {data} = useData()

  useEffect(()=>{
      if(orderId){
          const order = data.orders.find(order=>order.incrementedId === orderId)
      setSelectedObject(previous=>{const founded = {...order};delete founded.products; return founded})
          if(order){
              setSelectedProducts(order.products.map(product => {return {...data.products.find(prod => prod.id === product.id), quantity: product.quantity}}))
          }else{
              setSelectedProducts([])
          }
      }else{
          setSelectedObject({})
          setSelectedProducts([])
      }
      
  },[])



  return (
    <View style={{flex:1, backgroundColor:"white"}}>

    {!isEmpty(selectedOrderObject)?
        <SafeAreaView style={{flex:1,padding: 20}}>
        <View style={styles.container}>
            <View style={styles.orderName}>
                <Text style={{...globalStyles.h4, color: MAINCOLOR, fontWeight:"600", marginBottom:WINDOW_HEIGHT/30}}>Comanda #{orderId}</Text>
                
                {/* <CircleButton onPress={()=>{setSelectedOrder(null)}} color={`${MAINCOLOR}20`} icon={<AntDesign name="close" size={24} color="black" />}></CircleButton> */}
            </View>
            { selectedProducts.length==0?null:<View style={styles.infoContainer}>
                <View style={styles.borderBottom}>
                    <Text style={[styles.h2, styles.padding]} >Produse</Text>
                </View>
                <View style={styles.padding}>
                    {selectedProducts.map(product => <Product {...product}></Product>)}
                </View>
            </View>}
            <View style={styles.infoContainer}> 
                <View style={styles.borderBottom}>
                    <Text style={[styles.h2, styles.padding]} >Informatii de la consumator:</Text>
                </View>
                <View style={styles.padding}>
                {isEmpty(selectedOrderObject)? null: Object.keys(selectedOrderObject.customerData).map(info => selectedOrderObject.customerData[info]?<Text style={{color:DARKGREY}}>{info}:{selectedOrderObject.customerData[info]}</Text>:null)}
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.borderBottom}>
                    <Text style={[styles.h2, styles.padding]} >Order Info:</Text>
                </View>
                <View style={styles.padding}>
                {!selectedOrderObject?null: <Text style={{color:DARKGREY}}>Date: {convertTimestampToDate({...selectedOrderObject.selectedDate}).getDate()==convertTimestampToDate({...selectedOrderObject.createdAt}).getDate()?"Today":convertTimestampToDate({...selectedOrderObject.selectedDate}).toLocaleString("en-EN",{year: 'numeric', month: 'long', day: 'numeric' })}</Text>}
                {selectedOrderObject.selectedDeliveryOption && true?<Text>Selected Delivery Option:<Text>{getItemById(selectedOrderObject.selectedDeliveryOption, customerDeliveryOptions).label }</Text></Text>:null}
                </View>
            </View>
        </View>
        </SafeAreaView>:null}
    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        padding:20
    },
    orderName: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        
    },
    padding:{
        paddingVertical:5,
        paddingHorizontal:10
    },
    h1:{
        fontSize:30,
    },
    h2:{
        fontSize: 22,
        width: "100%",
        

    },
    borderBottom:{
        borderBottomWidth:1,
        borderBottomColor: LIGHTGREY,
        marginBottom: 10
    },
    infoContainer:{
        marginBottom: 25
    }
})
export default OrderViewModal



