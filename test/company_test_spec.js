/**
 * Created by Samparsky on 2/15/17.
 */
var frisby = require('frisby');
var _config = require('../config/config')

var url = 'http://localhost:3000/v1/company/';

frisby.create('GET JSON from /company request either as admin or user')
    .get(url)
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .toss();

frisby.create('POST data to /company not authenticated as either user or admin ')
    .post(url,{name: 'hello',description:'hello','year_founded':1991,contact_name:'demo',contact_email:'demo@gmail.com',
        num_employees: 9,'financial': 50 ,'team': 10, 'idea': 20 })
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .toss();

frisby.create('POST data to /company authenticated as admin')
    .post(url,{name: 'hello',description:'hello','year_founded':1991,contact_name:'demo',contact_email:'demo@gmail.com',
        num_employees: 9,'financial': 50 ,'team': 10, 'idea': 20 })
    .expectStatus(201)
    .addHeader('x-access-token',_config.admin_secret_key)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSON({status:true})
    .afterJSON(function(json){
    })
    .toss();