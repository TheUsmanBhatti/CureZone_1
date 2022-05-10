//import liraries
import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
    Dimensions
} from 'react-native';


import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// ---------------------------  Importing Animateable and Linear Gradient Libraries

import { WebView } from "react-native-webview";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AuthGlobal from '../../context/store/AuthGlobal';

const screenHeight = Dimensions.get('window').height;


const VideoCall = ({ navigation, route }) => {

    const context = useContext(AuthGlobal)
    
    const Item = route.params;
    const [webViewVisible, setWebView] = useState(true)
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const handleNext = () => {
        if(context.stateUser.userRole == 'users'){
            navigation.navigate('Reviews', Item)
        }
        else{
            navigation.navigate('PrescriptionForm', Item)
        }
    }

    return (
        <SafeAreaView style={backgroundStyle}>

            <TouchableOpacity
            onPress={() => handleNext()}

                style={{
                    top: 10,
                    right: 10,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    zIndex: 4
                }}>
                <Text style={{ color: '#000', fontSize: 20, fontFamily: 'Montserrat-Medium' }}>X</Text>
            </TouchableOpacity>

            <View style={{ height: screenHeight, alignSelf: "center", width: "100%", backgroundColor: "yellow" }}>
                {webViewVisible && <WebView
                    allowsInlineMediaPlayback={true}
                    cacheEnabled={true}
                    geolocationEnabled={false}
                    javaScriptEnabled
                    javaScriptEnabledAndroid={true}
                    mediaPlaybackRequiresUserAction={false}
                    mixedContentMode={'compatibility'}
                    originWhitelist={['*']}
                    scalesPageToFit
                    startInLoadingState={true}
                    useWebkit
                    userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
                    source={{ uri: `https://meet.jit.si/${Item._id}` }}
                />
                }
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

//make this component available to the app
export default VideoCall;
