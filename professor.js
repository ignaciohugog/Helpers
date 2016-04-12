/**
 * Created by Ignacio on 4/8/16.
 */

var io = require('socket.io-client');
var constants = require("./constants");
var prompt = require('prompt');
var User = require("./user");

prompt.start();

prompt.get(['mail'], function (err, result) {
    if (err || !result.mail) { return User.prototype.onErr(); }
    this.mail = result.mail;
    setupConnection()
});


function setupConnection() {
    this.description = 'professor';
    this.socket = io.connect('http://localhost:'+constants.PORT, {reconnect: true});
    User.prototype.handshake(this.socket, this.description, this.mail);
    User.prototype.listeners(this.socket);
    setupListeners()
}

function setupListeners() {
    login();
    receivedQuestion();
    receivedNotification()
}

function login() {
    socket.on(constants.RESULT, function (error) {
        if (error){
            console.log(error);
            process.exit();
        }else{
            console.log('success!!!!\r\n');
            getQuestion()
        }
    });
}

function getQuestion(){
    this.socket.emit(constants.GET_QUESTION);
}

function receivedNotification() {
    socket.on(constants.WRITING, function (msg, from) {
        console.log('[Professor] professor with mail ' + from + ' writting questionID: ' + msg)
    });
}

function receivedQuestion(){
    socket.on(constants.RECEIVED_QUESTION, function (question) {
        if (question){
            answer(question)
        }else{
            getQuestion()
        }
    });
}

function answer(question) {
    socket.emit(constants.WRITING, question.id, this.mail);
    setTimeout(function() {
        socket.emit(constants.SEND_ANSWER, 'question of ID:'+question.id);
        getQuestion()
    }, 1000 + Math.random()*4000);
}
