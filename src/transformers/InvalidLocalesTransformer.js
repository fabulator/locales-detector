// @flow
import Transformer from './Transformer';

type SimpleObject = {[string]: string};

const defaultConvertTable: SimpleObject = {
    'es-XL': 'es-419',
    hindi: 'hi',
    indonesian: 'id',
    english: 'en',
};

/**
 * It convert invalid locales.
 */
class InvalidLocalesTransformer extends Transformer {
    convertTable: SimpleObject;

    /**
     * Constructor.
     *
     * @param {SimpleObject} convertTable - simple convert table
     */
    constructor(convertTable: SimpleObject = {}) {
        super();
        this.convertTable = { ...defaultConvertTable, ...convertTable };
    }

    /**
     * Transform invalid languages.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} cleaned list of locales
     */
    transform(locales: Array<string>): Array<string> {
        return locales.map((locale) => {
            return this.convertTable[locale] || locale;
        });
    }
}

export default InvalidLocalesTransformer;
