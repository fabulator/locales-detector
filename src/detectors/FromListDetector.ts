import Detector from './Detector';

/**
 * With FromListDetector you can set locales by your own.
 */
export default class FromListDetector extends Detector {
    private locales: Array<string>;

    /**
     * @param {Array<string>} locales - list of locales
     */
    public constructor(locales: Array<string>) {
        super();
        this.locales = locales;
    }

    /**
     * Get list your of locales.
     *
     * @returns {Array<string>} list of your locales
     */
    public getLocales(): Array<string> {
        return this.locales;
    }
}
