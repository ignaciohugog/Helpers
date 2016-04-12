/**
 * Created by Ignacio on 4/8/16.
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

//this is the server port 
define("PORT", 8084);

//user
define("HANDSHAKE", 'handshake');
define("RESULT", "result");

//student
define("ASK", 'ask');

//professor
define("ANSWER", 'answer');
define("SEND_ANSWER", 'send_answer');
define("GET_QUESTION", "nextQuestion");
define("RECEIVED_QUESTION", "receivedQuestion");
define("WRITING", "writing");



