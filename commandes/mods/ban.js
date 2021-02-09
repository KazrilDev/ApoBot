const fs = require("fs"),
ms = require("ms"), 
cooldown = {},
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };


function bantime(message, user, time, authorcooldown) {
    message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} (${message.author.id}) pour: ❌ Sans raison`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            message.guild.members.unban(user.id)
        }, time);
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function bantimereason(message, user, time, authorcooldown, reason) {
    message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} (${message.author.id}) pour: ${reason}`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            message.guild.members.unban(user.id)
        }, time);
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function ban(message, user, authorcooldown) {
        message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} (${message.author.id}) pour: ❌ Sans raison`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function banreason(message, user, authorcooldown, reason) {
    message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} (${message.author.id}) pour: ${reason}`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

module.exports.run = async (client, message, args) => { 
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
    logsmod = message.guild.channels.cache.find(c => c.id === db.mods.logs);
    var user = message.mentions.members.first()

if (!message.member.roles.cache.some(role => role.id === db.mods.ban)) return;
if(!cooldown[message.author.id]) cooldown[message.author.id] = { limit: 0 }
var authorcooldown = cooldown[message.author.id]
if(authorcooldown.limit > 2) return message.channel.send(`\`${getNow().time}\` :x: Vous avez atteint votre limite de bannisement, veuillez retenter plus tard!`);

if(user) {
    if(user.roles.highest.position > message.member.roles.highest.position) return message.channel.send(`:x: ${message.author}, Vous ne pouvez pas bannir quelqu'un au dessus de vous.`)
    if(args[1]) {
        var time = ms(args[1])
        if(time) {
        var reason = args.slice(2).join(" ")
        if(reason) { 
        message.channel.send(`\`${getNow().time}\` :hammer: ${message.author}, vous avez bannis **${user.user.tag}** pendant **${args[1]}** car: \`${reason}\``);
        bantimereason(message, user, time, authorcooldown, reason)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) pendant \`${args[1]}\` car: \`\`\`${reason}\`\`\` `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        } else {
        message.channel.send(`\`${getNow().time}\` :hammer: ${message.author}, vous avez bannis **${message.mentions.members.first().user.tag}** pendant **${args[1]}**`);
        bantime(message, user, time, authorcooldown)
       if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) pendant \`${args[1]}\``, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        }
        
        // -- 
        } else {
        
        var reason = args.slice(1).join(" ")
        if(reason) { 
        message.channel.send(`\`${getNow().time}\` :hammer:  ${message.author}, vous avez bannis **${user.user.tag}** pour une durée indéfinie car: \`${reason}\`.`);
        banreason(message, user, authorcooldown, reason)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) car: \`\`\`${reason}\`\`\` `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        } else {
        message.channel.send(`\`${getNow().time}\` :hammer:  ${message.author}, vous avez bannis **${user.user.tag}** pour une durée indéfinie.`);
        ban(message, user, authorcooldown)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        }
        }
        } else {
        message.channel.send(`\`${getNow().time}\` :hammer:  ${message.author}, vous avez bannis **${user.user.tag}** pour une durée indéfinie.`);
        ban(message, user, authorcooldown)
        if(logsmod)  logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.user.username}**#${user.user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
        }
    } else {
        user = await client.users.fetch(args[0])
        if(user) {
            if(args[1]) {
                var time = ms(args[1])
                if(time) {
                var reason = args.slice(2).join(" ")
                if(reason) { 
                message.channel.send(`\`${getNow().time}\` :hammer: ${message.author}, vous avez bannis **${user.username}#${user.discriminator}** pendant **${args[1]}** car: \`${reason}\``);
                bantimereason(message, user, time, authorcooldown, reason)
                if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.username}**#${user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) pendant \`${args[1]}\` car: \`\`\`${reason}\`\`\` `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
                } else {
                message.channel.send(`\`${getNow().time}\` :hammer: ${message.author}, vous avez bannis **${user.username}#${user.discriminator}** pendant **${args[1]}**`);
                bantime(message, user, time, authorcooldown)
               if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.username}**#${user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) pendant \`${args[1]}\``, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
                }
                
                // -- 
                } else {
                
                var reason = args.slice(1).join(" ")
                if(reason) { 
                message.channel.send(`\`${getNow().time}\` :hammer:  ${message.author}, vous avez bannis **${user.username}#${user.discriminator}** pour une durée indéfinie car: \`${reason}\`.`);
                banreason(message, user, authorcooldown, reason)
                if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.username}**#${user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) car: \`\`\`${reason}\`\`\` `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
                } else {
                message.channel.send(`\`${getNow().time}\` :hammer:  ${message.author}, vous avez bannis **${user.username}#${user.discriminator}** pour une durée indéfinie.`);
                ban(message, user, authorcooldown)
                if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.username}**#${user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
                }
                }
                } else {
                message.channel.send(`\`${getNow().time}\` :hammer:  ${message.author}, vous avez bannis **${user.tag}** pour une durée indéfinie.`);
                ban(message, user, authorcooldown)
                if(logsmod)  logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} a bannis **${user.username}**#${user.discriminator} dans le salon [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "🔨 Bannissement d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
                }
        } else { 
           message.channel.send(`:x: ${message.author}, utilisateur introuvable, essayez l'identifiant.`)
        }
    }
};


module.exports.help = {
name: "ban",
aliases: ['b'],
category: 'moderation',
description: "Bannir une personne",
 };
