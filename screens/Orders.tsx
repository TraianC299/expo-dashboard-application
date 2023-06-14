import React, { useCallback } from 'react'
import { FlatList, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from 'react';
import Order from '../components/Specific/Order';
import useDidMountEffect from '../hooks/useDidMountEffect';
import { useData } from '../contexts/DataContext';
import {  DARKGREY, MAINCOLOR, WHITEBLUE } from '../constants/Colors';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {  WINDOW_WIDTH } from '../constants/Layout';
import Constants from 'expo-constants';
import { globalStyles } from '../styles/global';
import * as Notifications from 'expo-notifications';
import { updateData } from '../fetchFunctions';
import { useAuth } from '../contexts/AuthContext';


interface Props {
  orders: Array<OrderInterface>;
}


interface OrderInterface {
  incrementedId: number,
  _id: string,
  products: Array<{id: string, price: number, quantity: number}>,
  index:number, 
  status: number,
}




const renderItem = (order:OrderInterface, index:number)=><Order  
key={order._id}
index={index}
 globalId={order._id}
 id={order.incrementedId}
 status={order.status}
 price={order.products.reduce((total, item) => item.quantity*item.price + total, 0)}
   ></Order>







   const getItem = (data:Array<OrderInterface>, index:number) => ({
  incrementedId: data[index].incrementedId,
  id:  data[index]._id,
  products:  data[index].products,
  index:index, 
  status:  data[index].status,
  });
  const getItemCount = (data:Array<OrderInterface>) => data.length;







const OrdersRoute: React.FC<Props> = ({orders}) => {
  
  return(<View style={{ ...globalStyles.screen}}>
       <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent:"flex-end"}}
        ListEmptyComponent={
        <View style={{backgroundColor:"transparent",flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontSize:30, fontWeight:"600", color:MAINCOLOR}}>No orders</Text>
        </View>
    }
        data={orders.reverse()}
        initialNumToRender={12}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item) => item._id}
        initialScrollIndex={orders.length-1}
        inverted

        // getItem={getItem}
        // getItemLayout={(
        //   data: Array<OrderInterface>,
        //   index: number,
        // ) => ({length: WINDOW_HEIGHT*0.08+10, offset: index*(WINDOW_HEIGHT*0.08+10), index: index})}
        ></FlatList>
        {/* <FlatlistExperiment></FlatlistExperiment> */}
        
    </View>)
  }
   








export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const {orders, data} = useData()
  const {currentUser} = useAuth()

  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'active', title: 'Active' },
    { key: 'finished', title: 'Finished' },
    { key: 'canceled', title: 'Canceled' },
  ]);
  useDidMountEffect(()=>{
    if(selectedOrder){
      setOpenModal(true);
    }else{
      setOpenModal(false);
    }
  },[selectedOrder])

  const renderTabBar = (props:any) => (
    <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: MAINCOLOR }}
    style={{ backgroundColor: 'transparent' }}
    activeColor={MAINCOLOR}
    inactiveColor={DARKGREY}
  />
    
  );


  const renderScene = useCallback(({ route }) => {
    switch (route.key) {
      case 'active':
        return <OrdersRoute orders={orders.filter((element:OrderInterface)=>element.status===0)}></OrdersRoute>;
      case 'finished':
        return <OrdersRoute orders={orders.filter((element:OrderInterface)=>element.status===1)}></OrdersRoute>;
      case "canceled":
        return <OrdersRoute orders={orders.filter((element:OrderInterface)=>element.status===2)}></OrdersRoute>
    }
  },[orders])



  async function registerForPushNotificationsAsync() {
    let token;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
   
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4a68ff95',
      });
    }
  
    return token;
  }



  const postToken = async()=> {
    const token = await registerForPushNotificationsAsync()
    try{

    }catch(err){
      console.log(err)
    }
    await updateData(`stores/${data._id}`, {
      expoNotificationToken:token
  }, currentUser.token)
  }
  useEffect(()=>{
    postToken()
  },[])
  return (
    orders.length==0?
    null:
    <TabView
    renderTabBar={renderTabBar}
    style={{paddingTop: Constants.statusBarHeight, backgroundColor:WHITEBLUE}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: WINDOW_WIDTH }}
      />
   
  );
}



 
const styles = StyleSheet.create({
  ordersContainer:{
    ...globalStyles.screen
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});




