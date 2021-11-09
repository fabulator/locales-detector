import Transformer from './Transformer';

/**
 * This transformer convert locales to standard IETF language tag.
 */
export default class IETFTransformer extends Transformer {
    private localeSeparator: string;

    /**
     * Constructor.
     *
     * @param {string} localeSeparator - how is locales parts separated
     */
    public constructor(localeSeparator = '-') {
        super();
        this.localeSeparator = localeSeparator;
    }

    /**
     * Convert locales to standard IETF language tag.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} list of transformed locales
     */
    public transform(locales: string[]): string[] {
        return locales.map((locale) => {
            return locale
                .split(this.localeSeparator)
                .map((value: string, index: number) => {
                    return index === 1 ? value.toUpperCase() : value.toLowerCase();
                })
                .join('-');
        });
    }
}
