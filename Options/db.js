const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const chalk = require('chalk')

const store = (label, password) => {

    try{
    //create or append to db
    const db = database();
    //check if the Database table pass exist else it will create new one and continue as intended
    //
    if(checkTableExist(db) == false){
        console.log(chalk.redBright("Table fault"));
        db.close()
    }
    if(storeData(label, password, db)== false){
        console.log(chalk.redBright("Error while saving to database"));
        db.close()
    }

    console.log(chalk.greenBright("Password saved to Database..."))
    db.close()

} catch(e) {
    console.log(chalk.red("Database Error"));
}


}


const database = ()=>{
    let db = new sqlite3.Database(path.join(__dirname,'..', 'db', 'passwords.db'), (err) => {
        if(err) {
            console.log(chalk.redBright(err.message));
        }
    });
    console.log(chalk.green("Database connected.."));
    return db;
}

const checkTableExist = (db)=> {
    db
    .run("CREATE TABLE IF NOT EXISTS pass(pass_id INTEGER PRIMARY KEY, label TEXT NOT NULL, password TEXT NOT NULL, UNIQUE(label) ON CONFLICT IGNORE);",
    (err) => {
        if(err){
            return false
        }
    });
    return true

}

const storeData = (label, password, db) => {
    db.run("INSERT into pass(label, password) VALUES(?, ?)", [label, password], (err)=> {
        if(err){
            return false
        }
    });
    return true

}

module.exports = store;