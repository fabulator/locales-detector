import { DefaultLocaleTransformer } from './../../src/transformers/index';

describe('DefaultLocaleTransformer', () => {
    const transformer = new DefaultLocaleTransformer('en');

    it('create default locale fallback from empty', () => {
        expect(transformer.transform([])).toEqual([
            'en',
        ]);
    });

    it('add default locale fallback to locale list', () => {
        expect(transformer.transform(['cs'])).toEqual([
            'cs', 'en',
        ]);
    });
});
