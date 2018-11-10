/**
 * Detector classes obtain list of user's locales. It can be from browser, url, cookies, storage, ... whatever you want
 * Get locales method always return array of locales.
 */
export default abstract class Detector {
    abstract getLocales(): Array<string>;
}
