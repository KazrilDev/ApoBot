module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    var str_content = args.join()
    str_role = message.guild.roles.cache.get(str_content)
    if(!str_role) return message.channel.send(`:x: Ce rôle n'existe pas!`)
    var str_map = str_role.members.map(m => `${m.user.id}: ${m.user.username},`).join("\n")
    message.channel.send(`Liste des membres avec le rôle \`${str_role.name}\` (**${str_role.members.size}**)`)
    for(let i = 0; i < str_map.length; i += 1980) {
        const str_content = str_map.substring(i, Math.min(str_map.length, i + 1980));
        message.channel.send(`\`\`\`json\n${str_content}\n\`\`\``)
    }
    };
        module.exports.help = {
            name: "lrm",
            aliases: ['rolemembers','rolem','listerm','listerolemembers'],
            category: 'utilitaires',
            description: "Récupere des informations sur une personne présente sur le discord.",
          };