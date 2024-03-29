import Transformer from './Transformer';

/**
 * This transformer allows you to append default locale.
 */
export default class DefaultLocaleTransformer extends Transformer {
    private defaultLocale: string;

    /**
     * Constructor.
     *
     * @param {string} defaultLocale - set default locale
     */
    public constructor(defaultLocale: string) {
        super();
        this.defaultLocale = defaultLocale;
    }

    /**
     * Add default locale to end of array
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} locales with default
     */
    public transform(locales: string[]): string[] {
        const transformedLocales = [
            ...locales.flatMap((locale) => {
                const splitedLocale = locale.split('-');
                return splitedLocale
                    .map((value, index) => {
                        const localeGenerator = [];
                        for (let i = 0; i <= index; i++) {
                            localeGenerator.push(splitedLocale[i]);
                        }
                        return localeGenerator.join('-');
                    })
                    .reverse();
            }),
            ...[this.defaultLocale],
        ];

        // slice locales that comes after default locale
        return transformedLocales.slice(0, transformedLocales.indexOf(this.defaultLocale) + 1);
    }
}
