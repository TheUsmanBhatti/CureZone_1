// ==========================================  Importing Libraries  =========================================

import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';


// ---------------------------  Importing Star Icon

import StarRating from 'react-native-star-rating';


// ==========================================  Creating a Component  ========================================

const PatientReviews = () => {
    return (
        <Pressable style={styles.container}>


{/* ---------------------------  Top Rated Doctor Image  */}

            <Image source={require('../assets/images/My-Pic.jpg')} style={styles.docImage} />


{/* ---------------------------  Doctor Detail Container  */}

            <View style={styles.docDetailContainer}>
                <Text style={styles.docName}>Dr. Muhammad Usman Bhatti</Text>

                <Text numberOfLines={2} style={{width: '30%'}}>Lorem ipsum dolor sit amet, consectetur Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>

                <View style={{flexDirection: 'row'}}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={5}
                        fullStarColor={'gold'}
                        starSize={18}
                    />
                </View>
            </View>
        </Pressable>
    )
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 2
    },
    docImage: {
        height: 55,
        width: 55,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    docDetailContainer:{
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    docName:{
        fontSize: 16,
        fontWeight: '700', 
        color: '#2e409a'
    }
})


// ----------------------------  Exporting the App

export default PatientReviews;