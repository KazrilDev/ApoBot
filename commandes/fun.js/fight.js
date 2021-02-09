const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};

fight = ['https://cdn.weeb.sh/images/HkJ6-e91z.gif','https://cdn.weeb.sh/images/Hy7KZUmDb.gif','https://cdn.weeb.sh/images/SkFub87DW.gif','https://cdn.weeb.sh/images/HJKiX1tPW.gif','https://cdn.weeb.sh/images/HyV5mJtDb.gif','https://cdn.weeb.sh/images/S1-RQVFjZ.gif','https://cdn.weeb.sh/images/ryqfNEtj-.gif','https://cdn.weeb.sh/images/rkpAXa5bG.gif']

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   user = message.mentions.members.first()|| message.guild.members.cache.get(args[0])
   var randomfight = fight[Math.floor(Math.random()*fight.length)]

if(user) { 
var embed = new MessageEmbed()
.setTitle(`:gun: **${message.author.username}** fait un combat avec **${user.user.username}**`)
.setImage(randomfight)
.setColor(db.color)
message.channel.send(embed)
} else {
    if(args[0]) {
var member = message.guild.members.cache.find( m => m.displayName.toLowerCase().indexOf(args[0].toLowerCase()) > -1)
if(!member) member = client
var embed = new MessageEmbed()
.setTitle(`:gun: **${message.author.username}** fait un combat avec **${member.user.username}**`)
.setImage(randomfight)
.setColor(db.color)
message.channel.send(embed)
    } else {
var embed = new MessageEmbed()
.setTitle(`:gun: **${message.author.username}** fait un combat avec **${client.user.username}**`)
.setImage(randomfight)
.setColor(db.color)
message.channel.send(embed)
    }
}
};


module.exports.help = {
    name: "fight",
    category: 'Fun',
    description: "Fight",
  };