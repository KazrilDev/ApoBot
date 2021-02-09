var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
    logsmod = message.guild.channels.cache.find(c => c.id === db.mods.logs);
    var user = message.mentions.members.first()

if (!message.member.roles.cache.some(role => role.id === db.mods.ban)) return;

if(message.mentions.users.first()) { 
var user = message.mentions.members.first();

if (user.roles.cache.some(role => role.id === db.mods.muted)) {
message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez demute **${user.user.tag}**.`);
if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a redonner la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "✍️ Demute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
user.roles.remove(db.mods.muted)
} else {
message.channel.send(`:x: ${message.author}, l'utilisateur n'est pas mute.`)
}
} else if(args[0]) {
var user = message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(`:x: ${message.author}, utilisateur introuvable, essayez l'identifiant ou la mention.`)
if (user.roles.cache.some(role => role.id === db.mods.muted)) {
    message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez demute **${user.user.tag}**.`);
    if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a redonner la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "✍️ Demute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    user.roles.remove(db.mods.muted)
    } else {
    message.channel.send(`:x: ${message.author}, l'utilisateur n'est pas mute.`)
    }
}

    };
    module.exports.help = {
        name: "unmute",
        aliases: ['unmute'],
        category: 'moderation',
        description: "Demute une personne",
      };
