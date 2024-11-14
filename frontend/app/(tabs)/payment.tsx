import { useFetchPaymentSheet } from '@/hooks/queries/useFetchPaymentSheet';
import { useStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useFetchPaymentSheet();

  const initializePaymentSheet = async () => {
    if (isLoading || !data) {
      return;
    }

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      paymentIntentClientSecret: data.paymentIntent,
    //   Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //   methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    console.log(error);
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [data]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.button}>
          <Button color="white" disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
});
