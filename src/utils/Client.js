const { Client } = require("discord.js");
const dotenv = require("dotenv");
const { logger } = require("../../bot");
dotenv.config()
const API_TOKEN = process.env.BOT_TOKEN;

const client = new Client();
try{
    client.login(API_TOKEN);
}catch(error){
    logger.error(`An Error has occurred during login \n\n ${error}`);
}


module.exports = client