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
define("ASK", 'ask');
define("ANSWER", 'answer');
define("HANDSHAKE", 'handshake');
define("RESULT", "result");


