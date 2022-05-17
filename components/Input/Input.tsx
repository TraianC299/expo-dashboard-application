import React from 'react'
import {
    TouchableWithoutFeedback,
    Keyboard,
    TextInput
} from 'react-native';
import { GREYWHITE, WHITE } from '../../constants/Colors';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
  onPress={() => Keyboard.dismiss()}> 
  {children}
  </TouchableWithoutFeedback>
  );
const Input = ({value, setValue, error, setError, style, ...props}) => {
  return (
 
      <DismissKeyboard>
        <TextInput
        value={value}
        style={{
            borderRadius: 10,
            minHeight:50,
            backgroundColor: WHITE,
            width: '100%',
            fontSize:18,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 25, ...style}}
            onChangeText={(text) => setValue(text)}
                                {...props}
                            />
      </DismissKeyboard>
  )
}

export default Input