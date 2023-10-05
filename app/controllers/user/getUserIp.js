const getUserIp = async (req, res) => {
  const userIp = req.clientIp;
  return res.status(200).json({ ip: userIp });
};

module.exports = getUserIp;
