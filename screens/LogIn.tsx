import React from 'react'
import { View, StyleSheet, SafeAreaView, Text, Pressable } from 'react-native'
import Input from '../components/Input/Input'
import { MAINCOLOR } from '../constants/Colors'
import { useAuth } from '../contexts/AuthContext'


const LogIn = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {currentUser, setCurrentUser} =  useAuth()


const loginFunc = async () => {
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
    setCurrentUser({
       uid: data.uid, 
       token: data.token,
    })
}
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
            <Text style={styles.title}>Log In:</Text>
            <Input value={email} setValue={setEmail} placeholder="Email"></Input>
            <Input value={password} setValue={setPassword} secureTextEntry={true} placeholder="Password"></Input>
            <Pressable onPress={()=>loginFunc()} style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  button:{
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 14,
    margin:"auto",
    width: "100%",
    borderWidth: 0.5,
    backgroundColor:"white",
    
    
    // border: 0.5px solid ${BORDERCOLOR},
},
buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: MAINCOLOR,

},
  viewContainer:{
    padding: 20,
  },
  title:{
    fontSize:30,
    color:"white",
    fontWeight:"500"
  },
    container:{
        flex:1,
        backgroundColor:MAINCOLOR
    }
})
export default LogIn