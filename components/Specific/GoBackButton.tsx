import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Platform, View } from 'react-native'
import CircleButton from '../Buttons/CircleButton'
import { Feather } from '@expo/vector-icons'; 
import { WINDOW_HEIGHT } from '../../constants/Layout';
import { DARKGREY, WHITE } from '../../constants/Colors';

const GoBackButton = ({navigation}) => {
  return (
    Platform.OS=="ios"?null:<View  style={{padding:10,  alignItems:"flex-start"}}>
                   <CircleButton 
                   color={WHITE}
                   onPress={()=>navigation.goBack()} 
                   icon={<Feather name="chevron-left" size={WINDOW_HEIGHT*0.02} color={DARKGREY} />}></CircleButton>
               </View>
  )
}

export default GoBackButton