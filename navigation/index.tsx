/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Menu from '../components/Specific/Menu';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Colors, { MAINCOLOR } from '../constants/Colors';
import { WINDOW_WIDTH } from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import LogIn from '../screens/LogIn';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/Settings';
import TabTwoScreen from '../screens/Orders';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Products from '../screens/Products';
import OrderViewModal from '../screens/OrderViewModal';
import AddProductModal from '../screens/AddProductModal';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{
                    headerShown: false,
                }} name="Root" component={BottomTabNavigator}/>
      {/* <Stack.Screen options={{
                    headerShown: false,
                    mode: 'modal'
                }} name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen 
                name="OrderModal" component={OrderViewModal} />
        <Stack.Screen 
                name="AddProductModal" component={AddProductModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
    tabBar={(props)=><Menu {...props}></Menu>}
    screenOptions={{
      title: '',
      tabBarStyle: { 
        position: 'absolute' },
    }}
      initialRouteName="TabOne"
      
      >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          headerShown:false,
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          headerShown:false,
          title: 'Tab Two',
          tabBarIcon: ({ color }) =><Feather name="shopping-cart" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={Products}
        options={{
          headerShown:false,
          title: 'Tab Three',
          tabBarIcon: ({ color }) => <Feather name="box" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


