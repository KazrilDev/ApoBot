var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

 if(!message.member.hasPermission("ADMINISTRATOR")) return;
 message.member.voice.channel.join().then(m => { 
message.channel.send(`:white_check_mark: ${message.author}, déplace moi dans le salon ou tu souhaite que je déplace toutes les personnes du salon!`)
setTimeout(() => {
   message.member.voice.channel.leave()
    }, 120000);
})
    };
    module.exports.help = {
      name: "voicemove",
      aliases: ['vm','voicem'],
      category: 'moderation',
      description: "Déplace toutes les personnes d'un salon vers un autre",//
};