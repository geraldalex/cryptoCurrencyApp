import React from 'react';
import { CryptoDetail, Transaction } from "./src/screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Tabs from "./src/navigation/tabs";

const Stack = createNativeStackNavigator();

const App = () => {
  

  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
       
        await SplashScreen.preventAutoHideAsync();
        
        await Font.loadAsync({"Roboto-Bold": require('./src/assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Black": require('./src/assets/fonts/Roboto-Black.ttf'),
        "Roboto-Regular": require('./src/assets/fonts/Roboto-Regular.ttf'),});
       
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  onLayoutRootView()
 
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen
          name="Home"
          component={Tabs}
        />
        <Stack.Screen
          name="CryptoDetail"
          component={CryptoDetail}
        />
        <Stack.Screen
          name="Transaction"
          component={Transaction}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;