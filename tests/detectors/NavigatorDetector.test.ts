import { DETECTORS } from '../../src';

const { NavigatorDetector } = DETECTORS;

describe('NavigatorDetector', () => {
    it('get locales from navigator variables', () => {
        // @ts-ignore
        const detector = new NavigatorDetector({
            languages: ['ab', 'cd'],
        });

        expect(detector.getLocales()).toEqual(['ab', 'cd']);
    });

    it('get locale from navigator variables', () => {
        // @ts-ignore
        const detector = new NavigatorDetector({
            language: 'ab',
        });

        expect(detector.getLocales()).toEqual(['ab']);
    });

    it('get locale from navigator variables for old browsers', () => {
        const detector = new NavigatorDetector({
            // @ts-ignore
            userLanguage: 'ab',
        });

        expect(detector.getLocales()).toEqual(['ab']);
    });

    it('return empty array if language is not set', () => {
        const detector = new NavigatorDetector({
            // @ts-ignore
            userLanguage: null,
        });

        expect(detector.getLocales()).toEqual([]);
    });
});
