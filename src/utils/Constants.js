const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  BOT_VERSION: "YolkBot Version 0.7",
  COMMAND_PREFIX: "!",
  BACKEND_PORT: process.env.PORT,
  DESIRED_LOCATION_FOR_VC: "843101271292116992",
  URL: "https://yolkbot.herokuapp.com/accounts"
};
