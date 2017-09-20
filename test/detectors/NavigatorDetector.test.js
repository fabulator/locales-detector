import { NavigatorDetector } from './../../src/detectors/index';

describe('NavigatorDetector', () => {
    it('get locales from navigator variables', () => {
        const detector = new NavigatorDetector({
            languages: ['ab', 'cd'],
        });

        expect(detector.getLocales()).toEqual(['ab', 'cd']);
    });

    it('get locale from navigator variables', () => {
        const detector = new NavigatorDetector({
            language: 'ab',
        });

        expect(detector.getLocales()).toEqual(['ab']);
    });

    it('get locale from navigator variables for old browsers', () => {
        const detector = new NavigatorDetector({
            userLanguage: 'ab',
        });

        expect(detector.getLocales()).toEqual(['ab']);
    });

    it('return empty array if language is not set', () => {
        const detector = new NavigatorDetector({
            userLanguage: null,
        });

        expect(detector.getLocales()).toEqual([]);
    });

    it('load navigator from window variable by default', () => {
        window._navigator = window.navigator
        window.navigator = {};
        const detector = new NavigatorDetector();

        expect(detector.getLocales()).toEqual([]);

        window.navigator = window._navigator;
    });
});
