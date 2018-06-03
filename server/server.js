var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

// app.get('/todos/:id', (req,res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//   Todo.findById(id).then((todo)) => {
//     if (!todo) {
//       res.status(404).send();
//     }
//     res.send({todo});  // ES 6 propert - send({todo: todo})
//   }, (err) => {
//     res.status(400).send();
//   })
//
//   // valid id using isValid
//     // 404 - send back empty Second
//
//     // findById
//       // succuess
//         // if todo - send it back
//         // if not todo - send back 404 with empty body
//       //error
//         // 400 - the request is not valid and send emepty body back
// });

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }, (err) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
  // remove todo by ID
    // succuess
      // if no doc, send 404
      // if doc, send 200 and doc
    // error
      // send 404
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
