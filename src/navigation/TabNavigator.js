import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';

// ----------------Importing React Native Navigations----------------
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ----------------Importing Screens----------------

import { Home, UserAppointments, Prescription, Doctors } from '../screens';

// ----------------Importing Icons----------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconn from 'react-native-vector-icons/Fontisto';
import DrawerNavigator from './DrawerNavigator';

import AuthGlobal from '../context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

    const context = useContext(AuthGlobal)

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Tab.Navigator

                // ======================Styling for Bottom Tab Navigator=====================
                initialRouteName='Home'
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#9e4bff',
                    tabBarInactiveTintColor: '#c2c1e1',
                    tabBarStyle: { borderRadius: 15, marginHorizontal: 10, marginBottom: 5 },
                }}
            >

                {/* ======================It will Show us Home Screen===================== */}
                <Tab.Screen name='Drawer' component={DrawerNavigator} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }} />

                {/* ======================It will Show us User Appointments Screen===================== */}
                <Tab.Screen name='Appointments' component={UserAppointments} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar-month" color={color} size={size} />
                    ),
                    headerStyle: styles.headerContainerStyle,
                    headerTitleStyle: styles.headerTextStyle
                }} />


                {/* ======================It will Show us Prescription Screen===================== */}

                {
                    context.stateUser.userRole == 'users' && <Tab.Screen name='Presecription' component={Prescription} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="pill" color={color} size={size} />
                        ),
                        headerStyle: styles.headerContainerStyle,
                        headerTitleStyle: styles.headerTextStyle
                    }} />
                }

                {/* ======================It will Show us Doctor Screen=====================  */}

                {
                    context.stateUser.userRole == 'users' && <Tab.Screen name='Doctors List' component={Doctors} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Iconn name="doctor" color={color} size={size} />
                        ),
                        headerStyle: styles.headerContainerStyle,
                        headerTitleStyle: styles.headerTextStyle
                    }} />
                }


            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainerStyle: {
        backgroundColor: '#5a62ac',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 60
    },
    headerTextStyle: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
    }
})

export default TabNavigator;
