// import { TextInput } from "@react-native-material/core";
import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Alert,
} from "react-native";

export default function Login({ navigation }) {
	const [email, onChangeEmail] = useState("");
	const [password, onChangePassword] = useState("");

	// function for login button
	// -- insert API functionalities here?
	navigateToDashboard = () => {
		if (email.trim() === "" || password.trim() === "") {
			Alert.alert("Error", "Please fill in all fields.");
		} else {
			// console.log("Login Clicked..."); // debug purposes
			console.log(email);
			console.log(password);

			navigation.navigate("Dashboard");
			onChangeEmail("");
			onChangePassword("");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../assets/images/logo-xl.png")}
				style={styles.logo}
			/>
			<View style={styles.subContainer}>
				<Text style={[styles.text, { color: colors.primary }]}>Log in</Text>
				<View style={styles.welcomeContainer}>
					<Text style={styles.text}>Hello there!</Text>
					<Text style={styles.text}>Welcome back.</Text>
				</View>
				<View style={styles.textInputs}>
					<Text style={[styles.text, { fontSize: 10 }]}>Email Address</Text>
					<TextInput
						style={styles.textInput}
						value={email}
						onChangeText={(text) => onChangeEmail(text)}
						placeholder="Email Address"
					/>
					<Text style={[styles.text, { fontSize: 10 }]}>Password</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Password"
						value={password}
						onChangeText={(text) => onChangePassword(text)}
						secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity onPress={navigateToDashboard}>
					<View
						style={[
							styles.buttonContainer,
							{ backgroundColor: colors.primary },
						]}>
						<Text style={styles.buttonText}>LOG IN</Text>
					</View>
				</TouchableOpacity>
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
	text: {
		fontFamily: "Inter-Regular",
		fontSize: 20,
	},
	subContainer: {
		flex: 1,
		justifyContent: "center",
		marginTop: 200,
		padding: 30,
		gap: 20,
	},
	welcomeContainer: {
		// marginTop: 20,
	},
	textInputs: {
		marginTop: 20,
		gap: 10,
	},
	textInput: {
		borderBottomWidth: 1,
		paddingTop: 2,
		paddingBottom: 2,
	},
	logo: {
		position: "absolute",
		alignSelf: "center",
		top: 150,
	},
	buttonContainer: {
		position: "absolute",
		// top: 140,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		// backgroundColor: "white",
		width: "80%",
		height: 40,
	},
	buttonText: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: "white",
		// fontWeight: "bold",
	},
});
