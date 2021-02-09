const { MessageEmbed } = require("discord.js"), 
fs = require("fs");

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
    var embed = new MessageEmbed()
    .setAuthor(`🔹 Commande administratif`)
    .setColor(db.color)
    .setDescription(`Partie administratif du Bot, dont seul l'acheteur peux modifier / interagir avec les commandes de cette catégorie.
    
> [Liste des commandes](http://Kazril.bot)`)
.addField("`bot`", `[Alias:](http://Kazril.bot) \`botinfo\`,\`abonnement\` \n - Affiche les informations de votre abonnement.`)
.addField("`setavatar`", `[Alias:](http://Kazril.bot) \`botavatar\`\n - Permet de changer la photo de profil du bot`)
.addField("`setname`", `[Alias:](http://Kazril.bot) \`botname\`\n - Permet de changer le pseudonyme du Bot`)
.addField("`prefix`", `[Alias:](http://Kazril.bot) \`setprefix\`\n - Permet de changer le prefixe du bot`)
.addField("`stream`", `[Alias:](http://Kazril.bot) \`play\`,\`watch\`,\`listen\`,\`setstream\`,\`activity\`\n - Permet de changer l'activité du Bot`)
.addField("`color`", `[Alias:](http://Kazril.bot) \`colorembed\`,\`theme\`\n - Permet de définir une couleur au embed du Bot.`)
message.channel.send(embed)
var embed2 = new MessageEmbed()
.setAuthor(`🔹 Gestion de serveur`)
.setColor(db.color)
.setDescription(`Partie Gestion de serveur, les personnes ayant les permissions administrateur sur les serveurs ou est présent le bot pourront utiliser les commandes de cette catégorie.
    
> [Liste des commandes](http://Kazril.bot)`)
.addField("`giveaway`", `[Alias:](http://Prada.bot) \`gstart\`,\`giveawaystart\` \n - Permet d'afficher le panel de configuration des giveaways.`)
.addField("`reroll`", `[Alias:](http://Prada.bot) \`greroll\`,\`giveawayreroll\`\n - Re-sélectionne un gagnant du dernier giveaway.`)
.addField("`statut`", `[Alias:](http://Kazril.bot) \`spanel\`,\`statutpanel\`\n - Permet d'afficher le panel de configuration des Custom Status.`)
.addField("`tempchannel`", `[Alias:](http://Kazril.bot) \`tpanel\`,\`configtempo\`,\`tempo\`\n - Permet d'afficher le panel de configuration des salon temporaires.`)
.addField("`membercount`", `[Alias:](http://Kazril.bot) \`cpanel\`,\`mbpanel\`,\`membercounterpanel\`\n - Permet d'afficher le panel de configuration des salons temporaires.`)
.addField("`logs`", `[Alias:](http://Kazril.bot) \`lpanel\`,\`logspanel\`\n - Permet d'afficher le panel de configuration des logs. (Non terminée)`)
.addField("`autorole`", `[Alias:](http://Kazril.bot) \`apanel\`,\`autorolepanel\`\n - Permet d'afficher le panel de configuration de l'autorole.`)
message.channel.send(embed2)
var embed3 = new MessageEmbed()
.setAuthor(`🔹 Modération de serveur`)
.setColor(db.color)
.setDescription(`Partie Modération de serveur, les personnes ayant les rôles préfinis sur les serveurs ou est présent le bot pourront utiliser les commandes de cette catégorie.
    
> [Liste des commandes](http://Kazril.bot)`)
.addField("`mpanel`", `[Alias:](http://Kazril.bot) \`mods\`,\`modspanel\` \n - Permet d'afficher le panel de configuration des modérateurs.`)
.addField("`mute`", `[Alias:](http://Kazril.bot) \`m\`,\n - Retirer la permissions de parler dans tout les salons textuels.`)
.addField("`unmute`", `[Alias:](http://Kazril.bot) \`um\`\n - Redonne la permissions de parler dans tout les salons textuels.`)
.addField("`ban`", `[Alias:](http://Kazril.bot) \`b\` \n - Bannis la personne.`)
.addField("`unban`", `[Alias:](http://Kazril.bot) \`ub\`\n - Débannir une personne`)
.addField("`nuke`", `[Alias:](http://Kazril.bot) \`purge\`,\`boom\`\n - Permet de supprimer et recrée le salon ou est écris la commande`)
.addField("`voicemove`", `[Alias:](http://Kazril.bot) \`vm\`,\`voicem\`\n - Déplace toutes les personnes du salon vers un autre salon`)
message.channel.send(embed3)
var embed4 = new MessageEmbed()
.setAuthor(`🔹 Catégorie fun`)
.setColor(db.color)
.setDescription(`C'est des catégories non-utile au serveur, c'est pour le fun tout le monde peux les utiliser.
    
> [Liste des commandes](http://Kazril.bot)`)
.addField("`kiss`", `[Alias:](http://Kazril.bot) \`❌\` \n - Fais un bisous.`)
.addField("`fight`", `[Alias:](http://Kazril.bot) \`❌\` \n - Combat une personne`)
.addField("`hug`", `[Alias:](http://Kazril.bot) \`❌\` \n - Fais un calin a une personne.`)
message.channel.send(embed4)
var embed5 = new MessageEmbed()
.setAuthor(`🔹 Catégorie utilitaires`)
.setColor(db.color)
.setDescription(`C'est des catégories utile au serveur, certains commande sont accesible a tout le monde.
    
> [Liste des commandes](http://Kazril.bot)`)
.addField("`vc`", `[Alias:](http://Kazril.bot) \`vocalmembers\`,\`voicemember\` \n - Obtenez le nombre de personne en vocal ainsi que le nombre de personne sur le serveur.`)
.addField("`la`", `[Alias:](http://Kazril.bot) \`listeadmin\` \n - Liste de toutes les personnes ayant la permissions administrateur sur le serveur`)
.addField("`lrm`", `[Alias:](http://Kazril.bot) \`listerolemembers\` \n - Obtenez la liste de personne dans un rôle`)
.addField("`help`", `[Alias:](http://Kazril.bot) \`aide\` \n - Affiche la liste des commandes`)
.setFooter(`KazrilBot • Version: ${config.bot.version} • ⚠️ Ceci est une pre-release, cette version n'est pas stable`)
message.channel.send(embed5)
};


module.exports.help = {
    name: "help",
    aliases: ['aide','commands'],
    category: 'Administration',
    description: "Obtenez les informations de votre abonnement KazrilBot",
  };