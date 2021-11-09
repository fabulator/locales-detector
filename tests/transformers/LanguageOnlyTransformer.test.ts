import { TRANSFORMERS } from '../../src';

describe('LanguageOnlyTransformer', () => {
    const transformer = new TRANSFORMERS.LanguageOnlyTransformer();

    it('convert locales to language only variant', () => {
        expect(transformer.transform(['en', 'cs-CZ', 'sk', 'de-CZ-mo'])).toEqual(['en', 'cs', 'sk', 'de']);
    });
});
