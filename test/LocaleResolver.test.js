import { LocaleResolver } from './../src/index';
import { NavigatorDetector } from './../src/detectors/index';
import { LanguageOnlyTransformer, FallbacksTransformer, DefaultLocaleTransformer } from './../src/transformers/index';

describe('LocaleResolver', () => {
    it('merges locales from detectors', () => {
        const resolver = new LocaleResolver([
            new NavigatorDetector({ languages: ['cs', 'en'] }),
            new NavigatorDetector({ languages: ['en', 'sk'] }),
        ]);

        expect(resolver.getLocales()).toEqual([
            'cs', 'en', 'sk',
        ]);
    });

    it('uses transformers on locales', () => {
        const resolver = new LocaleResolver([
            new NavigatorDetector({ languages: ['cs-Cz', 'en'] }),
            new NavigatorDetector({ languages: ['en', 'sk-SK'] }),
        ], [new LanguageOnlyTransformer()]);

        expect(resolver.getLocales()).toEqual([
            'cs', 'en', 'sk',
        ]);
    });

    it('allows to use transformers in get locale function', () => {
        const resolver = new LocaleResolver([
            new NavigatorDetector({ languages: ['cs-CZ', 'en'] }),
        ], [new FallbacksTransformer()]);

        expect(resolver.getLocales()).toEqual([
            'cs-CZ', 'cs', 'en',
        ]);

        expect(resolver.getLocales([new DefaultLocaleTransformer('tr')])).toEqual([
            'cs-CZ', 'cs', 'en', 'tr',
        ]);
    });
});
