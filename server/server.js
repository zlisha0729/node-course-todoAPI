require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/middleware');
const bcrypt = require('bcryptjs');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((docs) => {
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

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }, (err) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  // var user = new User({
  //   email: body.email,
  //   password: body.password
  // });
  // header with x- : custom header
  var user = new User(body);
  user.save().then(() => {
    //res.send({user});
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  // var token = req.header('x-auth');
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject();
  //   }
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // });
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  // User.findOne({email: body.email}).then((user) => {
  //   if (!user) {
  //     res.status(401).send();
  //   }
  //   //console.log(user);
  //   console.log(body.password);
  //   console.log(user.password);
  //
  //   bcrypt.compare(body.password, user.password, (err, result) => {
  //     console.log(result);
  //     if (result) {
  //       res.send(user);
  //     }
  //     else {
  //       res.status(401).send();
  //     }
  //   })
  //
  // });
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
