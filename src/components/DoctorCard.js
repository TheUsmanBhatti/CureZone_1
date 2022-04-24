// ==========================================  Importing Libraries  =========================================

import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';


// ---------------------------  Importing Star Icon

import StarRating from 'react-native-star-rating';


// ==========================================  Creating a Component  ========================================

const DoctorCard = ({navigation}) => {
    return (
        <Pressable style={({ pressed }) => [{
            backgroundColor: pressed ? '#f4eded' : '#fff',
        },
        styles.container]} onPress={() => navigation.navigate("Doctor Detail")}>


{/* ---------------------------  Top Rated Doctor Image  */}
           
            <Image source={require('../assets/images/My-Pic.jpg')} style={styles.docImage} />


{/* ---------------------------  -Doctor Detail Container  */}
            <View style={styles.docDetailContainer}>
                <Text style={styles.docName}>Dr. Muhammad Usman Bhatti</Text>

                <Text>MBBS - FCPS</Text>

                <Text>Eye Specialist</Text>

                <View style={{flexDirection: 'row'}}>
                    <StarRating
                        disabled={true}
                        maxStars={1}
                        rating={1}
                        fullStarColor={'gold'}
                        starSize={18}
                    />
                    
                    <Text style={{marginLeft: 5}}>4.5  -  50 Reviews</Text>
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
        elevation: 2,
    },
    docImage: {
        height: 85,
        width: 85,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    docDetailContainer:{
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    docName:{
        fontSize: 16,
        fontWeight: '700', 
        color: '#7f00ff'
    }
})


// ----------------------------  Exporting the App

export default DoctorCard;