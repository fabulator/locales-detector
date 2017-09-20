import { LocaleResolver } from './../src/index';
import { NavigatorDetector } from './../src/detectors/index';
import { LanguageOnlyTransformer } from './../src/transformers/index';

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
});
