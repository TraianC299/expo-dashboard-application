import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from 'react';
import Order from '../components/Specific/Order';
import useDidMountEffect from '../hooks/useDidMountEffect';
import { useData } from '../contexts/DataContext';
import { GREYWHITE, LIGHTGREY, MAINCOLOR, WHITEBLUE } from '../constants/Colors';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/Layout';
import Constants from 'expo-constants';
import { globalStyles } from '../styles/global';


const OrdersRoute = ({orders}) => (
   <View >
      <SafeAreaView >
       <View style={styles.ordersContainer}>
         {orders.map((order, index) =>
          <Order  index={index}
                         key={order._id}
                         globalId={order._id}
                         id={order.incrementedId}
                         status={order.status}
                         createdAt={order.createdAt}
                         selectedProducts={order.products}
                         ></Order>)}
       </View>
      
      </SafeAreaView>
    </View>
);







export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const {data} = useData()
  
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

  const renderTabBar = (props) => (
    <TabBar
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color, margin: 8, fontWeight:focused?"500":"400" }}>
        {route.title}
      </Text>
    )}
    activeColor={MAINCOLOR}
    inactiveColor={LIGHTGREY}
      {...props}
      indicatorStyle={{ backgroundColor: MAINCOLOR }}
      style={{ backgroundColor: WHITEBLUE, fontWeight:"500" }}
    />
  );


  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'active':
        return <OrdersRoute orders={data.orders.filter(element=>element.status==0||element.status==1)}></OrdersRoute>;
      case 'finished':
        return <OrdersRoute orders={data.orders.filter(element=>element.status==2)}></OrdersRoute>;
      case "canceled":
        return <OrdersRoute orders={data.orders.filter(element=>element.status==3)}></OrdersRoute>
      default:
        return null;
    }
  };
  return (
    <TabView
    renderTabBar={renderTabBar}
    initialLayout={{ width: WINDOW_WIDTH, height:WINDOW_HEIGHT }}

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
