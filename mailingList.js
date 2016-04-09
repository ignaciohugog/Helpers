/**
 * Created by Ignacio on 4/8/16.
 */

//variables
    
var students = []
var professors = []
var questions = []
    
var mailingListApp = require('express')();
var server = require('http').Server(mailingListApp);
var io = require('socket.io')(server);
var constants = require("./constants");


io.on('connection', function(socket){
    console.log('new connection!')

    //handshake
    socket.on(constants.HANDSHAKE, function (name, description, mail) {
        console.log('handshaking..')
        if (alreadyExist(description, mail)){
            socket.emit(constants.RESULT,'error: mail is already taken');
        }else{
            createUser(name, description, mail)
            socket.emit(constants.RESULT,'');
        }
    });

    //asking
    socket.on(constants.ASK, function (from, msg) {
        console.log('student', '['+from+']', ' esta preguntando ', '['+msg+']');
    });

});

function alreadyExist(description, mail) {
    if (description=='student'){
        console.log('student')
        return exist(students, mail)
    }else{
        return exist(professors, mail)
    }
}

function exist(users, mail) {
    for (i=0;i<users.length;i++){
        if (users[i].mail == mail){
            return true
        }
    }
    return false
}

function createUser(name, description, mail) {
    var user = {
        name:name,
        description:description,
        mail:mail
    }
    console.log('create user')
    description=='student' ? (students.push(user)):(professors.push(user))
}

//listening
server.listen(constants.PORT, function(){
    console.log('[MailingList] listening in:'+constants.PORT);
});







// mailingListApp.get('/preguntar', function (req, res) {
//     // var pregunta = {
//     //     titulo: req.body.titulo,
//     //     mensaje: req.body.mensaje,
//     //     alumno: req.body.sender,
//     //     id: questions.length
//     // };
//
//     console.log('dsa');
//     //questions.push(pregunta);
//
//     //if (students.indexOf(req.body.sender)===-1){
//         //students.push(req.body.sender);
//     //}
//
//     //notificar(pregunta, students.concat(proffesors));
//
//     //res.send('[Server] preguntar');
// });




//
// io.on('connect', function(){
//     console.log('conecneaa')
// });
//
// io.on('event', function(data){
//
// });
//
// io.on('disconnect', function(){
//
// });