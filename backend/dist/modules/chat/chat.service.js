"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
let ChatService = class ChatService {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }
    async getAllMessages(userId) {
        return this.chatModel.find({ userId }).sort({ timestamp: 1 }).exec();
    }
    async addMessage(sender, message, userId) {
        const newMessage = new this.chatModel({ sender, message, userId });
        return newMessage.save();
    }
    async getBotResponse(message, userId) {
        const knowledgeBase = [
            { question: 'How do I create an account on this platform?', answer: 'You can create an account by clicking the "Sign Up" button on the homepage and providing the required details.' },
            { question: 'Can I browse services without logging in?', answer: 'Yes, you can browse services without logging in, but you will need an account to book a service.' },
            { question: 'How do I reset my password?', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page.' },
            { question: 'Is my personal information secure on this platform?', answer: 'Yes, we prioritize your privacy and use secure methods to store your data.' },
            { question: 'How can I search for services near me?', answer: 'Use the search bar and filter options to find services near your location.' },
            { question: 'Can I filter services by price or location?', answer: 'Yes, you can filter services by price, location, and other criteria using the filter options.' },
            { question: 'Are there reviews available for services?', answer: 'Yes, you can view reviews for each service on their respective pages.' },
            { question: 'What is the process for booking a service?', answer: 'Select a service, check its availability, and click on the "Book Now" button to complete your booking.' },
            { question: 'How do I check the availability of a vendor?', answer: 'You can check availability by visiting the vendor’s profile and using the availability calendar.' },
            { question: 'What happens after I book a service?', answer: 'You will receive a confirmation email with booking details and can communicate with the vendor if needed.' },
            { question: 'Can I modify or cancel a booking?', answer: 'Yes, you can modify or cancel a booking from your account dashboard.' },
            { question: 'Will I receive a confirmation email after booking?', answer: 'Yes, a confirmation email with all booking details will be sent to your registered email address.' },
            { question: 'How can I contact a vendor before making a booking?', answer: 'Use the "Contact Vendor" option on their profile page to send them a message.' },
            { question: 'What payment methods are supported?', answer: 'We support credit/debit cards, net banking, and popular digital wallets.' },
            { question: 'Is there an additional fee for using this platform?', answer: 'No, there are no additional fees for users booking services through the platform.' },
            { question: 'How can I get a refund if the vendor cancels the booking?', answer: 'In case of cancellation, a refund will be processed automatically within 5-7 business days.' },
            { question: 'Are there any ongoing discounts or promotions?', answer: 'Yes, check the "Offers" section on our homepage for ongoing discounts.' },
            { question: 'Can I book multiple services for the same event?', answer: 'Yes, you can book multiple services and manage them from your account dashboard.' },
            { question: 'How do I keep track of my booked services?', answer: 'You can track all your bookings in the "My Bookings" section of your account.' },
            { question: 'Does this platform provide event planning advice or tips?', answer: 'Yes, visit our blog section for event planning advice and tips.' },
            { question: 'How can I register as a vendor?', answer: 'Click on the "Become a Vendor" link on the homepage and fill out the registration form.' },
            { question: 'What documents do I need to provide to register my business?', answer: 'You may need to provide valid identification and proof of your business, such as licenses or certificates.' },
            { question: 'How do I update my business profile?', answer: 'You can update your profile from the "Vendor Dashboard" after logging in.' },
            { question: 'Can I deactivate my vendor account temporarily?', answer: 'Yes, you can deactivate your account from the "Account Settings" section.' },
            { question: 'How do I list a new service?', answer: 'Go to the "Vendor Dashboard" and click "Add Service" to list a new service.' },
            { question: 'Can I add images or videos to my service listings?', answer: 'Yes, you can upload images and videos to showcase your services.' },
            { question: 'Is there a limit on the number of services I can list?', answer: 'There is no limit; you can list as many services as you like.' },
            { question: 'How can I update the pricing of my services?', answer: 'Update the pricing directly from your service page in the Vendor Dashboard.' },
            { question: 'How and when will I receive payments for my bookings?', answer: 'Payments are processed automatically and deposited into your account within 3-5 business days after service completion.' },
            { question: 'Are there any fees or commissions charged to vendors?', answer: 'Yes, a small commission is charged for each booking. Details are available in the Vendor Agreement.' },
            { question: 'Can I offer discounts or promotional codes to users?', answer: 'Yes, you can create discounts and promotional codes from your Vendor Dashboard.' },
            { question: 'What should I do if there’s a payment dispute?', answer: 'Contact our support team, and we will assist in resolving the dispute.' },
        ];
        const bestMatch = knowledgeBase.find((entry) => message.toLowerCase().includes(entry.question.toLowerCase()));
        let botResponse;
        if (bestMatch) {
            botResponse = bestMatch.answer;
        }
        else {
            botResponse = 'Sorry, I could not find an answer to your question. Please contact support for assistance.';
        }
        await this.addMessage('User', message, userId);
        await this.addMessage('Bot', botResponse, userId);
        return botResponse;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map