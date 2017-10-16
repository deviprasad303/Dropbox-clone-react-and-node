
var Mocha = require("mocha");
var http=require("http");

var mocha = new Mocha({
    ui: "bdd",
    reporter: "spec"
});
//const describe= require('mocha').describe;
// Create a new test suite for our Bank Account
const assert = require('assert');
describe('server check', function(){it('check if server is connecting', function(done){http.get('http://localhost:3001/', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/filelist?email=ramu919@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/groups?email=ramu919@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/getstarfiles?email=ramu919@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/groupmembers?groupname=mygroup', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/filelist?email=asdf@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/groups?email=asdf@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/getstarfiles?email=asdf@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/groupmembers?groupname=group2', function(res) {assert.equal(200, res.statusCode);done();})});});

describe('Filecheck', function(){it(
    'check if filenames exist for a username',
    function(done){http.get('http://localhost:3001/filelist?email=ramu919@gmail.com', function(res) {assert.equal(200, res.statusCode);done();})});});












