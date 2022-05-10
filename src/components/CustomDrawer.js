import React, { useState, useEffect, useCallback, useContext } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import LinearGradient from 'react-native-linear-gradient';

import FAIcon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthGlobal from '../context/store/AuthGlobal';
import { logoutUser } from '../context/actions/Auth.actions';

function CustomDrawer(props) {

    const { navigation } = props;
    const context = useContext(AuthGlobal)

    return (
        <LinearGradient
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#9e4bff', '#7f00ff']}
            style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../assets/images/My-Pic.jpg')} style={styles.userImage} />
            </View>

            <View style={styles.footer}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>

                <TouchableOpacity style={{paddingHorizontal: 20, flexDirection: 'row', paddingBottom: 5}} onPress={async () => [
                        await AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}>
                    <FAIcon name='sign-out-alt' color='#7f00ff' size={20} />
                    <Text style={{paddingLeft: 10, fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#7f00ff'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5
    }
})

export default CustomDrawer;