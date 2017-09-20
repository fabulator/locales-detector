import { IETFTransformer } from './../../src/transformers/index';

describe('FallbacksTransformer', () => {
    it('convert bad formated locales to IETFT format', () => {
        const transformer = new IETFTransformer();

        expect(transformer.transform([
            'aa', 'aa-aa', 'BB-bb',
        ])).toEqual([
            'aa', 'aa-AA', 'bb-BB',
        ]);
    });

    it('use splitter base on constructor settings', () => {
        const transformer = new IETFTransformer('_');

        expect(transformer.transform([
            'aa_AA',
        ])).toEqual([
            'aa-AA',
        ]);
    });
});
