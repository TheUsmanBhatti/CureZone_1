//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';

import DoctorCard from '../../components/DoctorCard';
// create a component
const Doctor2 = (props) => {

    const { navigation, route } = props;

    const item = route.params;

    const context = useContext(AuthGlobal)

    const [doctors, setDoctors] = useState();

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        AsyncStorage.getItem("jwt")
            .then((jwtToken) => {
                const getDoctors = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}doctors/category/${item._id}`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        return resp.data;
                    }
                    catch (error) {
                        console.log(error.response.data)
                    }

                }



                const getData = () => {
                    return Promise.all([
                        getDoctors()
                    ]);
                };


                getData().then(
                    ([
                        doctors
                    ]) => {
                        setDoctors(doctors)
                    })
                    .catch(() => {
                        setError(true);
                    })
                    .finally(() => {
                        setLoaded(true);
                    });
            })
            .catch((error) => console.log(error))




        return () => {
            setDoctors();
        }
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/Back.png')} style={{ width: 10, height: 25, resizeMode: 'center', marginHorizontal: 20, marginVertical: 12 }} tintColor='#fff' />
                </TouchableOpacity>

                <Text style={styles.headerText}>{item.name}</Text>
            </View>

            <ScrollView>
                <View style={{ flex: 1, padding: 10 }}>
                    {loaded && !error && (
                        doctors ? doctors.map(item => <DoctorCard
                            key={item._id}
                            onPress={() => navigation.navigate('Doctor Detail', item)}
                            // docImage={item.avatar}
                            docName={item.name}
                            docEdu={item.education}
                            docCategory={item.category.name}
                            docRating={item.rating}
                        />) : <Text>No Doctor to Show</Text>
                    )}

                    {!loaded && <ActivityIndicator size='large' color='#dea838' />}
                    {error && <Error />}
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#5a62ac',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        paddingVertical: 5
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginVertical: 12
    },
    heading: {
        fontSize: 18,
        color: '#2e409a',
        fontFamily: 'Montserrat-Bold',
        // marginTop: -40
    },
});

//make this component available to the app
export default Doctor2;
