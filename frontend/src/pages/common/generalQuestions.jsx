import React from "react";

export const GeneralQuestions = (props) => {
    const questions = [
        { text: "How do I create an account on this platform?", id: 1 },
        { text: "Can I browse services without logging in?", id: 2 },
        { text: "How do I reset my password?", id: 3 },
        { text: "Is my personal information secure on this platform?", id: 4 },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {questions.map((question) => (
                <button
                    key={question.id}
                    onClick={() => props.actionProvider.handleQuestionResponse(question.text)}
                    className="bg-gray-200 text-black  px-2 py-2 text-sm rounded hover:bg-gray-300"
                >
                    {question.text}
                </button>
            ))}
        </div>
    );
};



export const ServiceSearch = (props) => {
    const questions = [
        { text: "How can I search for services near me?", id: 1 },
        { text: "Can I filter services by price or location?", id: 2 },
        { text: "Are there reviews available for services?", id: 3 },
        { text: "What is the process for booking a service?", id: 4 },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {questions.map((question) => (
                <button
                    key={question.id}
                    onClick={() => props.actionProvider.handleQuestionResponse(question.text)}
                    className="bg-gray-200 text-black  px-2 py-2 text-sm rounded hover:bg-gray-300"
                >
                    {question.text}
                </button>
            ))}
        </div>
    );
};



export const Bookings = (props) => {
    const questions = [
        { text: "How do I check the availability of a vendor?", id: 1 },
        { text: "What happens after I book a service?", id: 2 },
        { text: "Can I modify or cancel a booking?", id: 3 },
        { text: "Will I receive a confirmation email after booking?", id: 4 },
        { text: "How can I contact a vendor before making a booking?", id: 5 },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {questions.map((question) => (
                <button
                    key={question.id}
                    onClick={() => props.actionProvider.handleQuestionResponse(question.text)}
                    className="bg-gray-200 text-black  px-2 py-2 text-sm rounded hover:bg-gray-300"
                >
                    {question.text}
                </button>
            ))}
        </div>
    );
};



export const Payments = (props) => {
    const questions = [
        { text: "What payment methods are supported?", id: 1 },
        { text: "Is there an additional fee for using this platform?", id: 2 },
        { text: "How can I get a refund if the vendor cancels the booking?", id: 3 },
        { text: "Are there any ongoing discounts or promotions?", id: 4 },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {questions.map((question) => (
                <button
                    key={question.id}
                    onClick={() => props.actionProvider.handleQuestionResponse(question.text)}
                    className="bg-gray-200 text-black  px-2 py-2 text-sm rounded hover:bg-gray-300"
                >
                    {question.text}
                </button>
            ))}
        </div>
    );
};



export const EventPlanning = (props) => {
    const questions = [
        { text: "Can I book multiple services for the same event?", id: 1 },
        { text: "How do I keep track of my booked services?", id: 2 },
        { text: "Does this platform provide event planning advice or tips?", id: 3 },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {questions.map((question) => (
                <button
                    key={question.id}
                    onClick={() => props.actionProvider.handleQuestionResponse(question.text)}
                    className="bg-gray-200 text-black px-2 py-2 text-sm rounded hover:bg-gray-300"
                >
                    {question.text}
                </button>
            ))}
        </div>
    );
};

