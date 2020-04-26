const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const todoRouter = require('./routes/todo.router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// Routes.
app.use('/todo', todoRouter);

// Listening for requests on a specific port.
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});