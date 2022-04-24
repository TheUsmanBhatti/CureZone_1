//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AptDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const AptSlots = ['12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
'12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM' ]


const DocCate = [
    {id: 1, category: 'Eye Specialist', value: 'eye'},
    {id: 2, category: 'Heart Specialist', value: 'heart'},
    {id: 3, category: 'Skin Specialist', value: 'skin'},
    {id: 4, category: 'Ear Specialist', value: 'ear'},

]

// create a component
const DoctorAbout = () => {

    const [docAptDays, setDocAptDays] = useState([])
    const [sTime0, setSTime0] = useState(new Date('2019-01-01T09:00:00'));
    const [show0, setShow0] = useState(false);

    const [ docAbout, setDocAbout ] = useState('');
    const [ docEdu, setDocEdu ] = useState('');
    const [ docFee, setDocFee ] = useState('');

    const [sTime1, setSTime1] = useState(new Date('2019-01-01T17:00:00'));
    const [show1, setShow1] = useState(false);

    const [docAptSlot, setDocAptSlot] = useState([])

    const [docCate, setDocCate] = useState('eye');

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

    const handleDocInfo = () => {
        console.log("About -----  ", docAbout );
        console.log("Eduction -----  ", docEdu);
        console.log("Category -----  ", docCate);
        console.log("Consultation Days -----  ", docAptDays);
        console.log("Consultation Time -----  ", sTime0.toLocaleTimeString(), ' --- ', sTime1.toLocaleTimeString());
        console.log("Appointments Slots -----  ", docAptSlot);
        console.log("Fee -----  ", docFee);
    }


    return (

        <ScrollView>
            <View style={styles.container}>
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




                <Text style={{color: 'blue', fontSize: 18}}>Category</Text>
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
                            DocCate.map(item => <Picker.Item label={item.category} value={item.value} key={item.id} />)
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
                <TextInput style={{ borderWidth: 1 }} placeholder='Your Fee'keyboardType='number-pad' 
                    value={docFee}
                    onChangeText={setDocFee}
                />


                <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, marginTop: 10, borderRadius: 10}} onPress={() => handleDocInfo()}>
                    <Text style={{fontSize: 16, color: '#fff', alignSelf: 'center'}}>Done</Text>
                </TouchableOpacity>
            </View>
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
export default DoctorAbout;
