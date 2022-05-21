import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, Text, Pressable, ActivityIndicator } from 'react-native'
import Input from '../components/Input/Input'
import { MAINCOLOR, WHITE, WHITEBLUE } from '../constants/Colors'
import { useAuth } from '../contexts/AuthContext'
import Fingerprint from "../assets/svg/fingerprint.svg";
import { WINDOW_HEIGHT } from '../constants/Layout'
import { globalStyles } from '../styles/global'
 

const LogIn = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {setCurrentUser} =  useAuth()
  const [loading, setLoading] = useState<boolean>(false)

const loginFunc = async () => {
  setLoading(true)
    const response = await fetch(`https://commo-store.com/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },

    })
    
    const data = await response.json()
    setCurrentUser(previous=>({
       uid: data.uid, 
       token: data.token,
    }))
    setLoading(false)

}


  return (
    <SafeAreaView style={styles.container}>
        {loading?<View style={{flex:1, justifyContent:"center", alignContent:"center"}}>
          <ActivityIndicator size="large" color={MAINCOLOR}></ActivityIndicator>
        </View>:
        <View style={styles.viewContainer}>
          
            <Text style={styles.title}>Log In:</Text>
            <Input value={email} setValue={setEmail} placeholder="Email"></Input>
            <Input value={password} setValue={setPassword} secureTextEntry={true} placeholder="Password"></Input>
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <Fingerprint height={WINDOW_HEIGHT*0.3}></Fingerprint>
        </View>
            <Pressable onPress={()=>loginFunc()} style={[globalStyles.input, {justifyContent:"center", alignItems:"center", backgroundColor:MAINCOLOR}]}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
        </View>}
        
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({


buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: WHITE,

},
  viewContainer:{
    padding: 20,
    flex:1
  },
  title:{
    fontSize:30,
    color:"white",
    fontWeight:"500",
    marginBottom:20,
    color:MAINCOLOR
  },
    container:{
        flex:1,
        backgroundColor:WHITEBLUE
    }
})
export default LogIn