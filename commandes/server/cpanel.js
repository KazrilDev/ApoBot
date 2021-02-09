const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
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
   filter = (reaction, user) => ['✨','👤','👥', '⭐','🌟','🔉','🔊'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`)
   .setColor(db.color)
   .setDescription("`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)")
   .addField("`👤` Compteur total de membre:", db.membercounter.total, true)
   .addField("`⭐` Compteur des membres en ligne:", db.membercounter.online, true)
   .addField("`🔉` Compteur des membres en ligne:", db.membercounter.vocal, true)
   .addField("`👥` Format du compteur total de membre:", db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), true)
   .addField("`🌟` Format du compteur des membres en ligne:", db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), true)
   .addField("`🔊` Format du compteur des membres en ligne:", db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), true)
    message.channel.send(msgembed)

.then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
if(r.emoji.name === "✨") { 
        message.channel.send(`\`${getNow().time}\` ✨ Création de la catégorie des logs en cours..`).then(msg => {
                m.guild.channels.create('📊 - Espace Statistiques', {
                    type: 'category',
                    permissionsOverwrites: [{
                      id: message.guild.id,
                      deny: ['CONNECT'],
                      allow: ['VIEW_CHANNEL']
                    }]
                }).then(c => {
                    c.setPosition(0)
                    c.guild.channels.create(`👥 Membres: ${message.guild.memberCount}`, {
                        type: 'voice',
                        parent: c.id,
                        permissionOverwrites: [
                           {
                             id: message.guild.id,
                             deny: ['CONNECT'],
                             allow: ['VIEW_CHANNEL']
                          },
                        ],
                      }).then(total => {
                    db.membercounter.totalformat = `👥 Membres: <count>`
                    db.membercounter.total = total.id
                    c.guild.channels.create(`✅ En ligne: ${message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size}`, {
                        type: 'voice',
                        parent: c.id,
                        permissionOverwrites: [
                           {
                             id: message.guild.id,
                             deny: ['CONNECT'],
                             allow: ['VIEW_CHANNEL']
                          },
                        ],
                      }).then(online => {
                    db.membercounter.onlineformat = `✅ En ligne: <count>`
                    db.membercounter.online = online.id
                    c.guild.channels.create(`🎧 En vocal: ${message.guild.members.cache.filter(m => m.voice.channel).size}`, {
                        type: 'voice',
                        parent: c.id,
                        permissionOverwrites: [
                           {
                             id: message.guild.id,
                             deny: ['CONNECT'],
                             allow: ['VIEW_CHANNEL']
                          },
                        ],
                      }).then(vocal => {
                        db.membercounter.vocalformat =  `🎧 En vocal: <count>`
                        db.membercounter.vocal = vocal.id
                        update(message, db)
                        m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
                        msg.edit(`\`${getNow().time}\` ✨ Création de la catégorie du compteur de membre effectué avec succès.`)
                          });
                        });
                    });
                    });
                })
} else if(r.emoji.name === "👤") {
    message.channel.send(`\`${getNow().time}\` 👤 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content === "false") {
          db.membercounter.total = false
          db.membercounter.guild = message.guild.id
          message.channel.send(`\`${getNow().time}\` 👤 Vous avez désactivé le compteur.`)
          update(message, db)
          m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true} ]} });                
         } else { 
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return message.channel.send(`\`${getNow().time}\` 👤 Salon incorrect.`)
        db.membercounter.total = channel.id
        console.log(db.membercounter.total )
        db.membercounter.guild = message.guild.id
        message.channel.send(`\`${getNow().time}\` 👤 Vous avez changé le salon des compteurs de membre à \`${channel.name}\``)
        update(message, db)
        channel.setName(db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount)).catch(console.error)
        m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
        }
      });
        });
} else if(r.emoji.name === "👥") {
    message.channel.send(`\`${getNow().time}\` 👥 Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de membre`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content.includes('<count>')) {
            db.membercounter.totalformat = msg.content
            db.membercounter.guild = message.guild.id
            message.channel.send(`\`${getNow().time}\` 👥 Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.memberCount)}\``)
            update(message, db)
            console.log(db.membercounter.total)
            var channel = client.channels.cache.get(db.membercounter.total)
            if(!channel) return;
            channel.setName(db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount)).catch(console.error).then(console.log)
            m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
        } else {
        message.channel.send(`\`${getNow().time}\` 👥 Format incorrect, ajoutez \`<count>\` dans le format.`)
        }
        });
    });
} else if(r.emoji.name === "⭐") {
    message.channel.send(`\`${getNow().time}\` ⭐ Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content === "false") {
          db.membercounter.online = false
          db.membercounter.guild = message.guild.id
          message.channel.send(`\`${getNow().time}\` ⭐ Vous avez désactivé le compteur`)
          update(message, db)
          m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true} ]} });                
         } else { 
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return message.channel.send(`\`${getNow().time}\` ⭐ Salon incorrect.`)
        db.membercounter.online = channel.id
        db.membercounter.guild = message.guild.id
        message.channel.send(`\`${getNow().time}\` ⭐ Vous avez changé le salon du compteur de membres en ligne à \`${channel.name}\``)
        update(message, db)
        channel.setName(db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
        m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
        }
      });
        });
} else if(r.emoji.name === "🌟") {
    message.channel.send(`\`${getNow().time}\` 🌟 Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de membre`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content.includes('<count>')) {
            db.membercounter.onlineformat = msg.content
            db.membercounter.guild = message.guild.id
            message.channel.send(`\`${getNow().time}\` 🌟 Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.memberCount)}\``)
            update(message, db)
            var channel = client.channels.cache.get(db.membercounter.online)
            if(!channel)
            channel.setName(db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size)).catch(console.error)
            m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
        } else {
        message.channel.send(`\`${getNow().time}\` 🌟 Format incorrect, ajoutez \`<count>\` dans le format.`)
        }
        });
    });
} else if(r.emoji.name === "🔉") {
    message.channel.send(`\`${getNow().time}\` 🔉 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver le compteur.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content === "false") {
          db.membercounter.vocal = false
          db.membercounter.guild = message.guild.id
          message.channel.send(`\`${getNow().time}\` 🔉 Vous avez désactivé le compteur`)
          update(message, db)
          m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true} ]} });                
         } else { 
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return message.channel.send(`\`${getNow().time}\` 🔉 Salon incorrect.`)
        db.membercounter.vocal = channel.id
        db.membercounter.guild = message.guild.id
        message.channel.send(`\`${getNow().time}\` 🔉 Vous avez changé le salon du compteur de membres en vocal à \`${channel.name}\``)
        update(message, db)
        channel.setName(db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)

        m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
        }
      });
        });
} else if(r.emoji.name === "🔊") {
    message.channel.send(`\`${getNow().time}\` 🔊 Veuillez écrire le format que vous souhaitez, ajoutez \`<count>\` pour ajouter le nombre de membre`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content.includes('<count>')) {
            db.membercounter.vocalformat = msg.content
            db.membercounter.guild = message.guild.id
            message.channel.send(`\`${getNow().time}\` 🔊 Vous avez changé le format du compteur de membres en \`${msg.content.replace(`<count>`, message.guild.memberCount)}\``)
            update(message, db)
            var channel = client.channels.cache.get(db.membercounter.vocal)
            if(!channel)
            channel.setName(db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size)).catch(console.error)
            m.edit({ embed: { author: { name: `📊 Modification des paramètres à propos des compteurs de membre de ${message.guild.name}`}, color: db.color, description:  "`✨` Crée une configuration pour moi\n`👤` Configurer le salon du compteur total de membre\n`👥` Changer le format du compteur total de membre\n`⭐` Configurer le salon du compteur des membres en ligne\n`🌟` Changer le format du compteur des membres en ligne\n`🔉`  Configurer le salon du compteur des membre en vocal\n`🔊` Changer le format du compteur des membre en vocal\n\n>  [Configuration actuelle](http://Prada.bot)", fields: [ {name: "`👤` Compteur total de membre:", value: db.membercounter.total, inline: true }, { name: "`⭐` Compteur des membres en ligne:`", value: db.membercounter.online, inline: true},{ name: "`🔉` Compteur des membres en ligne:", value: db.membercounter.vocal, inline: true}, { name: "`👥` Format du compteur total de membre:", value: db.membercounter.totalformat.replace(`<count>`, message.guild.memberCount), inline: true}, { name: "`🌟` Format du compteur des membres en ligne:", value: db.membercounter.onlineformat.replace(`<count>`, message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size), inline: true}, { name: "`🔊` Format du compteur des membres en ligne:", value: db.membercounter.vocalformat.replace(`<count>`, message.guild.members.cache.filter(m => m.voice.channel).size), inline: true } ]} });               
        } else {
        message.channel.send(`\`${getNow().time}\` 🔊 Format incorrect, ajoutez \`<count>\` dans le format.`)
        }
        });
    });
} 
});
await m.react("✨")
await m.react("👤")
await m.react("👥")
await m.react("⭐")
await m.react("🌟")
await m.react("🔉")
await m.react("🔊")
    });

};


module.exports.help = {
    name: "membercount",
    aliases: ['mbpanel','cpanel','membercounterpanel'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des compteurs de membre.",
  };