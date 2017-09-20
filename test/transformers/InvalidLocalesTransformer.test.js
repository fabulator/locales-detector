import { InvalidLocalesTransformer } from './../../src/transformers/index';

describe('InvalidLocalesTransformer', () => {
    it('convert invalid locales', () => {
        const transformer = new InvalidLocalesTransformer();

        expect(transformer.transform([
            'es-XL', 'es',
        ])).toEqual([
            'es-419', 'es',
        ]);
    });

    it('accept custom set of invali langs', () => {
        const transformer = new InvalidLocalesTransformer({
            cestina: 'cs',
        });

        expect(transformer.transform([
            'cestina',
        ])).toEqual([
            'cs',
        ]);
    });
});
