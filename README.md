Locales Detector
============
[![npm version](https://badge.fury.io/js/locales-detector.svg)](https://badge.fury.io/js/locales-detector)
[![renovate-app](https://img.shields.io/badge/renovate-app-blue.svg)](https://renovateapp.com/) 
[![Known Vulnerabilities](https://snyk.io/test/github/fabulator/locales-detector/badge.svg)](https://snyk.io/test/github/fabulator/locales-detector)
[![codecov](https://codecov.io/gh/fabulator/locales-detector/branch/master/graph/badge.svg)](https://codecov.io/gh/fabulator/locales-detector) 
[![travis](https://travis-ci.org/fabulator/locales-detector.svg?branch=master)](https://travis-ci.org/fabulator/locales-detector)

This library is for detecting users locales from browser, url or some custom sources. The you can transform these languages to desired formats. 

Compared to other libraries, this always return array of locales, not only first one. Thanks to this you can work with fallback to secondary languages.

You can use package as npm module. Just install it:

```sh
npm install locales-detector --save
```

and use it in you project:

```js
const { LocaleResolver, DETECTORS } = require('locales-detector');

console.log((new LocaleResolver([new DETECTORS.NavigatorDetector()])).getLocales());
// output ['es', 'en]
```

It can be also used with RequireJS, CommonJS, Browserify or Webpack.

## LocaleResolver
LocaleResolver class is core of this library. Constructor have two arguments - array of Detectors and optional array of Transformers.

### Detector
Detectors are classes that can detect users locales. It always return array of locales (or empty array). You can used prebuild or write you custom.

Prebuild decetors are NavigatorDetector and UrlDetector:

```js
const { LocaleResolver, DETECTORS } = require('locales-detector');

// try to find lang settings in lang GET parameter
const urlDetector = new DETECTORS.UrlDetector('lang');

// try to find lang in browser settings
const navigatorDetector = new DETECTORS.NavigatorDetector();

console.log((new LocaleResolver([urlDetector, navigatorDetector])).getLocales());
// output ['es', 'en]
```

If you want to build your own detector, create new class with getLocales method that always return array.

```js
class CustomDetector {
    getLocales() {
        return ['es'];
    }
}
```

### Transformers

Transformers allow you to modify format of locales, remove some you dont want to or create custom callbacks. Same as with Detector you can use some prebuild or create your own.

Prebuild transformers are:

**FallbacksTransformer**

Create automatic callback for regional specific languages. eg. from ['en-GB'] it will make ['en-GB', 'en'].

**IETFTransformer**

It convert language format to standardised IETFT. eg. from ['en-gb'] it will make ['en-GB'']

**InvalidLocalesTransformer**

It convert some unstandard language format like ['english'] => ['en']. There is some default setting but you can set your own convert table. 

**LanguageOnlyTransformer**

If you don't want to bother with regional locales of language, you can just strip it. It make from ['en-GB'] => ['en']

If you want to build your own transformer, create new class with transform method that have flat array of locales as parameter and return flat array of locales.

```js
class CustomTransformer {
    transform(locales) {
        return locales.map((locale) => {
            return locale.toLocaleLowerCase();
        });
    }
}
```

## Example

In example you can see object that first load locales from url and then from browser settings. It create automatic fallbacks and convert ivalid locales.

```js
const { LocaleResolver, DETECTORS, TRANSFORMERS } = require('locales-detector');

console.log((new LocaleResolver([new DETECTORS.UrlDetector('lang'), new DETECTORS.NavigatorDetector()], [new TRANSFORMERS.InvalidLocalesTransformer(), new TRANSFORMERS.FallbacksTransformer()])).getLocales());
// output ['es-419', 'es', 'en']
```
