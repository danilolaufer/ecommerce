const config = require('../config/config.js');

let CartMethods;
let ProductMethods;
let ChatMethods;
let TicketMethods;
let UserMethods;

switch (config.persistence) {
    case 'MONGO':
        console.log('Persistence with Mongo');
        const { cartModel } = require('../dao/mongo/classes/carts.dao.js');
        CartMethods = cartModel;
        const { productModel } = require('../dao/mongo/classes/products.dao.js');
        ProductMethods = productModel;
        const { chatModel } = require('../dao/mongo/classes/chat.dao.js');
        ChatMethods = chatModel;
        const { ticketModel } = require('../dao/mongo/classes/tickets.dao.js');
        TicketMethods = ticketModel;
        const { userModel } = require('../dao/mongo/classes/users.dao.js');
        UserMethods = userModel;
        break;
    case 'FS':
        console.log('Persistence with FileSystem');
        const { cartManager } = require('../dao/fs/classes/CartsManager.js');
        CartMethods = cartManager;
        const { productManager } = require('./dao/fs/classes/ProductManager.js');
        ProductMethods = productManager;
        break;
    default:
        break;
}

module.exports = {
    CartMethods,
    ProductMethods,
    ChatMethods,
    TicketMethods,
    UserMethods
};
