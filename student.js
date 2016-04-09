/**
 * Created by Ignacio on 4/8/16.
 */

var io = require('socket.io-client');
var constants = require("./constants");
var prompt = require('prompt');

//student's variables
var description = 'student'
var name = ""
var mail = ""
var socket

promptMail()


function createConnection() {
    //create socket
    socket = io.connect('http://localhost:'+constants.PORT, {reconnect: true});

    //check if mail is already taken
    handshake()
    
    //listeners
    setupListeners()
}

function setupListeners() {
    //login result
    socket.on(constants.RESULT, function (error) {
        if (error){
            console.log(error)
            promptMail()
        }else{
            console.log('success!!!!')
            //start to ask
            ask()
        }
    });

    socket.on(constants.ASK, function(ask) {
        console.log('Students asking: ', JSON.stringify(ask))
    });

    socket.on(constants.ANSWER, function(answer) {
        console.log('Professors answering: ', JSON.stringify(answer));
    });
}

function promptMail() {
    prompt.start();
    prompt.get(['mail'], function (err, result) {
        if (err || !result.mail) { return onErr(); }
        mail = result.mail
        createConnection()
    });
}

function onErr() {
    console.log('name required!');
    return 1;
}

function handshake() {
    socket.emit(constants.HANDSHAKE, name, description, mail);
    console.log('handshaking..')
}

function ask() {
    socket.emit(constants.ASK, name, "hay alguien ahi?");
}
