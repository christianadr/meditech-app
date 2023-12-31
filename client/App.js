import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import LandingPage from "./views/LandingPage.js";
import Dashboard from "./views/Dashboard.js";
import Login from "./views/Login.js";
import Registration from "./views/Registration.js";
import AddingPrescription from "./views/AddPrescription.js";
import UpdatingPrescription from "./views/UpdatePrescription.js";

const Stack = createNativeStackNavigator();

const App = () => {
    const [loaded] = useFonts({
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LandingPage">
                <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Registration"
                    component={Registration}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddPrescription"
                    component={AddingPrescription}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdatePrescription"
                    component={UpdatingPrescription}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
