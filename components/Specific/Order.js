import React, { useState } from 'react'
import { StyleSheet, View , Text, Pressable} from 'react-native';
import CircleButton from '../Buttons/CircleButton';
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { BORDERCOLOR, DARKGREY, GREEN, LIGHTGREY, MAINCOLOR, RED } from '../../constants/Colors';
import {WINDOW_HEIGHT} from '../../constants/Layout';
import { useNavigation } from '@react-navigation/native';
import ButtonOptions from './ButtonOptions';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSnack } from '../../contexts/SnackContext';
import LoadingSpinner from '../Utils/LoadingSpinner';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { updateData } from '../../fetchFunctions';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { globalStyles } from '../../styles/global';
import { getStatus } from '../../constants/Vars';





export const convertTimestampToDate = (timestamp) => {
const date = new Date((timestamp.seconds * 1000 + timestamp.nanoseconds/1000000));
return date;
}


const getPrice = (cart) => {
  if(cart.length>0){
      let price = 0
      cart.forEach(item => {
          price += item.price * item.quantity
      })
      return price
  }
}

const Order = ({ email, createdAt, status, price, id, globalId, selectedProducts, index}) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [successUpdateStatus, setSuccessUpdateStatus] = useState("")
  const [errorUpdateStatus, setErrorUpdateStatus]  =useState("")
  const {setSnackObject} = useSnack()
  const {currentUser} = useAuth()
  const {setReload, data} = useData()
  



const changeStatus = async (status, succesMessage) => {
  setLoading(true)
  
  try{

      await updateData(`orders/${globalId}`, {
          status: status
      }, currentUser.token)
      setSuccessUpdateStatus(succesMessage)
      
  }catch(err){
      setErrorUpdateStatus("Something went wrong")
  }

}



useDidMountEffect(()=>{
  setTimeout(()=>{
    setReload(previous=>!previous)
},5000)
  setSnackObject({
      color: MAINCOLOR,
      setOpen: setSuccessUpdateStatus,
      open:successUpdateStatus,
      autoHideDuration:3000,
      textColor:"white", 
      icon:<Feather name="check-circle" size={24} color="white" /> ,
  })

},[successUpdateStatus])
  return (
    <Pressable onPress={() => navigation.navigate('OrderModal', {
      orderId: id
    })} style={{...styles.orderContainer, zIndex:100-index, elevation:100-index}}>
       <ButtonOptions style={{zIndex:9999, position:"absolute", top:WINDOW_HEIGHT*0.0175, right:WINDOW_HEIGHT*0.0175}} options={[
         {title: 'Received Order', icon:<Feather name="chevrons-right" size={24} color={MAINCOLOR} />, onPress: ()=>changeStatus(1, "Succesfully received order"), color:MAINCOLOR},
         {title: 'Finish Order', icon:<MaterialIcons name="done-all" size={24} color={GREEN} />, onPress: ()=>changeStatus(2, "Succesfully finished order"), color:GREEN},
         {title: 'Cancel Order', icon:<Feather name="trash-2" size={24} color={RED} />, onPress: ()=>changeStatus(3, "Succesfully canceled order"), color:RED},
                    ]}></ButtonOptions>
         <Text style={{fontWeight:"bold"}}>#{id}</Text>
         <Text>{getPrice(selectedProducts)} {data.currency}</Text>
         <View style={{...styles.status, backgroundColor:getStatus(status).color }}>
           {loading?<LoadingSpinner></LoadingSpinner>:<Text style={{color: "white"}}>{getStatus(status).title}</Text>}
          </View>
         <View style={styles.buttonsContainer}>
          
             {/* <CircleButton  style={{marginRight:5}} color={LIGHTGREY} icon={<SimpleLineIcons name="options-vertical" size={WINDOW_HEIGHT*0.02} color="white" />}></CircleButton> */}
             
         </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    orderContainer: {
      ...globalStyles.whiteContainer,
        height: WINDOW_HEIGHT*0.08,
        paddingHorizontal:WINDOW_HEIGHT*0.0175,
        justifyContent: "space-between",

    },
    buttonsContainer: {
        flexDirection: "row",   
    },
    status: {
      borderRadius: 5,
      padding: 5,
      width: "auto",
    }
 
})

export default Order



