import { FromListDetector } from './../../src/detectors/index';

describe('FromListDetector', () => {
    it('get locales from array', () => {
        const detector = new FromListDetector(['ab', 'cd']);

        expect(detector.getLocales()).toEqual(['ab', 'cd']);
    });
});
