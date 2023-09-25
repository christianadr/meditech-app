import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const AddingPrescription = ({ isOpen, onClose, onAddPrescription }) => {

    // useState to change the values of the newPrescription
    // by using the function setNewPrescriptions
    const [newPrescription, setNewPrescription] = useState({
        medication: '',
        dosage: '',
        instruction: '',
    });

    // Function to handle adding the values in newPrescription
    // to the prescription list using the onAddPrescription callback
    const handleAddPrescription = () => {

        // Calling onAddPrescription callback with the
        // current newPrescription
        onAddPrescription(newPrescription);

        // Resetting newPrescription states to empty values
        setNewPrescription({
            medication: '',
            dosage: '',
            instruction: '',
        });
    };

    return (
        isOpen && (
            <View style={styles.dialog}>
                <Text style={{fontFamily: 'Inter-Bold', fontSize: 16, textAlign: 'center',}}>Add a New Prescription</Text>
                <TextInput style={styles.textInput}
                    placeholder="Medication"
                    value={newPrescription.medication}
                    onChangeText={(text) => setNewPrescription({ ...newPrescription, medication: text })}
                />
                <TextInput style={styles.textInput}
                    placeholder="Dosage"
                    value={newPrescription.dosage}
                    onChangeText={(text) => setNewPrescription({ ...newPrescription, dosage: text })}
                />
                <TextInput style={styles.textInput}
                    placeholder="Instructions"
                    value={newPrescription.instruction}
                    onChangeText={(text) => setNewPrescription({ ...newPrescription, instruction: text })}
                />
                <TouchableOpacity onPress={handleAddPrescription} style={styles.selection}>
                    <Text style={{color:colors.white, fontFamily: 'Inter-Regular'}}>Add Prescription</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.selection}>
                    <Text style={{color:colors.white, fontFamily: 'Inter-Regular'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    );
};

const colors = {
    primary: "#00A65D",
    secondary: "#6CCAA1",
    white: "#fff",
};

const styles = StyleSheet.create({
    dialog: {
        alignItem: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        elevation: 5,
        transform: [{ translateX: -(width * 0.4)},
                    { translateY: -140}],
        height: 400,
        width: width*0.8,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        padding: 10,
        zIndex: 2,
    },

    textInput: {
        height: 40,
        margin: 12,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
    },

    selection: {
        alignSelf: 'center',
        margin: 5,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 6,
        borderWidth: 1
    }
})

export default AddingPrescription;
