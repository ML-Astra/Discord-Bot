//Imports
export const logger = require('logger').createLogger('sys.log');
//Bot Stuff and Stuff
const client = require('./src/utils/Client')
const CommandsHolder = require("./src/commands");
const { BOT_VERSION, COMMAND_PREFIX, LOG_LEVEL } = require("./src/utils/Constants");
const errEmbed = require('./src/utils/Error')


logger.setLevel(LOG_LEVEL);


//Runs when YolkBot is Validated
client.on("ready", () => {
  logger.info(`Yolkbot v${BOT_VERSION}. Online and Ready`);
  console.log(`YolkBot Version ${BOT_VERSION} is now online`);

  client.on("message", async (message) => {
    //Makes sure that person sending isnt a bot, and it must have a ! at the start for the bot to react in any way.
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot)
      return;

    let [command, commandOption, ...options] = message.content
      .slice(COMMAND_PREFIX.length)
      .trim()
      .split(" ");

    //Actual Commands from `src/commands` and stuff now
    if (Object.keys(CommandsHolder).includes(command.toLowerCase())) {
      try {
      await CommandsHolder[command]({
        userid: message.author.id,
        client,
        message,
        additional: [commandOption, ...options],
      })} catch {
        errEmbed(message, "ERR_SYNTAX_ERROR");
        logger.error(message);
      };
    } else {
      console.error(`This command '${command.toLowerCase()}' does not exist`);
      logger.error(`Command: ${command.toLowerCase()} not found.`);
      return;
    }
  });
});
