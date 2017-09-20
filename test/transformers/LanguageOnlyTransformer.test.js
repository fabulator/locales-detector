import { LanguageOnlyTransformer } from './../../src/transformers/index';

describe('LanguageOnlyTransformer', () => {
    const transformer = new LanguageOnlyTransformer();

    it('convert locales to language only variant', () => {
        expect(transformer.transform([
            'en', 'cs-CZ', 'sk', 'de-CZ-mo',
        ])).toEqual([
            'en', 'cs', 'sk', 'de',
        ]);
    });
});
