import React, {useContext, useEffect, useState} from 'react'
import LoadingSpinner from '../components/Utils/LoadingSpinner';

import Snackbar from '../components/Utils/Snackbar';
import { DARKGREY, MAINCOLOR, RED } from '../constants/Colors';
import { Feather } from '@expo/vector-icons'; 

const SnackContext = React.createContext()

export const useSnack=()=>{
        return useContext(SnackContext)
    }


interface SnackObjectInterface{
    success: string,
    error: string,
    setSuccess: React.Dispatch<React.SetStateAction<string>> | null,
    setError: React.Dispatch<React.SetStateAction<string>> | null,
    loading: string,
    setLoading: React.Dispatch<React.SetStateAction<string>> | null,

}

export const SnackProvider: React.FC = ({children}) => {

    const [snackObject, setSnackObject] = useState<SnackObjectInterface>({
        success:""
        ,error:""
        ,setSuccess:null
        ,setError:null
        ,loading:"",
        setLoading:null
    })








    





    
    let value={
        snackObject, setSnackObject
    }
    

    return (
        <SnackContext.Provider value={value}>
             <Snackbar 
      setOpen={snackObject.setLoading}
      textColor={"white"} 
      icon={<LoadingSpinner color="white"></LoadingSpinner>} 
      open={snackObject.loading} 
      color={DARKGREY}></Snackbar>
             <Snackbar 
      autoHideDuration={3000}
      setOpen={snackObject.setSuccess}
      textColor={"white"} 
      icon={<Feather name="check" size={24} color="white" />}
      open={snackObject.success } 
      color={ MAINCOLOR}></Snackbar>
             <Snackbar 
      autoHideDuration={3000}
      setOpen={snackObject.setError}
      textColor={"white"} 
      icon={<Feather name="alert-circle" size={24} color="white" />}
      open={snackObject.error} 
      color={RED}></Snackbar>
             
            {children}
        </SnackContext.Provider>
    )
}