import React, {useContext, useEffect, useState} from 'react'
import { getAdminData } from '../fetchFunctions'
import useDidMountEffect from '../hooks/useDidMountEffect'
import { useAuth } from './AuthContext'
import * as SplashScreen from 'expo-splash-screen';

const DataContext = React.createContext()

export const useData=()=>{
        return useContext(DataContext)
    }

export const DataProvider = ({children}) => {

    const {currentUser} = useAuth()
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [data, setData]  = useState()


    SplashScreen.preventAutoHideAsync().catch(() => {
        /* reloading the app might trigger some race conditions, ignore them */
      });

const fetchData = async () => {
    getAdminData(`stores/admin/${currentUser.uid}`, currentUser.token)
    .then(res => {
        res.data.orders =res.data.orders.sort((a,b)=>{ return a.incrementedId>b.incrementedId ? -1 : 1})

        setData(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

  
    useEffect(()=>{

        if(currentUser.uid && currentUser.token){
            fetchData()
        }
   

    },[currentUser, reload])




    useDidMountEffect(()=>{
        setLoading(false)
        SplashScreen.hideAsync();

    },[data])






    





    
    let value={
        data, 
        loading,setReload, setData
    }

  

    return (
        <DataContext.Provider value={value}>
            
        {loading?null:children}
        </DataContext.Provider>
    )
}