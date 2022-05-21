import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import { BLACK, DARKGREY, GREEN, LIGHTGREY, MAINCOLOR, WHITE } from '../../constants/Colors';
import { postImage } from '../../fetchFunctions';
import { globalStyles } from '../../styles/global';
import LoadingSpinner from '../Utils/LoadingSpinner';
import * as ImagePicker from 'expo-image-picker';
import { WINDOW_WIDTH } from '../../constants/Layout';

interface Props {
  image: string,
  setImage: React.Dispatch<React.SetStateAction<string>> ,
  title: string,

}


const ImageInput:React.FC<Props> = ({title, image, setImage}) => {
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result)


    if (!result.cancelled) {
        setLoadingImage(true)
        try{
            
            const response = await postImage(result, 250)
            setLoadingImage(false)
            setImage(response.data.url)
        }catch(err){
            console.log(JSON.stringify(err))
            setLoadingImage(false)

        }
      
  };
}

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={{color:DARKGREY, fontSize:18, fontWeight:"500", marginBottom:10}}>
          {title}
        </Text>
        <Text  numberOfLines={1} ellipsizeMode='tail' style={{color:LIGHTGREY}}>{image||"Image URL"}</Text>
      </View>
      <Pressable onPress={()=>pickImage()} style={{...globalStyles.input, borderWidth:image?0:1.5, borderColor:MAINCOLOR, borderStyle:image?"solid":"dashed", width:"auto", justifyContent:"center", alignItems:"center", marginBottom:0, backgroundColor:image?GREEN:WHITE}}>
        {loadingImage?<LoadingSpinner color={MAINCOLOR}></LoadingSpinner>:<Text style={{color:image?WHITE:MAINCOLOR, fontWeight:"600"}}>{image?"Image selected":"Select Image"}</Text>}
      </Pressable>
    </View>
  )
}


const styles= StyleSheet.create({
  container:{
    ...globalStyles.whiteContainer,
    justifyContent:"space-between",
    alignItems:"center",
    padding: 20,
    
  },
  text:{
    maxWidth:WINDOW_WIDTH*0.45
  }
})
export default ImageInput