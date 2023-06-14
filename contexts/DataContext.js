import React, {useContext, useEffect, useState} from 'react'
import { getAdminData } from '../fetchFunctions'
import useDidMountEffect from '../hooks/useDidMountEffect'
import { useAuth } from './AuthContext'
import * as SplashScreen from 'expo-splash-screen';
import { Animated, LayoutAnimation, UIManager } from 'react-native';

const DataContext = React.createContext()



if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
export const useData=()=>{
        return useContext(DataContext)
    }


    const layoutAnimConfig = {
        duration: 300,
        update: {
          type: LayoutAnimation.Types.easeInEaseOut, 
        },
        delete: {
          duration: 1000,
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      };
export const DataProvider = ({children}) => {

    const {currentUser} = useAuth()
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [data, setData]  = useState()
    const [orders, setOrders] = useState([])



   useEffect(()=>{
    SplashScreen.preventAutoHideAsync().catch(() => {
        /* reloading the app might trigger some race conditions, ignore them */
      });
   },[])

const fetchData = async () => {
    getAdminData(`stores/admin/${currentUser.uid}`, currentUser.token)
    .then(res => {
        LayoutAnimation.configureNext(layoutAnimConfig);
        setOrders(res.data.orders.sort((a,b)=>{ return a.incrementedId>b.incrementedId ? -1 : 1}))
        delete res.data.orders
        setData(res.data)

    })
    .catch(err => {
        console.log(err)
    })
}

  
    useEffect(()=>{
        if(currentUser.uid && currentUser.token){
            const fetchWithLoading = async() => {
                setLoading(true)
                await fetchData()

            }
            fetchWithLoading()

        }else{
            setLoading(false)
        }
    },[currentUser])

    useDidMountEffect(()=>{

        fetchData()
    },[reload])

    useDidMountEffect(()=>{
        setLoading(false)

    },[data])

   


    


    






    





    
    let value={
        data, 
        loading,setReload, setData, orders, setOrders
    }

  

    return (
        <DataContext.Provider value={value}>
            
        {loading?null:children}
        </DataContext.Provider>
    )
}


