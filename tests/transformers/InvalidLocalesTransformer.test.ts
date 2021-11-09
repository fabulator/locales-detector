import { TRANSFORMERS } from '../../src';

describe('InvalidLocalesTransformer', () => {
    it('convert invalid locales', () => {
        const transformer = new TRANSFORMERS.InvalidLocalesTransformer();

        expect(transformer.transform(['es-XL', 'es'])).toEqual(['es-419', 'es']);
    });

    it('accept custom set of invali langs', () => {
        const transformer = new TRANSFORMERS.InvalidLocalesTransformer({
            cestina: 'cs',
        });

        expect(transformer.transform(['cestina'])).toEqual(['cs']);
    });
});
