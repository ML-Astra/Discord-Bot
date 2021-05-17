const { MessageEmbed } = require("discord.js");
const DataHandler = require("../utils/DataHandler");
const { BOT_VERSION } = require("../utils/Constants");
const ErrorEmbed = require('../utils/Error')


const DOTW = [`M`, `T`, `W`, `TH`, `F`, `SA`, `SU`];

module.exports = async ({ userid, client, message, additional }) => {
  const [commandOption, ...options] = additional;
  if (commandOption) {
    switch (commandOption) {
      case "create":
        if (options.length == 2) {
          // date + time
          let [date, time] = options;
          if (!DOTW.includes(date)) {
            let err = ErrorEmbed(message, `Please Use Only The Correct Date Mentioned: ${DOTW}`)
            message.channel.send(err).then((m) => {
              m.delete({ timeout: 30_000 });
            });
            return;
          }
          const [_, hours, minutes] = /([0-9]{1,2})\:([0-9]{1,2})(?:P|A)?M/g
            .exec(time)
            .map(t => parseInt(t));
          if (
            isNaN(hours) ||
            isNaN(minutes) ||
            hours > 12 ||
            hours < 0 ||
            minutes < 0 ||
            minutes > 59
          ) {
            let errEmbed = new MessageEmbed()
              .setAuthor(
                `YolkBot Version: ${BOT_VERSION} \n SYNTAX_ERR: TIME EXPECTED, GOT ${time}`
              )
              .setDescription(`You Must Specify a Valid Time To Schedule`);
            message.channel.send(errEmbed).then((m) => {
              m.delete({ timeout: 30_000 });
            });
            return;
          }
          await DataHandler.post({
            userid,
            date,
            time,
            message,
          });
        } else {
          let errEmbed = new MessageEmbed()
            .setAuthor(
              `YolkBot Version: ${BOT_VERSION} \n SYNTAX_ERR: DATE AND TIME EXPECTED.`
            )
            .setDescription(`You Must Specify a Valid Date & Time To Schedule`);
          message.channel.send(errEmbed).then((m) => {
            m.delete({ timeout: 30_000 });
          });
          return;
        }
        break;
      case "delete":
        await DataHandler.delete(message.author.id);
        break;
      default:
        // get user-schedule of mentioned user or user from original message.
        // example-1:   @testuser: !schedule
        // result:      userid => <id of @testuser>

        // example-2:   @testuser: !schedule @justatester
        // result:      userid => <id of @justatester>
        let co = commandOption;
        if (co.startsWith("<@") && co.endsWith(">")) {
          co = co.slice(2, -1);

          if (co.startsWith("!")) {
            co = co.slice(1);
          }

          userid = client.users.cache.get(co)?.id ?? userid;
        }

        await DataHandler.get({ message, userid });
        break;
    }
  } else {
    await DataHandler.get({ message, userid });
  }
};
