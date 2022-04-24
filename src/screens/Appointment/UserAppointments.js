import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { UserAptCard } from '../../components'

const UserAppointments = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <UserAptCard/>
        </View>
        <View style={styles.container}>
            <UserAptCard/>
        </View>
        <View style={styles.container}>
            <UserAptCard/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: 10
    }
})

export default UserAppointments;