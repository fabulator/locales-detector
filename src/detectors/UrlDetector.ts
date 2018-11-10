import { parse } from 'query-string';
import Detector from './Detector';

/**
 * This detector load locales from GET parameters. The value should be locale separated list.
 */
export default class UrlDetector extends Detector {
    private location: Location;

    private parameter: string;

    /**
     * Constructor
     *
     * @param {string} parameter - Which parameter to look for.
     * @param {Location} location - window.location is used on default
     */
    public constructor(parameter: string, location: Location = window.location) {
        super();
        this.location = location;
        this.parameter = parameter;
    }

    /**
     * Get list of locales from browser url.
     *
     * @returns {Array<string>} list of locales
     */
    public getLocales(): Array<string> {
        const locales = parse(this.location.search)[this.parameter] || null;

        if (typeof locales === 'string') {
            return locales.split(',');
        }

        return [];
    }
}
