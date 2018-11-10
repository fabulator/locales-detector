import Detector from './detectors/Detector';
import Transformer from './transformers/Transformer';

export default class LocaleResolver {
    private locales: Array<string>;

    private transformers: Array<Transformer>;

    public constructor(detectors: Array<Detector>, transformers: Array<Transformer> = []) {
        this.locales = detectors.map((detector) => {
            return detector.getLocales();
        }).reduce((a, b) => a.concat(b), []);

        this.transformers = transformers;
    }

    public getLocales(transformers: Array<Transformer> = []): Array<string> {
        let { locales } = this;

        [
            ...this.transformers,
            ...transformers,
        ].forEach((transformer) => {
            locales = transformer.transform(locales);
        });

        return locales.filter((value, index, array) => {
            return array.indexOf(value) === index;
        });
    }
}
