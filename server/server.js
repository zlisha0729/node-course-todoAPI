var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((docs) => {
    res.send({docs});
  }, (err) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  else {
    Todo.findById(id).then((doc) => {
      if (!doc) {
        res.status(404).send();
      }
      res.send({doc});  // ES 6 propert - send({docs: docs})
    }, (err) => {
      res.status(400).send();
    })
  }

  // valid id using isValid
    // 404 - send back empty Second

    // findById
      // succuess
        // if todo - send it back
        // if not todo - send back 404 with empty body
      //error
        // 400 - the request is not valid and send emepty body back
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
