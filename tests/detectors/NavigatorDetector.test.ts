import { DETECTORS } from '../../src';

const { NavigatorDetector } = DETECTORS;

describe('NavigatorDetector', () => {
    it('get locales from navigator variables', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const detector = new NavigatorDetector({
            languages: ['ab', 'cd'],
        });

        expect(detector.getLocales()).toEqual(['ab', 'cd']);
    });

    it('get locale from navigator variables', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const detector = new NavigatorDetector({
            language: 'ab',
        });

        expect(detector.getLocales()).toEqual(['ab']);
    });

    it('get locale from navigator variables for old browsers', () => {
        const detector = new NavigatorDetector({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            userLanguage: 'ab',
        });

        expect(detector.getLocales()).toEqual(['ab']);
    });

    it('return empty array if language is not set', () => {
        const detector = new NavigatorDetector({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            userLanguage: null,
        });

        expect(detector.getLocales()).toEqual([]);
    });
});
