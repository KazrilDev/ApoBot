const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

hug = ['https://cdn.weeb.sh/images/rk6PsvOUM.gif','https://cdn.weeb.sh/images/S1qhfy2cz.gif','https://cdn.weeb.sh/images/Hyec_OmDW.gif','https://cdn.weeb.sh/images/BkHA_O7v-.gif','https://cdn.weeb.sh/images/HkQs_dXPZ.gif','https://cdn.weeb.sh/images/HytoudXwW.gif','https://cdn.weeb.sh/images/BysjuO7D-.gif']
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   user = message.mentions.members.first()|| message.guild.members.cache.get(args[0])
   var randomhug = hug[Math.floor(Math.random()*hug.length)]

if(user) { 
var embed = new MessageEmbed()
.setTitle(`:hugging:  **${message.author.username}** fait un calin à **${user.user.username}**`)
.setImage(randomhug)
.setColor(db.color)
message.channel.send(embed)
} else {
    if(args[0]) {
var member = message.guild.members.cache.find( m => m.displayName.toLowerCase().indexOf(args[0].toLowerCase()) > -1)
if(!member) member = client
var embed = new MessageEmbed()
.setTitle(`:hugging:  **${message.author.username}** fait un calin à **${member.user.username}**`)
.setImage(randomhug)
.setColor(db.color)
message.channel.send(embed)
    } else {
var embed = new MessageEmbed()
.setTitle(`:hugging:  **${message.author.username}** fait un calin à **${client.user.username}**`)
.setImage(randomhug)
.setColor(db.color)
message.channel.send(embed)
    }
}
};


module.exports.help = {
    name: "hug",
    category: 'Fun',
    description: "Calin.",
  };