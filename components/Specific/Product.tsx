
import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native'
import {  LIGHTGREY, DARKGREY, BLACK, WHITEBLUE, RED, GREEN, MAINCOLOR, BORDERCOLOR } from '../../constants/Colors'
import { useData } from '../../contexts/DataContext'
import { globalStyles } from '../../styles/global'
import { Feather } from '@expo/vector-icons'; 
import ButtonOptions from './ButtonOptions'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants/Layout'
import Snackbar from '../Utils/Snackbar'
import { updateData } from '../../fetchFunctions'
import { useAuth } from '../../contexts/AuthContext'
import { useSnack } from '../../contexts/SnackContext'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { useNavigation } from '@react-navigation/native'



interface Props {
    image:string,
    title:string,
    description:string,
    price:number,
    active:boolean,
    index:number,
    id:string,
}

const Product: React.FC<Props> = ({image, description, title, id, price, active, index}) => {
    const {data, setReload} = useData()
    const {currentUser} = useAuth()
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const {setSnackObject} = useSnack()
    const navigation = useNavigation()
    
    const toggleItem = () => {
        const newProducts = [...data.products]
        const index = newProducts.findIndex(el=>el.id==id)
        newProducts[index] = {...newProducts[index], active:!newProducts[index].active}
        setLoading("Loading...")
            updateData(`stores/${data._id}`, {
                products:[
                    ...newProducts
                ]
            }, currentUser.token)
            .then((res)=>{
                setReload((previous:boolean)=>!previous)
                setLoading("")
                setSuccess("Successfully toggled Item")

            })
            .catch(err=>{
                setError(err.message)
            })
    }


    

    useDidMountEffect(()=>{
        setSnackObject({
            success: success,
            error: error,
            loading: loading,
            setSuccess: setSuccess,
            setError: setError,
            setLoading: setLoading
          })
    },[success, loading, error])


    return (
        <>
        <View style={{...styles.container,zIndex: showOptions?1000:0-index, elevation:showOptions?1:0-index}} >
                    <ButtonOptions open={showOptions} setOpen={setShowOptions} style={{zIndex:9999, position:"absolute", top:10, right:10}} options={[
                        {title: 'Delete Item', icon:<MaterialIcons name="delete-outline" size={WINDOW_HEIGHT*0.025} color={RED} />, onClick: ()=>{deleteDocument(`shops/${data.id}/products`, id).then(()=>setReload(previous=>!previous))}, color:RED},
                        {title: 'Edit Item', icon:<Feather name="edit-2" size={WINDOW_HEIGHT*0.025} color={MAINCOLOR} />, onPress: ()=>{navigation.navigate('AddProductModal', {
                            editId: id
                        })}, color:MAINCOLOR},
                        {title: loading?"Loading":active?'Disable Item':"Enable Item", icon:loading?<FontAwesome5 name="spinner" size={WINDOW_HEIGHT*0.025} color="black" />:<Feather name="toggle-left" size={24} color={active?DARKGREY:GREEN} />, onPress: ()=>toggleItem(), color:active?DARKGREY:GREEN},
                    ]}></ButtonOptions> 
                <View>
                    <Image  height={120} width={120} loadingIndicatorSource={{uri:"https://pukkaberlin.com/wp-content/themes/barberry/images/placeholder.jpg"}} blurRadius={active?0:2} source={{uri:image}} style={{...styles.image}}>
                    </Image>
                </View>
            <View style={styles.info}>
                <View style={{flex:1}}>
                    <Text style={{...globalStyles.h6, color:"black"}}>{title}</Text>
                    <Text style={{...globalStyles.p, color:LIGHTGREY}}>{description}</Text>
                </View>
                    <View style={styles.price}><Text>{price} {data.currency}</Text></View>
            </View>
            
        </View>
        </>
    )
}



export default Product


const styles = StyleSheet.create({
    container:{
        height: 130,
        ...globalStyles.whiteContainer,
        padding: 5
    },
    image:{
        zIndex:1,
        height: 120,
        width: 120,
        padding: 10,
        borderRadius: 8,
        overflow: "hidden",
        resizeMode: "cover",
    },
    info:{
        zIndex:-1,
        flexDirection:'row',
        padding: 10,
        textAlign: "left",
        height: "100%",
        flex:1,
        zIndex:-23232,

    },
    price:{
        position:"absolute",
    right: 10,
    bottom: 10
    }

})