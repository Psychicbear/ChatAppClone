const db = require('./operations')

async function getOnlineUsers(io, collection, itemID){
    let users = await db.fetchUsers(collection, itemID)
    online = []
    for (let [id, socket] of io.of('/').sockets){
        online.push({
            userID: socket.userID,
            username: socket.username,
            channelID: socket.channelID ? socket.channelID : null,
            online: true
        })
    }
    users = users.map(user => {
        check = online.find(res => {
            return user.userID.equals(res.userID)
        })
        console.log(check ? check : user)
        return check ? check : user
    })

    return users
}

exports.joinChannel = function(io, socket) {
    socket.on('joinChannel', async (data) => {
        socket.join(data.channelID)
        socket.channelID = data.channelID
        let chatHistory = await db.fetchChat(data.channelID)
        socket.emit('getHistory', chatHistory)
        users = await getOnlineUsers(io, 'channels', data.channelID)

        io.sockets.to(data.channelID).emit('updateParticipants', users)

    })
}

exports.leaveChannel = function(io, socket) {
    socket.on('leaveChannel', async channelID => {
        socket.leave(channelID)
        socket.channelID = null
        let users = await getOnlineUsers(io, 'channels', channelID)
        io.sockets.to(channelID).emit('updateParticipants', users)
    })
}

exports.addUserToChannel = function(io, socket) {
    socket.on('addUserToChannel', async targetID => {
        console.log(socket.groupID)
        let add = await db.addUserToChannel(socket.userID, targetID, socket.channelID, socket.groupID)
        if(add.success){
            io.sockets.to(socket.channelID).emit('updateParticipants', users)
        }
        
    })
}

exports.setCurrentGroup = function(io, socket) {
    socket.on('openGroup', group => {
        socket.groupID = group
    })
}