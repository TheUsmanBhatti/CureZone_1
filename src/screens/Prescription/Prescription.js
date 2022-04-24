import React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import { PrescriptionCard } from '../../components';


const Prescription = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <PrescriptionCard navigation={navigation}/>
            </View>
            <View style={styles.container}>
                <PrescriptionCard navigation={navigation}/>
            </View>
            <View style={styles.container}>
                <PrescriptionCard navigation={navigation}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

export default Prescription;