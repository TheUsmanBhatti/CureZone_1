import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

// Importing Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importing Pie Chart It also requires React-Native-Community/Art
import Pie from 'react-native-pie';

// #############################################################################################################################

const CovidDetail = ({navigation}) => {

    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState();
    const [search, setSearch] = useState('');
    const [index, setIndex] = useState(130);
    const [sss, setSSS] = useState('flex')

    const url = 'https://api.covid19api.com/summary';

    // Fetching that from API using Fetch Method
    useEffect(() => {
        const fetchCovidData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setData(response);
                setIsloading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCovidData();
    }, []);

    // Map All County name from API and save it to allCountries array (so we can easily find the index of any Country)
    var allCountries = data ? data.Countries.map((c) => c.Country) : '';

    // Setting Values of API Data in Variables. data ? data.Countries[index].TotalConfirmed : 0
    const CName = data ? data.Countries[index].Country : '';
    const Active = data ? data.Countries[index].NewConfirmed : 0;
    const Death = data ? data.Countries[index].TotalDeaths : 0;
    const Total = data ? data.Countries[index].TotalConfirmed : 0;
    const Recovered = Total - Death - Active;

    // Calculating Percentage of all Cases.
    const PRecovered = parseFloat(Recovered / Total * 100);
    const PDeath = parseFloat(Death / Total * 100);
    const PActive = parseFloat(Active / Total * 100);

    // Setting PieChart Values
    const pieChartValue = [
        {
            percentage: PActive ? PActive : 0,
            color: '#06cafd',
        },
        {
            percentage: PRecovered ? PRecovered : 0,
            color: '#003cbf',
        },
        {
            percentage: PDeath ? PDeath : 0,
            color: '#ff5c4d',
        }
    ]

    // ############################################################################################################################
    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/Back.png')} style={{ width: 10, height: 25, resizeMode: 'center', marginHorizontal: 20, marginVertical: 12 }} tintColor='#fff' />
                </TouchableOpacity>

                <Text style={styles.headerText}>Covid Detail</Text>
            </View>

            {/* ---------------------------Search Bar------------------------------ */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={30} color={'#5a62ac'} />
                <TextInput
                    style={styles.searchInput}
                    placeholderTextColor={'#c2c1e1'}
                    placeholder='Country'
                    value={search}
                    onChangeText={val => {
                        setSearch(val)
                        setSSS('flex')
                    }}
                ></TextInput>
            </View>
            {/* <Text><SearchingData/></Text> */}
            <ScrollView style={{ flexDirection: 'column', width: '95%', zIndex: 10, position: 'absolute', top: 45, margin: 10, display: sss, backgroundColor: '#fff', borderRadius: 10 }}>
                {allCountries != '' ? allCountries.map((val, ind) => {
                    if (search === '')
                        return
                    else if (val.toLowerCase().includes(search.toLowerCase())) {
                        return (
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor: '#c2c1e1',
                                    borderRadius: 10,
                                    margin: 1
                                }}
                                key={ind}
                                onPress={() => {
                                    // console.log(allCountries.indexOf(val))
                                    setIndex(allCountries.indexOf(val))
                                    setSearch(val)
                                    setSSS('none')
                                }
                                }>
                                <Text
                                    // key={key2}
                                    style={{
                                        fontFamily: 'Montserrat-Medium',
                                        fontSize: 18
                                    }}
                                >{val}
                                </Text>
                            </TouchableOpacity>)
                    }
                    else
                        return
                }) : <Text>Loading</Text>}
            </ScrollView>

            {/* -------------------------------Country Name OR Global--------------------- */}
            <Text style={{
                fontSize: 20,
                color: '#2e409a',
                fontFamily: 'Montserrat-Bold',
                margin: 10
            }}>{CName}</Text>

            {/* ----------------------------------Pie Chart with Percentage---------------------------- */}
            <View style={styles.pieContainer}>
                <Pie
                    radius={80}
                    innerRadius={50}
                    sections={pieChartValue}
                    strokeCap={'butt'}
                />

                <View style={{ justifyContent: 'space-between' }}>
                    <CasesInPercentage color='#06cafd' value={PActive} name='Active' />
                    <CasesInPercentage color='#003cbf' value={PRecovered} name='Recovered' />
                    <CasesInPercentage color='#ff5c4d' value={PDeath} name='Death' />
                </View>
            </View>

            {/* ------------------------------All Report of Covid Cases---------------------------- */}
            <View style={styles.casesContainer}>
                <View style={styles.upperCasesContainer}>
                    <CovidInfoCard name='Active' value={Active} color='#06cafd' />
                    <CovidInfoCard name='Recoverd' value={Recovered} color='#003cbf' />
                </View>

                <View style={styles.bottomCasesContainer}>
                    <CovidInfoCard name='Death' value={Death} color='#ff5c4d' />
                    <CovidInfoCard name='Total' value={Total} color='#fff' />
                </View>
            </View>

            {/* -------------------World Map Image----------------------- */}
            <Image source={require('../../assets/images/World-Image.png')} style={styles.worldImage} />
        </ScrollView>
    )
}

// #############################################################################################################################

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#5a62ac',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginVertical: 12
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#5a62ac',
        padding: 5,
        margin: 10,
        zIndex: 11
    },
    searchInput: {
        width: '90%',
        fontFamily: 'Montserrat-Medium',
        color: '#5a62ac',
        height: 30,
        fontSize: 18,
        padding: 0
    },
    pieContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        marginBottom: 10
    },
    casesContainer: {
        flexDirection: 'column',
        padding: 10
    },
    upperCasesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    bottomCasesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    worldImage: {
        width: '100%',
        height: 220,
        resizeMode: 'center'
    }
})

export default CovidDetail;

// #############################################################################################################################

// ---------------- Component of Cases Values in Percentage which is in Pie Chart Container--------------------
const CasesInPercentage = (props) => {
    return (
        <View style={{ flexDirection: 'row' }}>

            <View style={{
                width: 30,
                height: 10,
                backgroundColor: props.color,
                margin: 6,
                borderRadius: 10
            }}>
            </View>

            <View>
                <Text style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 15,
                    color: '#797bed'
                }}>{props.name}</Text>

                <Text style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 18,
                    color: '#003cbf'
                }}>{props.value.toFixed(2)}</Text>
            </View>
        </View>
    )
}

//---------------------Function that Format the Number e.g 12345678 output will be 12,345,678
function numberFormater(num) {
    return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//---------------------Component of Cases Value with Formatting--------------------------
const CovidInfoCard = (props) => {
    return (
        <View style={{
            width: '47%',
            height: 80,
            borderWidth: 1,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'space-around',
            borderColor: '#797bed'
        }}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 15,
                    height: 15,
                    backgroundColor: props.color,
                    margin: 4
                }} />

                <Text style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 18,
                    color: '#797bed'
                }}>{props.name}</Text>
            </View>

            <Text style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 22,
                color: '#003cbf',
                marginLeft: 4,
            }}>{numberFormater(props.value)}</Text>
        </View>
    )
}