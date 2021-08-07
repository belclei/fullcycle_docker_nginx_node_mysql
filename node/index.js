const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql')

function getRandomName() {
    const names = ['Belclei', 'Sabrina', 'Gabriele', 'Douglas', 'Mathias', 'Esteban', 'Edmundo', 'Filomena', 'Astrid', 'Edgar', 'Dalmir', 'Zuleica'];
    return names[Math.floor(Math.random() * names.length)];
}

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    connection.query(`INSERT INTO people(name) values('==> ${getRandomName()}')`)
    connection.query('SELECT name FROM people', (err, result) => {
        if (err) throw err;
        const nameList = result.map((value) => `<li>${value.name}</li>`).join('');
        connection.end()
        
        res.send(`<h1>Full Cycle</h1><ul>${nameList}</ul>`)        
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})