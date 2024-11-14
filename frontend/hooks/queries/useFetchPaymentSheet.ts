import { useQuery } from '@tanstack/react-query';

const PAYMENT_API_URL = 'http://localhost:3000';

const fetchPaymentSheet = async () => {
  const response = await fetch(`${PAYMENT_API_URL}/payment-sheet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { paymentIntent, ephemeralKey, customer } = await response.json();

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};

export const useFetchPaymentSheet = () => {
  return useQuery({
    queryKey: ['paymentSheet'],
    queryFn: fetchPaymentSheet,
  });
};
