// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


// ---------------------------  Importing Linear Gradient Library

import LinearGradient from 'react-native-linear-gradient';


// ==========================================  Creating a Component  ========================================

const CovidCard = (props) => {
    const {navigation} = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('CovidDetail')}>
            <LinearGradient
                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }}
                colors={['#9e4bff', '#7b54f2']}
                style={styles.container}>
                <Text style={styles.country}>{props.country}</Text>

{/* ---------------------------  Cases Container  */}

                <View style={styles.innerContainer}>


{/* ---------------------------  Active Cases  */}

                    <View style={styles.cases}>
                        <Text style={styles.casesHeading}>Active</Text>
                        <Text style={styles.casesNumber}>{props.active}</Text>
                    </View>


{/* ---------------------------  Death Cases  */}

                    <View style={styles.cases}>
                        <Text style={styles.casesHeading}>Death</Text>
                        <Text style={styles.casesNumber}>{props.death}</Text>
                    </View>


{/* ---------------------------  Total Cases  */}

                    <View style={styles.cases}>
                        <Text style={styles.casesHeading}>Total</Text>
                        <Text style={styles.casesNumber}>{props.total}</Text>
                    </View>

                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#5a62ac',
        borderRadius: 15,
        padding: 10,
    },
    country: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold'
    },
    innerContainer: {
        backgroundColor: '#7b54f2',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cases: {
        alignItems: 'center',
    },
    casesHeading: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#fff'
    },
    casesNumber: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#bdc9f4'
    },
})


// ----------------------------  Exporting the Component

export default CovidCard;