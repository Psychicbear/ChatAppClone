var express = require('express');
var app = express();
const { createServer } = require('http')
const { Server } = require('socket.io')
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200'
    }
})
const sockEvent = require('./socketEvents')

var fs = require('fs')
var path = require('path')
const db = require('./operations')

let host = '127.0.0.1';
let port = 5000;
var cors = require('cors');
httpServer.listen(port)

io.use(async (socket, next) => {
    const userID = socket.handshake.auth.userID
    let userInfo = await db.connectSocket(userID)

    if(!userInfo){
        return next(new Error("invalid username"));
    }
    socket.username = userInfo.username
    socket.userID = userInfo._id
    socket.userRole = userInfo.role
    next()
})


io.on('connection', (socket) => {
    console.log(socket.username, 'has joined the server')
    sockEvent.setCurrentGroup(io, socket)
    sockEvent.joinChannel(io, socket)
    sockEvent.addUserToChannel(io, socket)
    sockEvent.leaveChannel(io, socket)

    socket.on('msg', (data)=> {
        data.timestamp = new Date()
        db.addMsg(data, socket.channelID)
        socket.broadcast.to(socket.channelID).emit('newmsg', data)
    })

    socket.on('disconnect', (reason) => {
        console.log('A user disconnected from the server')
    })
})



app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,  '../')));

// app.listen(port, host, (port, host) => {
//     var d = new Date();
//     console.log(`Server has been started at: ${d.getHours()}:${d.getMinutes()}`);
// });

app.get('/', (req, res) => {

})

app.post('/api/login', db.authenticate)
app.post('/api/login/newUser', db.createUser)
app.post('/api/login/deleteUser', db.deleteUser)
app.post('/api/groups', db.fetchGroups)
app.post('/api/groups/new', db.createGroup)
app.post('/api/groups/edit', db.editGroupName)
app.post('/api/groups/delete', db.deleteGroup)
app.post('/api/channels', db.fetchChannels)
app.post('/api/channels/new', db.createChannel)
app.post('/api/channels/edit', db.editChannelName)
app.post('/api/channels/delete', db.deleteChannel)
app.post('/api/channels/fetchChat', db.fetchChat)
app.post('/api/channels/sendMessage', db.sendMessage)
app.post('/api/users/unlinkedChannels', db.fetchUnlinkedUsers)
app.post('/api/update', db.update)






//Recieves {userID, targetID, role}, returns {err: bool, reload: bool}
app.post('/api/login/modifyRole', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    let userRole = checkRole(post.userID)
    let permitted = false
    if(userRole <= 1){
        if(userRole==-1){
            permitted = true
        } else if(userRole==1 && checkRole(post.targetID) > 1 && post.role > 1){
            permitted = true
        }
        if(permitted){
            getUser(post.targetID).role = post.role
            saveJSON(res)
        } else {
            res.send({success: false, error: 'Insufficient permissions'})
        }
    }
})

//Recieves {userID, targetID}, returns {err: bool, reload: bool}
app.post('/api/login/deleteUser', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    console.log(post.userID)
    console.log(post.targetID)
    let userRole = checkRole(post.userID).role
    let targetRole = checkRole(post.targetID).role

    if(post.userID == post.targetID || 
        (checkRole(post.userID)==-1 &&
         checkRole(post.targetID)!=-1)){
        let user = users.find(user => {return user.id==post.targetID})
        user.groups.map(groupID => {//Gets index of each group 
            return groups.findIndex(group => {
                return group.id == groupID
            })
        }).map(group => {//Deletes user from group
            groups[group].participants.splice(
                groups[group].participants.indexOf(post.targetID), 1)
            if(groups[group].assis.includes(post.targetID)){
                groups[group].assis.splice(groups[group].assis.indexOf(post.targetID), 1)
            }
            console.log({id: post.targetID})
            console.log({participants: groups[group].participants})
        })
        user.channels.map(channelID => {//Gets index of each channel
            return channels.findIndex(channel => {
                return channel.id == channelID
            })
        }).map(channel => {//Deletes user from channel
            channels[channel].participants.splice(
                channels[channel].participants.indexOf(post.targetID), 1)
            console.log({id: post.targetID})
            console.log({participants: channels[channel].participants})
        })
        users.splice(users.findIndex(user => {
            return user.id == post.targetID
        }))
        saveJSON(res)
    } else {
        res.send({success: false, error: 'Failed to delete user'})
    }
})



//Recieves {groupID: number}, returns users[]
app.post('/api/groups/participants', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    let group = groups.find(group => {
        return group.id == post.groupID
    })
    if(group){
        res.send(group.participants.map(userID => {
            let username = users.find(user => {
                return user.id == userID
            })
            if(username){
                return username.username
            } else {
                return null
            }
        }))
    }
})

