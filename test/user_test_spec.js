var frisby = require('frisby');
var _config = require('../config/config')
var url = 'http://localhost:3000/v1/users/';

// frisby.create('Test create user api url ')
//     .post(url,{first_name: 'tope',last_name:'fikayo',})
//     .expectStatus(200)
//     .expectHeader('Content-Type', 'application/json; charset=utf-8')
//     .toss();