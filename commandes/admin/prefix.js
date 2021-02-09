var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
    if(!message.guild) return;
    var config = require("../../config.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    if(message.author.id !== config.bot.owner) return;

       if (args.length) {
        let str_content = args.join(" ")
        db.prefix = str_content
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, Vous avez définis le prefixe de cette guilde en \`${str_content}\`.`);
    } else {
        message.channel.send(`\`${getNow().time}\` :x: ${message.author}, Vous n'avez fournie aucune valeur, veuillez refaire la commande en incluant un prefixe.`);
    }


    
fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
    if (x) console.error(x)
  });
};


module.exports.help = {
    name: "prefix",
    aliases: ['prefixe'],
    category: 'Administration',
    description: "Permet de changer le prefixe du serveur",
  };