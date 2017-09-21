// @flow
import Transformer from './Transformer';

/**
 * This transformer allows you to filter locales
 */
class AllowOnlyTransformer extends Transformer {
    allowedLocales: Array<string>;

    /**
     * Constructor.
     *
     * @param {Array<string>} allowedLocales - list of allowed locales
     */
    constructor(allowedLocales: Array<string>) {
        super();
        this.allowedLocales = allowedLocales;
    }

    /**
     * Return only allowed locales.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} allowed locales
     */
    transform(locales: Array<string>): Array<string> {
        return locales.filter((locale) => {
            return this.allowedLocales.indexOf(locale) >= 0;
        });
    }
}

export default AllowOnlyTransformer;
