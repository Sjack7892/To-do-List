const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

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
todoRouter.post('/', (req, res) => {
    let queryText = `INSERT INTO "todo" ("task", "priority") VALUES ($1, $2);`;
    console.log(req.body);
    pool.query(queryText, [req.body.task, req.body.priority])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

// PUT

// DELETE
todoRouter.delete('/:id', (req, res) => {
    let queryString = `DELETE FROM "todo" WHERE id = $1;`;
    pool.query(queryString, [req.params.id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
});

module.exports = todoRouter;