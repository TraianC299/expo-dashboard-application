import React, { useState } from 'react'
import { StyleSheet, View , Text, Pressable} from 'react-native';
import CircleButton from '../Buttons/CircleButton';
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { BORDERCOLOR, DARKGREY, GREEN, LIGHTGREY, MAINCOLOR, RED } from '../../constants/Colors';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../constants/Layout';
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


interface ProductInterface {
  id: string,
  price: number,
  quantity: number,
}
interface OrderInterface {
  id: String,
  globalId: String,
  selectedProducts: Array<ProductInterface>,
  index:number, 
  status: number
}




export const convertTimestampToDate = (timestamp:string) => {
const date = new Date(timestamp);
return date;
}



const getPrice = (cart:Array<ProductInterface>) => {
  if(cart.length>0){
      let totalPrice:any = 0;
      cart.forEach(item => {
        let {price, quantity} = item
        totalPrice = totalPrice+  price * quantity
      })
      return totalPrice
  }
}

const Order:React.FC<OrderInterface> = ({status, id, globalId, selectedProducts, index}) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState("")
  const [successUpdateStatus, setSuccessUpdateStatus] = useState("")
  const [errorUpdateStatus, setErrorUpdateStatus]  =useState("")
  const {setSnackObject} = useSnack()
  const {currentUser} = useAuth()
  const {setReload, data} = useData()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  



const changeStatus = async (status:number, succesMessage:string) => {
  setLoading("Loading...")
  
  try{

      await updateData(`orders/${globalId}`, {
          status: status
      }, currentUser.token)
      setSuccessUpdateStatus(succesMessage)
      setLoading("")

      
  }catch(err){
    setLoading("")
      setErrorUpdateStatus("Something went wrong")

  }

}



useDidMountEffect(()=>{
  setTimeout(()=>{
    setReload(previous=>!previous)
},5000)

setSnackObject({
  success: successUpdateStatus,
  error: null,
  loading: loading,
  setSuccess: setSuccessUpdateStatus,
  setError: null,
  setLoading: setLoading
})

},[successUpdateStatus, loading])
  return (
    <Pressable  style={{...styles.orderContainer, backgroundColor:"white", zIndex:showOptions?1000:0-index, elevation:showOptions?1000:0-index}}>
       <ButtonOptions open={showOptions} setOpen={setShowOptions} style={{zIndex:9999, position:"absolute", top:WINDOW_HEIGHT*0.0175, right:WINDOW_HEIGHT*0.0175}} options={[
         {title: 'Received Order', icon:<Feather name="chevrons-right" size={24} color={MAINCOLOR} />, onPress: ()=>changeStatus(1, "Succesfully received order"), color:MAINCOLOR},
         {title: 'Finish Order', icon:<MaterialIcons name="done-all" size={24} color={GREEN} />, onPress: ()=>changeStatus(2, "Succesfully finished order"), color:GREEN},
         {title: 'Cancel Order', icon:<Feather name="trash-2" size={24} color={RED} />, onPress: ()=>changeStatus(3, "Succesfully canceled order"), color:RED},
                    ]}></ButtonOptions>
         <Pressable style={{maxWidth:"20%"}} onPress={() => navigation.navigate('OrderModal', {
      orderId: id
    })}>
           <Text style={{fontWeight:"bold"}}>#{id}</Text>
         </Pressable>
         <Text style={{maxWidth:"20%"}}>{getPrice(selectedProducts)} {data.currency}</Text>
         <View style={{...styles.status, backgroundColor:getStatus(status).color }}>
           {loading?<LoadingSpinner color="white"></LoadingSpinner>:<Text style={{color: "white"}}>{getStatus(status).title}</Text>}
          </View>
         <View style={styles.buttonsContainer}>
          
             
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
        minWidth:WINDOW_WIDTH*0.04, 
    },
    status: {
      borderRadius: 5,
      padding: 5,
      width: "auto",
    }
 
})

export default Order



