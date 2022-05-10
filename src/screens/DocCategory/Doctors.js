import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, LogBox } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IIcon from 'react-native-vector-icons/Ionicons';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';

import DoctorCard from '../../components/DoctorCard';

LogBox.ignoreAllLogs(true);

const Doctors = ({ navigation }) => {

    const context = useContext(AuthGlobal)

    const [docCategory, setDocCategory] = useState();
    const [doctors, setDoctors] = useState([]);

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [focus, setFocus] = useState();

    const [doctorsFiltered, setDoctorsFiltered] = useState([]);

    const searchDoctor = (text) => {
        setDoctorsFiltered(
            doctors.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    useEffect(() => {

        AsyncStorage.getItem("jwt")
            .then((jwtToken) => {
                const getDocCategory = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}categories`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        return resp.data;
                    }
                    catch (error) {
                        console.log(error.response.data)
                    }

                }

                const getDoctors = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}doctors`, {
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
                        getDocCategory(),
                        getDoctors()
                    ]);
                };


                getData().then(
                    ([
                        docCategory,
                        doctors
                    ]) => {
                        setDocCategory(docCategory);
                        setDoctors(doctors);
                        setDoctorsFiltered(doctors);
                        setFocus(false);
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
            setDocCategory();
            setDoctors([]);
            setDoctorsFiltered([]);
            setFocus();
        }
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', borderWidth: 2, borderRadius: 10, borderColor: '#5a62ac', padding: 5, margin: 10 }}>
                <Icon name="search" size={25} color={'#5a62ac'} style={{ padding: 3, paddingRight: 10 }} />
                <TextInput
                    onFocus={openList} onChangeText={(text) => {
                        searchDoctor(text)
                        setFocus(true)
                    }}
                    style={{ width: '90%', fontFamily: 'Montserrat-Medium', color: '#5a62ac', height: 30, fontSize: 18, padding: 0 }} placeholderTextColor={'#c2c1e1'} placeholder='Doctor Name'></TextInput>
            </View>

            {focus == true ? (
                <TouchableOpacity onPress={() => {
                    onBlur()
                }} style={{ position: 'absolute', right: 20, top: 17 }}>
                    <IIcon name="close" size={30} color='blue' />
                </TouchableOpacity>
            ) : null}

            {focus == true ? (
                <ScrollView style={{ paddingHorizontal: 10 }}>
                    {doctorsFiltered.length > 0 ?
                        (doctorsFiltered.map((item) =>
                            <DoctorCard
                                key={item._id}
                                onPress={() => navigation.navigate('Doctor Detail', item)}
                                // docImage={item.avatar}
                                docName={item.name}
                                docEdu={item.education}
                                // docCategory={item.category.name}
                                docRating={item.rating}
                            />
                        ))

                        : (<View>
                            <Text>No Doctor Match the Selected Criteria</Text>
                        </View>
                        )}
                </ScrollView>
            ) : (








                <View style={{ flex: 1 }}>

                    {loaded && !error && (
                        <ScrollView>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                                {docCategory && docCategory.map(item => (

                                    <TouchableOpacity
                                        key={item._id}
                                        onPress={() => navigation.navigate('Doctor2', item)}
                                        style={{ width: 150, height: 150, backgroundColor: '#fff', elevation: 4, marginBottom: 10, marginTop: 5, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>

                                        <Icon name={item.icon} color={'blue'} size={50} />

                                        <Text style={{ fontFamily: 'Montserrat-Medium', marginTop: 10, color: '#000', fontSize: 15 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    )}

                    {!loaded && <ActivityIndicator size='large' color='#dea838' />}
                    {error && <Error />}
                </View>
            )}

        </View>
    )
}

export default Doctors;