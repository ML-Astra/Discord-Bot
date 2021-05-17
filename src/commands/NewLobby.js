const { MessageEmbed } = require("discord.js");
const sleep = require("../utils/sleep");
const { DESIRED_LOCATION_FOR_VC, BOT_VERSION } = require("../utils/Constants");

module.exports = async ({ client, message, additional }) => {
  const [commandOption, ...options] = additional;
  let i = 1;
  let joinedVC = [];

  if (!commandOption) {
    return message.reply(
      `You didn't provide any arguments, Syntax:  \`!newlobby {lobbyname: String} {expiration time, default 20 minutes: Int}\``
    );
  }
  //Creates the Lobby
  await message.guild.channels.create(`Lobby-${commandOption}`, {
    type: "voice",
  });
  //
  const teamChannel = await message.guild.channels.cache.find(
    (channel) => channel.name === `Lobby-${commandOption}`
  );
  teamChannel.setParent(DESIRED_LOCATION_FOR_VC);

  const sleepTime = parseInt(options[0]) * 60 * 60 * 20;

  message.react("👍");
  //if expire argument is there, send message and use the arg as the expire time for the VC
  if (options[0] !== undefined) {
    const newVCEmbed = await new MessageEmbed()
      .setAuthor(`YolkBot Version: ${BOT_VERSION}`)
      .setTitle("New Room Created Successfully")
      .setColor(0xa497f8)
      .setDescription(
        `Name: **${commandOption}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${options[0]} **Minutes***`
      );
    const sentEmbed = await message.channel.send(newVCEmbed);
    sentEmbed.react("✅");
    sentEmbed.delete({ timeout: 60_000 });
    await sleep(sleepTime); // not great but no idea how to make better, yet
    await teamChannel.delete();
    const embedThing = new MessageEmbed()
      .setAuthor(`YolkBot ${BOT_VERSION}`)
      .setColor(0xa497f8)
      .setDescription(
        "Successfully Deleted Voice Chat, Thank You For Using Our Services."
      )
      .setFooter("To use again, !newlobby {'title'} {expiretime}");
    await message.channel.send(embedThing).then((m) => {
      m.delete({ timeout: 10_000 });
    });
    // If no expire argument then it defaults to twenty minutes
  } else if (options[0] === undefined) {
    const newVCEmbed = await new MessageEmbed()
      .setAuthor(`YolkBot ${BOT_VERSION}`)
      .setTitle("New Room Created Successfully")
      .setColor(0xa497f8)
      .setDescription(
        `Name: **${commandOption}** \n\n\n *Creator*: ${message.author} \n\n ***You did not put a designated time**, \n The default is 20. Enjoy, VC Expiring in 20 **Minutes***`
      );
    (await message.channel.send(newVCEmbed)).react("✅");

    if (i == 0) {
      sentMessage.delete();
    }

    await sleep(1000 * 60 * 20);
    await teamChannel.delete();
    const embedThing = new MessageEmbed()
      .setAuthor(`YolkBot ${BOT_VERSION}`)
      .setColor(0xa497f8)
      .setDescription(
        "Successfully Deleted Voice Chat, Thank You For Using Our Services."
      )
      .setFooter(`To use again, !newlobby {'title'} {expiretime}`);
    await (await message.channel.send(embedThing)).delete({ timeout: 10_000 });
  }

  /*----------------------------------------------------------------*/
  /*------------------WHEN USER JOINS IT UPDATES -------------------*/
  /*----------------------------------------------------------------*/
  /*-------------WHEN USER LEAVES IT SEND AN EMBED -----------------*/
  /*----------------------------------------------------------------*/
  client.on("voiceStateUpdate", async (oldState, newState) => {
    const coworkingvc = 839584284675276844;
    const othervc = 102571251271258671;
    if (!newState.channel) {
      // Triggered if the user left a channel
      console.log(`${newState.channel.member} Has Left The Lobby`);
    }

    if (newState.channelID !== coworkingvc) {
      // Triggered when the user joined the channel
      if (!joinedVC.includes(newState.channel.member)) {
        i = i - 1;
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
        i = i + 1;
      }
    }
  });
};



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
