import React, { useState } from 'react'
import {
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Pressable
} from 'react-native';
import { DARKGREY, LIGHTGREY } from '../../constants/Colors';
import { globalStyles } from '../../styles/global';



const DismissKeyboard = ({ children, focus }) => (
  <Pressable style={{zIndex:focus?100000:0, elevation:focus?1:-1}} hitSlop={focus?100000:0} onPress={() => Keyboard.dismiss()}>
  {children}
  </Pressable>
  );
const Input = ({value, setValue, error, setError, style, ...props}) => {
  const [focus, setFocus] = useState()
  return (
 
      <DismissKeyboard focus={focus}>
        <TextInput
        onFocus={()=>setFocus(true)}
        onBlur={()=>setFocus(false)}
        placeholderTextColor={LIGHTGREY}
        value={value}
        style={{
          ...globalStyles.input, ...style}}
            onChangeText={(text) => setValue(text)}
                                {...props}
                            />
      </DismissKeyboard>
  )
}

export default Input