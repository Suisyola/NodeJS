class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };

        this.users.push(user);

        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
    }

    getUser(id) {

        var user = this.users.filter((user) => {
            console.log(`user is ${user.id} with type ${typeof user.id}`);
            return user.id === id;
        });

        // return 1st object in array
        return user[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {
    Users: Users
};