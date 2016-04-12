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
    this.description = 'student';
    this.socket = io.connect('http://localhost:'+constants.PORT, {reconnect: true});
    User.prototype.handshake(this.socket, this.description, this.mail);
    User.prototype.listeners(this.socket);
    setupListeners()
}

function setupListeners() {
    login();
}

function login() {
    socket.on(constants.RESULT, function (error) {
        if (error){
            console.log(error);
            process.exit();
        }else{
            console.log('[Student] success!!!!\r\n');
            ask()
        }
    });
}

function ask() {
    console.log('asking..');
    setInterval(function(){
        socket.emit(constants.ASK, mail, "anyone there!?");
    }, 3000);
}