import { TextProcessing } from '../../modules/text/TextProcessing';
import { expect } from 'chai';

describe('TextProcessing tests', () => {
    describe('toByteArray()', () => {
        it('should return array with 4 bytes 1 for each char in stirng + one for end char.', () => { // the single test
            const output = TextProcessing.toByteArray('asd');
            expect(output.length).to.be.equal(4);
            expect(JSON.stringify(output)).to.be.equal(JSON.stringify([97, 115, 100 ,42]));
        });
    });
});
