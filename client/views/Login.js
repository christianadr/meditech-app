// import { TextInput } from "@react-native-material/core";
import axios from "axios";
import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Link } from "@react-navigation/native";

import { SERVER_URL } from "../Globals.js";
import TextInputComponent from "../components/TextInputs/TextInputComponent";
import * as storage from "../utils/storage.js";

export default function Login({ navigation }) {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    // function for login button
    // -- insert API functionalities here?
    navigateToDashboard = async () => {
        if (email.trim() === "" || password.trim() === "") {
            Alert.alert("Error", "Please fill in all fields.");
        } else {
            // Logins user to the server
            const response = await axios
                .post(`${SERVER_URL}/v1/login/`, {
                    email: email.trim(),
                    password: password.trim(),
                })
                .catch((err) => {
                    Alert.alert("Error", err);
                });

            // If successful loginm navigate user to dashboard
            if (response.status === 200) {
                onChangeEmail("");
                onChangePassword("");

                // Get tokens from response
                const access_token = response.data["access_token"];
                const refresh_token = response.data["refresh_token"];

                // Save tokens in the local storage
                await storage
                    .save("access_token", access_token)
                    .catch((err) => {
                        console.log(err);
                    });
                await storage
                    .save("refresh_token", refresh_token)
                    .catch((err) => {
                        console.log(err);
                    });

                // Navigates to the dashboard
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Dashboard" }],
                });
            }
            // navigation.navigate("Dashboard");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
                >
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <Image
                            source={require("../assets/images/logo-xl.png")}
                            style={styles.logo}
                        />

                        <Text style={[styles.text, { color: colors.primary }]}>
                            Log in
                        </Text>
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.text}>Hello there!</Text>
                            <Text style={styles.text}>Welcome back.</Text>
                        </View>
                        <View style={styles.textInputs}>
                            <TextInputComponent
                                placeholder={"Email Address"}
                                value={email}
                                onChangeText={onChangeEmail}
                            />
                            <TextInputComponent
                                placeholder={"Password"}
                                value={password}
                                onChangeText={onChangePassword}
                                secureText={true}
                            />
                        </View>
                        <TouchableOpacity onPress={navigateToDashboard}>
                            <View
                                style={[
                                    styles.buttonContainer,
                                    { backgroundColor: colors.primary },
                                ]}
                            >
                                <Text style={styles.buttonText}>LOG IN</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.bottomTexts}>
                            <Text
                                style={[
                                    styles.text,
                                    { fontSize: 12, textAlign: "center" },
                                ]}
                            >
                                Don't have an account?{" "}
                                <Link
                                    to="/Registration"
                                    style={{ color: colors.primary }}
                                >
                                    Sign Up
                                </Link>
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const colors = {
    primary: "#00A65D",
    white: "#fff",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: "center",
    },
    subContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
    },
    logo: {
        alignSelf: "center",
        marginBottom: 100,
        top: 100,
    },
    welcomeContainer: {
        marginTop: 20,
    },
    text: {
        fontFamily: "Inter-Regular",
        fontSize: 20,
    },
    textInputs: {
        marginTop: 20,
        gap: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "80%",
        height: 40,
    },
    buttonText: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "white",
    },
    bottomTexts: {
        marginTop: 20,
        width: "80%",
        alignSelf: "center",
        gap: 20,
    },
});
