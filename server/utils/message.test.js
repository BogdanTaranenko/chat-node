let expect = require('expect');

let {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'I am';
        let text = 'Test message';
        let message = generateMessage(from, text);


        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});
