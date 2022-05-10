//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';

const AptDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const AptSlots = ['12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']


// create a component
const DoctorAboutForm = ({ navigation, route }) => {

    const userAbout = route.params;

    const context = useContext(AuthGlobal)

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [docAptDays, setDocAptDays] = useState(userAbout.consultationDays)
    const [sTime0, setSTime0] = useState(new Date(userAbout.consultationTime[0]));
    const [show0, setShow0] = useState(false);

    const [docAbout, setDocAbout] = useState(userAbout.about);
    const [docEdu, setDocEdu] = useState(userAbout.education);
    const [docFee, setDocFee] = useState(userAbout.fee);

    const [sTime1, setSTime1] = useState(new Date(userAbout.consultationTime[1]));
    const [show1, setShow1] = useState(false);

    const [docAptSlot, setDocAptSlot] = useState(userAbout.meetingSlots)

    const [doctorCategory, setDoctorCategory] = useState();
    const [docCate, setDocCate] = useState(userAbout.category._id);

    const onTimeChange0 = (event, selectedValue) => {
        const currentTime = selectedValue || new Date();
        setSTime0(currentTime);
        setShow0(false);
    }

    const onTimeChange1 = (event, selectedValue) => {
        const currentTime = selectedValue || new Date();
        setSTime1(currentTime);
        setShow1(false);
    }



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


                const getData = () => {
                    return Promise.all([
                        getDocCategory(),
                    ]);
                };


                getData().then(
                    ([
                        docCategory,
                    ]) => {
                        setDoctorCategory(docCategory);
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
            setDoctorCategory();
            setLoaded();
        }
    }, [])

    const handleDocInfo = () => {
        // console.log("About -----  ", docAbout);
        // console.log("Eduction -----  ", docEdu);
        // console.log("Category -----  ", docCate);
        // console.log("Consultation Days -----  ", docAptDays);
        // console.log("Consultation Time -----  ", sTime0.toLocaleTimeString(), ' --- ', sTime1.toLocaleTimeString());
        // console.log("Appointments Slots -----  ", docAptSlot);
        // console.log("Fee -----  ", docFee);

        const updateData = {
            about: docAbout,
            education: docEdu,
            category: docCate,
            consultationTime: [sTime0, sTime1],
            consultationDays: docAptDays,
            fee: docFee,
            meetingSlots: docAptSlot
        }


        AsyncStorage.getItem("jwt").then(async (jwtToken) => {
            try {
                const resp = await axios.put(`${baseURL}doctors/about/${context.stateUser.user.userId}`,
                    updateData,
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` }
                    });

                Alert.alert(
                    "Updated!",
                    "Your Profile Updated Successfully",
                    [{
                        text: "Ok",
                        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Tab' }] })
                    }]
                )
            }
            catch (error) {
                console.log(error.response.data)
            }
        }).catch((error) => console.log(error))
    }

    return (

        <ScrollView>
            {loaded && !error && (<View style={styles.container}>
                <Text>Please Fill your Details</Text>



                <Text style={{ color: 'blue', fontSize: 18 }}>About</Text>
                <TextInput style={{ borderWidth: 1 }} placeholder='Biography' multiline={true} numberOfLines={5} textAlignVertical={'top'}
                    value={docAbout}
                    onChangeText={setDocAbout}
                />




                <Text style={{ color: 'blue', fontSize: 18 }}>Education</Text>
                <TextInput style={{ borderWidth: 1 }} placeholder='Ex. MBBS, FCPS'
                    value={docEdu}
                    onChangeText={setDocEdu}
                />




                <Text style={{ color: 'blue', fontSize: 18 }}>Category</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#d8b7fe', flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                        dropdownIconColor={'blue'}
                        style={{ color: 'blue', marginBottom: -7, width: '95%' }}
                        selectedValue={docCate}
                        onValueChange={(itemValue, itemIndex) =>
                            setDocCate(itemValue)
                        }
                        prompt='Select your Category'
                    >

                        {
                            doctorCategory.map(item => <Picker.Item label={item.name} value={item._id} key={item._id} />)
                        }
                    </Picker>
                </View>





                <Text style={{ color: 'blue', fontSize: 18 }}>Consultation Days</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {AptDays.map(item => <TouchableOpacity key={item} style={{ backgroundColor: docAptDays.includes(item) ? '#d3d3d3' : '#fff', borderWidth: 1, width: 60, borderColor: 'blue', padding: 5, alignItems: 'center', borderRadius: 20, margin: 5 }}
                        onPress={() => setDocAptDays(
                            docAptDays.includes(item) ? docAptDays.filter(i => i !== item)
                                : [...docAptDays, item])}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>)}
                </View>





                <Text style={{ color: 'blue', fontSize: 18 }}>Consultation Time</Text>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ width: '50%' }}>Start</Text>

                    <TouchableOpacity onPress={() => setShow0(true)} style={{ paddingVertical: 10, flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, fontSize: 16, color: '#7f00ff' }}>{sTime0.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {show0 && (
                        <RNDateTimePicker
                            value={sTime0}
                            display='default'
                            mode={'time'}
                            onChange={onTimeChange0}
                        />
                    )
                    }
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ width: '50%' }}>End</Text>

                    <TouchableOpacity onPress={() => setShow1(true)} style={{ paddingVertical: 10, flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, fontSize: 16, color: '#7f00ff' }}>{sTime1.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {show1 && (
                        <RNDateTimePicker
                            value={sTime1}
                            display='default'
                            mode={'time'}
                            onChange={onTimeChange1}
                        />
                    )
                    }
                </View>







                <Text style={{ color: 'blue', fontSize: 18 }}>Appointment Slots</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {AptSlots.slice(sTime0.getHours() * 2, sTime1.getHours() * 2).map(item => <TouchableOpacity key={item} style={{ backgroundColor: docAptSlot.includes(item) ? '#d3d3d3' : '#fff', borderWidth: 1, borderColor: 'blue', padding: 10, borderRadius: 20, margin: 5 }}


                        onPress={() => setDocAptSlot(
                            docAptSlot.includes(item) ? docAptSlot.filter(i => i !== item)
                                : [...docAptSlot, item])}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>)}
                </View>


                <Text style={{ color: 'blue', fontSize: 18 }}>Fee</Text>
                <TextInput style={{ borderWidth: 1 }} placeholder='Your Fee' keyboardType='number-pad'
                    value={docFee}
                    onChangeText={setDocFee}
                />


                <TouchableOpacity
                    style={{ backgroundColor: 'blue', padding: 10, marginTop: 10, borderRadius: 10 }}
                    onPress={() => handleDocInfo()}>
                    <Text style={{ fontSize: 16, color: '#fff', alignSelf: 'center' }}>Update</Text>
                </TouchableOpacity>
            </View>)}

            {!loaded && <ActivityIndicator size='large' color='#dea838' />}
            {error && <Error />}
        </ScrollView>
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
export default DoctorAboutForm;
