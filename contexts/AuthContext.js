import React, {useContext, useState, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native';
import { MAINCOLOR } from '../constants/Colors';


const AuthContext = React.createContext()
export const useAuth=()=>{
        return useContext(AuthContext)
    }


    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      
      async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          return result;
        } else {
          return false
        }
      }
export const AuthProvider = ({children}) => {
    let localToken = "";
    let localUID = "";

    //this is an object that represent our cart, it will be available throuhg all of our application using context
    const [currentUser, setCurrentUser] = useState({})

    
  

  
    useEffect(()=>{
        if(currentUser.token && currentUser.uid){
            save("token", currentUser.token)
            save("uid", currentUser.uid)
        }
    },[currentUser])


    const getUser = async () => {
      localToken =await  getValueFor("token");
      localUID = await getValueFor("uid");
    //load persisted cart into state if it exists
    if (localToken && localUID){ setCurrentUser({
        token:localToken,
        uid: localUID
      })}
    }


    useEffect(()=>{
      getUser()
    },[]);



    
    return (
      
        <AuthContext.Provider value={{
          currentUser,
        setCurrentUser,
        }}>
        {children}
        </AuthContext.Provider>
    )

}