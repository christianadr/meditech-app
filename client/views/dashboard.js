{/*
    Dashboard for the MediTech App
    Includes the available prescriptions
    and their corresponding schedule
*/}

import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

function Dashboard(){
    return (
    <View style={styles.mainView}>
        <View style={styles.topNavBar}>
            <Image source={require('client/assets/images/logo.png')} />

            {/* Search button */}
            <TouchableOpacity onPress={null}>
                <View>
                    <Image source={require("client/assets/images/search.png")} style={styles.searchIcon} />
                </View>
            </TouchableOpacity>
        </View>

        {/* some announcement */}
        <View style={styles.roundedRectangle}>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>Upgrade to Premium</Text>
                <Text style={styles.textBody}>
                    For an accurate, productive, and fast prescription transcription, take a note like a pro
                </Text>
                <TouchableOpacity>
                <View style={styles.roundedButton}>
                    <Text style={styles.buttonText}>Try for free</Text>
                </View>
                </TouchableOpacity>
            </View>
            <Image source={require("client/assets/images/medical-consultation.png")} 
            style={styles.image} 
            />
        </View>
    </View>
    );
};

const colors = {
    primary: "#00A65D",
    secondary: "#6CCAA1",
    white: "#fff",
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: '15%',
    },

    topNavBar: {
        flexDirection: 'row',
        paddingHorizontal: '10%',
        justifyContent: 'space-between',
    },

    logoImage: {
    },

    searchIcon: {
        width: 25,
        height: 25,
    },

    roundedRectangle: {
        padding: '5%',
        marginVertical: 20,
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        borderColor: "#000",
        borderWidth: 1,
        width: '90%',
        height: 170,
        borderRadius: 10,
        elevation: 5,
    },

    textContainer: {
        width: '50%',
    },

    textHeader: {
        fontFamily: 'Inter-Bold',
        fontSize: 14,
    },

    textBody: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
    },
    
    image: {
        position: 'absolute',
        width: 147,
        height: 129,
        top: 10,
        right: 10,
    },

    roundedButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: colors.primary,
        width: 95,
        height: 25,
        borderRadius: 50,
    },

    buttonText: {
        fontFamily: 'Inter-Bold',
        fontSize: 11,
        color: colors.white,
    },

})

export default Dashboard

