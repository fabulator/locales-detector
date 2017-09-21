import queryString from 'query-string';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Transformer are used to change format of locale (eg. convert it to uppercase), create fallbacks or delete invalid items.
 */
var Transformer = function Transformer() {
  classCallCheck(this, Transformer);
};

/**
 * This transformers create fallbacks from complex locales to simpliest.
 * 'en-US-east' => ['en-US-east', 'en-US', 'en']
 * 'es-ES' => ['es-ES', 'es']
 */

var FallbacksTransformer = function (_Transformer) {
    inherits(FallbacksTransformer, _Transformer);

    function FallbacksTransformer() {
        classCallCheck(this, FallbacksTransformer);
        return possibleConstructorReturn(this, (FallbacksTransformer.__proto__ || Object.getPrototypeOf(FallbacksTransformer)).apply(this, arguments));
    }

    createClass(FallbacksTransformer, [{
        key: 'transform',

        /**
         * Add fallbacks to locales. Locales should be in IETF language tag format.
         *
         * @param {Array<string>} locales - list of locales
         * @returns {Array<string>} locales with fallbacks
         */
        value: function transform(locales) {
            return locales.map(function (locale) {
                var splitedLocale = locale.split('-');
                return splitedLocale.map(function (value, index) {
                    var localeGenerator = [];
                    for (var i = 0; i <= index; i++) {
                        localeGenerator.push(splitedLocale[i]);
                    }
                    return localeGenerator.join('-');
                }).reverse();
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []);
        }
    }]);
    return FallbacksTransformer;
}(Transformer);

/**
 * This transformer convert locales to standard IETF language tag.
 */

var IETFTransformer = function (_Transformer) {
    inherits(IETFTransformer, _Transformer);

    /**
     * Constructor.
     *
     * @param {string} localeSeparator - how is locales parts separated
     */
    function IETFTransformer() {
        var localeSeparator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-';
        classCallCheck(this, IETFTransformer);

        var _this = possibleConstructorReturn(this, (IETFTransformer.__proto__ || Object.getPrototypeOf(IETFTransformer)).call(this));

        _this.localeSeparator = localeSeparator;
        return _this;
    }

    /**
     * Convert locales to standard IETF language tag.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>}
     */


    createClass(IETFTransformer, [{
        key: 'transform',
        value: function transform(locales) {
            var _this2 = this;

            return locales.map(function (locale) {
                return locale.split(_this2.localeSeparator).map(function (value, index) {
                    return index === 1 ? value.toUpperCase() : value.toLowerCase();
                }).join('-');
            });
        }
    }]);
    return IETFTransformer;
}(Transformer);

var defaultConvertTable = {
    'es-XL': 'es-419',
    hindi: 'hi',
    indonesian: 'id',
    english: 'en'
};

/**
 * It convert invalid locales.
 */

var InvalidLocalesTransformer = function (_Transformer) {
    inherits(InvalidLocalesTransformer, _Transformer);

    /**
     * Constructor.
     *
     * @param {SimpleObject} convertTable - simple convert table
     */
    function InvalidLocalesTransformer() {
        var convertTable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, InvalidLocalesTransformer);

        var _this = possibleConstructorReturn(this, (InvalidLocalesTransformer.__proto__ || Object.getPrototypeOf(InvalidLocalesTransformer)).call(this));

        _this.convertTable = _extends({}, defaultConvertTable, convertTable);
        return _this;
    }

    /**
     * Transform invalid languages.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} cleaned list of locales
     */


    createClass(InvalidLocalesTransformer, [{
        key: 'transform',
        value: function transform(locales) {
            var _this2 = this;

            return locales.map(function (locale) {
                return _this2.convertTable[locale] || locale;
            });
        }
    }]);
    return InvalidLocalesTransformer;
}(Transformer);

/**
 * Transform all locales to languages only with region variant.
 */

var LanguageOnlyTransformer = function (_Transformer) {
    inherits(LanguageOnlyTransformer, _Transformer);

    function LanguageOnlyTransformer() {
        classCallCheck(this, LanguageOnlyTransformer);
        return possibleConstructorReturn(this, (LanguageOnlyTransformer.__proto__ || Object.getPrototypeOf(LanguageOnlyTransformer)).apply(this, arguments));
    }

    createClass(LanguageOnlyTransformer, [{
        key: 'transform',

        /**
         * Transform locales to languages only with region variant.
         *
         * @param {Array<string>} locales - list of locales
         * @returns {Array<string>} - list of languages
         */
        value: function transform(locales) {
            return locales.map(function (locale) {
                return locale.split('-')[0];
            });
        }
    }]);
    return LanguageOnlyTransformer;
}(Transformer);

/**
 * This transformer allows you to append default locale.
 */

