import { UrlDetector } from './../../src/detectors/index';

describe('UrlDetector', () => {
    it('get locale from url', () => {
        const detector = new UrlDetector('lang', { search: '?a=b&lang=en' });

        expect(detector.getLocales()).toEqual(['en']);
    });

    it('get multiple locale from url', () => {
        const detector = new UrlDetector('lang', { search: '?a=b&lang=en,cs' });

        expect(detector.getLocales()).toEqual(['en', 'cs']);
    });

    it('return empty array if lang is not found', () => {
        const detector = new UrlDetector('lang', { search: '?a=b' });

        expect(detector.getLocales()).toEqual([]);
    });

    it('load url from browser by default', () => {
        const detector = new UrlDetector('lang');

        expect(detector.getLocales()).toEqual([]);
    });
});
