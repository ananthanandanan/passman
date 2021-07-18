const program = require('commander');
const clip = require('clipboardy');
const chalk = require('chalk');
const logger = console.log;
const createPassword = require("./Options/createPassword");
const savePassword = require("./Options/savePassword");

program.version('1.0.0').description('A password manager for lazy people')

// Commands
program
    .option('-l,--length <number>', 'Length of the password', '6')
    .option('-s, --save', 'save the password to database')
    .option('-ns, --no-symbols', 'remove symbols').parse()

const {length, save, numbers, symbols} = program.opts()

const generatedPsswords = createPassword(length, numbers, symbols);

//Save the password if the save arg is true
if(save) {
    savePassword(generatedPsswords);
}
// copy to clipboard
clip.writeSync(generatedPsswords);

logger(chalk.yellow('Generated Password: ') + chalk.bold(generatedPsswords));
logger(chalk.cyanBright('Copied to clipboard'))
