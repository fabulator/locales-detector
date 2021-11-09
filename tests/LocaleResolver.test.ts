import { LocaleResolver, DETECTORS, TRANSFORMERS } from '../src';

const { NavigatorDetector } = DETECTORS;
const { LanguageOnlyTransformer, FallbacksTransformer, DefaultLocaleTransformer } = TRANSFORMERS;

describe('LocaleResolver', () => {
    it('merges locales from detectors', () => {
        const resolver = new LocaleResolver([
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            new NavigatorDetector({ languages: ['cs', 'en'] }),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            new NavigatorDetector({ languages: ['en', 'sk'] }),
        ]);

        expect(resolver.getLocales()).toEqual(['cs', 'en', 'sk']);
    });

    it('uses transformers on locales', () => {
        const resolver = new LocaleResolver(
            [
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                new NavigatorDetector({ languages: ['cs-Cz', 'en'] }),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                new NavigatorDetector({ languages: ['en', 'sk-SK'] }),
            ],
            [new LanguageOnlyTransformer()],
        );

        expect(resolver.getLocales()).toEqual(['cs', 'en', 'sk']);
    });

    it('allows to use transformers in get locale function', () => {
        const resolver = new LocaleResolver(
            [
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                new NavigatorDetector({ languages: ['cs-CZ', 'en'] }),
            ],
            [new FallbacksTransformer()],
        );

        expect(resolver.getLocales()).toEqual(['cs-CZ', 'cs', 'en']);

        expect(resolver.getLocales([new DefaultLocaleTransformer('tr')])).toEqual(['cs-CZ', 'cs', 'en', 'tr']);
    });
});
