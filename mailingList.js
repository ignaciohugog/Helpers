/**
 * Created by Ignacio on 4/8/16.
 */

//variables
    
var students = [];
var professors = [];
var questions = [];
var currentQuestionID = 0;
    
var mailingListApp = require('express')();
var server = require('http').Server(mailingListApp);
var io = require('socket.io')(server);
var constants = require("./constants");


io.on('connection', function(socket){
    console.log('[MainlingList] new connection!');
    //listeners
    handshake(socket);
    asking(socket);
    
    nextQuestion(socket);
    writting(socket);
    answer(socket)

});

function alreadyExist(description, mail) {
    return description == 'student' ? exist(students, mail) : exist(professors, mail);
}

function exist(users, mail) {
    for (var i=0;i<users.length;i++){
        if (users[i].mail == mail){
            return true
        }
    }
    return false
}

function addUser(name, description, mail) {
    var user = {
        name:name,
        description:description,
        mail:mail
    };
    description=='student' ? (students.push(user)):(professors.push(user));
    console.log('[MainlingList] add '+description+' with mail '+mail);
}

function addQuestion(from, msg) {
    var question = {
        id: currentQuestionID++,
        mail: from,
        question: msg
    };
    questions.push(question);
    console.log('[MainlingList] '+question.mail+ ' asked '+question.question+' ID: '+question.id+'\r\n');
    return question
}

process.on('SIGINT', function() {
    console.log("[MainlingList] Disconnect all users..");
    io.emit('user disconnected');
    process.exit();
});

//listening
server.listen(constants.PORT, function(){
    console.log('[MainlingList] listening in:'+constants.PORT +'\r\n');
});

//*******************student*******************//
function handshake(socket) {
    socket.on(constants.HANDSHAKE, function (name, description, mail) {
        if (alreadyExist(description, mail)){
            console.log('[MainlingList] fail', description,mail);
            socket.emit(constants.RESULT,'error: mail is already taken');
        }else{
            addUser(name, description, mail);
            socket.emit(constants.RESULT,'');
        }
    });
}

function asking(socket) {
    socket.on(constants.ASK, function (from, msg) {
        var question = addQuestion(from, msg);
        socket.broadcast.emit(constants.ASK, question);
    });
}

//*******************professor*******************//

function nextQuestion(socket) {
    socket.on(constants.GET_QUESTION, function () {
        var question = questions.shift();
        socket.emit(constants.RECEIVED_QUESTION, question);
    });
}

function writting(socket) {
    socket.on(constants.WRITING, function (msg, from) {
        socket.broadcast.emit(constants.WRITING, msg, from);
    });
}

function answer(socket) {
    socket.on(constants.SEND_ANSWER, function (answer) {
        socket.broadcast.emit(constants.ANSWER, answer);
    });
}
