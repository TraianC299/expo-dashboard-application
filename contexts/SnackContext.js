import React, {useContext, useEffect, useState} from 'react'

import Snackbar from '../components/Utils/Snackbar';

const SnackContext = React.createContext()

export const useSnack=()=>{
        return useContext(SnackContext)
    }

export const SnackProvider = ({children}) => {

    const [snackObject, setSnackObject] = useState({})








    





    
    let value={
        snackObject, setSnackObject
    }

    

    return (
        <SnackContext.Provider value={value}>
             <Snackbar 
      autoHideDuration={snackObject.autoHideDuration}
      setOpen={snackObject.setOpen}
      textColor={snackObject.textColor} 
      icon={snackObject.icon} 
      open={snackObject.open} 
      color={snackObject.color}></Snackbar>
            {children}
        </SnackContext.Provider>
    )
}