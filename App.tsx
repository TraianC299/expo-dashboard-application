import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LogIn from './screens/LogIn';
import {Text, View, ActivityIndicator} from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import { MAINCOLOR } from './constants/Colors';
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import useDidMountEffect from './hooks/useDidMountEffect';
import * as SplashScreen from 'expo-splash-screen';
import { SnackProvider } from './contexts/SnackContext';

 function NoContextApp() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const {currentUser} = useAuth()
  const {loading} = useData()
  const onLayoutRootView = useCallback(async () => {
    // if (!loading) {
    //   // This tells the splash screen to hide immediately! If we call this after
    //   // `setAppIsReady`, then we may see a blank screen while the app is
    //   // loading its initial state and rendering its first pixels. So instead,
    //   // we hide the splash screen once we know the root view has already
    //   // performed layout.
    //   await SplashScreen.hideAsync();
    // }
  }, [loading]);

  // Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

  if (!isLoadingComplete ||loading) {
    return null;
  } else {
    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
         {
    !currentUser.token?
    <LogIn></LogIn>
    :
    <>
    <Navigation
     colorScheme={colorScheme} />
          <StatusBar />
        </>}
        </SafeAreaProvider>
    );
  }
}

export default function App () {
  return(
    <AuthProvider>
      <DataProvider>
        <SnackProvider>
          <NoContextApp></NoContextApp>
        </SnackProvider>
      </DataProvider>
    </AuthProvider>
  )
}
