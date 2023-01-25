const User = require('../schemas/User');

module.exports = async function createUser(phone) {
    console.log("Creating user");
    const user = new User({
        phone: phone,
        state: 0,
        wallet: 0,
        nfts: 0,
    });
    await user.save();
    return user;
}

