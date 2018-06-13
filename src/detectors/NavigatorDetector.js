// @flow strict
import Detector from './Detector';

/**
 * Navigator detector try load locales from browser navigator variable.
 */
export default class NavigatorDetector extends Detector {
    navigator: Navigator;

    /**
     * On default languages are loaded from window.navigator
     *
     * @param {Navigator} navigator - browser navigator variable
     */
    constructor(navigator: Navigator = window.navigator) {
        super();
        this.navigator = navigator;
    }

    /**
     * Get list of locales.
     *
     * @returns {Array<string>} list of locales from browser
     */
    getLocales(): Array<string> {
        // $FlowFixMe
        const { languages, language, userLanguage } = this.navigator;

        if (Array.isArray(languages)) {
            return languages;
        }

        if (language) {
            return [language];
        }

        if (userLanguage) {
            return [userLanguage];
        }

        return [];
    }
}
