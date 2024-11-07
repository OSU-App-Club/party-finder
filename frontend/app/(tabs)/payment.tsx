import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Payment() {
    const [cardDetails, setCardDetails] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('');

    const handlePayment = async () => {
        // Some stripe payment logic
    };

    return (
        <SafeAreaView>
            <CardField
                postalCodeEnabled={true}
                placeholder={{ number: '4242 4242 4242 4242' }}
                cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
                style={{ width: '100%', height: 50, marginVertical: 30 }}
                onCardChange={(cardDetails) => setCardDetails(cardDetails)}
            />
            <Button onPress={handlePayment} title="Pay" />
            {paymentStatus ? <Text>{paymentStatus}</Text> : null}
        </SafeAreaView>
    );
}

