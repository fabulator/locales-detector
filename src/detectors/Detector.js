// @flow strict

/**
 * Detector classes obtain list of user's locales. It can be from browser, url, cookies, storage, ... whatever you want
 * Get locales method always return array of locales.
 */
class Detector {
    +getLocales: () => Array<string>;
}

export default Detector;
