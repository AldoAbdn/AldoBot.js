exports.run = (client, message, args) => {   
    //Set variables
    var volume = message.guild.volume;
    const dispatcher = message.guild.dispatcher;
    let newVolume = parseInt(args[0]);
    //If no volume set, set it
    if (volume == null){
        volume = 1;
        console.log('here');
    }
    //If no args passed, return current volume
    if (args.length == 0) {
        message.reply("Volume is:" + (volume * 100));
    }
    else if (!Number.isInteger(newVolume) || newVolume < 0){
        //Not valid, return error
        message.reply("Volume must be an integer between 0 and 100 inclusive");
        return;
    } else if (dispatcher) {
        //Set volume
        volume = newVolume/100;
        dispatcher.setVolume(volume);
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    category: "Music",
    permLevel: 0
};

exports.help = {
    name: 'volume',
    description: 'Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume',
    usage: 'volume <volume (optional)>'
};