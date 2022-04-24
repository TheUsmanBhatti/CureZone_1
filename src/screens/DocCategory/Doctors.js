import React from 'react';
import {View, Text, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Doctors = () => {
    return(
        <View style={{flexDirection: 'row', borderWidth: 2, borderRadius: 10, borderColor: '#5a62ac', padding: 5, margin: 10}}>
            <Icon name="search" size={30} color={'#5a62ac'}/>
            <TextInput style={{ width: '90%', fontFamily: 'Montserrat-Medium', color: '#5a62ac', height: 30, fontSize: 18, padding: 0}} placeholderTextColor={'#c2c1e1'} placeholder='Doctor name, Specialization'></TextInput>
        </View>
    )
}

export default Doctors;