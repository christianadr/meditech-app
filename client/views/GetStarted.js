{/*
    Landing View page for the MediTech App
    Includes the Get Started button and
    welcoming message
*/}

import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

function LandingPage ({navigation}) {

    navigateToDashboard = () => {
        // console.log("Get Started Clicked..."); // debug purposes
        navigation.navigate("Dashboard")
    }

    return (

        // View component for Landing image
        <View style={styles.mainView}>
            <View style={styles.image}>
                <Image source={require("client/assets/images/landing1.png")} 
                />
            </View>

            {/* View component for welcome text */}
            <View style={styles.textHolder}>
                <Text style={styles.text}>
                    Decipher your doctor's prescriptions and convert it into notes
                </Text>
            </View>

            {/* Button to navigate to Dashboard */}
            <TouchableOpacity onPress={(this.navigateToDashboard)} style={styles.buttonStart}>
                <View>
                    <Image source={require("client/assets/images/button.png")} style={styles.buttonContent}/>
                    <Text style={styles.buttonText}>Get Started</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const colors = {
    primary: "#00A65D",
    white: "#fff",
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    image: {
        top: "-2%", 
        // right: "5%",
    },

    textHolder: {
        paddingHorizontal: 20,
        // padding: 30,
    },

    text: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
    },

    buttonStart: {
        padding: 30,
        alignSelf: 'center',
    },

    buttonContent: {
        // padding: 30,
        alignItems: 'center'
    },

    buttonText: {
        fontFamily: "Inter-Bold",
        alignSelf: 'center',
        color: colors.white,
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
    }
});

export default LandingPage