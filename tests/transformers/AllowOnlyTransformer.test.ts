import { TRANSFORMERS } from '../../src';

describe('AllowOnlyTransformer', () => {
    const transformer = new TRANSFORMERS.AllowOnlyTransformer(['en', 'sk']);

    it('filter out all locales that are not allowed', () => {
        expect(transformer.transform(['aa', 'bb', 'en', 'cc'])).toEqual(['en']);

        expect(transformer.transform(['aa', 'bb', 'en', 'cc', 'sk', 'dd'])).toEqual(['en', 'sk']);
    });
});
