var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
//mongoose.connect('mongodb://zlisha0729:walds520_@ds245250.mlab.com:45250/todods');


db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://zlisha0729:walds520_@ds245250.mlab.com:45250/todods'
};

mongoose.connect(process.env.MONGODB_URI|| db.localhost);


module.exports = {mongoose};
