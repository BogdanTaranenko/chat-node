let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'I am';
        let text = 'Test message';
        let message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});

describe('generateLocationMessage', () => {
   it('should generate correct location object', () => {
       let from = "Who knows";
       let latitude = 1;
       let longitude = 667;
       let location = generateLocationMessage(from, latitude, longitude);

       let url = `https://www.google.com/maps?q=1,667`;

        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({from, url})
   })
});