const { DESIRED_LOCATION_FOR_VC, BOT_VERSION } = require("../utils/Constants");
const { MessageEmbed } = require('discord.js')
module.exports = async (message, errMessage) => {
    const embedThing = new MessageEmbed()
        .setColor(0x8b0000)
        .setDescription('You Have A Syntax Error, Please Check Your Command Arguments ERR:' + errMessage)
        .setTitle("SYNTAX:ERR") // Creates the embed message
        .setFooter('Run `!help {command-name` To Find The Correct Arguments')
    message.react("👍"); //Reacts To The Message
    message.channel.send(embedThing)
}