import React, { useState, useEffect, useContext } from 'react';

import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { PrescriptionCard } from '../../components';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';



const Prescription = ({ navigation }) => {

    const context = useContext(AuthGlobal)

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [userPrescription, setUserPrescription] = useState();

    useEffect(() => {

        AsyncStorage.getItem("jwt")
            .then((jwtToken) => {
                const getUserPrescription = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}prescriptions/userPre/${context.stateUser.user.userId}`, {
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
                        getUserPrescription(),
                    ]);
                };


                getData().then(
                    ([
                        userPrescription,
                    ]) => {
                        setUserPrescription(userPrescription);
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
            setUserPrescription();
            setLoaded();
        }
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {loaded && !error && (<View>

                {
                    userPrescription.map(item => (
                        <View style={styles.container} key={item._id}>
                            <PrescriptionCard 
                            onPress={() => navigation.navigate('Prescription Detail', item)}
                            docImage= {item.doctor.avatar}
                            docName={item.doctor.name}
                            docCate={item.doctor.category.name}
                            docMedicine={item.medicines}
                             />
                        </View>
                    ))
                }
            </View>)}

            {!loaded && <ActivityIndicator size='large' color='#dea838' />}
            {error && <Error />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

export default Prescription;