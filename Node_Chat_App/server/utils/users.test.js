const expect = require('expect');
const Users = require('./users.js').Users;

describe('Users', () => {
    
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Candice',
            room: 'Node Course'
        },{
            id: '3',
            name: 'Joel',
            room: 'React Course'
        }]    
    })

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };

        var responseUser = users.addUser(user.id, user.name, user.room);

        expect(responseUser).toEqual(user);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var remainingUsers = users.removeUser('1');

        expect(remainingUsers).toContain(users.users[1]);
        expect(remainingUsers).toContain(users.users[2]);
    });

    it('should not remove user', () => {
        var remainingUsers = users.removeUser('4');

        expect(remainingUsers).toContain(users.users[0]);
        expect(remainingUsers).toContain(users.users[1]);
        expect(remainingUsers).toContain(users.users[2]);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toEqual(userId);
    });

    it('should not find user', () => {
        var user = users.getUser('4');

        expect(user).toEqual(undefined);
        expect(user).toNotExist;
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Candice']);
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Joel']);
    });

});