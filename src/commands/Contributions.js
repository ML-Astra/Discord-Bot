const { MessageEmbed } = require('discord.js');
const embed = require('../utils/Embed')
module.exports = async ({ message }) => {
  const embedContributions = new MessageEmbed().setColor(0xa497f8).setDescription("Lead Developer: JacBo__ \n Main Contributor: Ötzi \n Side Contributors: Bread, Vyngaard").setFooter("Thank You To Everyone Who Has Contributed To This Project \n On Bashbunni's Server, I am Much Appreciative -Yolk")
  await message.channel.send({embedContributions})
};
