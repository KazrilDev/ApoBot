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
   filter = (reaction, user) => ['✨', '📥','🔊','👤','💭'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`📚 Modification des paramètres à propos des logs de ${message.guild.name}`)
   .setColor(db.color)
   .setDescription("`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs des entrée du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)")
   .addField("`📥` Logs des entrée", db.logs.serveur, true)
   .addField("`🔊` Logs vocaux", db.logs.vocal, true)
   .addField("`👤` Logs des rôles", db.logs.role, true)
   .addField("`💭` Logs messages", db.logs.message, true)
    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
if(r.emoji.name === "✨") { 
message.channel.send(`\`${getNow().time}\` ✨ Création de la catégorie des logs en cours..`).then(msg => {
        m.guild.channels.create('📁➜ Logs ➜', {
            type: 'category',
            permissionsOverwrites: [{
              id: message.guild.id,
              deny: ['VIEW_CHANNEL']
            }]
        }).then(c => {
            c.guild.channels.create('📁・join-leave', {
                type: 'text',
                parent: c.id,
                permissionOverwrites: [
                   {
                     id: message.guild.id,
                     deny: ['VIEW_CHANNEL']
                  },
                ],
              }).then(joinleave => {
            db.logs.serveur = joinleave.id
            c.guild.channels.create('📁・logs-vocal', {
                type: 'text',
                parent: c.id,
                permissionOverwrites: [
                   {
                     id: message.guild.id,
                     deny: ['VIEW_CHANNEL']
                  },
                ],
              }).then(vocaux => {
            db.logs.vocal = vocaux.id
            c.guild.channels.create('📁・logs-roles', {
                type: 'text',
                parent: c.id,
                permissionOverwrites: [
                   {
                     id: message.guild.id,
                     deny: ['VIEW_CHANNEL']
                  },
                ],
              }).then(role => {
            db.logs.role = role.id
            c.guild.channels.create('📁・logs-message', {
                type: 'text',
                parent: c.id,
                permissionOverwrites: [
                   {
                     id: message.guild.id,
                     deny: ['VIEW_CHANNEL']
                  },
                ],
              }).then(message => {
                db.logs.message = message.id
                update(message, db)
                m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });         
                msg.edit(`\`${getNow().time}\` ✨ Création de la catégorie des logs effectué avec succès.`)
                  });
                });
            });
            });
        })
        // --
        });
} else if(r.emoji.name === "📥") {
    message.channel.send(`\`${getNow().time}\` 📥 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content === "false") {
          db.logs.serveur = false
          message.channel.send(`\`${getNow().time}\` 📥 Vous avez désactivé les logs d'entrée`)
          update(message, db)
          m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });           
        } else {  
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(`\`${getNow().time}\` 📥 Salon incorrect`)
        db.logs.serveur = channel.id
        message.channel.send(`\`${getNow().time}\` 📥 Vous avez changé le salon des logs des entrée à \`${channel.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });         
        }
      });
        });
} else if(r.emoji.name === "🔊") {
    message.channel.send(`\`${getNow().time}\` 🔊 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();

        if(msg.content === "false") {
          db.logs.vocal = false
          message.channel.send(`\`${getNow().time}\` 🔊 Vous avez désactivé les logs des entrée`)
          update(message, db)
          m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });           
        } else {  
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(`\`${getNow().time}\` 🔊 Salon incorrect.`)
        db.logs.vocal = channel.id
        message.channel.send(`\`${getNow().time}\` 🔊 Vous avez changé le salon des logs vocaux à \`${channel.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });         
        }
      });
        });
} else if(r.emoji.name === "👤") {
    message.channel.send(`\`${getNow().time}\` 👤 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        
        if(msg.content === "false") {
          db.logs.role = false
          message.channel.send(`\`${getNow().time}\` 👤 Vous avez désactivé les logs des rôles`)
          update(message, db)
          m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });           
        } else { 
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(`\`${getNow().time}\` 👤 Salon incorrect.`)
        db.logs.role = channel.id
        message.channel.send(`\`${getNow().time}\` 👤 Vous avez changé le salon des logs des rôles à \`${channel.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });         
        }
      });
        });
} else if(r.emoji.name === "💭") {
    message.channel.send(`\`${getNow().time}\` 💭 Veuillez entrée l'ID du salon ou écrivez \`false\` pour désactiver les logs.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        if(msg.content === "false") {
          db.logs.message = false
          message.channel.send(`\`${getNow().time}\` 💭 Vous avez désactivé les logs des messages`)
          update(message, db)
          m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });           
        } else { 
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(`\`${getNow().time}\` 💭 Salon incorrect.`)
        db.logs.message = channel.id
        message.channel.send(`\`${getNow().time}\` 💭 Vous avez changé le salon des logs des messages à \`${channel.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `📚 Modification des paramètres à propos des logs de ${message.guild.name}`}, color: db.color, description: "`✨`  Crée une configuration pour moi\n`📥` Définir le salon des logs de l'activité du serveur \n`🔊` Définir le salon des logs des mouvements vocaux\n`👤`  Définir le salon des logs à propos de rôle \n`💭` Définir le salon des logs des messages\n\n>  [Configuration actuelle](http://Prada.bot)" , fields: [ {name: "`📥` Logs des entrée", value: db.logs.serveur, inline: true }, { name: "`🔊` Logs vocaux", value: db.logs.vocal, inline: true},{ name: "`👤` Logs des rôles", value: db.logs.role, inline: true}, { name: "`💭` Logs messages", value: db.logs.message, inline: true}   ] } });         
        }
      });
        });
}
});
await m.react("✨")
await m.react("📥")
await m.react("🔊")
await m.react("👤")
await m.react("💭")
    });
};


module.exports.help = {
    name: "logs",
    aliases: ['lpanel','logspanel'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des logs.",
  };