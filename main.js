// --  Formule pour déclarer les variables
const
      config = require("./config.json"),
      { readdirSync } = require("fs"),
      { Client, Collection} = require("discord.js"),
      client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
      figlet = require('figlet'),
      colors = require('colors'),
      readline = require('readline');
client.commands = new Collection()

console.clear()
console.log(`                                                                                                                     
   _|_|                            _|      _|              _|                                              _|        
 _|    _|  _|_|_|      _|_|        _|_|    _|    _|_|    _|_|_|_|  _|      _|      _|    _|_|    _|  _|_|  _|  _|    
 _|_|_|_|  _|    _|  _|    _|      _|  _|  _|  _|_|_|_|    _|      _|      _|      _|  _|    _|  _|_|      _|_|      
 _|    _|  _|    _|  _|    _|      _|    _|_|  _|          _|        _|  _|  _|  _|    _|    _|  _|        _|  _|    
 _|    _|  _|_|_|      _|_|        _|      _|    _|_|_|      _|_|      _|      _|        _|_|    _|        _|    _|  
           _|                                                                                                        
           _|                       
                                         `.red + ` Bienvenue sur la version `.white + `${config.bot.version}`.green + ` du ` + `KazrilBot`.blue + `                       
                                   ___________________________________________________`.red)

const loadEvents = (dir = "./modules/") => {
  readdirSync(dir).forEach(dirs => {
  const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
                                  
  for (const event of events) {
  const evt = require(`${dir}/${dirs}/${event}`);
  const evtName = event.split(".")[0];
  client.on(evtName, evt.bind(null, client));
  console.log(`[EVENTS]`.red + ` Chargement de l'évènement >`.white + ` ${evtName}.js`.red);
  };
});
};
loadEvents()

const loadCommands = (dir = "./commandes/") => {
  readdirSync(dir).forEach(dirs => {
  const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
      
  for (const file of commands) {
  const getFileName = require(`${dir}/${dirs}/${file}`);
  client.commands.set(getFileName.help.name, getFileName);
  console.log(`[COMMANDS]`.red + ` Chargement de la commande >`.white + ` ${getFileName.help.name}.js`.red);
  };
});
};
loadCommands()


client.login(config.login.token).catch(e => { console.log(`[CRITICAL ERROR]`.red + ` Erreur rencontrée: ${e}`) });