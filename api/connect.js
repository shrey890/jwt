import mysql from 'mysql'
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'social'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to social database:', err);
        throw err;
    }
    console.log('Connected to social database:', db.config.database);
});

export default db