const User = require("../../../sequelize/models/user");

const createUser = (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const userIp = req.clientIp;
    User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      lastLogin: new Date(),
      ipAddress: userIp,
    })
      .then((data) => {
        const newData = data.toJSON();
        delete newData.password;
        return res.status(200).send({
          success: true,
          message: "User created successfully",
          data: newData,
        });
      })
      .catch((error) => {
        return res.status(200).send({
          success: false,
          message: "User not created",
          error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error, while creating a user",
    });
  }
};

module.exports = createUser;
