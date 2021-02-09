const fs = require("fs"),
ms = require("ms"), 
cooldown = {},
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function mutetime(user, time, authorcooldown, muterole) {
    user.roles.add(muterole.id).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            user.roles.remove(muterole.id)
        }, time);
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function mute(user, authorcooldown, muterole) {
    user.roles.add(muterole.id).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

module.exports.run = async (client, message, args) => { 
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
    logsmod = message.guild.channels.cache.find(c => c.id === db.mods.logs),
    muterole = message.guild.roles.cache.find(role => role.id === db.mods.muted);
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send(`:x: ${message.author}, utilisateur introuvable, essayez l'identifiant ou la mention.`)
    if(!muterole) return message.channel.send(`\`${getNow().time}\` :x: Le rôle \`muted\` n'existe plus, veuillez le récrée.`)

    if(!cooldown[cooldown]) cooldown[message.author.id] = { limit: 0 }
    var authorcooldown = cooldown[message.author.id]

    if(authorcooldown.limit >= 5) return message.channel.send(`\`${getNow().time}\` :x: Vous avez atteint votre limite de mute, veuillez retenter plus tard!`);

    if(args[1]) {
    var time = ms(args[1])
    if(time) {
        var reason = args.slice(2).join(" ")
        if(reason) { 
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez mute **${user.user.tag}** pendant **${args[1]}** car: \`${reason}\``);
        mutetime(user, time, authorcooldown, muterole)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a retiré la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) pendant \`${args[1]}\` car: \`\`\`${reason}\`\`\` `, color: 3553599, author: { name: "🤫 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        } else {
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez mute **${user.user.tag}** pendant **${args[1]}**`);
        mutetime(user, time, authorcooldown, muterole)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a retiré la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) pendant \`${args[1]}\``, color: 3553599, author: { name: "🤫 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        }
        
        // -- 
        } else {
        
        var reason = args.slice(1).join(" ")
        if(reason) { 
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez mute **${user.user.tag}** pour une durée indéfinie car: \`${reason}\`.`);
        mute(user, authorcooldown, muterole)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a retiré la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) car: \`\`\`${reason}\`\`\` `, color: 3553599, author: { name: "🤫 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        } else {
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez mute **${user.user.tag}** pour une durée indéfinie.`);
        mute(user, authorcooldown, muterole)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a retiré la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "🤫 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        }
        }
        } else {
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, vous avez mute **${user.user.tag}** pour une durée indéfinie.`);
        mute(user, authorcooldown, muterole)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a retiré la permissions de parler dans les salons textuels à **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "🤫 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        }
}
module.exports.help = {
name: "mute",
aliases: ['m'],
category: 'moderation',
description: "Mute une personne",
 };
