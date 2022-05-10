// ==========================================  Importing Libraries  =========================================

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import {
//     CardField,
//     CardFieldInput,
//     useStripe,
// } from '@stripe/stripe-react-native';

// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// ==========================================  Creating a Component  ========================================

const Payment = () => {

    const [card, setCard] = useState(CardFieldInput.Details | null);
    const { confirmPayment, handleCardAction } = useStripe()

    const publishableKey = "pk_test_51KwNqPCauZVye8zqbq4CUipAmmovn2ze56eKAiHQV7aIYeB1G9jJ5fv5qLOazwC8HiyUyU1JGtOCaXxkjy8Yb9Zl00B7l48ecu";

    return (
        <>
            {/* <StripeProvider
                publishableKey={publishableKey}
            >
                <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        setCard(cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />
            </StripeProvider> */}
        </>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


// ----------------------------  Exporting the App

export default Payment;