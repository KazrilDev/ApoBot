var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; },
fs = require("fs");

module.exports = async (client, member) => {
let db = JSON.parse(fs.readFileSync(`./serveur/${member.guild.id}.json`, "utf8"));
if(!db) return;
if(db.logs.serveur !== false) { 
str_chan = member.guild.channels.cache.find(c => c.id === db.logs.serveur)
if(!str_chan) return;
str_chan.send({embed:{ description: `**${member.user.username}**#${member.user.discriminator} (\`${member.user.id}\`) a rejoins le serveur!\n`, color: 3553599, author: { name: "🙌 Nouveau membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
} 

if(db.autorole.module === true) {
role = member.guild.roles.cache.find(c => c.id === db.autorole.role)
if(!role) return;
member.roles.add(role.id)
}
};


