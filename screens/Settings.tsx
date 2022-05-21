import React, { useState, useEffect } from 'react';
import { Button, Image, Pressable, StyleSheet, Modal, SafeAreaView, Switch } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import ToggleButton from '../components/Buttons/ToggleButton';
import { BLACK, DARKGREY, GREEN, GREYWHITE, LIGHTGREY, MAINCOLOR, WHITEBLUE } from '../constants/Colors';
import { WINDOW_HEIGHT } from '../constants/Layout';
import Option from '../components/Input/Option';
import { useData } from '../contexts/DataContext';
import * as WebBrowser from 'expo-web-browser';
import { postImage, updateData } from '../fetchFunctions';
import { useAuth } from '../contexts/AuthContext';
import { globalStyles } from '../styles/global';
import { BASE_URL } from '../constants/Vars';
import Snackbar from '../components/Utils/Snackbar';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useSnack } from '../contexts/SnackContext';
import useDidMountEffect from '../hooks/useDidMountEffect';
import LoadingSpinner from '../components/Utils/LoadingSpinner';


// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizedataURL(datas, widthSize) {
  return new Promise(async function (resolve, reject) {

    // We create an image to receive the Data URI
    var img = document.createElement('img');
    let newWidth = 0
    let newHeight = 0

    // When the event "onload" is triggered we can resize the image.
      img.onload = function () {
      let totalPixels = 300001
      // We create a canvas and get its context.
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const newImage = document.createElement('img');
      newImage.src = datas
      newWidth = newImage.width
      newHeight = newImage.height
      const proportion= newHeight/newWidth
     
      while(totalPixels>300000){
        newWidth = widthSize
        newHeight = widthSize* proportion
        totalPixels = newWidth*newHeight
      }
      // We set the dimensions at the wanted size.
     
      canvas.width = newWidth ;
      canvas.height = newHeight ;

      // We resize the image with the canvas method drawImage();
      ctx.drawImage(newImage, 0,0, newWidth, newHeight );

      const dataURI = canvas.toDataURL();

      // This is the return of the Promise
      resolve(dataURI);
    };

    // We put the Data URI in the image's src attribute
    img.src = datas;

  })
}// Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);

const fileToDataUri = (image:Blob) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        res(reader.result)
    });
    reader.readAsDataURL(image);
  })
}


const fetchImageFromUri = async (uri:string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};


