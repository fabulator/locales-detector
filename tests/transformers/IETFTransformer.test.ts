import { TRANSFORMERS } from '../../src';

describe('FallbacksTransformer', () => {
    it('convert bad formated locales to IETFT format', () => {
        const transformer = new TRANSFORMERS.IETFTransformer();

        expect(transformer.transform([
            'aa', 'aa-aa', 'BB-bb',
        ])).toEqual([
            'aa', 'aa-AA', 'bb-BB',
        ]);
    });

    it('use splitter base on constructor settings', () => {
        const transformer = new TRANSFORMERS.IETFTransformer('_');

        expect(transformer.transform([
            'aa_AA',
        ])).toEqual([
            'aa-AA',
        ]);
    });
});
