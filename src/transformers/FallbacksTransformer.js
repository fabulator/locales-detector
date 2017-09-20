// @flow
import Transformer from './Transformer';

/**
 * This transformers create fallbacks from complex locales to simpliest.
 * 'en-US-east' => ['en-US-east', 'en-US', 'en']
 * 'es-ES' => ['es-ES', 'es']
 */
class FallbacksTransformer extends Transformer {
    /**
     * Add fallbacks to locales. Locales should be in IETF language tag format.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} locales with fallbacks
     */
    transform(locales: Array<string>): Array<string> {
        return locales.map((locale) => {
            const splitedLocale = locale.split('-');
            return splitedLocale.map((value, index) => {
                const localeGenerator = [];
                for (let i = 0; i <= index; i++) {
                    localeGenerator.push(splitedLocale[i]);
                }
                return localeGenerator.join('-');
            }).reverse();
        }).reduce((a, b) => a.concat(b), []);
    }
}

export default FallbacksTransformer;
