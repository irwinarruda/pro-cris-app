import { DatabaseConnection } from './sqliteConnection';

db = DatabaseConnection.getConnection();

export default operations = {
    getAll: () => {
        var obj;
        db.transaction(
            tx => {tx.executeSql(`SELECT * FROM alunos`, [], (_, { rows }) =>  {obj = JSON.stringify(rows); return obj;})},
            error => {console.error(error)},
        );
        
    }
}