var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
    if(!message.guild) return;
    var config = require("./../../config.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    if(message.author.id !== config.bot.owner) return;

    if(message.attachments.size > 0) { 
    message.attachments.forEach(attachment => {
        client.user.setAvatar(attachment.url)
        .then(u => message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez changé la photo de profil de votre bot.`))
        .catch(e => { return message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
    });
    } else if (args.length) {
        let str_content = args.join(" ")
        client.user.setAvatar(str_content)
        .then(u => message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez changé la photo de profil de votre bot.`))
        .catch(e => { return message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
    } else {
        message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Vous avez fournie aucune valeur, veuillez mettre sois une image sois un lien`);
    }
};


module.exports.help = {
    name: "setavatar",
    aliases: ['botavatar'],
    category: 'Administration',
    description: "Permet de changer la photo de profil du bot",
  };