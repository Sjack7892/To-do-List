const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

let stuff = ['fish', 'taco', 'beans', 'baseball'];

// koalaRouter.get('/', (req, res) => {
//     let queryText = 'SELECT * FROM "koalas" ORDER BY "id" DESC;';
//     pool.query(queryText).then(result => {
//         res.send(result.rows);
//     })
//         .catch(error => {
//             console.log('error getting koalas', error);
//             res.sendStatus(500);
//         });
// });

// GET
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(queryText).then(result => {
        console.log(result.rows);
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting todo', error);
            res.sendStatus(500);
        })
});

// POST

// PUT

// DELETE


module.exports = todoRouter;