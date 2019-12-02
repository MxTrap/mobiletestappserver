class UsersContainer {
    constructor(){
        this.usersArray=[];
    }
    get allUsers(){
        return this.usersArray;
    }
    addNewUser(user){
        this.usersArray.push(user);
    }

    getUser(number){
        return this.usersArray[number];

    }
    deleteUser(number){
        this.usersArray.splice(number, 1);
 }
    getUsersNumber(){
        return this.usersArray.length;
    }
}

//
var userContainer = new UsersContainer();
module.exports =userContainer;