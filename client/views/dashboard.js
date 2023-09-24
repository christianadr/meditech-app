{/*
    Dashboard for the MediTech App
    Includes the available prescriptions
    and their corresponding schedule
*/}

import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

function Dashboard(){
    return (
    <View style={styles.mainView}>
        <Image source={require('client/assets/images/logo.png')} />

        {/* Search button */}
        <TouchableOpacity onPress={null}>
            <View>
                <Image source={require("client/assets/images/search.png")} style={styles.searchIcon} />
            </View>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: '15%',
        paddingHorizontal: '10%',
        justifyContent: 'space-between',
    },

    logoImage: {
    },

    searchIcon: {
        width: 25,
        height: 25,
    }
})

export default Dashboard

