exports.run = async(client, message, args) => {
  //Set variables
  const user = args[0];
  const role = args[1];
  const guild = message.guild;
  //Toggle role
  if (guild.member(user).roles.has(role)) {
    guild.member(user).removeRole(role).catch(console.error);
  } else {
    //Removes roll
    guild.member(user).removeRole(role).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'togglerole',
  description: 'toggles a given role on a user',
  usage: 'togglerole <user> <role>'
};