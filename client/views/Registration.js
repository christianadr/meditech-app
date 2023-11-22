// import { TextInput } from "@react-native-material/core";
import axios from "axios";
import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";

import TextInputComponent from "../components/TextInputs/TextInputComponent";
import { Link } from "@react-navigation/native";
import { SERVER_URL } from "../Globals.js";

export default function Registration({ navigation }) {
	const [name, onChangeName] = useState("");
	const [email, onChangeEmail] = useState("");
	const [confirmEmail, onChangeConfirmEmail] = useState("");
	const [password, onChangePassword] = useState("");
	const [confirmPassword, onChangeConfirmPassword] = useState("");

	// function for login button
	// -- insert API functionalities here?
	navigateToDashboard = () => {
		if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
			Alert.alert("Error", "Please fill in all fields.");
		} else if (
			email.trim() !== confirmEmail.trim() ||
			password.trim() !== confirmPassword.trim()
		) {
			Alert.alert("Wrong confirmation", "Please confirm email or password.");
		} else {
			// Registering the user to the server
			axios
				.post(`${SERVER_URL}/v1/register`, {
					name: name,
					email: email,
					password: password,
				})
				.then((response) => {
					// If the response is successful. navigate to dashboard
					if (response.status === 200) {
						// Clear all inputs
						onChangeName("");
						onChangeEmail("");
						onChangeConfirmEmail("");
						onChangePassword("");
						onChangeConfirmPassword("");

						// Navigates to Dashboard
						navigation.navigate("Login");
					}
				})
				.catch((err) => {
					Alert.alert(err.response.data);
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.subContainer}>
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<Text style={[styles.text, { color: colors.primary }]}>
							Sign Up
						</Text>
						<View>
							<Text style={styles.text}>Hello there!</Text>
							<Text style={styles.text}>Welcome to MediTech App.</Text>
						</View>
						<View style={styles.textInputs}>
							<TextInputComponent
								placeholder={"Full Name"}
								value={name}
								onChangeText={onChangeName}
							/>
							<TextInputComponent
								placeholder={"Email Address"}
								value={email}
								onChangeText={onChangeEmail}
							/>
							<TextInputComponent
								placeholder={"Confirm Email Address"}
								value={confirmEmail}
								onChangeText={onChangeConfirmEmail}
							/>
							<TextInputComponent
								placeholder={"Password"}
								value={password}
								onChangeText={onChangePassword}
								secureText={true}
							/>
							<TextInputComponent
								placeholder={"Confirm Password"}
								value={confirmPassword}
								onChangeText={onChangeConfirmPassword}
								secureText={true}
							/>
						</View>
						<TouchableOpacity onPress={navigateToDashboard}>
							<View
								style={[
									styles.buttonContainer,
									{ backgroundColor: colors.primary },
								]}>
								<Text style={styles.buttonText}>SIGN UP</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.bottomTexts}>
							<Text style={[styles.text, { fontSize: 12 }]}>
								By registering with MediTech, you agree to our{" "}
								<Link to="/Registration" style={{ color: colors.primary }}>
									Terms of Use
								</Link>{" "}
								and{" "}
								<Link to="/Registration" style={{ color: colors.primary }}>
									Privacy Policy
								</Link>
								.
							</Text>
							<Text
								style={[styles.text, { fontSize: 12, textAlign: "center" }]}>
								Already have an account?{" "}
								<Link to="/Login" style={{ color: colors.primary }}>
									Log In
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

	text: {
		fontFamily: "Inter-Regular",
		fontSize: 20,
	},
	textInputs: {
		marginTop: 10,
		gap: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		marginTop: 20,
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
