// this is the file of data storage for stage

const uuid = require('uuid').v4;

const sessions = {};

function createSession(username){
    const sid = uuid();
    sessions[sid] = username;
    return sid;
}

function addSession(sid, username){
    sessions[sid] = username;
}

function deleteSession(sid){
    delete sessions[sid];
}

function getUsername(sid){
    return sessions[sid];
}

function sidExists(sid){
    if (sessions[sid]){
        return sessions[sid];
    }
    else{
        return null;
    }
}
module.exports = {
    createSession,
    deleteSession,
    getUsername,
    addSession,
    sidExists,
}