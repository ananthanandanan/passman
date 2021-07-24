const program = require('commander');
const clip = require('clipboardy');
const chalk = require('chalk');
const logger = console.log;
const createPassword = require("./Options/createPassword");
const savePassword = require("./Options/savePassword");
const store = require("./Options/db");

program.version('1.0.0').description('A password manager for lazy people')

// Commands
program
    .option('-l,--length <number>', 'Length of the password', '6')
    //.option('-s, --save', 'save the generated password to database')
    .option('-g, --passgen', 'generated password')
    .option('-ll,--label <label>', 'Label of the password')
    .option('-p,--password <pass>', 'password to save')
    .option('-nn, --no-numbers', 'remove numbers')
    .option('-ns, --no-symbols', 'remove symbols').parse()

const {length, passgen, label, password, numbers, symbols} = program.opts()
logger(program.opts())

if(label && password) {
    store(label, password);
}
//Save the password if the save arg is true
if(passgen) {
    const generatedPsswords = createPassword(length, numbers, symbols);
    logger(chalk.yellow('Generated Password: ') + chalk.bold(generatedPsswords));
    logger(chalk.cyanBright('Copied to clipboard'))
}

