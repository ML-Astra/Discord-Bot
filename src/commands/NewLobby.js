const { MessageEmbed } = require("discord.js");
const sleep = require("../utils/sleep");
const { DESIRED_LOCATION_FOR_VC, BOT_VERSION } = require("../utils/Constants");

module.exports = async ({ client, message, additional }) => {
  logger.debug('Command: !lobby used.');
  const [commandOption, ...options] = additional;
  let i = 1;
  let joinedVC = [];

  if (!commandOption) {
    return message.reply(
      `You didn't provide any arguments, Syntax: \n !lobby {lobbyname: String} {expiration time, default 20 minutes: Int}`
    );
  }
  //Creates the Lobby





  
  //if expire argument is there, send message and use the arg as the expire time for the VC
  if (commandOption === "create") {
    console.log("Passed Create Argument")
    if (options[0]) {
      console.log("Passed a second arg")
      if (options[1]) {
        console.log("Passed a third arg")
        let vcTimeOut = parseInt(options[1]) * 60 * 1000

        const embedWhenMakeVC = await new MessageEmbed().setAuthor(`YolkBot Version: ${BOT_VERSION}`).setTitle("New Room Created Successfully").setColor(0xa497f8).setDescription(`Name: **${commandOption}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${options[1]} **Minutes***`);

        message.channel.send(embedWhenMakeVC).then(m => {m.react("✅"), m.delete({timeout: vcTimeOut})}) 
        message.react("👍"); //Reacts To The Message

        let madeChannelOnRequest = await message.guild.channels.create(`Lobby-${options[0]}`, {
          type: "voice",
        }).then(m => console.log(m)).catch(err => console.log(err))
        
        await sleep(vcTimeOut)

        await madeChannelOnRequest.delete()
      }
      else if (!options[1]) {

        const defaultTimeOut = 30 * 1000 * 60
        
        console.log("Not passed a third arg, defaulting---")
        
        const embedWhenNoThirdArg = await new messageEmbed().setAuthor(`YolkBot ${BOT_VERSION}`).setColor(0xa497f8).setDescription("Successfully Deleted Voice Chat, Thank You For Using Our Services.").setFooter("To use again, !lobby {'title'} {expiretime}");
        
        message.channel.send(embedWhenNoThirdArg).then(m => {m.react("✅"), m.delete({timeout: defaultTimeOut}).then(end => end = message.channel.send(new MessageEmbed().setColor(0xa497f8).setDescription("Successfully Deleted Voice Chat, Thank You For Using Our Services.").setFooter("To use again, !lobby {'title'} {expiretime}")))

        message.guild.channels.create(`Lobby-${options[0]}`, {type: "voice"}).then(m => m.delete({timeout: defaultTimeOut}))
      }
    )}

  /*----------------------------------------------------------------*/
  /*------------------WHEN USER JOINS IT UPDATES -------------------*/
  /*----------------------------------------------------------------*/
  /*-------------WHEN USER LEAVES IT SEND AN EMBED -----------------*/
  /*----------------------------------------------------------------*/
  client.on("voiceStateUpdate", async (oldState, newState) => {
    const coworkingvc = 839584284675276844;
    if (!newState.channel) {
      // Triggered if the user left a channel
      console.log(`${newState.channel.member} Has Left The Lobby`);
    }

    if (newState.channelID !== coworkingvc) {
      // Triggered when the user joined the channel
      if (!joinedVC.includes(newState.channel.member)) {
        joinedVC.push(newState.channel.member);
        console.log(newState.channel.member);
        const newVCEmbed = await new MessageEmbed()
          .setTitle("New Member")
          .setColor(0xa497f8)
          .setDescription(
            `Name: **${newState.channel.name}** \n\n\n Members: ${joinedVC}`
          );
        await message.channel.send(newVCEmbed);
        // const channel = coworkingvc;
          }
        }
      });
    };
  }
}


// const embed = require('../utils/Embed')
// const sleep = require("../utils/sleep");
// const { DESIRED_LOCATION_FOR_VC, BOT_VERSION } = require("../utils/Constants");
// const client = require('../utils/Client');
// const { MessageEmbed } = require('discord.js');

