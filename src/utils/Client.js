const { Client } = require("discord.js");
const dotenv = require("dotenv")
dotenv.config()
const API_TOKEN = process.env.BOT_TOKEN;

const client = new Client();    
client.login(API_TOKEN)
module.exports = client