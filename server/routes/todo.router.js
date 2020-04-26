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

// koalaRouter.post('/', (req, res) => {
//     let queryText = `INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
//     VALUES ($1, $2, $3, $4, $5);`
//     pool.query(queryText, [req.body.name, req.body.age, req.body.gender, req.body.readyForTransfer, req.body.notes])
//     .then((result) => {
//         res.sendStatus(201)
//     }).catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     })
// })

// POST
todoRouter.post('/', (req, res) => {
    let queryText = `INSERT INTO "todo" ("task", "priority", "color") VALUES ($1, $2, $3);`;
    console.log(req.body);
    pool.query(queryText, [req.body.task, req.body.priority, req.body.color])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

// PUT

// DELETE


module.exports = todoRouter;