// module.exports = async ({ message, additional }) => {
//   const [commandOption, ...options] = additional;
//   let i = 1;
//   let joinedVC = [];

//   if (!commandOption) {
//     return message.reply(
//       `You didn't provide any arguments, Syntax:  \`!newlobby {lobbyname: String} {expiration time, default 20 minutes: Int}\``
//     );
//   }
//   //Creates the New Voice Channel
  
//   //if expire argument is there, send message and use the arg as the expire time for the VC
//   if (commandOption === "create") {
//     console.log("Used !newlobby create")
//     if (options[0]) { 
//       console.log("Used !newlobby create [argument]")
//       let sleepTimeDeclared = 20 * 1000 * 60; //Time To Expire If The  User Didnt Specifys It
//       if (options[1]) {
//         sleepTimeDeclared = parseInt(options[1]) * 1000 * 60;
        
        
//       }
//       const createdVC = await message.guild.channels.create(`Lobby-${options[0]}`, {
//           type: "voice",
//         }).then(m => {m.setParent(DESIRED_LOCATION_FOR_VC), m.delete({timeout: sleepTimeDeclared})}) // Created it And Parent it 
        
//         message.react("👍"); //Reacts To The Message
  
//         const newVCEmbed = await new MessageEmbed().setColor(0xa497f8).setAuthor(BOT_VERSION).setDescription(`Name: **${commandOption}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${options[0]} **Minutes***`).setTitle("**New Room Created Successfully**").setFooter("__YolkBot__") // Creates Embed Message
  
//         const sentEmbed = await message.channel.send(newVCEmbed).then(m => {m.react("✅"), m.delete({timeout: sleepTimeDeclared})}); // Sends the embed message, and then reacts to it, then deletes it after a minute
  
//         const embedThing = new MessageEmbed().setColor(0xa497f8).setDescription('Successfully Deleted Voice Chat, Thank You For Using Our Services.').setTitle("To use again, !newlobby {'title'} {expiretime}") // Creates the embed message  
    
//         await message.channel.send(embedThing).then((m) => {m.delete({ timeout: 10_000 });}); // Sends the embed message
      
   
   
    

//     }  // If no expire argument then it defaults to twenty minutes

//   } else if (options[1] === undefined  || options[1] === null) {
    
//     const createdVC = await message.guild.channels.create(`Lobby-${commandOption}`, {
//       type: "voice",
//     }).then(m => {m.setParent(DESIRED_LOCATION_FOR_VC)}) // Created it And Parent it

//     message.react("👍"); //Reacts To The Message
//     const newVCEmbed = await new MessageEmbed().setColor(0xa497f8).setTitle("New Room Created Successfully").setDescription(`Name: **${commandOption}** \n\n\n *Creator*: ${message.author} \n\n ***You did not put a designated time**, \n The VC Will Delete When **All** Users Leave VC. Enjoy`)
//     // const e = await embed(0xa497f8, null)
  
//     await message.channel.send(newVCEmbed).then(m => {m.react("✅")})
//   }

//   /*----------------------------------------------------------------*/
//   /*------------------WHEN USER JOINS IT UPDATES -------------------*/
//   /*----------------------------------------------------------------*/
//   /*-------------WHEN USER LEAVES IT SEND AN EMBED -----------------*/
//   /*----------------------------------------------------------------*/
//   // client.on("voiceStateUpdate", async (oldState, newState) => {
//   //   const coworkingvc = '839584284675276844';

//   //   if (newState.channel !== "839584284675276844") {
//   //     console.log("second vc working")
//   //   }

//   //   if (!newState.member.channel) {
      
//   //   }

//   //   if (newState.channel !== coworkingvc) {
//   //     console.log('third if statement working')
//   //   }
//   // });
// };

// //When a user joins a vc that is not coworking then
// //Not working on right now, will work on eventually
// // client.on("voiceStateUpdate", async (oldState, newState) => {
// //   const coworkingvc = "810615937140916273" ;            
// //   if (!newState.channel) {
// //     console.log("User Left")
// //   }
// //   if (newState.channel ) {
// //     const whenUserJoinCoWork = new MessageEmbed().setColor(0xa497f8).setTitle(`${newState.member} Has Joined Co-Working`)
// //     console.log('User Joined Co-Working')
// //   }
// // });
  