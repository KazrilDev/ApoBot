const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   config = require("../../config.json"),
   winner = null,
   presence = {
   "false": "Désactivé",
   "true": "Activé"
   },
   filter = (reaction, user) => ['🕙', '🏷️','🕵️','🔊','🎁','✅'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`🎉 Lancement d'un giveaway sur ${message.guild.name}`)
   .setColor(db.color)
   .setDescription(`\`🕙\` Modifier la durée \n \`🏷️\` Modifier le salon \n \`🕵️\` Définir un gagnant imposé \n \`🔊\` Modifier l'obligation d'être en vocal \n \`🎁\` Modifier le gain \n \`✅\` Lancer le giveaway \n \n > [Configuration actuel:](http://Kazril.bot)`)
   .addField(`\`🕙\`  Durée`, ms(db.giveaway.duree), true)
   .addField(`\`🏷️\`  Salon`, `<#${db.giveaway.channel}>`, true)
   .addField(`\`🕵️\` Gagnant imposé`, `${db.giveaway.gagnant}`, true)
   .addField(`\`🔊\` Présence en vocal`, `${presence[db.giveaway.voice]}`, true)
   .addField(`\`🎁\` Gain`, `${db.giveaway.gain}`, true)
    message.channel.send(msgembed)
    .then(async m => {
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
    if (r.emoji.name === '🕙') {
        message.channel.send(`\`${getNow().time}\` 🕙 Veuillez entrée une valeur pour le temps.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var msg = cld.first();
            if(!msg.content.endsWith("d") && !msg.content.endsWith("h") && !msg.content.endsWith("m")) return message.channel.send(`\`${getNow().time}\` 🕙 Temps incorrect.`)
            db.giveaway.duree = ms(msg.content)
            message.channel.send(`\`${getNow().time}\` 🕙 Vous avez changé le temps du prochain giveaway à **${ms(db.giveaway.duree)}**`)
            m.edit({ embed: { author: { name: `🎉 Lancement d'un giveaway sur ${message.guild.name}`}, color: db.color, description: `\`🕙\` Modifier la durée \n \`🏷️\` Modifier le salon \n \`🕵️\` Définir un gagnant imposé \n \`🔊\` Modifier l'obligation d'être en vocal \n \`🎁\` Modifier le gain \n \`✅\` Lancer le giveaway \n \n > [Configuration actuel:](http://Kazril.bot)`, fields: [ {name: `\`🕙\`  Durée`, value: ms(db.giveaway.duree), inline: true }, { name: `\`🏷️\`  Salon`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`🕵️\` Gagnant imposé`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`🔊\` Présence en vocal`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
            update(message, db)
        });
        })
    // --
    } else if(r.emoji.name === '🏷️') {
        message.channel.send(`\`${getNow().time}\` 🏷️ Veuillez entrée l'ID du salon.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(`\`${getNow().time}\` 🏷️ Salon incorrect.`)
        db.giveaway.channel = channel.id
        message.channel.send(`\`${getNow().time}\` 🏷️ Vous avez changé le salon du prochain giveaway à \`${channel.name}\``)
        m.edit({ embed: { author: { name: `🎉 Lancement d'un giveaway sur ${message.guild.name}`}, color: db.color, description: `\`🕙\` Modifier la durée \n \`🏷️\` Modifier le salon \n \`🕵️\` Définir un gagnant imposé \n \`🔊\` Modifier l'obligation d'être en vocal \n \`🎁\` Modifier le gain \n \`✅\` Lancer le giveaway \n \n > [Configuration actuel:](http://Kazril.bot)`, fields: [ {name: `\`🕙\`  Durée`, value: ms(db.giveaway.duree), inline: true }, { name: `\`🏷️\`  Salon`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`🕵️\` Gagnant imposé`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`🔊\` Présence en vocal`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
        update(message, db)
        });
        });
    } else if(r.emoji.name === '🕵️') {
        message.channel.send(`\`${getNow().time}\` 🕵️ Veuillez entrée l'id de l'utilisateur. (ou écrivez \`false\` pour le désactiver)`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
                var msg = cld.first();
                if(msg.content === "false") {
                    db.giveaway.gagnant = false
                    message.channel.send(`\`${getNow().time}\` 🕵️ Vous avez désactivé les gagnant prédéfinis`)
                    m.edit({ embed: { author: { name: `🎉 Lancement d'un giveaway sur ${message.guild.name}`}, color: db.color, description: `\`🕙\` Modifier la durée \n \`🏷️\` Modifier le salon \n \`🕵️\` Définir un gagnant imposé \n \`🔊\` Modifier l'obligation d'être en vocal \n \`🎁\` Modifier le gain \n \`✅\` Lancer le giveaway \n \n > [Configuration actuel:](http://Kazril.bot)`, fields: [ {name: `\`🕙\`  Durée`, value: ms(db.giveaway.duree), inline: true }, { name: `\`🏷️\`  Salon`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`🕵️\` Gagnant imposé`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`🔊\` Présence en vocal`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
                    update(message, db)
                } else {
                var users = message.guild.members.cache.get(msg.content)
                if(!users)  return  message.channel.send(`\`${getNow().time}\` 🕵️ Utilisateur incorrect.`)
                db.giveaway.gagnant = users.id
                message.channel.send(`\`${getNow().time}\` 🕵️ Vous avez changé le gagnant prédéfinis a \`${users.user.username}\``)
                m.edit({ embed: { author: { name: `🎉 Lancement d'un giveaway sur ${message.guild.name}`}, color: db.color, description: `\`🕙\` Modifier la durée \n \`🏷️\` Modifier le salon \n \`🕵️\` Définir un gagnant imposé \n \`🔊\` Modifier l'obligation d'être en vocal \n \`🎁\` Modifier le gain \n \`✅\` Lancer le giveaway \n \n > [Configuration actuel:](http://Kazril.bot)`, fields: [ {name: `\`🕙\`  Durée`, value: ms(db.giveaway.duree), inline: true }, { name: `\`🏷️\`  Salon`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`🕵️\` Gagnant imposé`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`🔊\` Présence en vocal`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
                update(message, db)
                }
            });
        });
    } else if(r.emoji.name === '🔊') {
        message.channel.send(`\`${getNow().time}\` :x: **Options desactivé temporairement.**`)
    } else if(r.emoji.name === '🎁') {
        message.channel.send(`\`${getNow().time}\` 🎁 Veuillez écrire ce que vous souhaitez faire gagner.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var msg = cld.first();
            db.giveaway.gain = msg.content
            message.channel.send(`\`${getNow().time}\` 🎁 Désormais lors des prochains giveaway le lot a gagner seras \`${db.giveaway.gain}\`.`)
            m.edit({ embed: { author: { name: `🎉 Lancement d'un giveaway sur ${message.guild.name}`}, color: db.color, description: `\`🕙\` Modifier la durée \n \`🏷️\` Modifier le salon \n \`🕵️\` Définir un gagnant imposé \n \`🔊\` Modifier l'obligation d'être en vocal \n \`🎁\` Modifier le gain \n \`✅\` Lancer le giveaway \n \n > [Configuration actuel:](http://Kazril.bot)`, fields: [ {name: `\`🕙\`  Durée`, value: ms(db.giveaway.duree), inline: true }, { name: `\`🏷️\`  Salon`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`🕵️\` Gagnant imposé`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`🔊\` Présence en vocal`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`🎁\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
            update(message, db)
            });
        });
    } else if(r.emoji.name === '✅') {
        var channel = message.guild.channels.cache.get(db.giveaway.channel)
        if(!channel) return message.channel.send(`\`${getNow().time}\` :x: **Erreur rencontrée**: veuillez rédefinir le salon du giveaway.`)
        message.channel.send(`\`${getNow().time}\` ✅ Giveaway lancé dans ${channel}.`)
    
       var timestamp = Date.now() + db.giveaway.duree
        var embed = new MessageEmbed()
        .setTitle(db.giveaway.gain)
        .setDescription(`Réagissez avec :tada: pour participer!
        Temps du giveaway: **${ms(db.giveaway.duree)}**
        Crée par: ${message.author}`)
        .setColor(3553599)
        .setFooter(`Fin du giveaway à`)
        .setTimestamp(timestamp)
        var msg = await channel.send(embed)
        msg.react("🎉")
    
        setTimeout(() => {
            db.giveaway.last = msg.id
            update(message, db)
        if (msg.reactions.cache.get("🎉").count <= 1) {
            message.channel(`\`${getNow().time}\` :x: **Erreur rencontrée**: aucun gagnant`)
        }
        if(db.giveaway.gagnant !== false) {
            winner = message.guild.members.cache.get(db.giveaway.gagnant)
            if(!winner) return winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
        } else if(db.giveaway.voice === true) {
            winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.voice).random()
        } else {
            winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
        }
        var embed = new MessageEmbed()
        .setTitle(db.giveaway.gain)
        .setDescription(`
        Gagnant: ${winner}
        Crée par: ${message.author}`)
        .setColor(3553599)
        .setFooter(`Giveaway finis à`)
        .setTimestamp(Date.now())
        msg.edit(embed)
        channel.send(`Félicitations, <@${winner.id}> vous avez remporté **${db.giveaway.gain}**`)
        }, db.giveaway.duree);
    }

});
    await m.react("🕙")
    await m.react("🏷️")
    await m.react("🕵️")
    await m.react("🔊")
    await m.react("🎁")
    await m.react("✅")
})

};


module.exports.help = {
    name: "giveaway",
    aliases: ['gstart','giveawaystart'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des giveaways.",
  };