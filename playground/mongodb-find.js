const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

// // toArray() returns promise
//   db.collection('Todos').find({}).toArray((err, docs) => {
//     console.log('Found the following records');
//     console.log(docs);
//   });

// db.collection('Todos').find({
//   _id: new ObjectID('5b0ccb0ef62a827e8c531c9b')
// }).toArray().then((docs) => {
//   console.log('Todos');
//   console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//   console.log("Unable to fetch todos", err);
// });

db.collection('Todos').find({}).count().then((count) => {
  console.log(`Todos count is ${count}`);
}, (err) => {
  console.log('Unable to fetch todos', err);
});

});
