const {updateEmbedField} = require('../util/updateEmbedField.js');
const settings = require('../settings.json');
const {embedSan} = require('../util/embedSan.js');
exports.run = async (client, message, args) => {
  //Set variables
  const log = message.guild.channels.find('name', settings.moderationchannel) || message.guild.channels.find('name', settings.defaultchannel);
  const caseNumbers = args[0].split(",");
  const newReason = args.slice[1].join(" ");
  const query = "**Reason:**";
  for (var caseNumber of caseNumbers){
    updateEmbedField([log],client.user.id,caseNumber,query,newReason);
  }
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'reason',
  description: 'Updates an unset moderator action.',
  usage: 'reason <case number> <new reason>'
};
