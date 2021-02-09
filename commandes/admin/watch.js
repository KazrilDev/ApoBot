var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
    if(!message.guild) return;
    var config = require("../../config.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    if(message.author.id !== config.bot.owner) return;

       if (args.length) {
        let str_content = args.join(" ")
client.user.setPresence({ activity: { name: str_content, type: "WATCHING" }, status: 'idle' })
.then(p => message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez définis le statut de votre bot en \`${str_content}\`.`))
.catch(e => { message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });

} else {
        message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Vous avez fournie aucune valeur, veuillez recommencer cette commande en ajoutant ce que vous souhaitez que votre bot ais comme statut`);
    }
};


module.exports.help = {
    name: "watch",
    aliases: [],
    category: 'Administration',
    description: "Permet de changer le statut du Bot",
  };