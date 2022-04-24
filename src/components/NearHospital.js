// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, StyleSheet } from 'react-native';


// ---------------------------  Importing Map

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


// ==========================================  Creating a Component  ========================================

export default function NearHospital() {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 33.6844,
                    longitude: 73.0479,
                    latitudeDelta: 0.085,
                    longitudeDelta: 0.0521,
                }}
                showsUserLocation={true}>
            </MapView>
        </View>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#7f00ff'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 2,
        right: 2,
        bottom: 2,
        left: 2
    },
})