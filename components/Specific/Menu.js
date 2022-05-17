import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MAINCOLOR } from '../../constants/Colors';
import { WINDOW_WIDTH } from '../../constants/Layout'

function Menu({ state, descriptors, navigation }) {
    return (
      <View style={{ 
          flexDirection: 'row', 
      position: 'absolute', 
        height: 60,
        bottom:  WINDOW_WIDTH*0.1, 
        left: WINDOW_WIDTH*0.25, 
        backgroundColor: '#fff', 
        width: WINDOW_WIDTH*0.5, 
        borderRadius: 1000, 
        shadowColor: '#00000030', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, shadowRadius: 20, 
        elevation: 5, 
        justifyContent:"center", 
        alignItems:"center" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text> */}
              <View>
                  {options.tabBarIcon({ focused: isFocused, color: isFocused ? MAINCOLOR : '#222' })}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }



  const styles = StyleSheet.create({
    container:{
        position:"fixed",
        bottom:10,
        width: WINDOW_WIDTH*0.8,
        left: WINDOW_WIDTH*0.1,
        height: 60,
        backgroundColor: "white",
    }
  })
export default Menu