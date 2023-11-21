import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

export default function LandingPage({ navigation }) {
    navigateToLogin = () => {
        // console.log("Get Started Clicked..."); // debug purposes
        navigation.navigate("Login");
    };

    return (
        <ImageBackground
            source={require("../assets/images/login-bg.png")}
            style={[styles.container]}
        >
            <View style={[styles.overlay, { width: "100%", height: "100%" }]}>
                <Image
                    source={require("../assets/images/logo-white.png")}
                    style={{ position: "absolute", alignSelf: "center" }}
                />
                <TouchableOpacity onPress={navigateToLogin}>
                    <View
                        style={[
                            styles.buttonContainer,
                            { backgroundColor: "white" },
                        ]}
                    >
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View
                        style={[
                            styles.buttonContainer,
                            { borderWidth: 1, borderColor: "white", top: 190 },
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: "white" }]}>
                            SIGN UP
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const colors = {
    primary: "#00A65D",
    white: "#fff",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0,166,93,0.8)",
        // resizeMode: "stretch",
        justifyContent: "center",
        alignItems: "center",
        // opacity: 0.2,
    },
    buttonContainer: {
        position: "absolute",
        top: 140,
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
        color: colors.primary,
        // fontWeight: "bold",
    },
});
