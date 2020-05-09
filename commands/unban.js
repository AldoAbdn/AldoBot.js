const {deleteMessage} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const members = message.mentions.members.array();
  const log = message.guild.channels.cache.find(channel => channel.name === settings.moderationchannel) || message.guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  const guild = message.guild;
  var caseNum;
  var reason;
  if (message.mentions.members.size < 1) return message.reply('You must mention someone to ban them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  for(var member of members){
    if(compareMemberRoles(message.member, member)){
      //Get case number 
      caseNum = await(caseNumber, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //unban
      guild.unban(member, reason);
      //send invite URL
      const dm = await member.createDM();
      dm.send(process.env.INVITE_URL);
      //Fancy display of ban
      const embed = new MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Ban\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setFooter(`Case ${caseNum}`);
      if (log!=null){
        log.send({embed});
      } else {
        postToDefault(message.guild,{embed});
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban <mention> <reason>'
};
