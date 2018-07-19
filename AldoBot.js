//https://github.com/agubelu/discord-music-bot/blob/master/musicbot.js
//https://github.com/fent/node-ytdl-core/blob/master/README.md

/*
	Based on An Idiot's Guide: Discord.js tutorial
	Found here: https://github.com/AnIdiotsGuide/Tutorial-Bot/tree/master
*/

/*
Imports, and initial setup 
*/
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
var settings;
try{
  settings = require('./settings.json');
} catch(error) {
  let settings = {
    ownerid: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    adminrolename: process.env.ADMIN_ROLE,
    modrolename: process.env.MOD_ROLE,
    defaultrole: process.env.DEFAULT_ROLE,
    muterole: process.env.MUTE_ROLE,
    defaultchannel: process.env.DEFAULT_CHANNEL,
    moderationchannel: process.env.MODERATION_CHANNEL
  }
  fs.writeFileSync("settings.json",JSON.stringify(settings));
  settings = require('./settings.json');
}

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

//Commands setup
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};

//Login
//Replace process.env.TOKEN with your own bot token 
client.login(process.env.TOKEN);


