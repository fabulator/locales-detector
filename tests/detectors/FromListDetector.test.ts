import { DETECTORS } from '../../src';

describe('FromListDetector', () => {
    it('get locales from array', () => {
        const detector = new DETECTORS.FromListDetector(['ab', 'cd']);

        expect(detector.getLocales()).toEqual(['ab', 'cd']);
    });
});
