import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, PlatformColor, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Input from '../components/Input/Input'
import { DARKGREY, GREEN, LIGHTGREY, MAINCOLOR, RED, WHITE, WHITEBLUE } from '../constants/Colors'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/Layout'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import { useSnack } from '../contexts/SnackContext'
import { isNotEmpty, isNumber } from '../validationFunctions'
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { postImage, updateData } from '../fetchFunctions'
import LoadingSpinner from '../components/Utils/LoadingSpinner'
import useDidMountEffect from '../hooks/useDidMountEffect'
import Snackbar from '../components/Utils/Snackbar'
import ImageInput from '../components/Input/ImageInput'
import AddFileSvg from '../assets/svg/addFiles.svg'
import { globalStyles } from '../styles/global'
import CircleButton from '../components/Buttons/CircleButton'
import GoBackButton from '../components/Specific/GoBackButton'

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
    const navigation = useNavigation()
    const {editId } = route.params;
    const {data, setReload} = useData()
    const {currentUser} = useAuth()
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState('');


    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState('');

    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState('');

    const [image, setImage] = useState("");
    const [imageError, setImageError] = useState('');
    const [disable, setDisable] = useState("")




    const [success, setSuccess] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [loadingImage, setLoadingImage]  =useState("")
    const [error, setError] = React.useState(false)




    useEffect(()=>{
        if(editId){
            const editableItem = data.products.find(item => item.id === editId)
            setTitle(editableItem.title)
            setDescription(editableItem.description)
            setPrice(editableItem.price)
            setImage(editableItem.image)
        }
    },[editId])

    const postProduct = () => {
        setLoading("Loading...")
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
            setReload(previous=>!previous)
            setLoading("")
            clearAll()
        })
    }




    const editProduct = () => {
        setLoading(true)
        const products = data.products
        const index = products.findIndex(el=>el.id==editId)
        products[index] = {
            id: editId,
            title,
            description,
            price,
            image,
            createdAt: new Date(),
            active: true
        }

        updateData(`stores/${data._id}`, {
            products: [
                ...products
            ]
           
        }, currentUser.token)
        .then((res)=>{
            setSuccess("Succesfully updated a product")
            setReload(previous=>!previous)
            setLoading("")
            clearAll()
        })
    }



    const handleSubmit = () => {

        isNotEmpty(title)?setTitleError(isNotEmpty(title)):setTitleError(false)
        isNotEmpty(description)?setDescriptionError(isNotEmpty(description)):setDescriptionError(false)
        isNotEmpty(price)?setPriceError(isNotEmpty(price)):setPriceError(false)
        isNumber(price)?setPriceError(isNumber(price)):setPriceError(false)
        isNotEmpty(image)?setImageError(isNotEmpty(image)):setImageError(false)
        if(isNotEmpty(title) || isNotEmpty(description) || isNumber(price) || isNotEmpty(image)){
            setError("Fill all the required fields please!")
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
                
                const response = await postImage(result, 250)
                console.log(response)

                setLoadingImage(false)
                setImage(response.data.url)
            }catch(err){
                console.log(JSON.stringify(err))
                setLoadingImage(false)

            }
          
      };}
    
 
  return (
    <View style={styles.container}>
        {/* <Pressable onPress={()=>pickImage()} style={styles.imageInput}>
        {image?<Image style={styles.imageStyle} source={{uri:image}}></Image>:loadingImage?<LoadingSpinner color={MAINCOLOR}></LoadingSpinner>:<Feather name="plus" size={24} color={MAINCOLOR} />}
        </Pressable> */}
               <GoBackButton navigation={navigation}></GoBackButton>
            <View >
                <ImageInput image={image} setImage={setImage} title='Product Image'></ImageInput>
                <Input value={title} setValue={setTitle} placeholder="Title"></Input>
                <Input value={description} setValue={setDescription} placeholder="Description" multiline blurOnSubmit style={{height: 75}}></Input>
                <Input value={price} setValue={setPrice} placeholder="Price" keyboardType={"number-pad"} ></Input>
            </View>
            <View style={{ flex:1}}>
                <AddFileSvg style={{height:WINDOW_HEIGHT*0.4}}></AddFileSvg>
                <Pressable style={{...globalStyles.input, backgroundColor:MAINCOLOR, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:WHITE, fontSize:18}}>Save</Text>
                </Pressable>
            </View>

            {/* <View style={styles.buttonContainer}>
                <Pressable onPress={()=>handleSubmit()} style={[styles.submitButton, {backgroundColor:loading?LIGHTGREY:MAINCOLOR}]}>
                {loading?<LoadingSpinner color={DARKGREY}></LoadingSpinner>:<Text style={{color:"white", fontWeight:"600"}}>Go</Text>}
                </Pressable>
            
            </View> */}
            
        <Snackbar color={DARKGREY} open={loading} icon={<LoadingSpinner color="white"></LoadingSpinner>} setOpen={setLoading} textColor="white" ></Snackbar>
        <Snackbar autoHideDuration={3000} color={MAINCOLOR} open={success} icon={<Feather name="check-circle" size={24} color="white" />} setOpen={setSuccess} textColor="white" ></Snackbar>
        <Snackbar autoHideDuration={3000} color={RED} open={error} icon={<Feather name="alert-circle" size={24} color="white" />} setOpen={setError} textColor="white" ></Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex:1,
        backgroundColor:WHITEBLUE
    },
    buttonContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    imageInput:{
        backgroundColor:"white",
        height: WINDOW_WIDTH/2.5,
        width: WINDOW_WIDTH/2.5,
        borderStyle: 'dashed',
        borderColor: MAINCOLOR,
        borderWidth: 2,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
    },
    submitButton:{
        margin:"auto",
        height: WINDOW_WIDTH/5,
        width: WINDOW_WIDTH/5,
        backgroundColor:MAINCOLOR,
        borderRadius:1000,
        alignItems: "center",
        justifyContent:"center"
    },
    imageStyle: {
        height: "100%",
        width: "100%"
        
    }
})

export default AddProductModal