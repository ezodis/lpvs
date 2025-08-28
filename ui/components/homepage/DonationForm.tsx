import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const DonationForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const card = elements?.getElement(CardElement);
    if (!stripe || !card) return;

    const res = await fetch('/create-payment-intent/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, name, email }),
    });
    const { clientSecret } = await res.json();

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name, email } },
    });

    if (paymentResult.error) {
      setMessage(paymentResult.error.message || 'An error occurred');
    } else {
      setMessage('Donation successful!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 p-5 bg-pink-300 rounded-lg shadow-md text-center transition-all opacity-100 translate-y-0"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-4/5 max-w-xs mx-auto my-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-4/5 max-w-xs mx-auto my-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-4/5 max-w-xs mx-auto my-2 p-2 border border-gray-300 rounded"
      />
      <div className="my-4 max-w-xs mx-auto border border-gray-300 rounded p-3 bg-white">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="block w-4/5 max-w-xs mx-auto my-4 p-2 bg-blue-600 text-black rounded hover:bg-blue-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition"
      >
        Donate
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default DonationForm;