export default function Settings({ navigation }: RootTabScreenProps<'TabOne'>) {
  const {data} = useData()
  const {setSnackObject}= useSnack()
  const {currentUser, setCurrentUser} = useAuth()
  const [openDeliveryOptions, setOpenDeliveryOptions] = React.useState(false)
  const [color, setColor] = React.useState(data.themeColor)
  const [logo, setLogo] = React.useState(data.logo)
  const [preOrder, setPreOrder] = React.useState(data.preOrder)
  const [phoneNumber, setPhoneNumber] = React.useState(data.phoneNumber)
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(data.deliveryOption)


  const [successUpdate, setSuccessUpdate] = React.useState("")
  const [loadingUpdate, setLoadingUpdate] = React.useState("")
  const [errorUpdate, setErrorUpdate] = React.useState("")
  const [result, setResult] = useState()
  const [loadingImage, setLoadingImage] = useState(false)

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (!result.cancelled) {
        setLoadingImage(true)
        try{
            
            const response = await postImage(result, 500)
            console.log(response)

            setLoadingImage(false)
            setLogo(response.data.url)
        }catch(err){
            console.log(JSON.stringify(err))
            setLoadingImage(false)

        }
      
  };}

  const handleUpdate = () => {
    setLoadingUpdate("Loading...")
    updateData(`stores/${data._id}`, {
        themeColor: color,
        logo: logo,
        preOrder: preOrder,
        phoneNumber: phoneNumber,
        deliveryOption: selectedDeliveryOption
    }, currentUser.token)
    .then((res)=>{
      console.log(res)
        setLoadingUpdate("")
        setSuccessUpdate("Successfully updated settings")
    })
    .catch((err)=>{
        console.log(err)
        setLoadingUpdate("")
        setErrorUpdate("An error occured while updating settings. Try again.")
    })
}


  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(`https://${data._id}.commo-store.com`);
  };

  useDidMountEffect(()=>{
    setSnackObject({
      success: successUpdate,
      error: errorUpdate,
      loading: loadingUpdate,
      setSuccess: setSuccessUpdate,
      setError: setErrorUpdate,
      setLoading: setLoadingUpdate
    })
},[successUpdate, loadingUpdate, errorUpdate])

  return (
    <View style={globalStyles.screen}>
      <SafeAreaView style={styles.container}>
      <Pressable onPress={()=>setCurrentUser({})} style={styles.settingContainer}>
        <Text style={styles.title}>Log out</Text>
              <Entypo name="chevron-right" size={24} color={DARKGREY} />
        </Pressable>
        <Pressable onPress={()=>_handlePressButtonAsync()} style={styles.settingContainer}>
        <Text style={styles.title}>Open your website</Text>
              <Entypo name="chevron-right" size={24} color={DARKGREY} />
        </Pressable>
        <View style={styles.settingContainer}>
        <Text style={styles.title}>Logo</Text>
                      <Pressable onPress={pickImage}>
                        <Image source={{ uri: logo }}  style={styles.imagePickerContainer}>
      
                        </Image>
                      </Pressable>
        </View>
        <View style={styles.settingContainer}>
        <Text style={styles.title}>Pre-order</Text>
         <Switch 
                trackColor={{ false: '#fff', true: GREEN }}
        thumbColor={preOrder ? GREYWHITE : GREYWHITE}
        onValueChange={()=>setPreOrder(previous=>!previous)}
        value={preOrder} ></Switch>
        </View>
        <View style={styles.settingContainer}>
        <Text style={styles.title}>Phone Number</Text>
                <Switch 
                trackColor={{ false: '#fff', true: GREEN }}
        thumbColor={phoneNumber ? GREYWHITE : GREYWHITE}
        onValueChange={()=>setPhoneNumber(previous=>!previous)}
        value={phoneNumber} ></Switch>
        </View>
        <Pressable onPress={()=>setOpenDeliveryOptions(true)} style={styles.settingContainer}>
        <Text style={styles.title}>Delivery Options</Text>
                <Entypo name="chevron-right" size={24} color={DARKGREY} />
            </Pressable>
            <Modal
              transparent={true}
              animationType="slide"
              visible={openDeliveryOptions}
              
          >
            <Pressable onPress={()=>setOpenDeliveryOptions(false)} style={{
              flex:1,
              justifyContent:'flex-end',
              alignItems:'center',
              paddingLeft: 10,
              paddingRight: 10,
           
            }}>
              <View style={{height: "auto", backgroundColor:"white", width: "100%",padding: 10, paddingBottom: 50, borderRadius: 14}}>
                <Text style={[globalStyles.h5, {marginBottom: 20, marginTop: 10}]}>Choose your delivery method:</Text>
                <Option style={{marginBottom:5}} id={1} singleOption selected={selectedDeliveryOption} setSelected={setSelectedDeliveryOption}>
                  Delivery
                </Option>
                <Option style={{marginBottom:5}}  id={2} singleOption selected={selectedDeliveryOption} setSelected={setSelectedDeliveryOption}>
                  Pick-up
                </Option>
                <Option style={{marginBottom:5}}  id={3} singleOption selected={selectedDeliveryOption} setSelected={setSelectedDeliveryOption}>
                  Delivery and Pick-up
                </Option>
              </View>
            </Pressable>
          </Modal>
        <Pressable onPress={() => handleUpdate()} style={{...globalStyles.input, backgroundColor:MAINCOLOR, justifyContent:"center", alignItems:"center", alignSelf:"flex-end"}}>
                      <Text style={{
                        ...globalStyles.p,
                          fontWeight:"bold",
                          color:'#fff'
                      }}>Save</Text>
      
          </Pressable>
      </SafeAreaView>

    </View>
  );
}




const styles = StyleSheet.create({
  imagePickerContainer: {
    height: WINDOW_HEIGHT/12-20,
    width: WINDOW_HEIGHT/12-20,
    borderWidth: 1,
    borderColor: GREYWHITE,
    borderRadius: 14,
  },
  settingContainer: {
    ...globalStyles.whiteContainer,
    padding: 20,
    justifyContent: "space-between",
    height: WINDOW_HEIGHT/12,
    
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    ...globalStyles.p,
    color: DARKGREY
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
