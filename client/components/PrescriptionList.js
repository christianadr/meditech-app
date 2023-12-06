import * as React from "react";
import { useEffect, useState } from "react";
import {
    RefreshControl,
    FlatList,
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from "react-native";

import { SERVER_URL } from "../Globals";
import { getValueFor } from "../utils/storage";

const PrescriptionList = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [prescriptionList, setPrescriptionList] = React.useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    /**
     * Retrieves a list of prescriptions from the backend associated
     * with the user's account. This also updates the prescription list.
     */
    const retrievePrescriptions = async () => {
        const url = `${SERVER_URL}/v1/prescriptions`;

        try {
            // Fetches data from the backend. Retrives all saved prescriptions
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${await getValueFor(
                        "access_token"
                    )}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();

                // Retrieves data from the response and updates the list
                let tmp = [];
                const prescriptionsFromResponse = responseData?.prescriptions;
                if (Array.isArray(prescriptionsFromResponse)) {
                    for (item of prescriptionsFromResponse) {
                        const prescription = {
                            id: item[0],
                            medication: item[1],
                            dosage: item[2],
                            instruction: item[3],
                        };

                        tmp.push(prescription);
                    }
                }

                setPrescriptionList(tmp);
            }
        } catch (err) {
            alert(`Error retrieving prescriptions: ${err.message}`);
        }
    };

    /**
     * Called when user refreshes the list
     */
    const onRefresh = async () => {
        setRefreshing(true);

        // Fetch prescriptions from the database
        await retrievePrescriptions();

        setRefreshing(false);
    };

    // Only called once or  the page is reloaded
    useEffect(() => {
        /**
         * Used to call retrieve prescriptions on page load.
         */
        const fetchData = async () => {
            await retrievePrescriptions();
        };

        fetchData();
    }, []);

    const handleOptions = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleDelete = async () => {
        // Logic to delete the selected item
        // For example, send a DELETE request to the backend
        const itemId = selectedItem.id;
        try {
            // Make a DELETE request to delete the prescription
            const url = `${SERVER_URL}/v1/prescriptions/delete`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getValueFor(
                        "access_token"
                    )}`,
                },
                body: JSON.stringify({ prescription_id: itemId }),
            });

            if (response.ok) {
                // Refresh the list of prescriptions
                await onRefresh();
            } else {
                // Handle unsuccessful deletion
                // Show error message or take appropriate action
            }
        } catch (error) {
            // Handle error
            console.error("Error deleting prescription:", error);
        }

        // Close the modal after deletion
        setIsModalVisible(false);
    };

    const handleUpdate = async () => {
        // When user pressed edit, navigate to Update Prescription view
        navigation.navigate("UpdatePrescription", { ...selectedItem });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={prescriptionList}
                horizontal
                decelerationRate="fast"
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => handleOptions(item)}
                            style={{
                                marginLeft: 15,
                                marginRight:
                                    index === prescriptionList.length - 1
                                        ? 15
                                        : 0,
                            }}
                        >
                            <View style={styles.card}>
                                <Text style={styles.header}>
                                    {item.medication}
                                </Text>
                                <Text style={styles.text}>{item.dosage}</Text>
                                <Text
                                    style={[
                                        styles.text,
                                        { marginVertical: 15 },
                                    ]}
                                >
                                    {item.instruction}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Edit or Delete?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                                style={styles.buttonContainer}
                            >
                                <Text style={styles.buttonTextModal}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleUpdate}
                                style={[
                                    styles.buttonContainer,
                                    { backgroundColor: colors.orange },
                                ]}
                            >
                                <Text style={styles.buttonTextModal}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDelete}
                                style={[
                                    styles.buttonContainer,
                                    { backgroundColor: colors.red },
                                ]}
                            >
                                <Text style={styles.buttonTextModal}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const colors = {
    primary: "#00A65D",
    secondary: "#6CCAA1",
    white: "#fff",
    red: "#ff1b1b",
    orange: "#ffb347",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: 160,
        height: 160,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        justifyContent: "center",
    },
    header: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
    },
    text: {
        fontFamily: "Inter-Regular",
        fontSize: 12,
    },
    modalContainer: {
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
    },
    buttonContainer: {
        flex: 1,
        height: 40,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    buttonTextModal: {
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "center",
        color: colors.white,
    },
});

export default PrescriptionList;
