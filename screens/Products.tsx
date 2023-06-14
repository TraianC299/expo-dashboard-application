import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import Product from '../components/Specific/Product'
import {  MAINCOLOR } from '../constants/Colors'
import { useData } from '../contexts/DataContext'
import { globalStyles } from '../styles/global'
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'




interface ProductInterface {
  id: string,
  image: string,
  index:number,
  price: number,
  active: boolean,
  description: string,
  title: string
}


const renderItem = (order:ProductInterface, index:number)=><Product  
    image={order.image} 
    title={order.title} 
    description={order.description} 
    id={order.id} 
    price={order.price} 
    active={order.active} 
    index={index}
   ></Product>











const Products = () => {
  const {data} = useData()
  const navigation =  useNavigation()
  return (
    <View style={[globalStyles.screen]}>
      
      
    <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent:"flex-end"}}

    ListFooterComponent={
      <Pressable onPress={()=>navigation.navigate("AddProductModal")} style={{...globalStyles.whiteContainer,...globalStyles.dashedBorder, height: 130, justifyContent:"center"}}>
      <Feather name="plus-circle" size={24} color={MAINCOLOR} />
        <Text style={{marginLeft:10, color:MAINCOLOR, ...globalStyles.h6}}>Add a new product</Text>
      </Pressable>
    }
    data={data.products}
    initialNumToRender={12}
    renderItem={({ item, index }) => renderItem(item, index)}
    keyExtractor={(item) => item.id.toString()}
    inverted
    initialScrollIndex={data.products.length-1}
    getItemLayout={(
      data: any,
      index: number,
    ) => ({length: 140, offset: index*(140), index: index})}>
      </FlatList>
</View>
  )
}

export default Products