
class Users {
    constructor(){
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let user = this.getUser(id);

        if(user) {
            this.users = this.users.filter(user => user.id !== id)
        }

        return user;
    }

    getUser (id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserList (room) {
        let users = this.users.filter(user => user.room === room);
        return users.map(user => user.name);
    }
}

module.exports = {Users};






// class Person {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} ${this.age}`
//     }
// }
//
// let me = new Person("Bogdan", 21);
//
// let description = me.getUserDescription();
// console.log(description);