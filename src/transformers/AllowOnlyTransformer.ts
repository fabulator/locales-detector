import Transformer from './Transformer';

/**
 * This transformer allows you to filter locales
 */
export default class AllowOnlyTransformer extends Transformer {
    private allowedLocales: string[];

    /**
     * Constructor.
     *
     * @param {Array<string>} allowedLocales - list of allowed locales
     */
    public constructor(allowedLocales: string[]) {
        super();
        this.allowedLocales = allowedLocales;
    }

    /**
     * Return only allowed locales.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} allowed locales
     */
    public transform(locales: string[]): string[] {
        return locales.filter((locale) => {
            return this.allowedLocales.indexOf(locale) >= 0;
        });
    }
}
