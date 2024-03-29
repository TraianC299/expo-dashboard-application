import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LogIn from './screens/LogIn';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SnackProvider } from './contexts/SnackContext';



 function NoContextApp() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const {currentUser} = useAuth()
  const {loading, setReload} = useData()


  const onLayoutRootView = useCallback(async () => {
    if (!currentUser.token) {
      await SplashScreen.hideAsync();
    }else{
    if(!loading){
      await SplashScreen.hideAsync();
    }
}
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
    }
  , [loading, currentUser]);

  // TaskManager.defineTask('fetch-after-notification', async () => {
  //   setReload(previous=>!previous)
  // })


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    
         

    !currentUser.token?
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <LogIn></LogIn>
    </SafeAreaProvider>
    :
    <SafeAreaProvider onLayout={onLayoutRootView}>
    <Navigation
     colorScheme={colorScheme} />
          <StatusBar />
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
