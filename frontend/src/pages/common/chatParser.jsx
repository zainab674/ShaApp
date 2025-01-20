class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        if (message.includes("hello")) {
            this.actionProvider.handleGreeting();
        }
    }
}

export default MessageParser;
