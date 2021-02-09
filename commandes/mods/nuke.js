const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };


module.exports.run = async (client, message, args) => {
	    if(!message.member.hasPermission("ADMINISTRATOR")) return;
        const position = message.channel.position;
        const rateLimitPerUser = message.channel.rateLimitPerUser;
        var newChannel = await message.channel.clone()
        message.channel.delete();
        newChannel.setPosition(position);
        newChannel.setRateLimitPerUser(rateLimitPerUser)
		newChannel.send(`💥 La purge réclamé par <@${message.author.id}> a été effectué.`)
  };
    
module.exports.help = {
    name: "nuke",
    aliases: ['renew','boom'],
    category: 'Gestion de serveur',
    description: "- Duplique le salon et supprime l'ancien",
  };