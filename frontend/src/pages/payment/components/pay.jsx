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
            console.log('Received clientSecret:', clientSecret);


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
                    console.log("Booking status updated:", response);


                    const userId = response.data.userId; // Assuming response includes userId
                    const title = response.data.title; // Assuming response includes userId

                    const info = {
                        userId: userId,
                        bookingId: id,

                        message: ` booking ${title}'s has been paid `
                    }
                    console.log("info", info)
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
        <div className="flex flex-col md:flex-row justify-between mt-10 p-6 md:p-12">
            <div className=" w-full mx-auto">
                <div className="border border-pink-500 rounded-lg p-6 space-y-6">
                    <div className="flex space-x-4">
                        <div>
                            <h3 className="text-lg font-semibold text-left">{booking.title || 'No Title'}</h3>
                            <p className="text-gray-700 text-left">{booking.description || 'No Description'}</p>
                        </div>
                    </div>

                    <hr className="text-gray-500 my-10" />

                    <div className="flex justify-between text-lg font-medium text-gray-900">
                        <p>Total </p>
                        <p>PKR{booking.price ? Number(booking.price).toFixed(2) : '0.00'}</p>
                    </div>

                    <div className="border p-4 rounded-md mb-4">
                        <CardElement />
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ConfirmAndPay;
