// ==========================================  Importing Libraries  =========================================

import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import StarRating from 'react-native-star-rating';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const height = Dimensions.get('window').height;

// ==========================================  Creating a Component  ========================================

const Reviews = ({ navigation, route }) => {

    const Item = route.params;

    const [star, setStar] = useState(1)
    const [reviews, setReviews] = useState()


    const handleReview = () => {

        const data = {
            doctor: Item.doctor._id,
            user: Item.user._id,
            rating: star,
            reviews: reviews
        }

        console.log(data)

        AsyncStorage.getItem("jwt")
            .then(async (jwtToken) => {
                try {
                    const resp = await axios.post(`${baseURL}reviews`,
                        data,
                        {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                    // navigation.reset({index: 0, routes: [{name: 'Tab'}]})
                    navigation.navigate('Tab')
                }
                catch (error) {
                    console.log(error.response.data)
                }
            })
    }








    return (
        <View style={{ padding: 10, flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>

            <Text
                style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 25,
                    color: '#000'
                }}
            >Leave a Review</Text>

            <View>
                <Text style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 18,
                    color: '#000',
                    marginBottom: 10
                }}>Rate the Doctor</Text>
                <View style={{ flexDirection: 'row' }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        fullStarColor={'gold'}
                        starSize={40}
                        rating={star}
                        selectedStar={(rating) => setStar(rating)}
                    />
                </View>
            </View>


            <View>
                <Text style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 18,
                    color: '#000'
                }}>Care to Share More</Text>
                <Text style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 15,
                    color: 'grey',
                    marginBottom: 10
                }}>How was your overall experience?</Text>

                <TextInput
                    multiline
                    numberOfLines={10}
                    textAlignVertical={'top'}
                    placeholder={'Your Reviews'}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 16,
                        padding: 10
                    }}
                    value={reviews}
                    onChangeText={setReviews}
                />
            </View>


            <TouchableOpacity onPress={() => handleReview()}
                style={{ backgroundColor: '#5a62ac', alignItems: 'center', borderRadius: 10 }}>
                <Text
                    style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 20,
                        color: '#fff',
                        paddingVertical: 10
                    }}>PUBLISH REVIEW</Text>
            </TouchableOpacity>

        </View>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


// ----------------------------  Exporting the App

export default Reviews;