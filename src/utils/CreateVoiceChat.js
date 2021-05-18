const { DESIRED_LOCATION_FOR_VC, BOT_VERSION } = require("../utils/Constants");
const {MessageEmbed} = require('discord.js');
const { logger } = require("../../bot");
module.exports = async (message, title, timeout = 30) => {
    const timeToDelete = parseInt(timeout) * 60 * 1000;
    console.log({timeout}) 
    const embedThing = new MessageEmbed() 
        .setColor(0xa497f8) 
        .setDescription('Successfully Deleted Voice Chat, Thank You For Using Our Services.')
        .setTitle("To use again, !lobby {'title'} {expiretime}"); // Creates the embed message
    const createdVC = await message.guild.channels.create(`Lobby-${title}`, {
        type: "voice",
    })
    .then(m => {
            logger.debug(`Created Channel: ${title}`);
        // Lobby Parameter = m -Astra
            m.setParent(DESIRED_LOCATION_FOR_VC);
            m.delete({timeout: timeToDelete})
                .then(async (m) => {
                    await message.channel.send(embedThing)
                        .then((m) => {
                            m.delete({ timeout: 10_000 });
                        }); 
                });
        }); // Creates VC And Parents it to the parent category that is delcared by the DESIRED_LOCATION... 

    message.react("👍"); //Reacts To The Message

    const newVCEmbed = new MessageEmbed().setColor(0xa497f8).setAuthor(BOT_VERSION).setDescription(`Name: **${title}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${timeout} **Minutes***`).setTitle("**New Room Created Successfully**").setFooter("__YolkBot__") // Creates Embed Message

    await message.channel.send(newVCEmbed)
        .then(m => {
            m.react("✅")
            m.delete({timeout: timeToDelete});
            console.log(timeToDelete)     // Sends the embed message, and then reacts to it, then deletes it after a minute
        }
    )
}