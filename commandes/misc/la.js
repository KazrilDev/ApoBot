module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
    var str_map = str_filtrer.map(m => `${m.user.id}: ${m.user.username},`).join("\n")
    message.channel.send(`Liste des membres ayant les permissions \`ADMINISTRATEUR\` (**${str_filtrer.size}**)`)
    for(let i = 0; i < str_map.length; i += 1995) {
        const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
        message.channel.send(`\`\`\`json\n${str_content}\`\`\``);
    }
    };
        
        
        module.exports.help = {
            name: "la",
            aliases: ['listeadmin','ladmin'],
            category: 'utilitaires',
            description: "Liste des administrateur",
          };