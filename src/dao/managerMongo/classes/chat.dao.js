const { ChatModel } = require("../models/chat.model.js");

class ChatClass {

    async findLeaned() {
        const messages = await ChatModel.find({}).lean().exec();
        return messages
    }

    async create(msg) {
        const newMessage = await ChatModel.create(msg)
        return newMessage;
    }

}

module.exports = { chatModel: new ChatClass };
