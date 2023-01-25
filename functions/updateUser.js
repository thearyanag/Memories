const User = require("../schemas/User");

/**
 *
 * @param {*} phone Phone number of user
 * @param {*} value Object of values to update
 */
module.exports = async function updateUser(phone, value) {
  console.log("Updating user");
  await User.findOneAndUpdate(
    {
      phone: phone,
    },
    value
  )
    .lean()
    .exec();
};
