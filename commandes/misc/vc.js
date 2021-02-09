module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send(`Membre en vocal: **${message.guild.members.cache.filter(m => m.voice.channel).size}** (**${message.guild.memberCount} membres**)`)
};


module.exports.help = {
    name: "vc",
    aliases: ['vc','vocalmembers'],
    category: 'utilitaires',
    description: "Compteur des membres en vocal en direct.",
  };