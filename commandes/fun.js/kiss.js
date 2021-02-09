const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};

kiss = ['https://cdn.weeb.sh/images/rymvn6_wW.gif','https://cdn.weeb.sh/images/H1a42auvb.gif','https://cdn.weeb.sh/images/H1Gx2aOvb.gif','https://cdn.weeb.sh/images/rJrCj6_w-.gif','https://cdn.weeb.sh/images/B13D2aOwW.gif','https://cdn.weeb.sh/images/BJLP3a_Pb.gif','https://cdn.weeb.sh/images/Hy-oQl91z.gif','https://cdn.weeb.sh/images/SJINn6OPW.gif','https://cdn.weeb.sh/images/ByiMna_vb.gif','https://cdn.weeb.sh/images/rymvn6_wW.gif','https://cdn.weeb.sh/images/BJSdQRtFZ.gif','https://cdn.weeb.sh/images/S1PCJWASf.gif','https://cdn.weeb.sh/images/SJ3dXCKtW.gif','https://cdn.weeb.sh/images/HJlWhpdw-.gif','https://cdn.weeb.sh/images/rkde2aODb.gif','https://cdn.weeb.sh/images/SybPhp_wZ.gif','https://cdn.weeb.sh/images/rkFSiEedf.gif','https://cdn.weeb.sh/images/r1cB3aOwW.gif','https://cdn.weeb.sh/images/BJv0o6uDZ.gif','https://cdn.weeb.sh/images/B13D2aOwW.gif','https://cdn.weeb.sh/images/Skv72TuPW.gif','https://cdn.weeb.sh/images/S1qZksSXG.gif','https://cdn.weeb.sh/images/Sk1k3TdPW.gif','https://cdn.weeb.sh/images/S1-KXsh0b.gif','https://cdn.weeb.sh/images/B1yv36_PZ.gif','https://cdn.weeb.sh/images/BJx2l0ttW.gif']

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   user = message.mentions.members.first()|| message.guild.members.cache.get(args[0])
   var randomkiss = kiss[Math.floor(Math.random()*kiss.length)]

if(user) { 
var embed = new MessageEmbed()
.setTitle(`:kissing_heart: **${message.author.username}** fait un bisou à **${user.user.username}**`)
.setImage(randomkiss)
.setColor(db.color)
message.channel.send(embed)
} else {
    if(args[0]) {
var member = message.guild.members.cache.find( m => m.displayName.toLowerCase().indexOf(args[0].toLowerCase()) > -1)
if(!member) member = client
var embed = new MessageEmbed()
.setTitle(`:kissing_heart: **${message.author.username}** fait un bisou à **${member.user.username}**`)
.setImage(randomkiss)
.setColor(db.color)
message.channel.send(embed)
    } else {
var embed = new MessageEmbed()
.setTitle(`:kissing_heart: **${message.author.username}** fait un bisou à **${client.user.username}**`)
.setImage(randomkiss)
.setColor(db.color)
message.channel.send(embed)
    }
}
};


module.exports.help = {
    name: "kiss",
    category: 'Fun',
    description: "bisous",
  };