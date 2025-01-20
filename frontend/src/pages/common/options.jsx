import React from "react";

const MainOptions = (props) => {
    const options = [
        { text: "General Questions", handler: props.actionProvider.handleGeneralQuestions, id: 1 },
        { text: "Service Search", handler: props.actionProvider.handleServiceSearch, id: 2 },
        { text: "Bookings", handler: props.actionProvider.handleBookings, id: 3 },
        { text: "Payments", handler: props.actionProvider.handlePayments, id: 4 },
        { text: "Event Planning", handler: props.actionProvider.handleEventPlanning, id: 5 },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={option.handler}
                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default MainOptions;
