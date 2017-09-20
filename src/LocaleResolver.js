// @flow
import Detector from './detectors/Detector';
import Transformer from './transformers/Transformer';

class LocaleResolver {
    detectors: Array<Detector>;
    transformers: Array<Transformer>;

    constructor(detectors: Array<Detector>, transformers: Array<Transformer> = []) {
        this.detectors = detectors;
        this.transformers = transformers;
    }

    getLocales(): Array<string> {
        let locales = this.detectors.map((detector) => {
            return detector.getLocales();
        }).reduce((a, b) => a.concat(b), []);

        this.transformers.forEach((transformer) => {
            locales = transformer.transform(locales);
        });

        return locales.filter((value, index, array) => {
            return array.indexOf(value) === index;
        });
    }
}

export default LocaleResolver;
