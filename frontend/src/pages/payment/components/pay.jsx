import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../authContext';
import { SpecificBooking, UpdateBooking } from '../../../connection/apis';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiConst } from '../../../constants/api.constants';

const stripePromise = loadStripe('pk_test_51QgvsE4RRFp4tU4idxLkVvXZLSIuxe5hMjPFjgtOE29uxUiknQjZe4OJpyx1sa9SwGAqlCAom58mIFrK8kIvEpRe00k2mu8ckK');

const ConfirmAndPay = () => {
    const { id } = useParams();
    const { token, socket } = useAuth();
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (token && id) {
            fetchBooking();
        }
    }, [token, id]);

    const fetchBooking = async () => {
        try {
            const fetchedBooking = await SpecificBooking(id);
            setBooking(fetchedBooking || null);
        } catch (error) {
            console.error('Error fetching booking:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!booking) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-700">Booking not found. Please try again.</p>
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm booking={booking} id={id} token={token} socket={socket} />
        </Elements>
    );
};

const PaymentForm = ({ booking, id, token, socket }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setError('');

        try {
            const paymentAmount = Math.round(booking.price);
            const response = await fetch('http://localhost:1234/payments/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: paymentAmount }),
            });

            const { clientSecret } = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: 'Customer Name' },
                },
            });

            if (error) {
                console.error('Payment error:', error);
                setError(error.message);
                setIsProcessing(false);
                return;
            }

            try {
                const response = await UpdateBooking(id, { isPaid: true }, token);
                if (response) {
                    const userId = response.data.userId;
                    const title = response.data.title;

                    const info = {
                        userId: userId,
                        bookingId: id,
                        message: ` booking ${title}'s has been paid `
                    };
                    socket.emit('bookingStatusUpdated', info);
                } else {
                    console.error("Error updating status");
                }
            } catch (err) {
                console.error("Error updating booking status:", err);
            }

            alert('Payment successful!');
            navigate(apiConst.profileMe);
        } catch (error) {
            console.error('Complete payment error:', error);
            setError('Payment processing failed');
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.title || 'No Title'}</h3>
                        <p className="text-gray-600 mb-4">{booking.description || 'No Description'}</p>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>PKR {booking.price ? Number(booking.price).toFixed(2) : '0.00'}</span>
                    </div>

                    <div className="border border-gray-300 p-3 rounded-md mb-4">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>

                    {error && (
                        <p className="text-red-500 text-center mt-4 text-sm">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmAndPay;