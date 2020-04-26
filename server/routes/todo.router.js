const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
todoRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todo" ORDER BY CASE "priority" WHEN 'low' THEN 1 WHEN 'medium' THEN 2 WHEN 'high' THEN 3 END, "id" DESC;`;
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
todoRouter.put('/:id', (req, res) => {
    let task = req.body;
    let id = req.params.id;
    console.log(`Updating task ${id} with `, task);
    console.log(req.body);
    let queryString;
    if (req.body.status == 'incomplete') {
        queryString = `UPDATE "todo" SET "status" = 'complete' WHERE "id" = $1;`;
    } else if (req.body.status == 'complete') {
        queryString = `UPDATE "todo" SET "status" = 'incomplete' WHERE "id" = $1;`;
    }

    pool.query(queryString, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
})


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