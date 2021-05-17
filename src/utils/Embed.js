// const {MessageEmbed} = require("discord.js");
// const {BOT_VERSION} = require('./Constants')
// module.exports = async (Color, Description, Title, Footer, {message}) => {
//     if (Color === undefined || Color === null) { Color = 0xa497f8 }
//     else if (Description === undefined || Description === null) { 
//         new MessageEmbed() 
//         .setAuthor(BOT_VERSION)
//         .setTitle(Title)
//         .setColor(Color)  
//         .setFooter(Footer)
//     }
//     else if (Title === undefined || Title === null) { 
//         new MessageEmbed() 
//         .setAuthor(BOT_VERSION)
//         .setDescription(Description)
//         .setColor(Color)  
//         .setFooter(Footer)
//     }
//     else if (Footer === undefined || Footer === null) {
//         new MessageEmbed()
//             .setAuthor(BOT_VERSION)
//             .setDescription(Description)
//             .setColor(Color)
//     } else {
//         new MessageEmbed()
//             .setAuthor(BOT_VERSION)
//             .setDescription(Description)
//             .setColor(Color)
//             .setFooter(Footer)
//     }
//     message.channel.send()
// }
