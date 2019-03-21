/**
 * Transformer are used to change format of locale (eg. convert it to uppercase), create fallbacks or delete invalid items.
 */
export default abstract class Transformer {
    public abstract transform(locales: string[]): string[];
}
