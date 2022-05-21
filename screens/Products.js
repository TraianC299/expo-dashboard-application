import React from 'react'
import { SafeAreaView, ScrollView, View, Text, Pressable } from 'react-native'
import Product from '../components/Specific/Product'
import { GREYWHITE, MAINCOLOR, WHITEBLUE } from '../constants/Colors'
import { useData } from '../contexts/DataContext'
import { globalStyles } from '../styles/global'
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

const Products = () => {
  const {data} = useData()
  const navigation =  useNavigation()
  return (
    <View style={globalStyles.screen}>
        <SafeAreaView >
            <ScrollView style={{paddingBottom: 150}} showsVerticalScrollIndicator={false}>
              <Pressable onPress={()=>navigation.navigate("AddProductModal",  {editId:""})} style={{...globalStyles.whiteContainer,...globalStyles.dashedBorder, height: 150, justifyContent:"center"}}>
              <Feather name="plus-circle" size={24} color={MAINCOLOR} />
                <Text style={{marginLeft:10, color:MAINCOLOR, ...globalStyles.h6}}>Add a new product</Text>
              </Pressable>
              {data.products.map((el, index)=><Product {...el} index={index} key={el.id}></Product>)}</ScrollView>
        </SafeAreaView>
    </View>
  )
}

export default Products