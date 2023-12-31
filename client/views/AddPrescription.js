import React, { useState, useEffect } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import TextInputComponent from "../components/TextInputs/TextInputComponent";
import { SERVER_URL } from "../Globals";
import { getValueFor } from "../utils/storage";

export default function AddingPrescription({ navigation, route }) {
    const [name, onChangeName] = useState("");
    const [dosage, onChangeDosage] = useState("");
    const [instruction, onChangeInstruction] = useState("");

    const navigateToDashboard = async () => {
        // console.log("Get Started Clicked..."); // debug purposes
        await sendToBackend(name, dosage, instruction);
        navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
        });
    };

    /**
     * This sends that passed arguments to the backend server.
     * @param {*} medicine_name
     * @param {*} medicine_dosage
     * @param {*} medicine_instruction
     */
    const sendToBackend = async (
        medicine_name,
        medicine_dosage,
        medicine_instruction
    ) => {
        const url = `${SERVER_URL}/v1/prescriptions`;
        try {
            // Sends prescription to the backend
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getValueFor(
                        "access_token"
                    )}`,
                },
                body: JSON.stringify({
                    medication: medicine_name,
                    dosage: medicine_dosage,
                    instruction: medicine_instruction,
                }),
            });

            if (response.ok) {
                alert("Prescription added.");
            }
        } catch (err) {
            alert(`Error adding prescription: ${err.message}`);
        }
    };

    useEffect(() => {
        // If received any inferences, it will update corresponding text input
        const medicine_name = route.params?.data?.medicine_name;
        if (medicine_name) onChangeName(medicine_name);

        const medicine_dosage = route.params?.data?.medicine_dosage;
        if (medicine_dosage) onChangeDosage(medicine_dosage);

        const medicine_instruction = route.params?.data?.medicine_instruction;
        if (medicine_instruction) onChangeInstruction(medicine_instruction);

        if (!medicine_name && !medicine_dosage && !medicine_instruction)
            alert(
                "Cannot extract information from prescription. Switching to manual input."
            );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("client/assets/images/doctor-consultation.png")}
                    // width={}
                    style={styles.image}
                />
            </View>
            <TextInputComponent
                onChangeText={onChangeName}
                value={name}
                placeholder={"Medicine Name"}
            />
            <TextInputComponent
                onChangeText={onChangeDosage}
                value={dosage}
                placeholder={"Medicine Dosage"}
            />
            <TextInputComponent
                onChangeText={onChangeInstruction}
                value={instruction}
                placeholder={"Medicine Instruction"}
            />
            <TouchableOpacity onPress={navigateToDashboard}>
                <View
                    style={[
                        styles.buttonContainer,
                        { backgroundColor: colors.primary },
                    ]}
                >
                    <Text style={styles.buttonText}>ADD PRESCRIPTION</Text>
                </View>
            </TouchableOpacity>
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
        justifyContent: "center",
        margin: 40,
        gap: 20,
    },
    imageContainer: {
        // flex: 2,
        alignSelf: "center",
        justifyContent: "center",
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
