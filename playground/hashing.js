const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//var password = '123abc';

// 10 is number of rounds for bcrypt
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// });

//var hashedPassword = '$2a$10$z/2txm.dXMjxHxBIo0srTuWQDoavQ3JPs5VlVyEy5hwyMDJxwUq2G';
var password = '123456abc';
var hashedPassword = '$2a$10$0JVpxTR4wzADG4vus0gqT.4P6EQOeepZyjY8DhRtUbhbat9rCzliq'
bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
})
//
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
