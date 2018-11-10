import { TRANSFORMERS } from '../../src';

describe('FallbacksTransformer', () => {
    const transformer = new TRANSFORMERS.FallbacksTransformer();

    it('create fallbacks for complicated locales', () => {
        expect(transformer.transform([
            'aa-AA-aa', 'cs-CZ',
        ])).toEqual([
            'aa-AA-aa', 'aa-AA', 'aa', 'cs-CZ', 'cs',
        ]);
    });
});
