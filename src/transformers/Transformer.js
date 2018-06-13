// @flow strict
/**
 * Transformer are used to change format of locale (eg. convert it to uppercase), create fallbacks or delete invalid items.
 */
export default class Transformer {
    +transform: (locales: Array<string>) => Array<string>;
}
