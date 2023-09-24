import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import LandingPage from './views/landingPage';
import Dashboard from './views/dashboard';

const Stack = createNativeStackNavigator();

const App = () => {

    const [loaded] = useFonts({
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf")
    })

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='GetStarted'>
                <Stack.Screen 
                    name="GetStarted"
                    component={LandingPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// export default function App() {

//   const [loaded] = useFonts({
//     "Inter-Bold": require('./assets/fonts/Inter-Bold.ttf'),
//   });

//   if (!loaded) {
//     return null;
//   }

  

//   return (
//     <LandingPage />
//   );
// }

export default App