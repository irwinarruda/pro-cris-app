import { DatabaseConnection } from './sqliteConnection';

var db = null;

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () => console.log('foreign keys turned on'));
        this.initDb();
        this._db = db;
    };
    initDb() {
        var sql = [
            `CREATE TABLE IF NOT EXISTS alunos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kidName TEXT DEFAULT '',
                dateBirth TEXT DEFAULT '',
                parentName TEXT DEFAULT '',
                phoneNumber TEXT DEFAULT '',
                houseNumber TEXT DEFAULT '',
                givenClasses TEXT DEFAULT '',
                price TEXT DEFAULT ''
            );`      
        ]
        db.transaction(
            tx => {
                for(let i = 0; i < sql.length; i++) {
                    //console.log('execute sql: ' + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, 
            error => {
                console.error(error);
            }, 
            () => {
                console.log('Banco de dados Acessado com Sucesso');
            }
        );
    };
}
