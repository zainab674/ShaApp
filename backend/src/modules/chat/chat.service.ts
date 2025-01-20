import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) { }

    // Fetch all messages for a specific session or user
    async getAllMessages(userId: string): Promise<Chat[]> {
        return this.chatModel.find({ userId }).sort({ timestamp: 1 }).exec();
    }

    // Save a user or bot message
    async addMessage(sender: string, message: string, userId: string): Promise<Chat> {
        const newMessage = new this.chatModel({ sender, message, userId });
        return newMessage.save();
    }

    // Handle user queries dynamically
    async getBotResponse(message: string, userId: string): Promise<string> {
        // Expanded knowledge base with all possible questions and answers
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

        // Find the best match
        const bestMatch = knowledgeBase.find((entry) =>
            message.toLowerCase().includes(entry.question.toLowerCase()),
        );

        let botResponse: string;
        if (bestMatch) {
            botResponse = bestMatch.answer;
        } else {
            botResponse = 'Sorry, I could not find an answer to your question. Please contact support for assistance.';
        }

        // Save the user message and bot response to the database
        await this.addMessage('User', message, userId);
        await this.addMessage('Bot', botResponse, userId);

        return botResponse;
    }

}
