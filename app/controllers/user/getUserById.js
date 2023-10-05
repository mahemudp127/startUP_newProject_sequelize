const { Sequelize } = require("sequelize");
const sequelize = require("../../../sequelize/config/sequelize");
const User = require("../../../sequelize/models/user");

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findAll({
      where: {
        id: { [Sequelize.Op.ne]: userId }, // Exclude the current user
        latitude: {
          [Sequelize.Op.between]: [user.latitude - 0.1, user.latitude + 0.1],
        }, // Define a latitude range
        longitude: {
          [Sequelize.Op.between]: [user.longitude - 0.1, user.longitude + 0.1],
        }, // Define a longitude range
      },
      attributes: { exclude: ["password"] },
    })
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: "User data Found",
          data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          success: false,
          message: "User data not Found",
          error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
module.exports = getUserById;
