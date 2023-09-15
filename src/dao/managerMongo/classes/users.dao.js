const { UserModel } = require("../models/users.model.js");

class UserClass {
    async find() {
        const users = await UserModel.find({})
        return users
    }
}

module.exports = { userModel: new UserClass };
