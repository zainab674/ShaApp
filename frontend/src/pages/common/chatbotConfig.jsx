import { createChatBotMessage } from "react-chatbot-kit";
import MainOptions from "./options";
import { GeneralQuestions, ServiceSearch, Bookings, Payments, EventPlanning } from "./generalQuestions";
import React from "react";




const config = {
    botName: "SupportBot",
    initialMessages: [
        createChatBotMessage("Hi! How can I assist you?", {
            widget: "mainOptions",
        }),
    ],
    widgets: [
        {
            widgetName: "mainOptions",
            widgetFunc: (props) => <MainOptions {...props} />,
        },
        {
            widgetName: "generalQuestions",
            widgetFunc: (props) => <GeneralQuestions {...props} />,
        },
        {
            widgetName: "serviceSearch",
            widgetFunc: (props) => <ServiceSearch {...props} />,
        },
        {
            widgetName: "bookings",
            widgetFunc: (props) => <Bookings {...props} />,
        },
        {
            widgetName: "payments",
            widgetFunc: (props) => <Payments {...props} />,
        },
        {
            widgetName: "eventPlanning",
            widgetFunc: (props) => <EventPlanning {...props} />,
        },
    ],
};

export default config;
