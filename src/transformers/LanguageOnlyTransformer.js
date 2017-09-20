// @flow
import Transformer from './Transformer';

/**
 * Transform all locales to languages only with region variant.
 */
class LanguageOnlyTransformer extends Transformer {
    /**
     * Transform locales to languages only with region variant.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} - list of languages
     */
    transform(locales: Array<string>): Array<string> {
        return locales.map((locale) => {
            return locale.split('-')[0];
        });
    }
}

export default LanguageOnlyTransformer;
