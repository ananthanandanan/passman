#!/usr/bin/env node
const program = require('commander');
const clip = require('clipboardy');
const chalk = require('chalk');
const logger = console.log;
const createPassword = require("./Options/createPassword");
const {store, getallLabels, getPassword, deleteEntry} = require("./Options/db");

program.version('1.0.0').description('A password manager for lazy people')

// Commands
program
    .option('-l,--length <number>', 'Length of the password', '6')
    .option('-g, --passgen', 'generated password')
    .option('-sl, --showlabel', 'Show all lablled passwords')
    .option('-ll,--label <label>', 'Label of the password')
    .option('-dl,--deletelabel <entry>', 'Label of the password to be deleted')
    .option('-pl,--picklabel <searchlabel>', 'Label for which password to get')
    .option('-p,--password <pass>', 'password to save')
    .option('-nn, --no-numbers', 'remove numbers')
    .option('-ns, --no-symbols', 'remove symbols').parse()

const {length, passgen, showlabel, label, deletelabel, picklabel, password, numbers, symbols} = program.opts()

if(deletelabel){
    deleteEntry(deletelabel);
}
if(picklabel){
    getPassword(picklabel);
}

if(label && password) {
    store(label, password);
}

if(showlabel) {
    getallLabels();
}
//Save the password if the save arg is true
if(passgen) {
    const generatedPsswords = createPassword(length, numbers, symbols);
    logger(chalk.yellow('Generated Password: ') + chalk.bold(generatedPsswords));
    clip.writeSync(generatedPsswords);
    logger(chalk.cyanBright('Copied to clipboard'))
}

