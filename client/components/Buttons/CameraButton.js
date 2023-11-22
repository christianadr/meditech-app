import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function CameraButton({ onPress, icon, style }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={style ? { ...style, ...styles.button } : styles.button}
                // style={styles.button}
            >
                <Entypo name={icon} size={28} color={"rgba(0, 0, 0, 1)"} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        bottom: 50,
        alignSelf: "center",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, .8)",
        width: 60,
        height: 60,
        borderRadius: 100,
    },
});
