const A3Rcon = require('arma3-rcon');
const bfj = require('bfj');
const path = './config.json';
const arguments = process.argv

if (arguments.length < 3) {

    console.log('you need to specify a command !');
    console.log('type: npm run start help');

} else if (arguments[2] == 'help') {

    console.log('type: "npm run start" followed by one of these commands:');
    console.log('players');
    console.log('restart');
    console.log('kick [id]');
    console.log('ban create [id] [duration_in_seconds]');
    console.log('ban remove [id]');
    console.log('ban list [page_nb]');

} else {

    bfj.read(path).then((config) => {
        console.log('config file loaded');
    
        // ip-adress, port, password
        const a3r = new A3Rcon(config.address, config.port, config.token, {
            // set to false to disable auto reconnect
            enabled: false,
        
            // set the time between reconnection attempts in seconds
            interval: 5,
        
            // set the amount of tries that are carried out before quitting the connection
            count: 24
        });
    
        a3r.connect().then(async (success) => {
            // success is true when logging in worked, false if not
            // console.log('command: ' + arguments[2]);
            await a3r.rconCommand(arguments[2]);
        }).catch((error) => {
        console.log(error);
    	});
    }).catch((error) => {
        console.log(error);
    });
}
