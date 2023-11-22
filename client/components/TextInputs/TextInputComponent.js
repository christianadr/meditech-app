import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const TextInputComponent = ({
    placeholder,
    value,
    onChangeText,
    secureText = false,
}) => {
    return (
        <View style={{ marginTop: 15 }}>
            <Text style={styles.text}>{placeholder}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => onChangeText(text)}
                secureTextEntry={secureText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Inter-Regular",
        fontSize: 12,
    },
    textInput: {
        borderBottomWidth: 1,
        paddingTop: 1,
        paddingBottom: 1,
    },
});

export default TextInputComponent;
