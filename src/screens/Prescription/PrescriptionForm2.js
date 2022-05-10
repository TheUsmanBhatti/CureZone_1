//import liraries
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

// create a component
const PrescriptionForm2 = (props) => {

    const { navigation, route } = props;

    const { Item, medicines } = route.params;


    const [advise, setAdvise] = useState([]);
    const [advises, setAdvises] = useState([]);

    const handleAdvises = () => {
        setAdvises([...advises, advise])
    }

    const handleDone = () => {

        const data = {
            doctor: Item.doctor._id,
            user: Item.user._id,
            medicines: medicines,
            advises: advises
        }

        console.log(data)

        AsyncStorage.getItem("jwt")
            .then(async (jwtToken) => {
                try {
                    const resp = await axios.post(`${baseURL}prescriptions`,
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
        <View style={styles.container}>
            <TextInput multiline numberOfLines={3} textAlignVertical={'top'} placeholder={'Advises'} style={{ borderWidth: 1 }} value={advise} onChangeText={setAdvise} />

            <TouchableOpacity
                onPress={() => handleAdvises()}
                style={{ backgroundColor: 'blue', padding: 10 }}
            >
                <Text style={{ color: '#fff' }}>Add</Text>
            </TouchableOpacity>

            <ScrollView>
                {
                    advises.map(item => <Text style={{ paddingTop: 10 }} key={item}>{item}</Text>)
                }
            </ScrollView>


            <View style={{ height: 40 }}>

            </View>
            <TouchableOpacity
                onPress={() => handleDone()}
                style={{ backgroundColor: 'blue', padding: 10, position: 'absolute', bottom: 10, left: 10, width: '100%' }}
            >
                <Text style={{ color: '#fff' }}>Done</Text>
            </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
});

//make this component available to the app
export default PrescriptionForm2;
