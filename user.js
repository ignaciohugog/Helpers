/**
 * Created by Ignacio on 4/11/16.
 */

var io = require('socket.io-client');
var constants = require("./constants");
var prompt = require('prompt');

function User() {
}

User.prototype = {
    onErr:function() {
    console.log('Mail required!');
    return 1;
    },
    handshake:function(socket, description, mail) {
        console.log('Handshaking..\r\n');
        socket.emit(constants.HANDSHAKE, '', description, mail);
    },
    listeners:function (socket) {
        //disconnect
        socket.on('User disconnected', function () {
            console.log('Disconnected!');
            process.exit();
        });
        //answering
        socket.on(constants.ANSWER, function(answer) {
            console.log('Professor answering: ', JSON.stringify(answer));
        });

        //asking
        socket.on(constants.ASK, function(ask) {
            console.log('[Student] student asking: ', JSON.stringify(ask)+'\r\n')
        });
    }
};



module.exports = User;








