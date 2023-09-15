const { v4: uuidv4 } = require('uuid');

class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code || uuidv4();
        this.stock = product.stock || 0;
        this.category = product.category;
    }
}

module.exports = { ProductDTO };
