import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import Input from '../components/Input/Input'
import { DARKGREY, GREEN, LIGHTGREY, MAINCOLOR, WHITEBLUE } from '../constants/Colors'
import { WINDOW_WIDTH } from '../constants/Layout'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import { useSnack } from '../contexts/SnackContext'
import { isNotEmpty, isNumber } from '../validationFunctions'
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { postImage, updateData } from '../fetchFunctions'
import LoadingSpinner from '../components/Utils/LoadingSpinner'
import useDidMountEffect from '../hooks/useDidMountEffect'
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result;
  }

const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
const AddProductModal = () => {
    const route = useRoute()
    const { editTitle, editDescription, editImage, editPrice, editId } = route.params;
    const {data} = useData()
    const {currentUser} = useAuth()
    const [title, setTitle] = useState(editTitle);
    const [titleError, setTitleError] = useState('');


    const [description, setDescription] = useState(editDescription);
    const [descriptionError, setDescriptionError] = useState('');

    const [price, setPrice] = useState(editPrice);
    const [priceError, setPriceError] = useState('');

    const [image, setImage] = useState(editImage);
    const [imageError, setImageError] = useState('');
    const [disable, setDisable] = useState("")

    const {setSnackObject} = useSnack()



    const [success, setSuccess] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [loadingImage, setLoadingImage]  =useState(false)
    const [error, setError] = React.useState(false)



    const postProduct = () => {
        updateData(`stores/${data._id}`, {
            products: [
                ...data.products, {
                    id: makeid(5),
                    title,
                    description,
                    price,
                    image,
                    createdAt: new Date(),
                    active: true
                }
            ]
           
        }, currentUser.token)
        .then((res)=>{
            setSuccess("Succesfully added a product")
            setLoading(false)
            clearAll()
        })
    }




    const editProduct = () => {
        // updateDocument(`shops/${data.id}/products`,editId, {
        //     title,
        //     description,
        //     price,
        //     image,
        //     createdAt: new Date(),
        //     active: true
        // }).then((res)=>{
        //     setSuccess("Succesfully added a product")
        //     setLoading(false)
        //     setEditId(null)
        //     clearAll()
        // })
    }



    const handleSubmit = () => {

        isNotEmpty(title)?setTitleError(isNotEmpty(title)):setTitleError(false)
        isNotEmpty(description)?setDescriptionError(isNotEmpty(description)):setDescriptionError(false)
        isNotEmpty(price)?setPriceError(isNotEmpty(price)):setPriceError(false)
        isNumber(price)?setPriceError(isNumber(price)):setPriceError(false)
        isNotEmpty(image)?setImageError(isNotEmpty(image)):setImageError(false)
        if(isNotEmpty(title) || isNotEmpty(description) || isNumber(price) || isNotEmpty(image)){
            return 
        }
        if(editId){
            editProduct()
        }else{
            postProduct()
        }
    }



    const clearAll  = () => {
        setTitle('')
        setDescription('')
        setPrice('')
        setImage('')
    }




    useEffect(()=>{
        if(isNotEmpty(title) || isNumber(price) || isNotEmpty(image) || isNotEmpty(price)){
            setDisable(true)
            return
        }
        setDisable(false)


    },[title, image, price])
    


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
                
                const response = await postImage(result)
                console.log(response)

                setLoadingImage(false)
                setImage(response.data.url)
            }catch(err){
                console.log(err)
                setLoadingImage(false)

            }
          
      };}
    
console.log(route.params)
      useDidMountEffect(()=>{
        setSnackObject({
            autoHideDuration:3000,
            setOpen:setSuccess,
            textColor:"white", 
            icon:<Feather name="check-circle" size={24} color="white" /> ,
            open:success, 
            color:MAINCOLOR
        })
    },[success])
  return (
    <View style={styles.container}>
        
        <Pressable onPress={()=>pickImage()} style={styles.imageInput}>
        {image?<Image style={styles.imageStyle} source={{uri:image}}></Image>:loadingImage?<LoadingSpinner color={MAINCOLOR}></LoadingSpinner>:<Feather name="plus" size={24} color={MAINCOLOR} />}
        </Pressable>
        <Input value={title} setValue={setTitle} placeholder="Title"></Input>
        <Input value={description} setValue={setDescription} placeholder="Description" multiline blurOnSubmit style={{height: 100}}></Input>
        <Input value={price} setValue={setPrice} placeholder="Price" keyboardType={"number-pad"} ></Input>
        <View style={styles.buttonContainer}>
            <Pressable onPress={()=>handleSubmit()} style={[styles.submitButton, {backgroundColor:loading?LIGHTGREY:MAINCOLOR}]}>
            {loading?<LoadingSpinner color={DARKGREY}></LoadingSpinner>:<Feather name="chevron-right" size={24} color="white" />}
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex:1,
        backgroundColor:WHITEBLUE
    },
    buttonContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    imageInput:{
        height: WINDOW_WIDTH/2,
        width: WINDOW_WIDTH/2,
        borderStyle: 'dashed',
        borderColor: MAINCOLOR,
        borderWidth: 2,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center"
    },
    submitButton:{
        margin:"auto",
        height: WINDOW_WIDTH/5,
        width: WINDOW_WIDTH/5,
        backgroundColor:MAINCOLOR,
        borderRadius:"50%",
        alignItems: "center",
        justifyContent:"center"
    },
    imageStyle: {
        height: "100%",
        width: "100%"
        
    }
})

export default AddProductModal