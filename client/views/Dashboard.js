import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	Text,
	Button,
	TouchableOpacity,
	ScrollView,
	Modal,
} from "react-native";
// import { FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PrescriptionList from "../components/PrescriptionList";
import { PRESCRIPTIONS as initialPrescriptions } from "../data";
import AddingPrescription from "../components/AddingPrescription";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { SERVER_URL } from "../Globals.js";
import { getValueFor } from "../utils/storage.js";

const FormData = globalThis.FormData;

export default function Dashboard({ navigation }) {
	// useState to determine whether to open or close the
	// prescription dialog, use setIsDialogOpen to update
	// current state of the variable isDialogOpen
	const [modalVisible, setModalVisible] = useState(false);
	const [image, setImage] = useState();

	const navigateToCameraPreview = () => {
		// console.log("Get Started Clicked..."); // debug purposes
		navigation.navigate("CameraPreview");
	};

	/**
	 * 	Function to open the prescription dialog
	 *  when the "+" button is pressed
	 */
	const openDialog = () => {
		setModalVisible(true);
	};

	/**
	 * Function to close the prescription dialog
	 */
	const closeDialog = () => {
		setModalVisible(false);
	};

	/**
	 * Function to call when user pressed the camera or gallery
	 * button. Initiates the device to open either the camera or the
	 * gallery.
	 * @param {*} mode
	 */
	const uploadImage = async (mode) => {
		try {
			let result = {};
			if (mode === "gallery") {
				await ImagePicker.requestMediaLibraryPermissionsAsync();
				result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});
			} else {
				await ImagePicker.requestCameraPermissionsAsync();
				result = await ImagePicker.launchCameraAsync({
					cameraType: ImagePicker.CameraType.back,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});
			}

			if (!result.canceled) {
				await saveImage(result.assets[0].uri);
			}
		} catch (error) {
			alert("Error uploading image: " + error.message);
			setModalVisible(false);
		}
	};

	/**
	 * Saves the image's URI for later retrieval
	 * @param {*} image
	 */
	const saveImage = async (image) => {
		try {
			setImage(image);

			uploadImageToServer(); // api call to send image to backend

			setModalVisible(false);
		} catch (error) {
			throw error;
		}
	};

	/**
	 * Uploads selected image to the backend server.
	 */
	const uploadImageToServer = async () => {
		// Create a form data that will be sent to the backend
		const formData = new FormData();
		formData.append("image", {
			uri: image,
			type: "image/jpeg",
			name: "image.jpg",
		});

		const url = `${SERVER_URL}/v1/prescriptions/upload`;

		try {
			let response = await fetch(url, {
				method: "POST",
				body: formData,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${await getValueFor("access_token")}`,
				},
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);

				navigation.navigate("AddPrescription", {
					data: { ...responseData },
				});
			} else {
				alert("Request error: ", response.status);
			}
		} catch (error) {
			alert(`No inferences detected.`);
		}
	};

	return (
		<View style={styles.mainView}>
			<View style={styles.topNavBar}>
				<Image source={require("client/assets/images/logo.png")} />

				{/* Search button */}
				<TouchableOpacity onPress={null}>
					<View>
						<Image
							source={require("client/assets/images/search.png")}
							style={styles.searchIcon}
						/>
					</View>
				</TouchableOpacity>
			</View>

			{/* {isDialogOpen && <View style={styles.overlay}></View>} */}

			{/* some announcement */}
			<View style={styles.roundedRectangle}>
				<View style={styles.textContainer}>
					<Text style={styles.textHeader}>Upgrade to Premium</Text>
					<Text style={styles.textBody}>
						For an accurate, productive, and fast prescription transcription,
						take a note like a pro
					</Text>
					<TouchableOpacity>
						<View style={styles.roundedButton}>
							<Text style={styles.buttonText}>Try for free</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Image
					source={require("client/assets/images/medical-consultation.png")}
					style={styles.image}
				/>
			</View>

			{/* Current prescription notes*/}
			<View style={styles.prescription}>
				<Text style={styles.textHeader}>Prescription Notes</Text>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.prescriptListView}>
				<PrescriptionList />
			</ScrollView>

			{/* Modal for camera and gallery options */}
			<Modal
				// animationType="slide"
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					closeDialog();
				}}>
				<View style={styles.modalView}>
					<View style={styles.modalContent}>
						<Text>Choose an option:</Text>
						<View style={styles.modalButtons}>
							<TouchableOpacity
								onPress={() => uploadImage()}
								style={styles.buttonContainer}>
								<Entypo
									name="camera"
									size={30}
									color={colors.white}
									style={{
										justifyContent: "center",
										alignSelf: "center",
									}}
								/>
								<Text style={styles.buttonTextModal}>Camera</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => uploadImage("gallery")}
								style={styles.buttonContainer}>
								<Entypo
									name="images"
									size={30}
									color={colors.white}
									style={{
										justifyContent: "center",
										alignSelf: "center",
									}}
								/>
								<Text style={styles.buttonTextModal}>Gallery</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={closeDialog}
								style={styles.buttonContainer}>
								<Entypo
									name="cross"
									size={30}
									color={colors.white}
									style={{
										justifyContent: "center",
										alignSelf: "center",
									}}
								/>
								<Text style={styles.buttonTextModal}>Exit</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* Added floating button, open dialog box when pressed */}
			<TouchableOpacity onPress={openDialog} style={styles.fabButton}>
				<View style={styles.fabButtonView}>
					<Text style={styles.fabButtonText}>+</Text>
				</View>
			</TouchableOpacity>
			{/* <CameraComponent isOpen={isDialogOpen} onClose={closeDialog} /> */}
			{/* Prescription Dialog */}
			{/* <AddingPrescription
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onAddPrescription={handleAddPrescription}
            /> */}
		</View>
	);
}

const colors = {
	primary: "#00A65D",
	secondary: "#6CCAA1",
	white: "#fff",
};

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		paddingTop: "15%",
	},

	overlay: {
		position: "absolute",
		width: "100%",
		height: "110%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1,
	},

	topNavBar: {
		flexDirection: "row",
		paddingHorizontal: "10%",
		justifyContent: "space-between",
	},

	logoImage: {},

	searchIcon: {
		width: 25,
		height: 25,
	},

	roundedRectangle: {
		padding: "5%",
		marginVertical: 20,
		alignContent: "center",
		alignSelf: "center",
		backgroundColor: colors.secondary,
		borderColor: "#000",
		borderWidth: 1,
		width: "90%",
		height: 170,
		borderRadius: 10,
		elevation: 5,
	},

	textContainer: {
		width: "50%",
	},

	textHeader: {
		fontFamily: "Inter-Bold",
		fontSize: 14,
	},

	textBody: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
	},

	image: {
		position: "absolute",
		width: 147,
		height: 129,
		top: 10,
		right: 10,
	},

	roundedButton: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		backgroundColor: colors.primary,
		width: 95,
		height: 25,
		borderRadius: 50,
	},

	buttonText: {
		fontFamily: "Inter-Bold",
		fontSize: 11,
		color: colors.white,
	},

	prescription: {
		paddingHorizontal: "5%",
	},

	fabButton: {
		position: "absolute",
		bottom: 40,
		right: 20,
	},

	fabButtonView: {
		height: 50,
		width: 50,
		backgroundColor: colors.primary,
		elevation: 5,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
	},

	fabButtonText: {
		color: colors.white,
		fontSize: 30,
		// fontWeight: 'bold',
	},

	prescriptListView: {
		paddingTop: "5%",
	},

	modalView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},

	modalContent: {
		backgroundColor: "white",
		marginHorizontal: 20,
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	modalButtons: {
		flexDirection: "row",
		marginVertical: 10,
		gap: 10,
		// paddingLeft: 10,
		// paddingRight: 10,
	},
	buttonContainer: {
		flex: 1,
		gap: 5,
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: colors.primary,
		padding: 20,
		borderRadius: 5,
		// width: "100px",
	},
	buttonTextModal: {
		fontSize: 12,
		fontWeight: "bold",
		alignSelf: "center",
		color: colors.white,
	},
});
