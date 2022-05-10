// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';


// ---------------------------  Importing Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// ==========================================  Creating a Component  ========================================

const PrescriptionCard = (props) => {
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>


{/* ---------------------------  Doctor Image, Name and Speciality Container  */}

            <View style={styles.doctorContainer}>
                <Image source={{uri: props.docImage}} style={styles.doctorImage} />
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.doctorName}>{props.docName}</Text>
                    <Text style={styles.doctorSpeciality}>{props.docCate}</Text>
                </View>
            </View>


{/* ---------------------------  Medicine Name  */}

            <View style={{backgroundColor: '#d4ddf4', borderRadius: 10, marginBottom: 10}}>
                <View style={styles.prescriptionContaier}>

                {
                    props.docMedicine.map(item => <Text key={item} style={styles.prescription}>O  {item.mName}</Text>)
                }

                </View>
            </View>

        </TouchableOpacity>
    )
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 2
    },
    doctorContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    doctorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    doctorName: {
        fontSize: 16,
        color: '#5a62ac',
        fontFamily: 'Montserrat-SemiBold',
    },
    doctorSpeciality: {
        fontSize: 15,
        color: '#5a62ac',
        fontFamily: 'Montserrat-Light',
    },
    prescriptionContaier: {
        flexDirection: 'column',
        padding: 10,
    },
    prescription: {
        marginLeft: 10,
        color: '#5a62ac',
        fontFamily: 'Montserrat-Light',
        fontSize: 16
    },
})


// ----------------------------  Exporting the App

export default PrescriptionCard;