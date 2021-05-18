const { MessageEmbed } = require('discord.js');
const { logger } = require('../../bot');
const embed = require('../utils/Embed')
module.exports = async ({ message }) => {
  logger.debug('Command: !contributions used.');
  const embedContributions = new MessageEmbed().setColor(0xa497f8).setDescription("Lead Developer: JacBo__ \n Main Contributor: Ötzi \n Side Contributors: Bread, Vyngaard, ML-Astra").setFooter("Thank You To Everyone Who Has Contributed To This Project \n On Bashbunni's Server, I am Much Appreciative -Yolk")
  await message.channel.send({embedContributions})
};
