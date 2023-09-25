
import * as React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const PrescriptionList = ({list}) => {
    return (
        <FlatList 
            data={list}
            horizontal
            keyExtractor={i => i.id}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity style={{marginLeft: 15,}}>
                        <View style={styles.card}>
                            <Text style={styles.header}>{item.medication}</Text>
                            <Text style={styles.text}>{item.dosage}</Text>
                            <Text style={[styles.text, {marginVertical: 15,}]}>{item.instruction}</Text>
                            <Text style={[styles.text, {fontFamily: 'Inter-Bold'}]}>Schedule</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 185,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
    },

    header: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
    },

    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
    }
})

export default PrescriptionList;