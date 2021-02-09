const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };


module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   config = require("../../config.json");

    if(!args.lenght > 0) {
message.channel.messages.fetch(db.giveaway.last).then(m => {
    if(!m) return message.channel.send(`\`${getNow().time}\` :x: Le dernier giveaway n'a pas été trouvé, essayez \`&greroll <message id>\``);
    winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
    message.channel.send(`:tada: Le nouveau gagnant est ${winner}! Félicitations!`)
})
    } else {
message.channel.messages.fetch(args[0]).then(m => {
    if(!m) return message.channel.send(`\`${getNow().time}\` :x: Le dernier giveaway n'a pas été trouvé, essayez \`&greroll <message id>\``);
    winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
    message.channel.send(`:tada: Le nouveau gagnant est ${winner}! Félicitations!`)
})
    }
    };

module.exports.help = {
    name: "reroll",
    aliases: ['greroll','giveawayreroll'],
    category: 'Gestion de serveur',
    description: "- Re-sélectionne un gagnant du dernier giveaway.",
  };