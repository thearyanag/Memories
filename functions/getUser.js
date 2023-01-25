const User = require("../schemas/User");

/**
 *
 * @param {Number} phone phone number of user
 */
module.exports = async function getUser(phone) {
  return await User.findOne({
    phone: phone,
  })
    .lean()
    .exec()
};
