const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

 var id = "5b0ddc70c76b0c43847b9a8d11";
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// };

// get an array as the result
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// // get document (object)
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });


// User promise to chain the then and catch...
// Todo.findById(id).then((todoById) => {
//   if (!todoById) {
//     return console.log('id is not found');
//   }
//   console.log('Todo by Id', todoById);
// }).catch((e) => {
//    console.log(e);
//  });

// callback way to handle the error
Todo.findById(id).then((todoById) => {
  if (!todoById) {
    return console.log('id is not found');
  }
  console.log('Todo by Id', todoById);
}, (e) => {
  console.log(e);
});

// var id = "5b0db73eee4144a482d4d61f";
// User.findById(id).then((user) => {
//   if (!user) {
//     return console.log('user is not found');
//   }
//   console.log('User by ID', user);
// }).catch((e) => console.log(e));
