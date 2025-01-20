class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    questionAnswerMap = {
        "How do I create an account on this platform?": "To create an account, click on 'Sign Up' and follow the instructions.",
        "Can I browse services without logging in?": "Yes, you can browse services without logging in, but booking requires an account.",
        "How do I reset my password?": "To reset your password, click 'Forgot Password' on the login page and follow the steps.",
        "Is my personal information secure on this platform?": "Yes, we use advanced encryption to ensure your personal information remains secure.",
        "How can I search for services near me?": "You can search for services near you by entering your location in the search bar.",
        "Can I filter services by price or location?": "Yes, you can filter services by price, location, or rating using the filters provided.",
        "Are there reviews available for services?": "Yes, reviews for services are displayed on the service detail page.",
        "What is the process for booking a service?": "To book a service, select the service, choose a date, and proceed to payment.",
        "How do I check the availability of a vendor?": "Vendor availability is displayed on their profile page or during the booking process.",
        "What happens after I book a service?": "After booking, you will receive a confirmation email with all the details.",
        "Can I modify or cancel a booking?": "Yes, you can modify or cancel a booking from your account dashboard.",
        "Will I receive a confirmation email after booking?": "Yes, a confirmation email will be sent immediately after booking.",
        "How can I contact a vendor before making a booking?": "You can use the 'Contact Vendor' button on their profile page.",
        "What payment methods are supported?": "We accept credit/debit cards, PayPal, and other secure payment methods.",
        "Is there an additional fee for using this platform?": "No, there are no additional fees for using the platform.",
        "How can I get a refund if the vendor cancels the booking?": "If the vendor cancels, a full refund will be processed automatically.",
        "Are there any ongoing discounts or promotions?": "Yes, you can check the 'Promotions' section on the homepage for current discounts.",
        "Can I book multiple services for the same event?": "Yes, you can add multiple services to your cart and book them together.",
        "How do I keep track of my booked services?": "You can view all your bookings in the 'My Bookings' section of your account.",
        "Does this platform provide event planning advice or tips?": "Yes, we offer event planning tips in our blog and resource section.",
    };

    handleGeneralQuestions = () => {
        const message = this.createChatBotMessage("Here are some general questions:", {
            widget: "generalQuestions",
        });
        this.updateChatbotState(message);
    };

    handleServiceSearch = () => {
        const message = this.createChatBotMessage("Here are some questions about service search:", {
            widget: "serviceSearch",
        });
        this.updateChatbotState(message);
    };

    handleBookings = () => {
        const message = this.createChatBotMessage("Here are some questions about bookings:", {
            widget: "bookings",
        });
        this.updateChatbotState(message);
    };

    handlePayments = () => {
        const message = this.createChatBotMessage("Here are some questions about payments:", {
            widget: "payments",
        });
        this.updateChatbotState(message);
    };

    handleEventPlanning = () => {
        const message = this.createChatBotMessage("Here are some questions about event planning:", {
            widget: "eventPlanning",
        });
        this.updateChatbotState(message);
    };

    handleQuestionResponse = (response) => {
        const answer = this.questionAnswerMap[response] || "I'm sorry, I don't have an answer for that.";
        const combinedMessage = `${response}\n\n${answer}`; // Combine question and answer
        const message = this.createChatBotMessage(combinedMessage);
        this.updateChatbotState(message);
    };

    updateChatbotState(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;