var DefaultLocaleTransformer = function (_Transformer) {
    inherits(DefaultLocaleTransformer, _Transformer);

    /**
     * Constructor.
     *
     * @param {string} defaultLocale - set default locale
     */
    function DefaultLocaleTransformer(defaultLocale) {
        classCallCheck(this, DefaultLocaleTransformer);

        var _this = possibleConstructorReturn(this, (DefaultLocaleTransformer.__proto__ || Object.getPrototypeOf(DefaultLocaleTransformer)).call(this));

        _this.defaultLocale = defaultLocale;
        return _this;
    }
    /**
     * Add default locale to end of array
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} locales with default
     */


    createClass(DefaultLocaleTransformer, [{
        key: 'transform',
        value: function transform(locales) {
            return [].concat(toConsumableArray(locales.map(function (locale) {
                var splitedLocale = locale.split('-');
                return splitedLocale.map(function (value, index) {
                    var localeGenerator = [];
                    for (var i = 0; i <= index; i++) {
                        localeGenerator.push(splitedLocale[i]);
                    }
                    return localeGenerator.join('-');
                }).reverse();
            }).reduce(function (a, b) {
                return a.concat(b);
            }, [])), [this.defaultLocale]);
        }
    }]);
    return DefaultLocaleTransformer;
}(Transformer);

/**
 * This transformer allows you to filter locales
 */

var AllowOnlyTransformer = function (_Transformer) {
    inherits(AllowOnlyTransformer, _Transformer);

    /**
     * Constructor.
     *
     * @param {Array<string>} allowedLocales - list of allowed locales
     */
    function AllowOnlyTransformer(allowedLocales) {
        classCallCheck(this, AllowOnlyTransformer);

        var _this = possibleConstructorReturn(this, (AllowOnlyTransformer.__proto__ || Object.getPrototypeOf(AllowOnlyTransformer)).call(this));

        _this.allowedLocales = allowedLocales;
        return _this;
    }

    /**
     * Return only allowed locales.
     *
     * @param {Array<string>} locales - list of locales
     * @returns {Array<string>} allowed locales
     */


    createClass(AllowOnlyTransformer, [{
        key: 'transform',
        value: function transform(locales) {
            var _this2 = this;

            return locales.filter(function (locale) {
                return _this2.allowedLocales.indexOf(locale) >= 0;
            });
        }
    }]);
    return AllowOnlyTransformer;
}(Transformer);

/**
 * Detector classes obtain list of user's locales. It can be from browser, url, cookies, storage, ... whatever you want
 * Get locales method always return array of locales.
 */
var Detector = function Detector() {
  classCallCheck(this, Detector);
};

/**
 * Navigator detector try load locales from brower navigator variable.
 */

var NavigatorDetector = function (_Detector) {
    inherits(NavigatorDetector, _Detector);

    /**
     * On default languages are loaded from window.navigator
     *
     * @param {Navigator} navigator - browser navigator variable
     */
    function NavigatorDetector() {
        var navigator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator;
        classCallCheck(this, NavigatorDetector);

        var _this = possibleConstructorReturn(this, (NavigatorDetector.__proto__ || Object.getPrototypeOf(NavigatorDetector)).call(this));

        _this.navigator = navigator;
        return _this;
    }

    /**
     * Get list of locales.
     *
     * @returns {Array<string>}
     */


    createClass(NavigatorDetector, [{
        key: 'getLocales',
        value: function getLocales() {
            // $FlowFixMe
            var _navigator = this.navigator,
                languages = _navigator.languages,
                language = _navigator.language,
                userLanguage = _navigator.userLanguage;


            if (Array.isArray(languages)) {
                return languages;
            }

            if (language) {
                return [language];
            }

            if (userLanguage) {
                return [userLanguage];
            }

            return [];
        }
    }]);
    return NavigatorDetector;
}(Detector);

/**
 * This detector load locales from GET parameters. The value should be locale separated list.
 */

var UrlDetector = function (_Detector) {
    inherits(UrlDetector, _Detector);

    /**
     * Constructor
     *
     * @param {string} parameter - Which parameter to look for.
     * @param {Location} location - window.location is used on default
     */
    function UrlDetector(parameter) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
        classCallCheck(this, UrlDetector);

        var _this = possibleConstructorReturn(this, (UrlDetector.__proto__ || Object.getPrototypeOf(UrlDetector)).call(this));

        _this.location = location;
        _this.parameter = parameter;
        return _this;
    }

    /**
     * Get list of locales from browser url.
     *
     * @returns {Array<string>} list of locales
     */


    createClass(UrlDetector, [{
        key: 'getLocales',
        value: function getLocales() {
            var locales = queryString.parse(this.location.search)[this.parameter] || null;

            if (locales) {
                return locales.split(',');
            }

            return [];
        }
    }]);
    return UrlDetector;
}(Detector);

var LocaleResolver = function () {
    function LocaleResolver(detectors) {
        var transformers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        classCallCheck(this, LocaleResolver);

        this.locales = detectors.map(function (detector) {
            return detector.getLocales();
        }).reduce(function (a, b) {
            return a.concat(b);
        }, []);

        this.transformers = transformers;
    }

    createClass(LocaleResolver, [{
        key: 'getLocales',
        value: function getLocales() {
            var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var locales = this.locales;

            [].concat(toConsumableArray(this.transformers), toConsumableArray(transformers)).forEach(function (transformer) {
                locales = transformer.transform(locales);
            });

            return locales.filter(function (value, index, array) {
                return array.indexOf(value) === index;
            });
        }
    }]);
    return LocaleResolver;
}();

export { FallbacksTransformer, IETFTransformer, InvalidLocalesTransformer, LanguageOnlyTransformer, DefaultLocaleTransformer, AllowOnlyTransformer, NavigatorDetector, UrlDetector, LocaleResolver };
