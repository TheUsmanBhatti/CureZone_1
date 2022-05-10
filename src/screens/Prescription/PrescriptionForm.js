//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

// create a component
const PrescriptionForm = (props) => {


    const {navigation, route} = props;

    const Item = route.params;

    const [id, setId] = useState(0)

    const [mName, setMName] = useState('');
    const [strength, setStrength] = useState('');
    const [dosage, setDosage] = useState('');
    const [instruction, setInstruction] = useState('After Meal');


    const [medicines, setMedicines] = useState([]);

    const handleMedicines = () => {
        const mData = {
            id: id + 1,
            mName: mName,
            strength: strength,
            dosage: dosage,
            instruction: instruction
        }

        setMedicines([...medicines, mData])
        setId(mData.id)

        console.log(medicines);
    }

    return (



        <View style={styles.container}>
            <TextInput style={{ borderWidth: 1 }} placeholder={"Medicine Name"} value={mName} onChangeText={setMName} />

            <TextInput style={{ borderWidth: 1 }} placeholder={"Dosage"} value={dosage} onChangeText={setDosage} />

            <TextInput style={{ borderWidth: 1 }} placeholder={"Strength"} value={strength} onChangeText={setStrength} />

            <Picker
                dropdownIconColor={'blue'}
                style={{ color: 'blue', marginBottom: -7, width: '95%' }}
                selectedValue={instruction}
                onValueChange={(itemValue, itemIndex) =>
                    setInstruction(itemValue)
                }
                prompt='Select your Instruction'
            >
                <Picker.Item label="After Meal" value="After Meal" />
                <Picker.Item label="Before Meal" value="Before Meal" />
            </Picker>

            <TouchableOpacity
                onPress={() => handleMedicines()}
                style={{ backgroundColor: 'blue', padding: 10 }}
            >
                <Text style={{ color: '#fff' }}>Add</Text>
            </TouchableOpacity>

            <ScrollView>
                {
                    medicines.map(item => (
                        <View style={{ padding: 10, marginVertical: 5, borderWidth: 1 }} key={item.id}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: '#000' }}>{item.mName}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Strength</Text>
                                <Text>{item.strength} mg</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Dosage</Text>
                                <Text>{item.dosage}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Instruction</Text>
                                <Text>{item.instruction}</Text>
                            </View>
                        </View>
                    ))
                }

            </ScrollView>

            <View style={{height: 40}}>

            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('PrescriptionForm2', {Item, medicines})}
                style={{ backgroundColor: 'blue', padding: 10, position: 'absolute', bottom: 10, left: 10, width: '100%' }}
            >
                <Text style={{ color: '#fff' }}>Next</Text>
            </TouchableOpacity>

        </View>




    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
});

//make this component available to the app
export default PrescriptionForm;
