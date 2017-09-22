// @flow
import Detector from './Detector';

/**
 * With FromListDetector you can set locales by your own.
 */
class FromListDetector extends Detector {
    locales: Array<string>;

    /**
     * On default languages are loaded from window.navigator
     *
     * @param {Array<string>} locales - list of locales
     */
    constructor(locales: Array<string>) {
        super();
        this.locales = locales;
    }

    /**
     * Get list of locales.
     *
     * @returns {Array<string>}
     */
    getLocales(): Array<string> {
        return this.locales;
    }
}

export default FromListDetector;
