exports.run = async (client, message, args) => {
    let userid = message.author.id;
    let key = args[0];
    let value;
    let metadb = client.DBHelper.metaCollectionManager;
    //Concats args 
    if (args.length >= 2){
        value = args.slice(1).join(" ");
    } else {
        value = null;
    }
    //Checks input gives appropriate response
    if (key != null && value != null){
        //Both values have been passed, sets value
        await metadb.updateObject(userid,{key:value});
        message.reply("Value stored with key: " + key);
    } else if (key != null){
        //Only key passed, returns value
        let user = await metadb.getObject(userid,key);
        let value = user[key];
        if (value != null){
            message.reply(key + ": " + value);
        } else {
            message.reply("No value stored for this key");
        }
    } else {
        //If neither of above print meta object
        string = ``;
        let user = await metadb.getObject(userid);
        for (key in user){
            string += `\n${key}:${user[key]}`;
        }
        message.reply(`:Meta Data:${string}`,{code:'asciidoc'});
    }
};
  
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'meta',
description: 'Lets a user store data, can be used to store traits for an RPG for example',
usage: 'meta <key> <value>(optional)'
};