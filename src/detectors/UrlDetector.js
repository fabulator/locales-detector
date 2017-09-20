// @flow
import queryString from 'query-string'
import Detector from './Detector';

/**
 * This detector load locales from GET parameters. The value should be locale separated list.
 */
class UrlDetector extends Detector {
    location: Location;
    parameter: string;

    /**
     * Constructor
     *
     * @param {string} parameter - Which parameter to look for.
     * @param {Location} location - window.location is used on default
     */
    constructor(parameter: string, location: Location = window.location) {
        super();
        this.location = location;
        this.parameter = parameter;
    }

    /**
     * Get list of locales from browser url.
     *
     * @returns {Array<string>} list of locales
     */
    getLocales(): Array<string> {
        const locales = queryString.parse(this.location.search)[this.parameter] || null;

        if (locales) {
            return locales.split(',');
        }

        return [];
    }
}

export default UrlDetector;
