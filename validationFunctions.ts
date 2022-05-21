
  
  

  
  
  
  
  export const isNotEmpty = (value: string) => {
    if(value==""){
      return "required field"
    }
    else{
      return false
    }
  }
  
  export const isNumber = (value: number) => {
      
    if(isNaN(Number(value))){
        return "this field should be a number"
    }else{
        return false
    }
  }
  
  export const isTrue = (value: boolean) => {
    if(!value){
      return "check eroare"
    }else{
        return false
    }
  }
  
  
  
  export const isEmail = (value: string) => {
    if(!value.includes("@")){
        return "invalid email"
  
    }else{
        return false
    }
  }
  
  
  export const isLongEnough = (value: string, length: number) => {
    if(value.length<length){
        return `This field should be at least ${length} characters long`
    }else{
        return false
    }
  }
  