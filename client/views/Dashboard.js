import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
// import { FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PrescriptionList from "../components/PrescriptionList";
import { PRESCRIPTIONS as initialPrescriptions } from "../data";
import AddingPrescription from "../components/AddingPrescription";

export default function Dashboard({ navigation }) {
    // useState to determine whether to open or close the
    // prescription dialog, use setIsDialogOpen to update
    // current state of the variable isDialogOpen
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [prescription, setPrescriptions] = useState(initialPrescriptions);

    navigateToCameraPreview = () => {
        // console.log("Get Started Clicked..."); // debug purposes
        navigation.navigate("CameraPreview");
    };

    // Function to open the prescription dialog
    // when the "+" button is pressed
    // const openDialog = () => {
    //     setIsDialogOpen(true);
    // };

    // // Function to close the prescription dialog
    // const closeDialog = () => {
    //     setIsDialogOpen(false);
    // };

    // Function to handle adding a new prescription to the list
    const handleAddPrescription = (newPrescription) => {
        // Copying existing 'PRESCRIPTIONS' array with the newPrescription object
        const updatedPrescription = [
            ...prescription,
            {
                id: prescription.length + 1,
                ...newPrescription,
            },
        ];

        // Replace the old array with a new one
        setPrescriptions(updatedPrescription);

        // closeDialog(); // Closing dialog box
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
                        For an accurate, productive, and fast prescription
                        transcription, take a note like a pro
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
                style={styles.prescriptListView}
            >
                <PrescriptionList list={prescription} />
            </ScrollView>

            {/* Added floating button, open dialog box when pressed */}
            <TouchableOpacity
                onPress={navigateToCameraPreview}
                style={styles.fabButton}
            >
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
});
