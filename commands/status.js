const {updateEmbedField} = require('../util/embed.js');
exports.run = async (client, message, args, perms, settings) => {
  //Set variables
  const channels = message.guild.channels.cache;
  const log = channels.find(channel=>channel.name ===  settings.supportchannel) || channels.cache.find(channel => channel.name === settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  if(caseNumbers == null)
    return message.reply('You must specify at least one case number');
  const newReason = args.slice(1).join(" ") || '';
  const query = "**Status:**";
  var supportticket;
  var logs;
  for (var caseNumber of caseNumbers){
    supportticket = channels.find(channel => channel.name === "support-ticket-"+caseNumber);
    if(supportticket == null)
      return message.reply('Invalid case number: ' + caseNumber + ' the number could be too large or small');
    logs = [log,supportticket];
    updateEmbedField(logs,client.user.id,caseNumber,query,newReason);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Customer Support",
  permLevel: 3
};

exports.help = {
  name: 'status',
  description: 'Updates a support tickets status',
  usage: 'status <case> <update>'
};