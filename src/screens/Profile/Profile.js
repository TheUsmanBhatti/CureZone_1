// ==========================================  Importing Libraries  =========================================

import React, { useState, useEffect, useRef } from 'react';
import { Image, Keyboard, Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { showMessage, hideMessage } from "react-native-flash-message";
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// ==========================================  Creating a Component  ========================================

const Profile = ({ navigation }) => {

    const [imageUriGallary, setimageUriGallary] = useState('');
    const [image1, setImage] = useState('');
    const [userName, setUserName] = useState('');
    const [selectedGender, setSelectedGender] = useState('male');
    const [sDate, setSDate] = useState(new Date());
    const [phoneNo, setPhoneNo] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        const name = userName.trim();
        const phone = phoneNo.trim();

        if (image1 == '' || name == '' || selectedGender == '' || phoneNo == '') {
            return (
                showMessage({
                    message: "Please fill the form completely",
                    backgroundColor: '#7f00ff'
                })
            )
        }
        console.log(`${image1} ----  ${userName} ---- ${selectedGender} ---- ${sDate} ---- ${phoneNo}`);
        navigation.navigate('Tab');
    }

    const onDateChange = (event, selectedValue) => {
        const currentDate = selectedValue || new Date();
        setSDate(currentDate);
        setShow(false);
    }

    const curDate = sDate.getDate();
    const curMonth = sDate.getMonth();
    const curYear = sDate.getFullYear();

    const openGallery = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            console.log('Response = ', response.assets[0].fileName);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                const source = {
                    uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                };
                setimageUriGallary(source);
                setImage(response.assets[0].fileName)
            }
        });
    };

    return (
            <View style={styles.container}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="md-menu" size={35} color="blue" />
                    </TouchableOpacity>

                    {/* ==================================   Image  ==================================== */}

                    <View style={{ width: 120, alignSelf: 'center' }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 100, borderColor: '#7f00ff', borderWidth: 2 }} source={imageUriGallary ? imageUriGallary : null} />

                        <TouchableOpacity onPress={() => openGallery()}>
                            <Icon name="camera" color="#7f00ff" size={30} style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: '#fff', borderRadius: 50, padding: 2, borderColor: '#7f00ff', borderWidth: 1 }} />
                        </TouchableOpacity>
                    </View>


                    {/* ==================  Name  ===================== */}
                    <Text style={styles.textFooter}>Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='#7f00ff' size={20} />
                        <TextInput
                            placeholder="Enter Your Name"
                            placeholderTextColor={'#d8b7fe'}
                            style={styles.textInput}
                            value={userName}
                            onChangeText={setUserName}
                        ></TextInput>
                    </View>

                    {/* =======================  Gender  ========================= */}

                    <Text style={[styles.textFooter, { marginBottom: -10, marginTop: 10 }]}>Gender</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#d8b7fe', flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name={selectedGender == 'male' ? 'male' : selectedGender == 'female' ? 'female' : 'transgender'} color='#7f00ff' size={20} style={{ marginBottom: -10 }} />
                        <Picker
                            dropdownIconColor={'blue'}
                            style={{ color: 'blue', marginBottom: -7, width: '95%' }}
                            selectedValue={selectedGender}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedGender(itemValue)
                            }
                            prompt='Select your gender'
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>


                    {/* ======================== Date of Birth  ========================== */}

                    <Text style={[styles.textFooter, { marginTop: 10 }]}>Date of Birth</Text>
                    <TouchableOpacity onPress={() => setShow(true)} style={{ borderBottomWidth: 1, borderBottomColor: '#d8b7fe', paddingVertical: 10, flexDirection: 'row' }}>

                        <FontAwesome name='calendar' color='#7f00ff' size={20} />
                        <Text style={{ paddingLeft: 10, fontSize: 16, color: '#7f00ff' }}>{`${curDate} - ${curMonth + 1} - ${curYear}`}</Text>
                    </TouchableOpacity>
                    {show && (
                        <RNDateTimePicker
                            value={sDate}
                            maximumDate={Date.parse(new Date())}
                            display='default'
                            mode={'date'}
                            onChange={onDateChange}
                        />
                    )
                    }

                    {/* ============================== Phone Number    ================ */}
                    <Text style={[styles.textFooter, { marginTop: 10 }]}>Phone Number</Text>
                    <View style={styles.action}>
                        <FontAwesome name='phone' color='#7f00ff' size={20} />
                        <TextInput
                            maxLength={11}
                            keyboardType='number-pad'
                            placeholder="Enter Your Phone Number"
                            placeholderTextColor={'#d8b7fe'}
                            style={styles.textInput}
                            value={phoneNo}
                            onChangeText={setPhoneNo}
                        ></TextInput>
                    </View>



                    {/* ===========================  Submit Button  ================================= */}
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() => handleSubmit()}>
                        <LinearGradient
                            colors={['#9e4bff', '#7f00ff']}
                            style={styles.submit}
                        >
                            <Text style={[styles.textSubmit, {
                                color: '#fff'
                            }]}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
</View>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flex: 0.7,
        justifyContent: 'flex-end',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        // fontFamily: 'Montserrat-SemiBold'
    },
    textFooter: {
        color: '#7f00ff',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d8b7fe',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginTop: -5,
        padding: 0,
        paddingLeft: 10,
        color: '#05375a',
    },
    submit: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    textSubmit: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});


// ----------------------------  Exporting the App

export default Profile;