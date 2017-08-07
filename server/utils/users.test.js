const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '777',
            name: 'Nikolai',
            room: 'Skyrim fans'
        }, {
            id: '222',
            name: 'Anna',
            room: 'Instagram in brain'
        }, {
            id: '9',
            name: 'Dovakin',
            room: 'Skyrim fans'
        }];
    });


   it('Should add new user', () => {
      let users = new Users();
      let user = {
          id: '123',
          name: 'Bogdan',
          room: 'Simpsons fans'
      };
      let resUser = users.addUser(user.id, user.name, user.room);


      expect(users.users).toEqual([user]);
   });

   it('Should remove a user', () => {
        let userId = '222';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
   });

    it('Should not remove a user', () => {
        let userId = '90';
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        let userId = '777';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Should not find user', () => {
        let userId = '43';
        let user = users.getUser(userId);

        expect(user).toNotExist();
    });

   it('Should return names for "Skyrim fans" room', () => {
       let userList = users.getUserList('Skyrim fans');

       expect(userList).toEqual(['Nikolai', 'Dovakin'])
   });

    it('Should return names for "Instagram in brain" room', () => {
        let userList = users.getUserList('Instagram in brain');

        expect(userList).toEqual(['Anna'])
    });
});

