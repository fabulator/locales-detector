import Transformer from './Transformer';

type SimpleObject = {[language: string]: string};

const defaultConvertTable: SimpleObject = {
    'es-XL': 'es-419',
    hindi: 'hi',
    indonesian: 'id',
    english: 'en',
};

/**
 * It convert invalid locales.
 */
export default class InvalidLocalesTransformer extends Transformer {
    private convertTable: SimpleObject;

    /**
     * Constructor.
     *
     * @param {SimpleObject} convertTable - simple convert table
     */
    public constructor(convertTable: SimpleObject = {}) {
        super();
        this.convertTable = { ...defaultConvertTable, ...convertTable };
    }

    /**
     * Transform invalid languages.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} cleaned list of locales
     */
    public transform(locales: Array<string>): Array<string> {
        return locales.map((locale) => {
            return this.convertTable[locale] || locale;
        });
    }
}