//Recieves {userID, targetID, groupID}, returns {err: bool, reload: bool}
app.post('/api/groups/addUser', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    console.log(post.groupID)
    let role = checkRole(post.userID)
    if(role<=1 || (role==2 && checkAssis(post.userID, post.groupID))){
        let group = getGroup(post.groupID)
        let target = getUser(post.groupID)
        if(target.role <= 1){
            res.send({success: false, error: 'User already has access'})
        } else if(!target.groups.includes(post.groupID)){
            target.groups.push(post.groupID)
            group.participants.push(post.targetID)
            res.send({success: true, error: ''})
        } else {res.send({success: false, error: 'Unknown error'})}
    }
})

//Recieves {userID, targetID, groupID}, returns {err: bool, reload: bool}
app.post('/api/groups/removeUser', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    console.log(post.groupID)
    let user = getUser(post.userID)
    let target = getUser(post.targetID)
    if(user.role <= 1 && target.id >= 2){
        let group = getGroup(post.groupID)
        group.participants.slice(group.participants.findIndex(target.id))
        target.groups.slice(target.groups.findIndex(group.id))
        group.channels.map(channelID => {
            return getChannel(channelID)
        }).forEach(channel => {
            if(channel.participants.includes(post.targetID)){
                channel.participants.splice(channel.participants.indexOf(post.targetID), 1)
                target.channels.splice(target.channels.findIndex(channel.id), 1)
            }
        })
    }
})



//Recieves {userID, targetID, groupID, channelID}, returns {err: bool, reload: bool}
app.post('/api/channels/addUser', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    let user = getUser(post.userID)
    let target = getUser(post.targetID)
    let group = getGroup(post.groupID)
    let channel = getChannel(post.channelID)
    if(user.role<=1 || (user.role==2 && checkAssis(post.userID, post.groupID))){
        if(target.role >= 2 && 
            !target.channels.includes &&
            group.participants.includes(target.id)){
                channel.participants.push(target.id)
                target.channels.push(channel.id)
                saveJSON(res)
            }
    }
})

//Recieves {userID, name, groupID}, returns {err: bool, reload: bool}
app.post('/api/channels/removeUser', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    console.log(post.groupID)
    let role = checkRole(post.userID)
})



//Recieves {userID, channelID}, returns {err: bool, reload: bool}
app.post('/api/channels/readMessages', (req, res) => {
    if(!req.body){
        return res.sendStatus(400);
    }
    let post = req.body
    let channel = getChannel(post.channelID)
    let user = getUser(post.userID)
    if(user.role <= 1 || channel.participants.includes(user.id)){
        fs.readFile(`./logs/channel_${post.channelID}.json`, 'utf8', (err, data) => {
            let messages = []
            if(err) {
                if(err.code==='ENOENT'){
                    let template = {
                        messages: [
                            {
                                timestamp: new Date(),
                                userID: -1,
                                message: 'Hello World'
                            }
                        ]
                    }
                    fs.writeFile(`./logs/channel_${post.channelID}.json`,
                        JSON.stringify(template, null, 4), 'utf8', (err, data) => {
                            if(err) {
                                console.log('Error writing file:  ' + err)
                            } else {
                                console.log('File written successfully')
                                messages = JSON.parse(data)
                                res.send(messages)
                            }
                        })
                }
                console.log(`Error reading file from disk: ${err}`)
            } else {
                console.log(data)
                messages = JSON.parse(data)
                res.send(messages)
            }
        } )
    }
})


function saveJSON(respond){
    const data = JSON.stringify(jsonData, null, 4)
    fs.writeFile('./data.json', data, 'utf-8', (err) =>{
        if(err) {
            console.log('Error writing file:  ' + err)
            return respond.send({success: false, error: 'Failed to save edit to data'})
        } else {
            console.log('File written successfully')
            return respond.send({success: true, error: ''})
        }
    })
} 

function checkAssis(userID, groupID){
    return groups.find(group => {
        return group.id == groupID
    }).assis.includes(userID)
}

function checkRole(userID){
    return users.find((user) => {
        return user.id == userID
    }).role
}

function checkParticipant(userID, channelID){
    return channels.find(channel => {
        return channel.id == channelID
    }).participants.includes(userID)
}

function getUser(userID){
    return users.find(user => {
        return user.id == userID
    })
}

function getGroup(groupID){
    return groups.find(group => {
        return group.id == groupID
    })
}

function getChannel(channelID){
    return channels.find(channel => {
        return channel.id == channelID
    })
}
//Check permission function which gets the user ID and the permission level required, and checks if user meets this permission level