// ==========================================  Importing Libraries  =========================================

import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';


// ---------------------------  Importing Star Icon

import StarRating from 'react-native-star-rating';


// ==========================================  Creating a Component  ========================================

const DoctorCard = (props) => {

    const {navigation, route} = props;

    return (
        <Pressable style={({ pressed }) => [{
            backgroundColor: pressed ? '#f4eded' : '#fff',
        },
        styles.container]} onPress={props.onPress}>


{/* ---------------------------  Top Rated Doctor Image  */}
           
            <Image source={{uri: props.docImage ? props.docImage : 'https://i.pinimg.com/564x/2d/4a/33/2d4a33f892bd525361c668dafb625dec.jpg'}} style={styles.docImage} />


{/* ---------------------------  -Doctor Detail Container  */}
            <View style={styles.docDetailContainer}>
                <Text style={styles.docName}>{props.docName}</Text>

                <Text>{props.docEdu}</Text>

                <Text>{props.docCategory}</Text>

                <View style={{flexDirection: 'row'}}>
                    <StarRating
                        disabled={true}
                        maxStars={1}
                        rating={1}
                        fullStarColor={'gold'}
                        starSize={18}
                    />
                    
                    <Text style={{marginLeft: 5}}>{props.docRating}  {props.docReview && `-  ${props.docReview} Reviews`}</Text>
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