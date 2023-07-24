const user = {}

function setUser(userName,socket){
    user[userName]=socket.id;
}

function getUser(userName){
    return user[userName];

}

function deleteUser(userName){
    delete user[userName];
}

function  getAll(){
    return user;
}
module.exports={
    setUser,
    getUser,
    deleteUser,
    getAll
};