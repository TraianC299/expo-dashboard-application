import React, {useState, useRef, useEffect} from 'react'
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native'
import { BLACK, DARKGREY, MAINCOLOR, WHITE } from '../../constants/Colors'
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { globalStyles } from '../../styles/global'
import { Feather } from '@expo/vector-icons'; 
import { WINDOW_HEIGHT } from '../../constants/Layout';

interface DismissKeyboardProps {
    children: React.ReactNode;
    open: boolean;
    setOpen: (x: boolean) => void;
}


const DismissKeyboard:React.FC<DismissKeyboardProps> = ({ children, open, setOpen }) => (
    <Pressable style={{zIndex:open?100000:0, elevation:open?1:-1}} hitSlop={open?100000:0} onPress={() => setOpen(false)}>
    {children}
    </Pressable>
    );



    interface SelectorProps {
        options: Array<{value: string, label:string}>;
        value: string;
        setValue: (x: string) => void;
        style?: any;
        label?: string;

    }
const Selector:React.FC<SelectorProps> = ({options, value, setValue, style, label}) => {
    const [open, setOpen] = useState<boolean>(false)
    let fadeAnim = useRef(new Animated.Value(0)).current;


  

    const fade = (value:1 | 0) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: value,
          duration: 200,
          useNativeDriver:true
        }).start();
      };

      useEffect(()=>{
        setOpen(false)
      },[value])

      useDidMountEffect(()=>{
        fade(open ? 1 : 0)
      },[open])
    return (
    // <DismissKeyboard style={style} setOpen={setOpen} open={open}>
    <View style={style}>
        <Pressable onPress={()=>setOpen(previous=>!previous)} style={{...globalStyles.input, justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
            <Text style={{...globalStyles.p, color:value?WHITE:"#ffffff50"}}>{value?options.find(el=>el.value===value).label:label}</Text>
            <Feather name={open?"chevron-up":"chevron-down"} size={WINDOW_HEIGHT*0.02} color={WHITE} />
        </Pressable>
        {<Animated.ScrollView pointerEvents={open?"box-none":"none"} style={[styles.container, {opacity: fadeAnim, zIndex:9999999999}]}>
         {options.map(el=><Item key={el.value} value={el.value} setValue={setValue} label={el.label}></Item>)}
        </Animated.ScrollView>}
    </View>
    // </DismissKeyboard>
    )
}




interface ItemProps {
    label: string;
    value: string;
    setValue: (x: string) => void;

}

const Item:React.FC<ItemProps>  = ({value, setValue, label}) => {
    const [pressIn, setPressIn] = useState(false)
    return(
        <Pressable onPressIn={()=>setPressIn(true)} onPressOut={()=>setPressIn(false)} style={{...styles.item, backgroundColor:pressIn?MAINCOLOR:DARKGREY}} onPress={()=>setValue(value)}  >
            <Text style={{color:pressIn?BLACK:WHITE}}>{label}</Text>
         </Pressable>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: DARKGREY,
        borderRadius: 14,
        position: "absolute",
        flexDirection:"column",
        width:"100%",
        left: 0,
        top: "100%",
        zIndex:999,
        height: 250
    },
    item:{
        width:"100%",
        alignItems:'center',
        justifyContent:"center",
        height:50,
        borderTopWidth:0.5,
        borderColor:BLACK,
        zIndex:99999999,
        flex:1
    }
})
    export default Selector