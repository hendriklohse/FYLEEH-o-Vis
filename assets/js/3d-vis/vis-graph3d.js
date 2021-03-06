/**
 * vis-graph3d
 * https://visjs.github.io/vis-graph3d/
 *
 * Create interactive, animated 3d graphs. Surfaces, lines, dots and block styling out of the box.
 *
 * @version 0.0.0-no-version
 * @date    2020-04-26T07:58:11.806Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.vis = global.vis || {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var path = {};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0:
	          return new NativeConstructor();

	        case 1:
	          return new NativeConstructor(a);

	        case 2:
	          return new NativeConstructor(a, b);
	      }

	      return new NativeConstructor(a, b, c);
	    }

	    return NativeConstructor.apply(this, arguments);
	  };

	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/


	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;
	  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;
	  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
	  var targetPrototype = target.prototype;
	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

	    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
	    targetProperty = target[key];
	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key]; // export native or implementation

	    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1); // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
	      else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty); // default case
	        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

	    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

	      if (!has(path, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
	      } // export virtual prototype methods


	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var hiddenKeys = {};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var f$3 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$3
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var nativeAssign = Object.assign;
	var defineProperty = Object.defineProperty; // `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign

	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({
	    b: 1
	  }, nativeAssign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), {
	    b: 2
	  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// https://tc39.github.io/ecma262/#sec-object.assign

	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	var assign = path.Object.assign;

	var assign$1 = assign;

	var assign$2 = assign$1;

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var slice = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout
	  /* , ...arguments */
	  ) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	}; // ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


	_export({
	  global: true,
	  bind: true,
	  forced: MSIE
	}, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global_1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global_1.setInterval)
	});

	var setTimeout = path.setTimeout;

	var setTimeout$1 = setTimeout;

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.6.4',
	    mode:  'pure' ,
	    copyright: '?? 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$1] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED
	}, {
	  concat: function concat(arg) {
	    // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }

	    A.length = n;
	    return A;
	  }
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var concat = entryVirtual('Array').concat;

	var ArrayPrototype = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.concat ? concat : own;
	};

	var concat$1 = concat_1;

	var concat$2 = concat$1;

	// https://tc39.github.io/ecma262/#sec-number.isnan

	_export({
	  target: 'Number',
	  stat: true
	}, {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	var isNan = path.Number.isNaN;

	var isNan$1 = isNan;

	var isNan$2 = isNan$1;

	// https://tc39.github.io/ecma262/#sec-array.isarray

	_export({
	  target: 'Array',
	  stat: true
	}, {
	  isArray: isArray
	});

	var isArray$1 = path.Array.isArray;

	var isArray$2 = isArray$1;

	var isArray$3 = isArray$2;

	var f$4 = wellKnownSymbol;
	var wellKnownSymbolWrapped = {
	  f: f$4
	};

	var defineProperty$1 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	// https://tc39.github.io/ecma262/#sec-symbol.iterator

	defineWellKnownSymbol('iterator');

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var EmptyConstructor = function () {
	  /* empty */
	};

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var defineProperty$2 = objectDefineProperty.f;
	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;

	    if (!has(target, TO_STRING_TAG$2)) {
	      defineProperty$2(target, TO_STRING_TAG$2, {
	        configurable: true,
	        value: TAG
	      });
	    }

	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty(target, 'toString', objectToString);
	    }
	  }
	};

	var iterators = {};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis = function () {
	  return this;
	};

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () {
	  return this;
	};

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }

	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis$1;
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var charAt = stringMultibyte.charAt;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  }); // `%StringIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return {
	    value: undefined,
	    done: true
	  };
	  point = charAt(string, index);
	  state.index += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;

	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  if (kind == 'keys') return {
	    value: index,
	    done: false
	  };
	  if (kind == 'values') return {
	    value: target[index],
	    done: false
	  };
	  return {
	    value: [index, target[index]],
	    done: false
	  };
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;

	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	  }

	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	var iterator = wellKnownSymbolWrapped.f('iterator');

	var iterator$1 = iterator;

	var iterator$2 = iterator$1;

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$5
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
	  f: f$6
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              push.call(target, value);
	            // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6)
	};

	var $forEach = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () {
	      return nativeDefineProperty$1(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$1(O, P, Attributes);

	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);

	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, {
	        enumerable: createPropertyDescriptor(0, false)
	      });
	    }

	    return setSymbolDescriptor(O, key, Attributes);
	  }

	  return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }

	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	}; // `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor


	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);

	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };

	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
	      configurable: true,
	      set: setter
	    });
	    return wrap$1(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap$1(uid(description), description);
	  });
	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap$1(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	_export({
	  global: true,
	  wrap: true,
	  forced: !nativeSymbol,
	  sham: !nativeSymbol
	}, {
	  Symbol: $Symbol
	});
	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});
	_export({
	  target: SYMBOL,
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () {
	    USE_SETTER = true;
	  },
	  useSimple: function () {
	    USE_SETTER = false;
	  }
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol,
	  sham: !descriptors
	}, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443

	_export({
	  target: 'Object',
	  stat: true,
	  forced: fails(function () {
	    objectGetOwnPropertySymbols.f(1);
	  })
	}, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	}); // `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify

	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

	    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
	    || $stringify({
	      a: symbol
	    }) != '{}' // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	  });
	  _export({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED_JSON_STRINGIFY
	  }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;

	      while (arguments.length > index) args.push(arguments[index++]);

	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	} // `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	} // `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	// https://tc39.github.io/ecma262/#sec-symbol.asynciterator

	defineWellKnownSymbol('asyncIterator');

	// https://tc39.github.io/ecma262/#sec-symbol.hasinstance

	defineWellKnownSymbol('hasInstance');

	// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable

	defineWellKnownSymbol('isConcatSpreadable');

	// https://tc39.github.io/ecma262/#sec-symbol.match

	defineWellKnownSymbol('match');

	defineWellKnownSymbol('matchAll');

	// https://tc39.github.io/ecma262/#sec-symbol.replace

	defineWellKnownSymbol('replace');

	// https://tc39.github.io/ecma262/#sec-symbol.search

	defineWellKnownSymbol('search');

	// https://tc39.github.io/ecma262/#sec-symbol.species

	defineWellKnownSymbol('species');

	// https://tc39.github.io/ecma262/#sec-symbol.split

	defineWellKnownSymbol('split');

	// https://tc39.github.io/ecma262/#sec-symbol.toprimitive

	defineWellKnownSymbol('toPrimitive');

	// https://tc39.github.io/ecma262/#sec-symbol.tostringtag

	defineWellKnownSymbol('toStringTag');

	// https://tc39.github.io/ecma262/#sec-symbol.unscopables

	defineWellKnownSymbol('unscopables');

	// https://tc39.github.io/ecma262/#sec-math-@@tostringtag

	setToStringTag(Math, 'Math', true);

	// https://tc39.github.io/ecma262/#sec-json-@@tostringtag

	setToStringTag(global_1.JSON, 'JSON', true);

	var symbol = path.Symbol;

	// https://github.com/tc39/proposal-using-statement

	defineWellKnownSymbol('asyncDispose');

	// https://github.com/tc39/proposal-using-statement

	defineWellKnownSymbol('dispose');

	// https://github.com/tc39/proposal-observable

	defineWellKnownSymbol('observable');

	// https://github.com/tc39/proposal-pattern-matching

	defineWellKnownSymbol('patternMatch');

	defineWellKnownSymbol('replaceAll');

	var symbol$1 = symbol;

	var symbol$2 = symbol$1;

	var _typeof_1 = createCommonjsModule(function (module) {
	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof symbol$2 === "function" && typeof iterator$2 === "symbol") {
	      module.exports = _typeof = function _typeof(obj) {
	        return typeof obj;
	      };
	    } else {
	      module.exports = _typeof = function _typeof(obj) {
	        return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof(obj);
	  }

	  module.exports = _typeof;
	});

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var defineProperty$3 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) {
	  throw it;
	};

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = {
	      length: -1
	    };
	    if (ACCESSORS) defineProperty$3(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach$1 = arrayIteration.forEach;
	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


	_export({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != arrayForEach
	}, {
	  forEach: arrayForEach
	});

	var forEach = entryVirtual('Array').forEach;

	var forEach$1 = forEach;

	var ArrayPrototype$1 = Array.prototype;
	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.forEach // eslint-disable-next-line no-prototype-builtins
	  || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach$2 = forEach_1;

	var values = entryVirtual('Array').values;

	var values$1 = values;

	var ArrayPrototype$2 = Array.prototype;
	var DOMIterables$1 = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var values_1 = function (it) {
	  var own = it.values;
	  return it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.values // eslint-disable-next-line no-prototype-builtins
	  || DOMIterables$1.hasOwnProperty(classof(it)) ? values$1 : own;
	};

	var values$2 = values_1;

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill


	var arrayFill = function fill(value
	/* , start = 0, end = @length */
	) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

	  while (endPos > index) O[index++] = value;

	  return O;
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill

	_export({
	  target: 'Array',
	  proto: true
	}, {
	  fill: arrayFill
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	var fill = entryVirtual('Array').fill;

	var ArrayPrototype$3 = Array.prototype;

	var fill_1 = function (it) {
	  var own = it.fill;
	  return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.fill ? fill : own;
	};

	var fill$1 = fill_1;

	var fill$2 = fill$1;

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var trim = stringTrim.trim;
	var $parseFloat = global_1.parseFloat;
	var FORCED$1 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string

	var numberParseFloat = FORCED$1 ? function parseFloat(string) {
	  var trimmedString = trim(String(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// https://tc39.github.io/ecma262/#sec-parsefloat-string

	_export({
	  global: true,
	  forced: parseFloat != numberParseFloat
	}, {
	  parseFloat: numberParseFloat
	});

	var _parseFloat = path.parseFloat;

	var _parseFloat$1 = _parseFloat;

	var _parseFloat$2 = _parseFloat$1;

	var $filter = arrayIteration.filter;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1
	}, {
	  filter: function filter(callbackfn
	  /* , thisArg */
	  ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter = entryVirtual('Array').filter;

	var ArrayPrototype$4 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$4 || it instanceof Array && own === ArrayPrototype$4.filter ? filter : own;
	};

	var filter$1 = filter_1;

	var filter$2 = filter$1;

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

	_export({
	  target: 'Array',
	  proto: true,
	  forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$2
	}, {
	  indexOf: function indexOf(searchElement
	  /* , fromIndex = 0 */
	  ) {
	    return NEGATIVE_ZERO // convert -0 to +0
	    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var indexOf$1 = entryVirtual('Array').indexOf;

	var ArrayPrototype$5 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$5 || it instanceof Array && own === ArrayPrototype$5.indexOf ? indexOf$1 : own;
	};

	var indexOf$2 = indexOf_1;

	var indexOf$3 = indexOf$2;

	var test$1 = [];
	var nativeSort = test$1.sort; // IE8-

	var FAILS_ON_UNDEFINED = fails(function () {
	  test$1.sort(undefined);
	}); // V8 bug

	var FAILS_ON_NULL = fails(function () {
	  test$1.sort(null);
	}); // Old WebKit

	var STRICT_METHOD$2 = arrayMethodIsStrict('sort');
	var FORCED$2 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$2; // `Array.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.sort

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED$2
	}, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
	  }
	});

	var sort = entryVirtual('Array').sort;

	var ArrayPrototype$6 = Array.prototype;

	var sort_1 = function (it) {
	  var own = it.sort;
	  return it === ArrayPrototype$6 || it instanceof Array && own === ArrayPrototype$6.sort ? sort : own;
	};

	var sort$1 = sort_1;

	var sort$2 = sort$1;

	var componentEmitter = createCommonjsModule(function (module) {
	  /**
	   * Expose `Emitter`.
	   */
	  {
	    module.exports = Emitter;
	  }
	  /**
	   * Initialize a new `Emitter`.
	   *
	   * @api public
	   */


	  function Emitter(obj) {
	    if (obj) return mixin(obj);
	  }
	  /**
	   * Mixin the emitter properties.
	   *
	   * @param {Object} obj
	   * @return {Object}
	   * @api private
	   */

	  function mixin(obj) {
	    for (var key in Emitter.prototype) {
	      obj[key] = Emitter.prototype[key];
	    }

	    return obj;
	  }
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   * @return {Emitter}
	   * @api public
	   */


	  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	    this._callbacks = this._callbacks || {};
	    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	    return this;
	  };
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   * @return {Emitter}
	   * @api public
	   */


	  Emitter.prototype.once = function (event, fn) {
	    function on() {
	      this.off(event, on);
	      fn.apply(this, arguments);
	    }

	    on.fn = fn;
	    this.on(event, on);
	    return this;
	  };
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   * @return {Emitter}
	   * @api public
	   */


	  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	    this._callbacks = this._callbacks || {}; // all

	    if (0 == arguments.length) {
	      this._callbacks = {};
	      return this;
	    } // specific event


	    var callbacks = this._callbacks['$' + event];
	    if (!callbacks) return this; // remove all handlers

	    if (1 == arguments.length) {
	      delete this._callbacks['$' + event];
	      return this;
	    } // remove specific handler


	    var cb;

	    for (var i = 0; i < callbacks.length; i++) {
	      cb = callbacks[i];

	      if (cb === fn || cb.fn === fn) {
	        callbacks.splice(i, 1);
	        break;
	      }
	    } // Remove event specific arrays for event types that no
	    // one is subscribed for to avoid memory leak.


	    if (callbacks.length === 0) {
	      delete this._callbacks['$' + event];
	    }

	    return this;
	  };
	  /**
	   * Emit `event` with the given args.
	   *
	   * @param {String} event
	   * @param {Mixed} ...
	   * @return {Emitter}
	   */


	  Emitter.prototype.emit = function (event) {
	    this._callbacks = this._callbacks || {};
	    var args = new Array(arguments.length - 1),
	        callbacks = this._callbacks['$' + event];

	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }

	    if (callbacks) {
	      callbacks = callbacks.slice(0);

	      for (var i = 0, len = callbacks.length; i < len; ++i) {
	        callbacks[i].apply(this, args);
	      }
	    }

	    return this;
	  };
	  /**
	   * Return array of callbacks for `event`.
	   *
	   * @param {String} event
	   * @return {Array}
	   * @api public
	   */


	  Emitter.prototype.listeners = function (event) {
	    this._callbacks = this._callbacks || {};
	    return this._callbacks['$' + event] || [];
	  };
	  /**
	   * Check if this emitter has `event` handlers.
	   *
	   * @param {String} event
	   * @return {Boolean}
	   * @api public
	   */


	  Emitter.prototype.hasListeners = function (event) {
	    return !!this.listeners(event).length;
	  };
	});

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || iterators[classof(it)];
	};

	var getIterator = function (it) {
	  var iteratorMethod = getIteratorMethod(it);

	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  }

	  return anObject(iteratorMethod.call(it));
	};

	var getIterator_1 = getIterator;

	var getIterator$1 = getIterator_1;

	var getIteratorMethod_1 = getIteratorMethod;

	var getIteratorMethod$1 = getIteratorMethod_1;

	var symbol$3 = symbol;

	var symbol$4 = symbol$3;

	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype$7 = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$7[ITERATOR$3] === it);
	};

	// https://tc39.github.io/ecma262/#sec-array.from


	var arrayFrom = function from(arrayLike
	/* , mapfn = undefined, thisArg = undefined */
	) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();

	    for (; !(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);

	    for (; length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }

	  result.length = index;
	  return result;
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$4] = function () {
	      return {
	        next: function () {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	}); // `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from

	_export({
	  target: 'Array',
	  stat: true,
	  forced: INCORRECT_ITERATION
	}, {
	  from: arrayFrom
	});

	var from_1 = path.Array.from;

	var from_1$1 = from_1;

	var from_1$2 = from_1$1;

	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperty: objectDefineProperty.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	  var Object = path.Object;

	  var defineProperty = module.exports = function defineProperty(it, key, desc) {
	    return Object.defineProperty(it, key, desc);
	  };

	  if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$4 = defineProperty_1;

	var defineProperty$5 = defineProperty$4;

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperties: objectDefineProperties
	});

	var defineProperties_1 = createCommonjsModule(function (module) {
	  var Object = path.Object;

	  var defineProperties = module.exports = function defineProperties(T, D) {
	    return Object.defineProperties(T, D);
	  };

	  if (Object.defineProperties.sham) defineProperties.sham = true;
	});

	var defineProperties = defineProperties_1;

	var defineProperties$1 = defineProperties;

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors

	_export({
	  target: 'Object',
	  stat: true,
	  sham: !descriptors
	}, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;

	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }

	    return result;
	  }
	});

	var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var FAILS_ON_PRIMITIVES = fails(function () {
	  nativeGetOwnPropertyDescriptor$2(1);
	});
	var FORCED$3 = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FORCED$3,
	  sham: !descriptors
	}, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
	  var Object = path.Object;

	  var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
	    return Object.getOwnPropertyDescriptor(it, key);
	  };

	  if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
	});

	var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

	var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$2;

	var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols;

	var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

	// https://tc39.github.io/ecma262/#sec-object.create

	_export({
	  target: 'Object',
	  stat: true,
	  sham: !descriptors
	}, {
	  create: objectCreate
	});

	var Object$1 = path.Object;

	var create = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create;

	var create$2 = create$1;

	var defineProperty$6 = defineProperty_1;

	var defineProperty$7 = defineProperty$6;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$7(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$8 = _defineProperty;

	var FAILS_ON_PRIMITIVES$1 = fails(function () {
	  objectKeys(1);
	}); // `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$1
	}, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var keys$1 = path.Object.keys;

	var keys$2 = keys$1;

	var keys$3 = keys$2;

	var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
	// of whitespaces and has a correct name

	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim; // `String.prototype.trim` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.trim

	_export({
	  target: 'String',
	  proto: true,
	  forced: stringTrimForced('trim')
	}, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var trim$1 = entryVirtual('String').trim;

	var $map = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var map = entryVirtual('Array').map;

	var ArrayPrototype$8 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$8 || it instanceof Array && own === ArrayPrototype$8.map ? map : own;
	};

	var map$1 = map_1;

	var map$2 = map$1;

	var trim$2 = stringTrim.trim;
	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$4 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	var numberParseInt = FORCED$4 ? function parseInt(string, radix) {
	  var S = trim$2(String(string));
	  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	_export({
	  global: true,
	  forced: parseInt != numberParseInt
	}, {
	  parseInt: numberParseInt
	});

	var _parseInt = path.parseInt;

	var _parseInt$1 = _parseInt;

	var _parseInt$2 = _parseInt$1;

	var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

	var createMethod$4 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;

	    while (length > i) {
	      key = keys[i++];

	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }

	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$4(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$4(false)
	};

	var $values = objectToArray.values; // `Object.values` method
	// https://tc39.github.io/ecma262/#sec-object.values

	_export({
	  target: 'Object',
	  stat: true
	}, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var values$3 = path.Object.values;

	var isArray$4 = isArray$1;

	var isArray$5 = isArray$4;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray = _arrayLikeToArray;

	function _arrayWithoutHoles(arr) {
	  if (isArray$5(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	var from_1$3 = from_1;

	var from_1$4 = from_1$3;

	var ITERATOR$5 = wellKnownSymbol('iterator');

	var isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$5] !== undefined || '@@iterator' in O // eslint-disable-next-line no-prototype-builtins
	  || iterators.hasOwnProperty(classof(O));
	};

	var isIterable_1 = isIterable;

	var isIterable$1 = isIterable_1;

	function _iterableToArray(iter) {
	  if (typeof symbol$2 !== "undefined" && isIterable$1(Object(iter))) return from_1$4(iter);
	}

	var iterableToArray = _iterableToArray;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	var slice$1 = entryVirtual('Array').slice;

	var ArrayPrototype$9 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$9 || it instanceof Array && own === ArrayPrototype$9.slice ? slice$1 : own;
	};

	var slice$2 = slice_1;

	var slice$3 = slice$2;

	function _unsupportedIterableToArray(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);

	  var n = slice$3(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from_1$4(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	var unsupportedIterableToArray = _unsupportedIterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	var slice$4 = slice_1;

	var slice$5 = slice$4;

	var FAILS_ON_PRIMITIVES$2 = fails(function () {
	  objectGetPrototypeOf(1);
	}); // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$2,
	  sham: !correctPrototypeGetter
	}, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var getPrototypeOf = path.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf;

	var getPrototypeOf$2 = getPrototypeOf$1;

	function _arrayWithHoles(arr) {
	  if (isArray$5(arr)) return arr;
	}

	var arrayWithHoles = _arrayWithHoles;

	function _iterableToArrayLimit(arr, i) {
	  if (typeof symbol$2 === "undefined" || !isIterable$1(Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	var iterableToArrayLimit = _iterableToArrayLimit;

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableRest = _nonIterableRest;

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}

	var slicedToArray = _slicedToArray;

	// https://tc39.github.io/ecma262/#sec-date.now

	_export({
	  target: 'Date',
	  stat: true
	}, {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	var now = path.Date.now;

	var fullHexRE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	var shortHexRE = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	/**
	 * Test whether given object is a number.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if number, false otherwise.
	 */

	function isNumber(value) {
	  return value instanceof Number || typeof value === "number";
	}
	/**
	 * Test whether given object is a string.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if string, false otherwise.
	 */


	function isString(value) {
	  return value instanceof String || typeof value === "string";
	}
	/**
	 * Copy property from b to a if property present in a.
	 * If property in b explicitly set to null, delete it if `allowDeletion` set.
	 *
	 * Internal helper routine, should not be exported. Not added to `exports` for that reason.
	 *
	 * @param a - Target object.
	 * @param b - Source object.
	 * @param prop - Name of property to copy from b to a.
	 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
	 */


	function copyOrDelete(a, b, prop, allowDeletion) {
	  var doDeletion = false;

	  if (allowDeletion === true) {
	    doDeletion = b[prop] === null && a[prop] !== undefined;
	  }

	  if (doDeletion) {
	    delete a[prop];
	  } else {
	    a[prop] = b[prop]; // Remember, this is a reference copy!
	  }
	}
	/**
	 * Extend object a with selected properties of object b.
	 * Only properties with defined values are copied.
	 *
	 * @remarks
	 * Previous version of this routine implied that multiple source objects could
	 * be used; however, the implementation was **wrong**. Since multiple (\>1)
	 * sources weren't used anywhere in the `vis.js` code, this has been removed
	 *
	 * @param props - Names of first-level properties to copy over.
	 * @param a - Target object.
	 * @param b - Source object.
	 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
	 *
	 * @returns Argument a.
	 */


	function selectiveDeepExtend(props, a, b) {
	  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  // TODO: add support for Arrays to deepExtend
	  if (isArray$3(b)) {
	    throw new TypeError("Arrays are not supported by deepExtend");
	  }

	  for (var p = 0; p < props.length; p++) {
	    var prop = props[p];

	    if (Object.prototype.hasOwnProperty.call(b, prop)) {
	      if (b[prop] && b[prop].constructor === Object) {
	        if (a[prop] === undefined) {
	          a[prop] = {};
	        }

	        if (a[prop].constructor === Object) {
	          deepExtend(a[prop], b[prop], false, allowDeletion);
	        } else {
	          copyOrDelete(a, b, prop, allowDeletion);
	        }
	      } else if (isArray$3(b[prop])) {
	        throw new TypeError("Arrays are not supported by deepExtend");
	      } else {
	        copyOrDelete(a, b, prop, allowDeletion);
	      }
	    }
	  }

	  return a;
	}
	/**
	 * Deep extend an object a with the properties of object b.
	 *
	 * @param a - Target object.
	 * @param b - Source object.
	 * @param protoExtend - If true, the prototype values will also be extended.
	 * (That is the options objects that inherit from others will also get the
	 * inherited options).
	 * @param allowDeletion - If true, the values of fields that are null will be deleted.
	 *
	 * @returns Argument a.
	 */


	function deepExtend(a, b) {
	  var protoExtend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  for (var prop in b) {
	    if (Object.prototype.hasOwnProperty.call(b, prop) || protoExtend === true) {
	      if (_typeof_1(b[prop]) === "object" && b[prop] !== null && getPrototypeOf$2(b[prop]) === Object.prototype) {
	        if (a[prop] === undefined) {
	          a[prop] = deepExtend({}, b[prop], protoExtend); // NOTE: allowDeletion not propagated!
	        } else if (_typeof_1(a[prop]) === "object" && a[prop] !== null && getPrototypeOf$2(a[prop]) === Object.prototype) {
	          deepExtend(a[prop], b[prop], protoExtend); // NOTE: allowDeletion not propagated!
	        } else {
	          copyOrDelete(a, b, prop, allowDeletion);
	        }
	      } else if (isArray$3(b[prop])) {
	        var _context;

	        a[prop] = slice$5(_context = b[prop]).call(_context);
	      } else {
	        copyOrDelete(a, b, prop, allowDeletion);
	      }
	    }
	  }

	  return a;
	}
	/**
	 * Get the type of an object, for example exports.getType([]) returns 'Array'.
	 *
	 * @param object - Input value of unknown type.
	 *
	 * @returns Detected type.
	 */


	function getType(object) {
	  var type = _typeof_1(object);

	  if (type === "object") {
	    if (object === null) {
	      return "null";
	    }

	    if (object instanceof Boolean) {
	      return "Boolean";
	    }

	    if (object instanceof Number) {
	      return "Number";
	    }

	    if (object instanceof String) {
	      return "String";
	    }

	    if (isArray$3(object)) {
	      return "Array";
	    }

	    if (object instanceof Date) {
	      return "Date";
	    }

	    return "Object";
	  }

	  if (type === "number") {
	    return "Number";
	  }

	  if (type === "boolean") {
	    return "Boolean";
	  }

	  if (type === "string") {
	    return "String";
	  }

	  if (type === undefined) {
	    return "undefined";
	  }

	  return type;
	}
	/**
	 * Used to extend an array and copy it. This is used to propagate paths recursively.
	 *
	 * @param arr - First part.
	 * @param newValue - The value to be aadded into the array.
	 *
	 * @returns A new array with all items from arr and newValue (which is last).
	 */


	function copyAndExtendArray(arr, newValue) {
	  var _context2;

	  return concat$2(_context2 = []).call(_context2, toConsumableArray(arr), [newValue]);
	}
	/**
	 * Used to extend an array and copy it. This is used to propagate paths recursively.
	 *
	 * @param arr - The array to be copied.
	 *
	 * @returns Shallow copy of arr.
	 */


	function copyArray(arr) {
	  return slice$5(arr).call(arr);
	}
	/**
	 * Add and event listener. Works for all browsers.
	 *
	 * @param element - The element to bind the event listener to.
	 * @param action - Same as Element.addEventListener(action, ???, ???).
	 * @param listener - Same as Element.addEventListener(???, listener, ???).
	 * @param useCapture - Same as Element.addEventListener(???, ???, useCapture).
	 */


	function addEventListener(element, action, listener, useCapture) {
	  if (element.addEventListener) {
	    var _context3;

	    if (useCapture === undefined) {
	      useCapture = false;
	    }

	    if (action === "mousewheel" && indexOf$3(_context3 = navigator.userAgent).call(_context3, "Firefox") >= 0) {
	      action = "DOMMouseScroll"; // For Firefox
	    }

	    element.addEventListener(action, listener, useCapture);
	  } else {
	    // @TODO: IE types? Does anyone care?
	    element.attachEvent("on" + action, listener); // IE browsers
	  }
	}
	/**
	 * Remove an event listener from an element.
	 *
	 * @param element - The element to bind the event listener to.
	 * @param action - Same as Element.removeEventListener(action, ???, ???).
	 * @param listener - Same as Element.removeEventListener(???, listener, ???).
	 * @param useCapture - Same as Element.removeEventListener(???, ???, useCapture).
	 */


	function removeEventListener(element, action, listener, useCapture) {
	  if (element.removeEventListener) {
	    var _context4;

	    // non-IE browsers
	    if (useCapture === undefined) {
	      useCapture = false;
	    }

	    if (action === "mousewheel" && indexOf$3(_context4 = navigator.userAgent).call(_context4, "Firefox") >= 0) {
	      action = "DOMMouseScroll"; // For Firefox
	    }

	    element.removeEventListener(action, listener, useCapture);
	  } else {
	    // @TODO: IE types? Does anyone care?
	    element.detachEvent("on" + action, listener); // IE browsers
	  }
	}
	/**
	 * Cancels the event's default action if it is cancelable, without stopping further propagation of the event.
	 *
	 * @param event - The event whose default action should be prevented.
	 */


	function preventDefault(event) {
	  if (!event) {
	    event = window.event;
	  }

	  if (!event) ;else if (event.preventDefault) {
	    event.preventDefault(); // non-IE browsers
	  } else {
	    // @TODO: IE types? Does anyone care?
	    event.returnValue = false; // IE browsers
	  }
	}
	/**
	 * Convert hex color string into RGB color object.
	 *
	 * @remarks
	 * {@link http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
	 *
	 * @param hex - Hex color string (3 or 6 digits, with or without #).
	 *
	 * @returns RGB color object.
	 */

	function hexToRGB(hex) {
	  var result;

	  switch (hex.length) {
	    case 3:
	    case 4:
	      result = shortHexRE.exec(hex);
	      return result ? {
	        r: _parseInt$2(result[1] + result[1], 16),
	        g: _parseInt$2(result[2] + result[2], 16),
	        b: _parseInt$2(result[3] + result[3], 16)
	      } : null;

	    case 6:
	    case 7:
	      result = fullHexRE.exec(hex);
	      return result ? {
	        r: _parseInt$2(result[1], 16),
	        g: _parseInt$2(result[2], 16),
	        b: _parseInt$2(result[3], 16)
	      } : null;

	    default:
	      return null;
	  }
	}
	/**
	 * Convert HSV \<0, 1\> into RGB color object.
	 *
	 * @remarks
	 * {@link https://gist.github.com/mjijackson/5311256}
	 *
	 * @param h - Hue.
	 * @param s - Saturation.
	 * @param v - Value.
	 *
	 * @returns RGB color object.
	 */


	function HSVToRGB(h, s, v) {
	  var r;
	  var g;
	  var b;
	  var i = Math.floor(h * 6);
	  var f = h * 6 - i;
	  var p = v * (1 - s);
	  var q = v * (1 - f * s);
	  var t = v * (1 - (1 - f) * s);

	  switch (i % 6) {
	    case 0:
	      r = v, g = t, b = p;
	      break;

	    case 1:
	      r = q, g = v, b = p;
	      break;

	    case 2:
	      r = p, g = v, b = t;
	      break;

	    case 3:
	      r = p, g = q, b = v;
	      break;

	    case 4:
	      r = t, g = p, b = v;
	      break;

	    case 5:
	      r = v, g = p, b = q;
	      break;
	  }

	  return {
	    r: Math.floor(r * 255),
	    g: Math.floor(g * 255),
	    b: Math.floor(b * 255)
	  };
	}
	/**
	 * Validate hex color string.
	 *
	 * @param hex - Unknown string that may contain a color.
	 *
	 * @returns True if the string is valid, false otherwise.
	 */


	function isValidHex(hex) {
	  var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
	  return isOk;
	}

	/**
	 * @prototype Point3d
	 * @param {number} [x]
	 * @param {number} [y]
	 * @param {number} [z]
	 */
	function Point3d(x, y, z) {
	  this.x = x !== undefined ? x : 0;
	  this.y = y !== undefined ? y : 0;
	  this.z = z !== undefined ? z : 0;
	}
	/**
	 * Subtract the two provided points, returns a-b
	 * @param {Point3d} a
	 * @param {Point3d} b
	 * @return {Point3d} a-b
	 */


	Point3d.subtract = function (a, b) {
	  var sub = new Point3d();
	  sub.x = a.x - b.x;
	  sub.y = a.y - b.y;
	  sub.z = a.z - b.z;
	  return sub;
	};
	/**
	 * Add the two provided points, returns a+b
	 * @param {Point3d} a
	 * @param {Point3d} b
	 * @return {Point3d} a+b
	 */


	Point3d.add = function (a, b) {
	  var sum = new Point3d();
	  sum.x = a.x + b.x;
	  sum.y = a.y + b.y;
	  sum.z = a.z + b.z;
	  return sum;
	};
	/**
	 * Calculate the average of two 3d points
	 * @param {Point3d} a
	 * @param {Point3d} b
	 * @return {Point3d} The average, (a+b)/2
	 */


	Point3d.avg = function (a, b) {
	  return new Point3d((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
	};
	/**
	 * Scale the provided point by a scalar, returns p*c
	 * @param {Point3d} p
	 * @param {number} c
	 * @return {Point3d} p*c
	 */


	Point3d.scalarProduct = function (p, c) {
	  return new Point3d(p.x * c, p.y * c, p.z * c);
	};
	/**
	 * Calculate the dot product of the two provided points, returns a.b
	 * Documentation: http://en.wikipedia.org/wiki/Dot_product
	 * @param {Point3d} a
	 * @param {Point3d} b
	 * @return {Point3d} dot product a.b
	 */


	Point3d.dotProduct = function (a, b) {
	  return a.x * b.x + a.y * b.y + a.z * b.z;
	};
	/**
	 * Calculate the cross product of the two provided points, returns axb
	 * Documentation: http://en.wikipedia.org/wiki/Cross_product
	 * @param {Point3d} a
	 * @param {Point3d} b
	 * @return {Point3d} cross product axb
	 */


	Point3d.crossProduct = function (a, b) {
	  var crossproduct = new Point3d();
	  crossproduct.x = a.y * b.z - a.z * b.y;
	  crossproduct.y = a.z * b.x - a.x * b.z;
	  crossproduct.z = a.x * b.y - a.y * b.x;
	  return crossproduct;
	};
	/**
	 * Retrieve the length of the vector (or the distance from this point to the origin
	 * @return {number}  length
	 */


	Point3d.prototype.length = function () {
	  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	};
	/**
	 * Return a normalized vector pointing in the same direction.
	 * @return {Point3d}  normalized
	 */


	Point3d.prototype.normalize = function () {
	  return Point3d.scalarProduct(this, 1 / this.length());
	};

	var Point3d_1 = Point3d;

	/**
	 * @prototype Point2d
	 * @param {number} [x]
	 * @param {number} [y]
	 */
	function Point2d(x, y) {
	  this.x = x !== undefined ? x : 0;
	  this.y = y !== undefined ? y : 0;
	}

	var Point2d_1 = Point2d;

	/**
	 * An html slider control with start/stop/prev/next buttons
	 *
	 * @constructor Slider
	 * @param {Element} container  The element where the slider will be created
	 * @param {Object} options   Available options:
	 *                 {boolean} visible   If true (default) the
	 *                           slider is visible.
	 */

	function Slider(container, options) {
	  if (container === undefined) {
	    throw new Error('No container element defined');
	  }

	  this.container = container;
	  this.visible = options && options.visible != undefined ? options.visible : true;

	  if (this.visible) {
	    this.frame = document.createElement('DIV'); //this.frame.style.backgroundColor = '#E5E5E5';

	    this.frame.style.width = '100%';
	    this.frame.style.position = 'relative';
	    this.container.appendChild(this.frame);
	    this.frame.prev = document.createElement('INPUT');
	    this.frame.prev.type = 'BUTTON';
	    this.frame.prev.value = 'Prev';
	    this.frame.appendChild(this.frame.prev);
	    this.frame.play = document.createElement('INPUT');
	    this.frame.play.type = 'BUTTON';
	    this.frame.play.value = 'Play';
	    this.frame.appendChild(this.frame.play);
	    this.frame.next = document.createElement('INPUT');
	    this.frame.next.type = 'BUTTON';
	    this.frame.next.value = 'Next';
	    this.frame.appendChild(this.frame.next);
	    this.frame.bar = document.createElement('INPUT');
	    this.frame.bar.type = 'BUTTON';
	    this.frame.bar.style.position = 'absolute';
	    this.frame.bar.style.border = '1px solid red';
	    this.frame.bar.style.width = '100px';
	    this.frame.bar.style.height = '6px';
	    this.frame.bar.style.borderRadius = '2px';
	    this.frame.bar.style.MozBorderRadius = '2px';
	    this.frame.bar.style.border = '1px solid #7F7F7F';
	    this.frame.bar.style.backgroundColor = '#E5E5E5';
	    this.frame.appendChild(this.frame.bar);
	    this.frame.slide = document.createElement('INPUT');
	    this.frame.slide.type = 'BUTTON';
	    this.frame.slide.style.margin = '0px';
	    this.frame.slide.value = ' ';
	    this.frame.slide.style.position = 'relative';
	    this.frame.slide.style.left = '-100px';
	    this.frame.appendChild(this.frame.slide); // create events

	    var me = this;

	    this.frame.slide.onmousedown = function (event) {
	      me._onMouseDown(event);
	    };

	    this.frame.prev.onclick = function (event) {
	      me.prev(event);
	    };

	    this.frame.play.onclick = function (event) {
	      me.togglePlay(event);
	    };

	    this.frame.next.onclick = function (event) {
	      me.next(event);
	    };
	  }

	  this.onChangeCallback = undefined;
	  this.values = [];
	  this.index = undefined;
	  this.playTimeout = undefined;
	  this.playInterval = 1000; // milliseconds

	  this.playLoop = true;
	}
	/**
	 * Select the previous index
	 */


	Slider.prototype.prev = function () {
	  var index = this.getIndex();

	  if (index > 0) {
	    index--;
	    this.setIndex(index);
	  }
	};
	/**
	 * Select the next index
	 */


	Slider.prototype.next = function () {
	  var index = this.getIndex();

	  if (index < values$2(this).length - 1) {
	    index++;
	    this.setIndex(index);
	  }
	};
	/**
	 * Select the next index
	 */


	Slider.prototype.playNext = function () {
	  var start = new Date();
	  var index = this.getIndex();

	  if (index < values$2(this).length - 1) {
	    index++;
	    this.setIndex(index);
	  } else if (this.playLoop) {
	    // jump to the start
	    index = 0;
	    this.setIndex(index);
	  }

	  var end = new Date();
	  var diff = end - start; // calculate how much time it to to set the index and to execute the callback
	  // function.

	  var interval = Math.max(this.playInterval - diff, 0); // document.title = diff // TODO: cleanup

	  var me = this;
	  this.playTimeout = setTimeout$1(function () {
	    me.playNext();
	  }, interval);
	};
	/**
	 * Toggle start or stop playing
	 */


	Slider.prototype.togglePlay = function () {
	  if (this.playTimeout === undefined) {
	    this.play();
	  } else {
	    this.stop();
	  }
	};
	/**
	 * Start playing
	 */


	Slider.prototype.play = function () {
	  // Test whether already playing
	  if (this.playTimeout) return;
	  this.playNext();

	  if (this.frame) {
	    this.frame.play.value = 'Stop';
	  }
	};
	/**
	 * Stop playing
	 */


	Slider.prototype.stop = function () {
	  clearInterval(this.playTimeout);
	  this.playTimeout = undefined;

	  if (this.frame) {
	    this.frame.play.value = 'Play';
	  }
	};
	/**
	 * Set a callback function which will be triggered when the value of the
	 * slider bar has changed.
	 *
	 * @param {function} callback
	 */


	Slider.prototype.setOnChangeCallback = function (callback) {
	  this.onChangeCallback = callback;
	};
	/**
	 * Set the interval for playing the list
	 * @param {number} interval   The interval in milliseconds
	 */


	Slider.prototype.setPlayInterval = function (interval) {
	  this.playInterval = interval;
	};
	/**
	 * Retrieve the current play interval
	 * @return {number} interval   The interval in milliseconds
	 */


	Slider.prototype.getPlayInterval = function () {
	  return this.playInterval;
	};
	/**
	 * Set looping on or off
	 * @param {boolean} doLoop  If true, the slider will jump to the start when
	 *               the end is passed, and will jump to the end
	 *               when the start is passed.
	 *
	 */


	Slider.prototype.setPlayLoop = function (doLoop) {
	  this.playLoop = doLoop;
	};
	/**
	 * Execute the onchange callback function
	 */


	Slider.prototype.onChange = function () {
	  if (this.onChangeCallback !== undefined) {
	    this.onChangeCallback();
	  }
	};
	/**
	 * redraw the slider on the correct place
	 */


	Slider.prototype.redraw = function () {
	  if (this.frame) {
	    // resize the bar
	    this.frame.bar.style.top = this.frame.clientHeight / 2 - this.frame.bar.offsetHeight / 2 + 'px';
	    this.frame.bar.style.width = this.frame.clientWidth - this.frame.prev.clientWidth - this.frame.play.clientWidth - this.frame.next.clientWidth - 30 + 'px'; // position the slider button

	    var left = this.indexToLeft(this.index);
	    this.frame.slide.style.left = left + 'px';
	  }
	};
	/**
	 * Set the list with values for the slider
	 * @param {Array} values   A javascript array with values (any type)
	 */


	Slider.prototype.setValues = function (values) {
	  this.values = values;
	  if (values$2(this).length > 0) this.setIndex(0);else this.index = undefined;
	};
	/**
	 * Select a value by its index
	 * @param {number} index
	 */


	Slider.prototype.setIndex = function (index) {
	  if (index < values$2(this).length) {
	    this.index = index;
	    this.redraw();
	    this.onChange();
	  } else {
	    throw new Error('Index out of range');
	  }
	};
	/**
	 * retrieve the index of the currently selected vaue
	 * @return {number} index
	 */


	Slider.prototype.getIndex = function () {
	  return this.index;
	};
	/**
	 * retrieve the currently selected value
	 * @return {*} value
	 */


	Slider.prototype.get = function () {
	  return values$2(this)[this.index];
	};

	Slider.prototype._onMouseDown = function (event) {
	  // only react on left mouse button down
	  var leftButtonDown = event.which ? event.which === 1 : event.button === 1;
	  if (!leftButtonDown) return;
	  this.startClientX = event.clientX;
	  this.startSlideX = _parseFloat$2(this.frame.slide.style.left);
	  this.frame.style.cursor = 'move'; // add event listeners to handle moving the contents
	  // we store the function onmousemove and onmouseup in the graph, so we can
	  // remove the eventlisteners lateron in the function mouseUp()

	  var me = this;

	  this.onmousemove = function (event) {
	    me._onMouseMove(event);
	  };

	  this.onmouseup = function (event) {
	    me._onMouseUp(event);
	  };

	  addEventListener(document, 'mousemove', this.onmousemove);
	  addEventListener(document, 'mouseup', this.onmouseup);
	  preventDefault(event);
	};

	Slider.prototype.leftToIndex = function (left) {
	  var width = _parseFloat$2(this.frame.bar.style.width) - this.frame.slide.clientWidth - 10;
	  var x = left - 3;
	  var index = Math.round(x / width * (values$2(this).length - 1));
	  if (index < 0) index = 0;
	  if (index > values$2(this).length - 1) index = values$2(this).length - 1;
	  return index;
	};

	Slider.prototype.indexToLeft = function (index) {
	  var width = _parseFloat$2(this.frame.bar.style.width) - this.frame.slide.clientWidth - 10;
	  var x = index / (values$2(this).length - 1) * width;
	  var left = x + 3;
	  return left;
	};

	Slider.prototype._onMouseMove = function (event) {
	  var diff = event.clientX - this.startClientX;
	  var x = this.startSlideX + diff;
	  var index = this.leftToIndex(x);
	  this.setIndex(index);
	  preventDefault();
	};

	Slider.prototype._onMouseUp = function (event) {
	  // eslint-disable-line no-unused-vars
	  this.frame.style.cursor = 'auto'; // remove event listeners

	  removeEventListener(document, 'mousemove', this.onmousemove);
	  removeEventListener(document, 'mouseup', this.onmouseup);
	  preventDefault();
	};

	/**
	 * @prototype StepNumber
	 * The class StepNumber is an iterator for Numbers. You provide a start and end
	 * value, and a best step size. StepNumber itself rounds to fixed values and
	 * a finds the step that best fits the provided step.
	 *
	 * If prettyStep is true, the step size is chosen as close as possible to the
	 * provided step, but being a round value like 1, 2, 5, 10, 20, 50, ....
	 *
	 * Example usage:
	 *   var step = new StepNumber(0, 10, 2.5, true);
	 *   step.start();
	 *   while (!step.end()) {
	 *   alert(step.getCurrent());
	 *   step.next();
	 *   }
	 *
	 * Version: 1.0
	 *
	 * @param {number} start     The start value
	 * @param {number} end     The end value
	 * @param {number} step    Optional. Step size. Must be a positive value.
	 * @param {boolean} prettyStep Optional. If true, the step size is rounded
	 *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
	 */
	function StepNumber(start, end, step, prettyStep) {
	  // set default values
	  this._start = 0;
	  this._end = 0;
	  this._step = 1;
	  this.prettyStep = true;
	  this.precision = 5;
	  this._current = 0;
	  this.setRange(start, end, step, prettyStep);
	}
	/**
	 * Check for input values, to prevent disasters from happening
	 *
	 * Source: http://stackoverflow.com/a/1830844
	 *
	 * @param {string} n
	 * @returns {boolean}
	 */


	StepNumber.prototype.isNumeric = function (n) {
	  return !isNaN(_parseFloat$2(n)) && isFinite(n);
	};
	/**
	 * Set a new range: start, end and step.
	 *
	 * @param {number} start     The start value
	 * @param {number} end     The end value
	 * @param {number} step    Optional. Step size. Must be a positive value.
	 * @param {boolean} prettyStep Optional. If true, the step size is rounded
	 *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
	 */


	StepNumber.prototype.setRange = function (start, end, step, prettyStep) {
	  if (!this.isNumeric(start)) {
	    throw new Error('Parameter \'start\' is not numeric; value: ' + start);
	  }

	  if (!this.isNumeric(end)) {
	    throw new Error('Parameter \'end\' is not numeric; value: ' + start);
	  }

	  if (!this.isNumeric(step)) {
	    throw new Error('Parameter \'step\' is not numeric; value: ' + start);
	  }

	  this._start = start ? start : 0;
	  this._end = end ? end : 0;
	  this.setStep(step, prettyStep);
	};
	/**
	 * Set a new step size
	 * @param {number} step    New step size. Must be a positive value
	 * @param {boolean} prettyStep Optional. If true, the provided step is rounded
	 *               to a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
	 */


	StepNumber.prototype.setStep = function (step, prettyStep) {
	  if (step === undefined || step <= 0) return;
	  if (prettyStep !== undefined) this.prettyStep = prettyStep;
	  if (this.prettyStep === true) this._step = StepNumber.calculatePrettyStep(step);else this._step = step;
	};
	/**
	 * Calculate a nice step size, closest to the desired step size.
	 * Returns a value in one of the ranges 1*10^n, 2*10^n, or 5*10^n, where n is an
	 * integer Number. For example 1, 2, 5, 10, 20, 50, etc...
	 * @param {number}  step  Desired step size
	 * @return {number}     Nice step size
	 */


	StepNumber.calculatePrettyStep = function (step) {
	  var log10 = function log10(x) {
	    return Math.log(x) / Math.LN10;
	  }; // try three steps (multiple of 1, 2, or 5


	  var step1 = Math.pow(10, Math.round(log10(step))),
	      step2 = 2 * Math.pow(10, Math.round(log10(step / 2))),
	      step5 = 5 * Math.pow(10, Math.round(log10(step / 5))); // choose the best step (closest to minimum step)

	  var prettyStep = step1;
	  if (Math.abs(step2 - step) <= Math.abs(prettyStep - step)) prettyStep = step2;
	  if (Math.abs(step5 - step) <= Math.abs(prettyStep - step)) prettyStep = step5; // for safety

	  if (prettyStep <= 0) {
	    prettyStep = 1;
	  }

	  return prettyStep;
	};
	/**
	 * returns the current value of the step
	 * @return {number} current value
	 */


	StepNumber.prototype.getCurrent = function () {
	  return _parseFloat$2(this._current.toPrecision(this.precision));
	};
	/**
	 * returns the current step size
	 * @return {number} current step size
	 */


	StepNumber.prototype.getStep = function () {
	  return this._step;
	};
	/**
	 * Set the current to its starting value.
	 *
	 * By default, this will be the largest value smaller than start, which
	 * is a multiple of the step size.
	 *
	 * Parameters checkFirst is optional, default false.
	 * If set to true, move the current value one step if smaller than start.
	 *
	 * @param {boolean} [checkFirst=false]
	 */


	StepNumber.prototype.start = function (checkFirst) {
	  if (checkFirst === undefined) {
	    checkFirst = false;
	  }

	  this._current = this._start - this._start % this._step;

	  if (checkFirst) {
	    if (this.getCurrent() < this._start) {
	      this.next();
	    }
	  }
	};
	/**
	 * Do a step, add the step size to the current value
	 */


	StepNumber.prototype.next = function () {
	  this._current += this._step;
	};
	/**
	 * Returns true whether the end is reached
	 * @return {boolean}  True if the current value has passed the end value.
	 */


	StepNumber.prototype.end = function () {
	  return this._current > this._end;
	};

	var StepNumber_1 = StepNumber;

	var nativeReverse = [].reverse;
	var test$2 = [1, 2]; // `Array.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794

	_export({
	  target: 'Array',
	  proto: true,
	  forced: String(test$2) === String(test$2.reverse())
	}, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign
	    if (isArray(this)) this.length = this.length;
	    return nativeReverse.call(this);
	  }
	});

	var reverse = entryVirtual('Array').reverse;

	var ArrayPrototype$a = Array.prototype;

	var reverse_1 = function (it) {
	  var own = it.reverse;
	  return it === ArrayPrototype$a || it instanceof Array && own === ArrayPrototype$a.reverse ? reverse : own;
	};

	var reverse$1 = reverse_1;

	var reverse$2 = reverse$1;

	// `Math.sign` method implementation
	// https://tc39.github.io/ecma262/#sec-math.sign
	var mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// https://tc39.github.io/ecma262/#sec-math.sign

	_export({
	  target: 'Math',
	  stat: true
	}, {
	  sign: mathSign
	});

	var sign = path.Math.sign;

	var sign$1 = sign;

	var sign$2 = sign$1;

	/**
	 * The camera is mounted on a (virtual) camera arm. The camera arm can rotate
	 * The camera is always looking in the direction of the origin of the arm.
	 * This way, the camera always rotates around one fixed point, the location
	 * of the camera arm.
	 *
	 * Documentation:
	 *   http://en.wikipedia.org/wiki/3D_projection
	 * @class Camera
	 */

	function Camera() {
	  this.armLocation = new Point3d_1();
	  this.armRotation = {};
	  this.armRotation.horizontal = 0;
	  this.armRotation.vertical = 0;
	  this.armLength = 1.7;
	  this.cameraOffset = new Point3d_1();
	  this.offsetMultiplier = 0.6;
	  this.cameraLocation = new Point3d_1();
	  this.cameraRotation = new Point3d_1(0.5 * Math.PI, 0, 0);
	  this.calculateCameraOrientation();
	}
	/**
	 * Set offset camera in camera coordinates
	 * @param {number} x offset by camera horisontal
	 * @param {number} y offset by camera vertical
	 */


	Camera.prototype.setOffset = function (x, y) {
	  var abs = Math.abs,
	      sign = sign$2,
	      mul = this.offsetMultiplier,
	      border = this.armLength * mul;

	  if (abs(x) > border) {
	    x = sign(x) * border;
	  }

	  if (abs(y) > border) {
	    y = sign(y) * border;
	  }

	  this.cameraOffset.x = x;
	  this.cameraOffset.y = y;
	  this.calculateCameraOrientation();
	};
	/**
	 * Get camera offset by horizontal and vertical
	 * @returns {number}
	 */


	Camera.prototype.getOffset = function () {
	  return this.cameraOffset;
	};
	/**
	 * Set the location (origin) of the arm
	 * @param {number} x  Normalized value of x
	 * @param {number} y  Normalized value of y
	 * @param {number} z  Normalized value of z
	 */


	Camera.prototype.setArmLocation = function (x, y, z) {
	  this.armLocation.x = x;
	  this.armLocation.y = y;
	  this.armLocation.z = z;
	  this.calculateCameraOrientation();
	};
	/**
	 * Set the rotation of the camera arm
	 * @param {number} horizontal   The horizontal rotation, between 0 and 2*PI.
	 *                Optional, can be left undefined.
	 * @param {number} vertical   The vertical rotation, between 0 and 0.5*PI
	 *                if vertical=0.5*PI, the graph is shown from the
	 *                top. Optional, can be left undefined.
	 */


	Camera.prototype.setArmRotation = function (horizontal, vertical) {
	  if (horizontal !== undefined) {
	    this.armRotation.horizontal = horizontal;
	  }

	  if (vertical !== undefined) {
	    this.armRotation.vertical = vertical;
	    if (this.armRotation.vertical < 0) this.armRotation.vertical = 0;
	    if (this.armRotation.vertical > 0.5 * Math.PI) this.armRotation.vertical = 0.5 * Math.PI;
	  }

	  if (horizontal !== undefined || vertical !== undefined) {
	    this.calculateCameraOrientation();
	  }
	};
	/**
	 * Retrieve the current arm rotation
	 * @return {object}   An object with parameters horizontal and vertical
	 */


	Camera.prototype.getArmRotation = function () {
	  var rot = {};
	  rot.horizontal = this.armRotation.horizontal;
	  rot.vertical = this.armRotation.vertical;
	  return rot;
	};
	/**
	 * Set the (normalized) length of the camera arm.
	 * @param {number} length A length between 0.71 and 5.0
	 */


	Camera.prototype.setArmLength = function (length) {
	  if (length === undefined) return;
	  this.armLength = length; // Radius must be larger than the corner of the graph,
	  // which has a distance of sqrt(0.5^2+0.5^2) = 0.71 from the center of the
	  // graph

	  if (this.armLength < 0.71) this.armLength = 0.71;
	  if (this.armLength > 5.0) this.armLength = 5.0;
	  this.setOffset(this.cameraOffset.x, this.cameraOffset.y);
	  this.calculateCameraOrientation();
	};
	/**
	 * Retrieve the arm length
	 * @return {number} length
	 */


	Camera.prototype.getArmLength = function () {
	  return this.armLength;
	};
	/**
	 * Retrieve the camera location
	 * @return {Point3d} cameraLocation
	 */


	Camera.prototype.getCameraLocation = function () {
	  return this.cameraLocation;
	};
	/**
	 * Retrieve the camera rotation
	 * @return {Point3d} cameraRotation
	 */


	Camera.prototype.getCameraRotation = function () {
	  return this.cameraRotation;
	};
	/**
	 * Calculate the location and rotation of the camera based on the
	 * position and orientation of the camera arm
	 */


	Camera.prototype.calculateCameraOrientation = function () {
	  // calculate location of the camera
	  this.cameraLocation.x = this.armLocation.x - this.armLength * Math.sin(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical);
	  this.cameraLocation.y = this.armLocation.y - this.armLength * Math.cos(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical);
	  this.cameraLocation.z = this.armLocation.z + this.armLength * Math.sin(this.armRotation.vertical); // calculate rotation of the camera

	  this.cameraRotation.x = Math.PI / 2 - this.armRotation.vertical;
	  this.cameraRotation.y = 0;
	  this.cameraRotation.z = -this.armRotation.horizontal;
	  var xa = this.cameraRotation.x;
	  var za = this.cameraRotation.z;
	  var dx = this.cameraOffset.x;
	  var dy = this.cameraOffset.y;
	  var sin = Math.sin,
	      cos = Math.cos;
	  this.cameraLocation.x = this.cameraLocation.x + dx * cos(za) + dy * -sin(za) * cos(xa);
	  this.cameraLocation.y = this.cameraLocation.y + dx * sin(za) + dy * cos(za) * cos(xa);
	  this.cameraLocation.z = this.cameraLocation.z + dy * sin(xa);
	};

	var STYLE = {
	  BAR: 0,
	  BARCOLOR: 1,
	  BARSIZE: 2,
	  DOT: 3,
	  DOTLINE: 4,
	  DOTCOLOR: 5,
	  DOTSIZE: 6,
	  GRID: 7,
	  LINE: 8,
	  SURFACE: 9
	}; // The string representations of the styles

	var STYLENAME = {
	  'dot': STYLE.DOT,
	  'dot-line': STYLE.DOTLINE,
	  'dot-color': STYLE.DOTCOLOR,
	  'dot-size': STYLE.DOTSIZE,
	  'line': STYLE.LINE,
	  'grid': STYLE.GRID,
	  'surface': STYLE.SURFACE,
	  'bar': STYLE.BAR,
	  'bar-color': STYLE.BARCOLOR,
	  'bar-size': STYLE.BARSIZE
	};
	/**
	 * Field names in the options hash which are of relevance to the user.
	 *
	 * Specifically, these are the fields which require no special handling,
	 * and can be directly copied over.
	 */

	var OPTIONKEYS = ['width', 'height', 'filterLabel', 'legendLabel', 'xLabel', 'yLabel', 'zLabel', 'xValueLabel', 'yValueLabel', 'zValueLabel', 'showXAxis', 'showYAxis', 'showZAxis', 'showGrayBottom', 'showGrid', 'showPerspective', 'showShadow', 'showSurfaceGrid', 'keepAspectRatio', 'rotateAxisLabels', 'verticalRatio', 'dotSizeRatio', 'dotSizeMinFraction', 'dotSizeMaxFraction', 'showAnimationControls', 'animationInterval', 'animationPreload', 'animationAutoStart', 'axisColor', 'axisFontSize', 'axisFontType', 'gridColor', 'xCenter', 'yCenter', 'zoomable', 'tooltipDelay', 'ctrlToZoom'];
	/**
	 * Field names in the options hash which are of relevance to the user.
	 *
	 * Same as OPTIONKEYS, but internally these fields are stored with 
	 * prefix 'default' in the name.
	 */

	var PREFIXEDOPTIONKEYS = ['xBarWidth', 'yBarWidth', 'valueMin', 'valueMax', 'xMin', 'xMax', 'xStep', 'yMin', 'yMax', 'yStep', 'zMin', 'zMax', 'zStep']; // Placeholder for DEFAULTS reference

	var DEFAULTS = undefined;
	/**
	 * Check if given hash is empty.
	 *
	 * Source: http://stackoverflow.com/a/679937
	 *
	 * @param {object} obj
	 * @returns {boolean}
	 */

	function isEmpty(obj) {
	  for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) return false;
	  }

	  return true;
	}
	/**
	 * Make first letter of parameter upper case.
	 *
	 * Source: http://stackoverflow.com/a/1026087
	 *
	 * @param {string} str
	 * @returns {string}
	 */


	function capitalize(str) {
	  if (str === undefined || str === "" || typeof str != "string") {
	    return str;
	  }

	  return str.charAt(0).toUpperCase() + slice$5(str).call(str, 1);
	}
	/**
	 * Add a prefix to a field name, taking style guide into account
	 *
	 * @param {string} prefix
	 * @param {string} fieldName
	 * @returns {string}
	 */


	function prefixFieldName(prefix, fieldName) {
	  if (prefix === undefined || prefix === "") {
	    return fieldName;
	  }

	  return prefix + capitalize(fieldName);
	}
	/**
	 * Forcibly copy fields from src to dst in a controlled manner.
	 *
	 * A given field in dst will always be overwitten. If this field
	 * is undefined or not present in src, the field in dst will 
	 * be explicitly set to undefined.
	 * 
	 * The intention here is to be able to reset all option fields.
	 * 
	 * Only the fields mentioned in array 'fields' will be handled.
	 *
	 * @param {object} src
	 * @param {object} dst
	 * @param {array<string>} fields array with names of fields to copy
	 * @param {string} [prefix] prefix to use for the target fields.
	 */


	function forceCopy(src, dst, fields, prefix) {
	  var srcKey;
	  var dstKey;

	  for (var i = 0; i < fields.length; ++i) {
	    srcKey = fields[i];
	    dstKey = prefixFieldName(prefix, srcKey);
	    dst[dstKey] = src[srcKey];
	  }
	}
	/**
	 * Copy fields from src to dst in a safe and controlled manner.
	 *
	 * Only the fields mentioned in array 'fields' will be copied over,
	 * and only if these are actually defined.
	 *
	 * @param {object} src
	 * @param {object} dst
	 * @param {array<string>} fields array with names of fields to copy
	 * @param {string} [prefix] prefix to use for the target fields.
	 */


	function safeCopy(src, dst, fields, prefix) {
	  var srcKey;
	  var dstKey;

	  for (var i = 0; i < fields.length; ++i) {
	    srcKey = fields[i];
	    if (src[srcKey] === undefined) continue;
	    dstKey = prefixFieldName(prefix, srcKey);
	    dst[dstKey] = src[srcKey];
	  }
	}
	/**
	 * Initialize dst with the values in src.
	 *
	 * src is the hash with the default values. 
	 * A reference DEFAULTS to this hash is stored locally for 
	 * further handling.
	 *
	 * For now, dst is assumed to be a Graph3d instance.
	 * @param {object} src
	 * @param {object} dst
	 */


	function setDefaults(src, dst) {
	  if (src === undefined || isEmpty(src)) {
	    throw new Error('No DEFAULTS passed');
	  }

	  if (dst === undefined) {
	    throw new Error('No dst passed');
	  } // Remember defaults for future reference


	  DEFAULTS = src; // Handle the defaults which can be simply copied over

	  forceCopy(src, dst, OPTIONKEYS);
	  forceCopy(src, dst, PREFIXEDOPTIONKEYS, 'default'); // Handle the more complex ('special') fields

	  setSpecialSettings(src, dst); // Following are internal fields, not part of the user settings

	  dst.margin = 10; // px

	  dst.showTooltip = false;
	  dst.onclick_callback = null;
	  dst.eye = new Point3d_1(0, 0, -1); // TODO: set eye.z about 3/4 of the width of the window?
	}
	/**
	 *
	 * @param {object} options
	 * @param {object} dst
	 */


	function setOptions(options, dst) {
	  if (options === undefined) {
	    return;
	  }

	  if (dst === undefined) {
	    throw new Error('No dst passed');
	  }

	  if (DEFAULTS === undefined || isEmpty(DEFAULTS)) {
	    throw new Error('DEFAULTS not set for module Settings');
	  } // Handle the parameters which can be simply copied over


	  safeCopy(options, dst, OPTIONKEYS);
	  safeCopy(options, dst, PREFIXEDOPTIONKEYS, 'default'); // Handle the more complex ('special') fields

	  setSpecialSettings(options, dst);
	}
	/**
	 * Special handling for certain parameters
	 *
	 * 'Special' here means: setting requires more than a simple copy
	 *
	 * @param {object} src
	 * @param {object} dst
	 */


	function setSpecialSettings(src, dst) {
	  if (src.backgroundColor !== undefined) {
	    setBackgroundColor(src.backgroundColor, dst);
	  }

	  setDataColor(src.dataColor, dst);
	  setStyle(src.style, dst);

	  if (src.surfaceColors !== undefined) {
	    console.warn('`options.surfaceColors` is deprecated and may be removed in a future ' + 'version. Please use `options.colormap` instead. Note that the `colormap` ' + 'option uses the inverse array ordering (running from vMin to vMax).');

	    if (src.colormap !== undefined) {
	      throw new Error('The `colormap` and `surfaceColors` options are mutually exclusive.');
	    }

	    if (dst.style !== 'surface') {
	      console.warn('Ignoring `surfaceColors` in graph style `' + dst.style + '` for ' + 'backward compatibility (only effective in `surface` plots).');
	    } else {
	      setSurfaceColor(src.surfaceColors, dst);
	    }
	  } else {
	    setColormap(src.colormap, dst);
	  }

	  setShowLegend(src.showLegend, dst);
	  setCameraPosition(src.cameraPosition, dst); // As special fields go, this is an easy one; just a translation of the name.
	  // Can't use this.tooltip directly, because that field exists internally

	  if (src.tooltip !== undefined) {
	    dst.showTooltip = src.tooltip;
	  }

	  if (src.onclick != undefined) {
	    dst.onclick_callback = src.onclick;
	    console.warn("`options.onclick` is deprecated and may be removed in a future version." + " Please use `Graph3d.on('click', handler)` instead.");
	  }

	  if (src.tooltipStyle !== undefined) {
	    selectiveDeepExtend(['tooltipStyle'], dst, src);
	  }
	}
	/**
	 * Set the value of setting 'showLegend'
	 *
	 * This depends on the value of the style fields, so it must be called
	 * after the style field has been initialized.
	 *
	 * @param {boolean} showLegend
	 * @param {object} dst
	 */


	function setShowLegend(showLegend, dst) {
	  if (showLegend === undefined) {
	    // If the default was auto, make a choice for this field
	    var isAutoByDefault = DEFAULTS.showLegend === undefined;

	    if (isAutoByDefault) {
	      // these styles default to having legends
	      var isLegendGraphStyle = dst.style === STYLE.DOTCOLOR || dst.style === STYLE.DOTSIZE;
	      dst.showLegend = isLegendGraphStyle;
	    }
	  } else {
	    dst.showLegend = showLegend;
	  }
	}
	/**
	 * Retrieve the style index from given styleName
	 * @param {string} styleName  Style name such as 'dot', 'grid', 'dot-line'
	 * @return {number} styleNumber Enumeration value representing the style, or -1
	 *                when not found
	 */


	function getStyleNumberByName(styleName) {
	  var number = STYLENAME[styleName];

	  if (number === undefined) {
	    return -1;
	  }

	  return number;
	}
	/**
	 * Check if given number is a valid style number.
	 *
	 * @param {string | number} style
	 * @return {boolean} true if valid, false otherwise
	 */


	function checkStyleNumber(style) {
	  var valid = false;

	  for (var n in STYLE) {
	    if (STYLE[n] === style) {
	      valid = true;
	      break;
	    }
	  }

	  return valid;
	}
	/**
	 *
	 * @param {string | number} style
	 * @param {Object} dst
	 */


	function setStyle(style, dst) {
	  if (style === undefined) {
	    return; // Nothing to do
	  }

	  var styleNumber;

	  if (typeof style === 'string') {
	    styleNumber = getStyleNumberByName(style);

	    if (styleNumber === -1) {
	      throw new Error('Style \'' + style + '\' is invalid');
	    }
	  } else {
	    // Do a pedantic check on style number value
	    if (!checkStyleNumber(style)) {
	      throw new Error('Style \'' + style + '\' is invalid');
	    }

	    styleNumber = style;
	  }

	  dst.style = styleNumber;
	}
	/**
	 * Set the background styling for the graph
	 * @param {string | {fill: string, stroke: string, strokeWidth: string}} backgroundColor
	 * @param {Object} dst
	 */


	function setBackgroundColor(backgroundColor, dst) {
	  var fill = 'white';
	  var stroke = 'gray';
	  var strokeWidth = 1;

	  if (typeof backgroundColor === 'string') {
	    fill = backgroundColor;
	    stroke = 'none';
	    strokeWidth = 0;
	  } else if (_typeof_1(backgroundColor) === 'object') {
	    if (fill$2(backgroundColor) !== undefined) fill = fill$2(backgroundColor);
	    if (backgroundColor.stroke !== undefined) stroke = backgroundColor.stroke;
	    if (backgroundColor.strokeWidth !== undefined) strokeWidth = backgroundColor.strokeWidth;
	  } else {
	    throw new Error('Unsupported type of backgroundColor');
	  }

	  dst.frame.style.backgroundColor = fill;
	  dst.frame.style.borderColor = stroke;
	  dst.frame.style.borderWidth = strokeWidth + 'px';
	  dst.frame.style.borderStyle = 'solid';
	}
	/**
	 *
	 * @param {string | Object} dataColor
	 * @param {Object} dst
	 */


	function setDataColor(dataColor, dst) {
	  if (dataColor === undefined) {
	    return; // Nothing to do
	  }

	  if (dst.dataColor === undefined) {
	    dst.dataColor = {};
	  }

	  if (typeof dataColor === 'string') {
	    dst.dataColor.fill = dataColor;
	    dst.dataColor.stroke = dataColor;
	  } else {
	    if (fill$2(dataColor)) {
	      dst.dataColor.fill = fill$2(dataColor);
	    }

	    if (dataColor.stroke) {
	      dst.dataColor.stroke = dataColor.stroke;
	    }

	    if (dataColor.strokeWidth !== undefined) {
	      dst.dataColor.strokeWidth = dataColor.strokeWidth;
	    }
	  }
	}
	/**
	 * 
	 * @param {Object | Array<string>} surfaceColors Either an object that describes the HUE, or an array of HTML hex color codes
	 * @param {Object} dst 
	 */


	function setSurfaceColor(surfaceColors, dst) {
	  if (surfaceColors === undefined || surfaceColors === true) {
	    return; // Nothing to do
	  }

	  if (surfaceColors === false) {
	    dst.surfaceColors = undefined;
	    return;
	  }

	  if (dst.surfaceColors === undefined) {
	    dst.surfaceColors = {};
	  }

	  var rgbColors;

	  if (isArray$3(surfaceColors)) {
	    rgbColors = parseColorArray(surfaceColors);
	  } else if (_typeof_1(surfaceColors) === 'object') {
	    rgbColors = parseColorObject(surfaceColors.hue);
	  } else {
	    throw new Error('Unsupported type of surfaceColors');
	  } // for some reason surfaceColors goes from vMax to vMin:


	  reverse$2(rgbColors).call(rgbColors);

	  dst.colormap = rgbColors;
	}
	/**
	 *
	 * @param {Object | Array<string>} colormap Either an object that describes the HUE, or an array of HTML hex color codes
	 * @param {Object} dst
	 */


	function setColormap(colormap, dst) {
	  if (colormap === undefined) {
	    return;
	  }

	  var rgbColors;

	  if (isArray$3(colormap)) {
	    rgbColors = parseColorArray(colormap);
	  } else if (_typeof_1(colormap) === 'object') {
	    rgbColors = parseColorObject(colormap.hue);
	  } else if (typeof colormap === 'function') {
	    rgbColors = colormap;
	  } else {
	    throw new Error('Unsupported type of colormap');
	  }

	  dst.colormap = rgbColors;
	}
	/**
	 *
	 * @param {Array} colormap
	 */


	function parseColorArray(colormap) {
	  if (colormap.length < 2) {
	    throw new Error('Colormap array length must be 2 or above.');
	  }

	  return map$2(colormap).call(colormap, function (colorCode) {
	    if (!isValidHex(colorCode)) {
	      throw new Error("Invalid hex color code supplied to colormap.");
	    }

	    return hexToRGB(colorCode);
	  });
	}
	/**
	 * Converts an object to a certain amount of hex color stops. At which point:
	 * the HTML hex color codes is converted into an RGB color object.
	 *
	 * @param {Object} hues
	 */


	function parseColorObject(hues) {
	  if (hues === undefined) {
	    throw new Error('Unsupported type of colormap');
	  }

	  if (!(hues.saturation >= 0 && hues.saturation <= 100)) {
	    throw new Error('Saturation is out of bounds. Expected range is 0-100.');
	  }

	  if (!(hues.brightness >= 0 && hues.brightness <= 100)) {
	    throw new Error('Brightness is out of bounds. Expected range is 0-100.');
	  }

	  if (!(hues.colorStops >= 2)) {
	    throw new Error('colorStops is out of bounds. Expected 2 or above.');
	  }

	  var hueStep = (hues.end - hues.start) / (hues.colorStops - 1);
	  var rgbColors = [];

	  for (var i = 0; i < hues.colorStops; ++i) {
	    var hue = (hues.start + hueStep * i) % 360 / 360;
	    rgbColors.push(HSVToRGB(hue < 0 ? hue + 1 : hue, hues.saturation / 100, hues.brightness / 100));
	  }

	  return rgbColors;
	}
	/**
	 *
	 * @param {Object} cameraPosition
	 * @param {Object} dst
	 */


	function setCameraPosition(cameraPosition, dst) {
	  var camPos = cameraPosition;

	  if (camPos === undefined) {
	    return;
	  }

	  if (dst.camera === undefined) {
	    dst.camera = new Camera();
	  }

	  dst.camera.setArmRotation(camPos.horizontal, camPos.vertical);
	  dst.camera.setArmLength(camPos.distance);
	}

	var $stringify$1 = getBuiltIn('JSON', 'stringify');
	var re = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var fix = function (match, offset, string) {
	  var prev = string.charAt(offset - 1);
	  var next = string.charAt(offset + 1);

	  if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
	    return '\\u' + match.charCodeAt(0).toString(16);
	  }

	  return match;
	};

	var FORCED$5 = fails(function () {
	  return $stringify$1('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify$1('\uDEAD') !== '"\\udead"';
	});

	if ($stringify$1) {
	  // https://github.com/tc39/proposal-well-formed-stringify
	  _export({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED$5
	  }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var result = $stringify$1.apply(null, arguments);
	      return typeof result == 'string' ? result.replace(re, fix) : result;
	    }
	  });
	}

	if (!path.JSON) path.JSON = {
	  stringify: JSON.stringify
	}; // eslint-disable-next-line no-unused-vars

	var stringify = function stringify(it, replacer, space) {
	  return path.JSON.stringify.apply(null, arguments);
	};

	var stringify$1 = stringify;

	var stringify$2 = stringify$1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$7(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var errorFound = false;
	var allOptions;
	var printStyle = 'background: #FFeeee; color: #dd0000';
	/**
	 *  Used to validate options.
	 */

	var Validator = /*#__PURE__*/function () {
	  /**
	   * @ignore
	   */
	  function Validator() {
	    classCallCheck(this, Validator);
	  }
	  /**
	   * Main function to be called
	   * @param {Object} options
	   * @param {Object} referenceOptions
	   * @param {Object} subObject
	   * @returns {boolean}
	   * @static
	   */


	  createClass(Validator, null, [{
	    key: "validate",
	    value: function validate(options, referenceOptions, subObject) {
	      errorFound = false;
	      allOptions = referenceOptions;
	      var usedOptions = referenceOptions;

	      if (subObject !== undefined) {
	        usedOptions = referenceOptions[subObject];
	      }

	      Validator.parse(options, usedOptions, []);
	      return errorFound;
	    }
	    /**
	     * Will traverse an object recursively and check every value
	     * @param {Object} options
	     * @param {Object} referenceOptions
	     * @param {array} path    | where to look for the actual option
	     * @static
	     */

	  }, {
	    key: "parse",
	    value: function parse(options, referenceOptions, path) {
	      for (var option in options) {
	        if (options.hasOwnProperty(option)) {
	          Validator.check(option, options, referenceOptions, path);
	        }
	      }
	    }
	    /**
	     * Check every value. If the value is an object, call the parse function on that object.
	     * @param {string} option
	     * @param {Object} options
	     * @param {Object} referenceOptions
	     * @param {array} path    | where to look for the actual option
	     * @static
	     */

	  }, {
	    key: "check",
	    value: function check(option, options, referenceOptions, path) {
	      if (referenceOptions[option] === undefined && referenceOptions.__any__ === undefined) {
	        Validator.getSuggestion(option, referenceOptions, path);
	        return;
	      }

	      var referenceOption = option;
	      var is_object = true;

	      if (referenceOptions[option] === undefined && referenceOptions.__any__ !== undefined) {
	        // NOTE: This only triggers if the __any__ is in the top level of the options object.
	        //       THAT'S A REALLY BAD PLACE TO ALLOW IT!!!!
	        // TODO: Examine if needed, remove if possible
	        // __any__ is a wildcard. Any value is accepted and will be further analysed by reference.
	        referenceOption = '__any__'; // if the any-subgroup is not a predefined object in the configurator,
	        // we do not look deeper into the object.

	        is_object = Validator.getType(options[option]) === 'object';
	      }

	      var refOptionObj = referenceOptions[referenceOption];

	      if (is_object && refOptionObj.__type__ !== undefined) {
	        refOptionObj = refOptionObj.__type__;
	      }

	      Validator.checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path);
	    }
	    /**
	     *
	     * @param {string}  option           | the option property
	     * @param {Object}  options          | The supplied options object
	     * @param {Object}  referenceOptions | The reference options containing all options and their allowed formats
	     * @param {string}  referenceOption  | Usually this is the same as option, except when handling an __any__ tag.
	     * @param {string}  refOptionObj     | This is the type object from the reference options
	     * @param {Array}   path             | where in the object is the option
	     * @static
	     */

	  }, {
	    key: "checkFields",
	    value: function checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path) {
	      var log = function log(message) {
	        console.log('%c' + message + Validator.printLocation(path, option), printStyle);
	      };

	      var optionType = Validator.getType(options[option]);
	      var refOptionType = refOptionObj[optionType];

	      if (refOptionType !== undefined) {
	        // if the type is correct, we check if it is supposed to be one of a few select values
	        if (Validator.getType(refOptionType) === 'array' && indexOf$3(refOptionType).call(refOptionType, options[option]) === -1) {
	          log('Invalid option detected in "' + option + '".' + ' Allowed values are:' + Validator.print(refOptionType) + ' not "' + options[option] + '". ');
	          errorFound = true;
	        } else if (optionType === 'object' && referenceOption !== "__any__") {
	          path = copyAndExtendArray(path, option);
	          Validator.parse(options[option], referenceOptions[referenceOption], path);
	        }
	      } else if (refOptionObj['any'] === undefined) {
	        // type of the field is incorrect and the field cannot be any
	        log('Invalid type received for "' + option + '". Expected: ' + Validator.print(keys$3(refOptionObj)) + '. Received [' + optionType + '] "' + options[option] + '"');
	        errorFound = true;
	      }
	    }
	    /**
	     *
	     * @param {Object|boolean|number|string|Array.<number>|Date|Node|Moment|undefined|null} object
	     * @returns {string}
	     * @static
	     */

	  }, {
	    key: "getType",
	    value: function getType(object) {
	      var type = _typeof_1(object);

	      if (type === 'object') {
	        if (object === null) {
	          return 'null';
	        }

	        if (object instanceof Boolean) {
	          return 'boolean';
	        }

	        if (object instanceof Number) {
	          return 'number';
	        }

	        if (object instanceof String) {
	          return 'string';
	        }

	        if (isArray$3(object)) {
	          return 'array';
	        }

	        if (object instanceof Date) {
	          return 'date';
	        }

	        if (object.nodeType !== undefined) {
	          return 'dom';
	        }

	        if (object._isAMomentObject === true) {
	          return 'moment';
	        }

	        return 'object';
	      } else if (type === 'number') {
	        return 'number';
	      } else if (type === 'boolean') {
	        return 'boolean';
	      } else if (type === 'string') {
	        return 'string';
	      } else if (type === undefined) {
	        return 'undefined';
	      }

	      return type;
	    }
	    /**
	     * @param {string} option
	     * @param {Object} options
	     * @param {Array.<string>} path
	     * @static
	     */

	  }, {
	    key: "getSuggestion",
	    value: function getSuggestion(option, options, path) {
	      var localSearch = Validator.findInOptions(option, options, path, false);
	      var globalSearch = Validator.findInOptions(option, allOptions, [], true);
	      var localSearchThreshold = 8;
	      var globalSearchThreshold = 4;
	      var msg;

	      if (localSearch.indexMatch !== undefined) {
	        msg = ' in ' + Validator.printLocation(localSearch.path, option, '') + 'Perhaps it was incomplete? Did you mean: "' + localSearch.indexMatch + '"?\n\n';
	      } else if (globalSearch.distance <= globalSearchThreshold && localSearch.distance > globalSearch.distance) {
	        msg = ' in ' + Validator.printLocation(localSearch.path, option, '') + 'Perhaps it was misplaced? Matching option found at: ' + Validator.printLocation(globalSearch.path, globalSearch.closestMatch, '');
	      } else if (localSearch.distance <= localSearchThreshold) {
	        msg = '. Did you mean "' + localSearch.closestMatch + '"?' + Validator.printLocation(localSearch.path, option);
	      } else {
	        msg = '. Did you mean one of these: ' + Validator.print(keys$3(options)) + Validator.printLocation(path, option);
	      }

	      console.log('%cUnknown option detected: "' + option + '"' + msg, printStyle);
	      errorFound = true;
	    }
	    /**
	     * traverse the options in search for a match.
	     * @param {string} option
	     * @param {Object} options
	     * @param {Array} path    | where to look for the actual option
	     * @param {boolean} [recursive=false]
	     * @returns {{closestMatch: string, path: Array, distance: number}}
	     * @static
	     */

	  }, {
	    key: "findInOptions",
	    value: function findInOptions(option, options, path) {
	      var recursive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	      var min = 1e9;
	      var closestMatch = '';
	      var closestMatchPath = [];
	      var lowerCaseOption = option.toLowerCase();
	      var indexMatch = undefined;

	      for (var op in options) {
	        // eslint-disable-line guard-for-in
	        var distance = void 0;

	        if (options[op].__type__ !== undefined && recursive === true) {
	          var result = Validator.findInOptions(option, options[op], copyAndExtendArray(path, op));

	          if (min > result.distance) {
	            closestMatch = result.closestMatch;
	            closestMatchPath = result.path;
	            min = result.distance;
	            indexMatch = result.indexMatch;
	          }
	        } else {
	          var _context;

	          if (indexOf$3(_context = op.toLowerCase()).call(_context, lowerCaseOption) !== -1) {
	            indexMatch = op;
	          }

	          distance = Validator.levenshteinDistance(option, op);

	          if (min > distance) {
	            closestMatch = op;
	            closestMatchPath = copyArray(path);
	            min = distance;
	          }
	        }
	      }

	      return {
	        closestMatch: closestMatch,
	        path: closestMatchPath,
	        distance: min,
	        indexMatch: indexMatch
	      };
	    }
	    /**
	     * @param {Array.<string>} path
	     * @param {Object} option
	     * @param {string} prefix
	     * @returns {String}
	     * @static
	     */

	  }, {
	    key: "printLocation",
	    value: function printLocation(path, option) {
	      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Problem value found at: \n';
	      var str = '\n\n' + prefix + 'options = {\n';

	      for (var i = 0; i < path.length; i++) {
	        for (var j = 0; j < i + 1; j++) {
	          str += '  ';
	        }

	        str += path[i] + ': {\n';
	      }

	      for (var _j = 0; _j < path.length + 1; _j++) {
	        str += '  ';
	      }

	      str += option + '\n';

	      for (var _i = 0; _i < path.length + 1; _i++) {
	        for (var _j2 = 0; _j2 < path.length - _i; _j2++) {
	          str += '  ';
	        }

	        str += '}\n';
	      }

	      return str + '\n\n';
	    }
	    /**
	     * @param {Object} options
	     * @returns {String}
	     * @static
	     */

	  }, {
	    key: "print",
	    value: function print(options) {
	      return stringify$2(options).replace(/(\")|(\[)|(\])|(,"__type__")/g, "").replace(/(\,)/g, ', ');
	    }
	    /**
	     *  Compute the edit distance between the two given strings
	     * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
	     *
	     * Copyright (c) 2011 Andrei Mackenzie
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	     *
	     * @param {string} a
	     * @param {string} b
	     * @returns {Array.<Array.<number>>}}
	     * @static
	     */

	  }, {
	    key: "levenshteinDistance",
	    value: function levenshteinDistance(a, b) {
	      if (a.length === 0) return b.length;
	      if (b.length === 0) return a.length;
	      var matrix = []; // increment along the first column of each row

	      var i;

	      for (i = 0; i <= b.length; i++) {
	        matrix[i] = [i];
	      } // increment each column in the first row


	      var j;

	      for (j = 0; j <= a.length; j++) {
	        matrix[0][j] = j;
	      } // Fill in the rest of the matrix


	      for (i = 1; i <= b.length; i++) {
	        for (j = 1; j <= a.length; j++) {
	          if (b.charAt(i - 1) == a.charAt(j - 1)) {
	            matrix[i][j] = matrix[i - 1][j - 1];
	          } else {
	            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
	            Math.min(matrix[i][j - 1] + 1, // insertion
	            matrix[i - 1][j] + 1)); // deletion
	          }
	        }
	      }

	      return matrix[b.length][a.length];
	    }
	  }]);

	  return Validator;
	}();

	/**
	 * This object contains all possible options. It will check if the types are correct, if required if the option is one
	 * of the allowed values.
	 *
	 * __any__ means that the name of the property does not matter.
	 * __type__ is a required field for all objects and contains the allowed types of all objects
	 */
	var string = 'string';
	var bool = 'boolean';
	var number = 'number';
	var object = 'object'; // should only be in a __type__ property

	var array = 'array'; // Following not used here, but useful for reference
	//let dom      = 'dom';
	//let any      = 'any';

	var colorOptions = {
	  fill: {
	    string: string
	  },
	  stroke: {
	    string: string
	  },
	  strokeWidth: {
	    number: number
	  },
	  __type__: {
	    string: string,
	    object: object,
	    'undefined': 'undefined'
	  }
	};
	var surfaceColorsOptions = {
	  hue: {
	    start: {
	      number: number
	    },
	    end: {
	      number: number
	    },
	    saturation: {
	      number: number
	    },
	    brightness: {
	      number: number
	    },
	    colorStops: {
	      number: number
	    },
	    __type__: {
	      object: object
	    }
	  },
	  __type__: {
	    boolean: bool,
	    array: array,
	    object: object,
	    'undefined': 'undefined'
	  }
	};
	var colormapOptions = {
	  hue: {
	    start: {
	      number: number
	    },
	    end: {
	      number: number
	    },
	    saturation: {
	      number: number
	    },
	    brightness: {
	      number: number
	    },
	    colorStops: {
	      number: number
	    },
	    __type__: {
	      object: object
	    }
	  },
	  __type__: {
	    array: array,
	    object: object,
	    'function': 'function',
	    'undefined': 'undefined'
	  }
	};
	/**
	 * Order attempted to be alphabetical.
	 *   - x/y/z-prefixes ignored in sorting
	 *   - __type__ always at end
	 *   - globals at end
	 */

	var allOptions$1 = {
	  animationAutoStart: {
	    boolean: bool,
	    'undefined': 'undefined'
	  },
	  animationInterval: {
	    number: number
	  },
	  animationPreload: {
	    boolean: bool
	  },
	  axisColor: {
	    string: string
	  },
	  axisFontSize: {
	    number: number
	  },
	  axisFontType: {
	    string: string
	  },
	  backgroundColor: colorOptions,
	  xBarWidth: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  yBarWidth: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  cameraPosition: {
	    distance: {
	      number: number
	    },
	    horizontal: {
	      number: number
	    },
	    vertical: {
	      number: number
	    },
	    __type__: {
	      object: object
	    }
	  },
	  zoomable: {
	    boolean: bool
	  },
	  ctrlToZoom: {
	    boolean: bool
	  },
	  xCenter: {
	    string: string
	  },
	  yCenter: {
	    string: string
	  },
	  colormap: colormapOptions,
	  dataColor: colorOptions,
	  dotSizeMinFraction: {
	    number: number
	  },
	  dotSizeMaxFraction: {
	    number: number
	  },
	  dotSizeRatio: {
	    number: number
	  },
	  filterLabel: {
	    string: string
	  },
	  gridColor: {
	    string: string
	  },
	  onclick: {
	    'function': 'function'
	  },
	  keepAspectRatio: {
	    boolean: bool
	  },
	  xLabel: {
	    string: string
	  },
	  yLabel: {
	    string: string
	  },
	  zLabel: {
	    string: string
	  },
	  legendLabel: {
	    string: string
	  },
	  xMin: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  yMin: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  zMin: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  xMax: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  yMax: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  zMax: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  showAnimationControls: {
	    boolean: bool,
	    'undefined': 'undefined'
	  },
	  showGrayBottom: {
	    boolean: bool
	  },
	  showGrid: {
	    boolean: bool
	  },
	  showLegend: {
	    boolean: bool,
	    'undefined': 'undefined'
	  },
	  showPerspective: {
	    boolean: bool
	  },
	  showShadow: {
	    boolean: bool
	  },
	  showSurfaceGrid: {
	    boolean: bool
	  },
	  showXAxis: {
	    boolean: bool
	  },
	  showYAxis: {
	    boolean: bool
	  },
	  showZAxis: {
	    boolean: bool
	  },
	  rotateAxisLabels: {
	    boolean: bool
	  },
	  surfaceColors: surfaceColorsOptions,
	  xStep: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  yStep: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  zStep: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  style: {
	    number: number,
	    // TODO: either Graph3d.DEFAULT has string, or number allowed in documentation
	    string: ['bar', 'bar-color', 'bar-size', 'dot', 'dot-line', 'dot-color', 'dot-size', 'line', 'grid', 'surface']
	  },
	  tooltip: {
	    boolean: bool,
	    'function': 'function'
	  },
	  tooltipDelay: {
	    number: number
	  },
	  tooltipStyle: {
	    content: {
	      color: {
	        string: string
	      },
	      background: {
	        string: string
	      },
	      border: {
	        string: string
	      },
	      borderRadius: {
	        string: string
	      },
	      boxShadow: {
	        string: string
	      },
	      padding: {
	        string: string
	      },
	      __type__: {
	        object: object
	      }
	    },
	    line: {
	      borderLeft: {
	        string: string
	      },
	      height: {
	        string: string
	      },
	      width: {
	        string: string
	      },
	      pointerEvents: {
	        string: string
	      },
	      __type__: {
	        object: object
	      }
	    },
	    dot: {
	      border: {
	        string: string
	      },
	      borderRadius: {
	        string: string
	      },
	      height: {
	        string: string
	      },
	      width: {
	        string: string
	      },
	      pointerEvents: {
	        string: string
	      },
	      __type__: {
	        object: object
	      }
	    },
	    __type__: {
	      object: object
	    }
	  },
	  xValueLabel: {
	    'function': 'function'
	  },
	  yValueLabel: {
	    'function': 'function'
	  },
	  zValueLabel: {
	    'function': 'function'
	  },
	  valueMax: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  valueMin: {
	    number: number,
	    'undefined': 'undefined'
	  },
	  verticalRatio: {
	    number: number
	  },
	  //globals :
	  height: {
	    string: string
	  },
	  width: {
	    string: string
	  },
	  __type__: {
	    object: object
	  }
	};

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	var slice$6 = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  }

	  return factories[argsLength](C, args);
	}; // `Function.prototype.bind` method implementation
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind


	var functionBind = Function.bind || function bind(that
	/* , ...args */
	) {
	  var fn = aFunction(this);
	  var partArgs = slice$6.call(arguments, 1);

	  var boundFunction = function bound()
	  /* args... */
	  {
	    var args = partArgs.concat(slice$6.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };

	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
	// https://tc39.github.io/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it

	var NEW_TARGET_BUG = fails(function () {
	  function F() {
	    /* empty */
	  }

	  return !(nativeConstruct(function () {
	    /* empty */
	  }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  nativeConstruct(function () {
	    /* empty */
	  });
	});
	var FORCED$6 = NEW_TARGET_BUG || ARGS_BUG;
	_export({
	  target: 'Reflect',
	  stat: true,
	  forced: FORCED$6,
	  sham: FORCED$6
	}, {
	  construct: function construct(Target, args
	  /* , newTarget */
	  ) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();

	        case 1:
	          return new Target(args[0]);

	        case 2:
	          return new Target(args[0], args[1]);

	        case 3:
	          return new Target(args[0], args[1], args[2]);

	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      } // w/o altered newTarget, lot of arguments case


	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (functionBind.apply(Target, $args))();
	    } // with altered newTarget, not support built-in constructors


	    var proto = newTarget.prototype;
	    var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

	var construct$1 = path.Reflect.construct;

	var construct$2 = construct$1;

	var construct$3 = construct$2;

	var entries = entryVirtual('Array').entries;

	var entries$1 = entries;

	var ArrayPrototype$b = Array.prototype;
	var DOMIterables$2 = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var entries_1 = function (it) {
	  var own = it.entries;
	  return it === ArrayPrototype$b || it instanceof Array && own === ArrayPrototype$b.entries // eslint-disable-next-line no-prototype-builtins
	  || DOMIterables$2.hasOwnProperty(classof(it)) ? entries$1 : own;
	};

	var entries$2 = entries_1;

	var keys$4 = entryVirtual('Array').keys;

	var keys$5 = keys$4;

	var ArrayPrototype$c = Array.prototype;
	var DOMIterables$3 = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var keys_1 = function (it) {
	  var own = it.keys;
	  return it === ArrayPrototype$c || it instanceof Array && own === ArrayPrototype$c.keys // eslint-disable-next-line no-prototype-builtins
	  || DOMIterables$3.hasOwnProperty(classof(it)) ? keys$5 : own;
	};

	var keys$6 = keys_1;

	var $some = arrayIteration.some;
	var STRICT_METHOD$3 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$5
	}, {
	  some: function some(callbackfn
	  /* , thisArg */
	  ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var some = entryVirtual('Array').some;

	var ArrayPrototype$d = Array.prototype;

	var some_1 = function (it) {
	  var own = it.some;
	  return it === ArrayPrototype$d || it instanceof Array && own === ArrayPrototype$d.some ? some : own;
	};

	var some$1 = some_1;

	var some$2 = some$1;

	var create$3 = create;

	var create$4 = create$3;

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof

	_export({
	  target: 'Object',
	  stat: true
	}, {
	  setPrototypeOf: objectSetPrototypeOf
	});

	var setPrototypeOf = path.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var setPrototypeOf$2 = setPrototypeOf$1;

	var setPrototypeOf$3 = createCommonjsModule(function (module) {
	  function _setPrototypeOf(o, p) {
	    module.exports = _setPrototypeOf = setPrototypeOf$2 || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$4(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$3(subClass, superClass);
	}

	var inherits = _inherits;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf$3 = getPrototypeOf;

	var getPrototypeOf$4 = getPrototypeOf$3;

	var getPrototypeOf$5 = createCommonjsModule(function (module) {
	  function _getPrototypeOf(o) {
	    module.exports = _getPrototypeOf = setPrototypeOf$2 ? getPrototypeOf$4 : function _getPrototypeOf(o) {
	      return o.__proto__ || getPrototypeOf$4(o);
	    };
	    return _getPrototypeOf(o);
	  }

	  module.exports = _getPrototypeOf;
	});

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	  var defineProperty = objectDefineProperty.f;
	  var METADATA = uid('meta');
	  var id = 0;

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  var setMetadata = function (it) {
	    defineProperty(it, METADATA, {
	      value: {
	        objectID: 'O' + ++id,
	        // object ID
	        weakData: {} // weak collections IDs

	      }
	    });
	  };

	  var fastKey = function (it, create) {
	    // return a primitive with prefix
	    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

	      if (!create) return 'E'; // add missing metadata

	      setMetadata(it); // return object ID
	    }

	    return it[METADATA].objectID;
	  };

	  var getWeakData = function (it, create) {
	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true; // not necessary to add metadata

	      if (!create) return false; // add missing metadata

	      setMetadata(it); // return the store of weak collections IDs
	    }

	    return it[METADATA].weakData;
	  }; // add metadata on freeze-family methods calling


	  var onFreeze = function (it) {
	    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	    return it;
	  };

	  var meta = module.exports = {
	    REQUIRED: false,
	    fastKey: fastKey,
	    getWeakData: getWeakData,
	    onFreeze: onFreeze
	  };
	  hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var iterate_1 = createCommonjsModule(function (module) {
	  var Result = function (stopped, result) {
	    this.stopped = stopped;
	    this.result = result;
	  };

	  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	    var iterator, iterFn, index, length, result, next, step;

	    if (IS_ITERATOR) {
	      iterator = iterable;
	    } else {
	      iterFn = getIteratorMethod(iterable);
	      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

	      if (isArrayIteratorMethod(iterFn)) {
	        for (index = 0, length = toLength(iterable.length); length > index; index++) {
	          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
	          if (result && result instanceof Result) return result;
	        }

	        return new Result(false);
	      }

	      iterator = iterFn.call(iterable);
	    }

	    next = iterator.next;

	    while (!(step = next.call(iterator)).done) {
	      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	      if (typeof result == 'object' && result && result instanceof Result) return result;
	    }

	    return new Result(false);
	  };

	  iterate.stop = function (result) {
	    return new Result(true, result);
	  };
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	var defineProperty$9 = objectDefineProperty.f;
	var forEach$3 = arrayIteration.forEach;
	var setInternalState$3 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var exported = {};
	  var Constructor;

	  if (!descriptors || typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  }))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else {
	    Constructor = wrapper(function (target, iterable) {
	      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
	        type: CONSTRUCTOR_NAME,
	        collection: new NativeConstructor()
	      });
	      if (iterable != undefined) iterate_1(iterable, target[ADDER], target, IS_MAP);
	    });
	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    forEach$3(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';

	      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
	        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
	          var collection = getInternalState(this).collection;
	          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	          var result = collection[KEY](a === 0 ? 0 : a, b);
	          return IS_ADDER ? this : result;
	        });
	      }
	    });
	    IS_WEAK || defineProperty$9(Constructor.prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).collection.size;
	      }
	    });
	  }

	  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({
	    global: true,
	    forced: true
	  }, exported);
	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
	  }

	  return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
	};

	var defineProperty$a = objectDefineProperty.f;
	var fastKey = internalMetadata.fastKey;
	var setInternalState$4 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;
	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$4(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });
	    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index; // change existing entry

	      if (entry) {
	        entry.value = value; // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;else that.size++; // add to index

	        if (index !== 'F') state.index[index] = entry;
	      }

	      return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that); // fast case

	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index]; // frozen object case

	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;

	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }

	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);

	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;else that.size--;
	        }

	        return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn
	      /* , that = undefined */
	      ) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;

	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$a(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$4(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last; // revert to the last existing entry

	      while (entry && entry.removed) entry = entry.previous; // get next entry


	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return {
	          value: undefined,
	          done: true
	        };
	      } // return step by kind


	      if (kind == 'keys') return {
	        value: entry.key,
	        done: false
	      };
	      if (kind == 'values') return {
	        value: entry.value,
	        done: false
	      };
	      return {
	        value: [entry.key, entry.value],
	        done: false
	      };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-set-objects


	var es_set = collection('Set', function (init) {
	  return function Set() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionStrong);

	var set$1 = path.Set;

	var set$2 = set$1;

	var set$3 = set$2;

	// https://tc39.github.io/ecma262/#sec-map-objects


	var es_map = collection('Map', function (init) {
	  return function Map() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionStrong);

	var map$3 = path.Map;

	var map$4 = map$3;

	var map$5 = map$4;

	var runtime_1 = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;

	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator, PromiseImpl) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	            return PromiseImpl.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return PromiseImpl.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	      if (PromiseImpl === void 0) PromiseImpl = Promise;
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function (skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function () {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function (exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function (type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function (record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function (finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function (tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function (iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports );

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});

	var regenerator = runtime_1;

	var iterator$3 = iterator;

	var iterator$4 = iterator$3;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('splice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$6
	}, {
	  splice: function splice(start, deleteCount
	  /* , ...items */
	  ) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;

	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
	    }

	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }

	    A = arraySpeciesCreate(O, actualDeleteCount);

	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }

	    A.length = actualDeleteCount;

	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }

	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }
	    }

	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }

	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var splice = entryVirtual('Array').splice;

	var ArrayPrototype$e = Array.prototype;

	var splice_1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$e || it instanceof Array && own === ArrayPrototype$e.splice ? splice : own;
	};

	var splice$1 = splice_1;

	var splice$2 = splice$1;

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


	var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? functionBindContext(mapper, thisArg, 3) : false;
	  var element;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      if (depth > 0 && isArray(element)) {
	        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }

	    sourceIndex++;
	  }

	  return targetIndex;
	};

	var flattenIntoArray_1 = flattenIntoArray;

	// https://github.com/tc39/proposal-flatMap


	_export({
	  target: 'Array',
	  proto: true
	}, {
	  flatMap: function flatMap(callbackfn
	  /* , thisArg */
	  ) {
	    var O = toObject(this);
	    var sourceLen = toLength(O.length);
	    var A;
	    aFunction(callbackfn);
	    A = arraySpeciesCreate(O, 0);
	    A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    return A;
	  }
	});

	var flatMap = entryVirtual('Array').flatMap;

	var ArrayPrototype$f = Array.prototype;

	var flatMap_1 = function (it) {
	  var own = it.flatMap;
	  return it === ArrayPrototype$f || it instanceof Array && own === ArrayPrototype$f.flatMap ? flatMap : own;
	};

	var flatMap$1 = flatMap_1;

	var flatMap$2 = flatMap$1;

	var createMethod$5 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }

	      index += i;

	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }

	    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }

	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$5(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$5(true)
	};

	var $reduce = arrayReduce.left;
	var STRICT_METHOD$4 = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH$7 = arrayMethodUsesToLength('reduce', {
	  1: 0
	}); // `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$7
	}, {
	  reduce: function reduce(callbackfn
	  /* , initialValue */
	  ) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var reduce = entryVirtual('Array').reduce;

	var ArrayPrototype$g = Array.prototype;

	var reduce_1 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype$g || it instanceof Array && own === ArrayPrototype$g.reduce ? reduce : own;
	};

	var reduce$1 = reduce_1;

	var reduce$2 = reduce$1;

	// https://tc39.github.io/ecma262/#sec-function.prototype.bind

	_export({
	  target: 'Function',
	  proto: true
	}, {
	  bind: functionBind
	});

	var bind = entryVirtual('Function').bind;

	var FunctionPrototype = Function.prototype;

	var bind_1 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind : own;
	};

	var bind$1 = bind_1;

	var bind$2 = bind$1;

	var moment = createCommonjsModule(function (module, exports) {

	  (function (global, factory) {
	     module.exports = factory() ;
	  })(commonjsGlobal, function () {

	    var hookCallback;

	    function hooks() {
	      return hookCallback.apply(null, arguments);
	    } // This is done to register the method called with moment()
	    // without creating circular dependencies.


	    function setHookCallback(callback) {
	      hookCallback = callback;
	    }

	    function isArray(input) {
	      return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isObject(input) {
	      // IE8 will treat undefined and null as object if it wasn't for
	      // input != null
	      return input != null && Object.prototype.toString.call(input) === '[object Object]';
	    }

	    function isObjectEmpty(obj) {
	      if (Object.getOwnPropertyNames) {
	        return Object.getOwnPropertyNames(obj).length === 0;
	      } else {
	        var k;

	        for (k in obj) {
	          if (obj.hasOwnProperty(k)) {
	            return false;
	          }
	        }

	        return true;
	      }
	    }

	    function isUndefined(input) {
	      return input === void 0;
	    }

	    function isNumber(input) {
	      return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
	    }

	    function isDate(input) {
	      return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	      var res = [],
	          i;

	      for (i = 0; i < arr.length; ++i) {
	        res.push(fn(arr[i], i));
	      }

	      return res;
	    }

	    function hasOwnProp(a, b) {
	      return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	      for (var i in b) {
	        if (hasOwnProp(b, i)) {
	          a[i] = b[i];
	        }
	      }

	      if (hasOwnProp(b, 'toString')) {
	        a.toString = b.toString;
	      }

	      if (hasOwnProp(b, 'valueOf')) {
	        a.valueOf = b.valueOf;
	      }

	      return a;
	    }

	    function createUTC(input, format, locale, strict) {
	      return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	      // We need to deep clone this object.
	      return {
	        empty: false,
	        unusedTokens: [],
	        unusedInput: [],
	        overflow: -2,
	        charsLeftOver: 0,
	        nullInput: false,
	        invalidMonth: null,
	        invalidFormat: false,
	        userInvalidated: false,
	        iso: false,
	        parsedDateParts: [],
	        meridiem: null,
	        rfc2822: false,
	        weekdayMismatch: false
	      };
	    }

	    function getParsingFlags(m) {
	      if (m._pf == null) {
	        m._pf = defaultParsingFlags();
	      }

	      return m._pf;
	    }

	    var some;

	    if (Array.prototype.some) {
	      some = Array.prototype.some;
	    } else {
	      some = function (fun) {
	        var t = Object(this);
	        var len = t.length >>> 0;

	        for (var i = 0; i < len; i++) {
	          if (i in t && fun.call(this, t[i], i, t)) {
	            return true;
	          }
	        }

	        return false;
	      };
	    }

	    function isValid(m) {
	      if (m._isValid == null) {
	        var flags = getParsingFlags(m);
	        var parsedParts = some.call(flags.parsedDateParts, function (i) {
	          return i != null;
	        });
	        var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

	        if (m._strict) {
	          isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
	        }

	        if (Object.isFrozen == null || !Object.isFrozen(m)) {
	          m._isValid = isNowValid;
	        } else {
	          return isNowValid;
	        }
	      }

	      return m._isValid;
	    }

	    function createInvalid(flags) {
	      var m = createUTC(NaN);

	      if (flags != null) {
	        extend(getParsingFlags(m), flags);
	      } else {
	        getParsingFlags(m).userInvalidated = true;
	      }

	      return m;
	    } // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.


	    var momentProperties = hooks.momentProperties = [];

	    function copyConfig(to, from) {
	      var i, prop, val;

	      if (!isUndefined(from._isAMomentObject)) {
	        to._isAMomentObject = from._isAMomentObject;
	      }

	      if (!isUndefined(from._i)) {
	        to._i = from._i;
	      }

	      if (!isUndefined(from._f)) {
	        to._f = from._f;
	      }

	      if (!isUndefined(from._l)) {
	        to._l = from._l;
	      }

	      if (!isUndefined(from._strict)) {
	        to._strict = from._strict;
	      }

	      if (!isUndefined(from._tzm)) {
	        to._tzm = from._tzm;
	      }

	      if (!isUndefined(from._isUTC)) {
	        to._isUTC = from._isUTC;
	      }

	      if (!isUndefined(from._offset)) {
	        to._offset = from._offset;
	      }

	      if (!isUndefined(from._pf)) {
	        to._pf = getParsingFlags(from);
	      }

	      if (!isUndefined(from._locale)) {
	        to._locale = from._locale;
	      }

	      if (momentProperties.length > 0) {
	        for (i = 0; i < momentProperties.length; i++) {
	          prop = momentProperties[i];
	          val = from[prop];

	          if (!isUndefined(val)) {
	            to[prop] = val;
	          }
	        }
	      }

	      return to;
	    }

	    var updateInProgress = false; // Moment prototype object

	    function Moment(config) {
	      copyConfig(this, config);
	      this._d = new Date(config._d != null ? config._d.getTime() : NaN);

	      if (!this.isValid()) {
	        this._d = new Date(NaN);
	      } // Prevent infinite loop in case updateOffset creates new moment
	      // objects.


	      if (updateInProgress === false) {
	        updateInProgress = true;
	        hooks.updateOffset(this);
	        updateInProgress = false;
	      }
	    }

	    function isMoment(obj) {
	      return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
	    }

	    function absFloor(number) {
	      if (number < 0) {
	        // -0 -> 0
	        return Math.ceil(number) || 0;
	      } else {
	        return Math.floor(number);
	      }
	    }

	    function toInt(argumentForCoercion) {
	      var coercedNumber = +argumentForCoercion,
	          value = 0;

	      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	        value = absFloor(coercedNumber);
	      }

	      return value;
	    } // compare two arrays, return the number of differences


	    function compareArrays(array1, array2, dontConvert) {
	      var len = Math.min(array1.length, array2.length),
	          lengthDiff = Math.abs(array1.length - array2.length),
	          diffs = 0,
	          i;

	      for (i = 0; i < len; i++) {
	        if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
	          diffs++;
	        }
	      }

	      return diffs + lengthDiff;
	    }

	    function warn(msg) {
	      if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
	        console.warn('Deprecation warning: ' + msg);
	      }
	    }

	    function deprecate(msg, fn) {
	      var firstTime = true;
	      return extend(function () {
	        if (hooks.deprecationHandler != null) {
	          hooks.deprecationHandler(null, msg);
	        }

	        if (firstTime) {
	          var args = [];
	          var arg;

	          for (var i = 0; i < arguments.length; i++) {
	            arg = '';

	            if (typeof arguments[i] === 'object') {
	              arg += '\n[' + i + '] ';

	              for (var key in arguments[0]) {
	                arg += key + ': ' + arguments[0][key] + ', ';
	              }

	              arg = arg.slice(0, -2); // Remove trailing comma and space
	            } else {
	              arg = arguments[i];
	            }

	            args.push(arg);
	          }

	          warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
	          firstTime = false;
	        }

	        return fn.apply(this, arguments);
	      }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	      if (hooks.deprecationHandler != null) {
	        hooks.deprecationHandler(name, msg);
	      }

	      if (!deprecations[name]) {
	        warn(msg);
	        deprecations[name] = true;
	      }
	    }

	    hooks.suppressDeprecationWarnings = false;
	    hooks.deprecationHandler = null;

	    function isFunction(input) {
	      return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function set(config) {
	      var prop, i;

	      for (i in config) {
	        prop = config[i];

	        if (isFunction(prop)) {
	          this[i] = prop;
	        } else {
	          this['_' + i] = prop;
	        }
	      }

	      this._config = config; // Lenient ordinal parsing accepts just a number in addition to
	      // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
	      // TODO: Remove "ordinalParse" fallback in next major release.

	      this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	      var res = extend({}, parentConfig),
	          prop;

	      for (prop in childConfig) {
	        if (hasOwnProp(childConfig, prop)) {
	          if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	            res[prop] = {};
	            extend(res[prop], parentConfig[prop]);
	            extend(res[prop], childConfig[prop]);
	          } else if (childConfig[prop] != null) {
	            res[prop] = childConfig[prop];
	          } else {
	            delete res[prop];
	          }
	        }
	      }

	      for (prop in parentConfig) {
	        if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
	          // make sure changes to properties don't modify parent config
	          res[prop] = extend({}, res[prop]);
	        }
	      }

	      return res;
	    }

	    function Locale(config) {
	      if (config != null) {
	        this.set(config);
	      }
	    }

	    var keys;

	    if (Object.keys) {
	      keys = Object.keys;
	    } else {
	      keys = function (obj) {
	        var i,
	            res = [];

	        for (i in obj) {
	          if (hasOwnProp(obj, i)) {
	            res.push(i);
	          }
	        }

	        return res;
	      };
	    }

	    var defaultCalendar = {
	      sameDay: '[Today at] LT',
	      nextDay: '[Tomorrow at] LT',
	      nextWeek: 'dddd [at] LT',
	      lastDay: '[Yesterday at] LT',
	      lastWeek: '[Last] dddd [at] LT',
	      sameElse: 'L'
	    };

	    function calendar(key, mom, now) {
	      var output = this._calendar[key] || this._calendar['sameElse'];
	      return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	      LTS: 'h:mm:ss A',
	      LT: 'h:mm A',
	      L: 'MM/DD/YYYY',
	      LL: 'MMMM D, YYYY',
	      LLL: 'MMMM D, YYYY h:mm A',
	      LLLL: 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat(key) {
	      var format = this._longDateFormat[key],
	          formatUpper = this._longDateFormat[key.toUpperCase()];

	      if (format || !formatUpper) {
	        return format;
	      }

	      this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	        return val.slice(1);
	      });
	      return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate() {
	      return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

	    function ordinal(number) {
	      return this._ordinal.replace('%d', number);
	    }

	    var defaultRelativeTime = {
	      future: 'in %s',
	      past: '%s ago',
	      s: 'a few seconds',
	      ss: '%d seconds',
	      m: 'a minute',
	      mm: '%d minutes',
	      h: 'an hour',
	      hh: '%d hours',
	      d: 'a day',
	      dd: '%d days',
	      M: 'a month',
	      MM: '%d months',
	      y: 'a year',
	      yy: '%d years'
	    };

	    function relativeTime(number, withoutSuffix, string, isFuture) {
	      var output = this._relativeTime[string];
	      return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
	    }

	    function pastFuture(diff, output) {
	      var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	      return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var aliases = {};

	    function addUnitAlias(unit, shorthand) {
	      var lowerCase = unit.toLowerCase();
	      aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	      return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	      var normalizedInput = {},
	          normalizedProp,
	          prop;

	      for (prop in inputObject) {
	        if (hasOwnProp(inputObject, prop)) {
	          normalizedProp = normalizeUnits(prop);

	          if (normalizedProp) {
	            normalizedInput[normalizedProp] = inputObject[prop];
	          }
	        }
	      }

	      return normalizedInput;
	    }

	    var priorities = {};

	    function addUnitPriority(unit, priority) {
	      priorities[unit] = priority;
	    }

	    function getPrioritizedUnits(unitsObj) {
	      var units = [];

	      for (var u in unitsObj) {
	        units.push({
	          unit: u,
	          priority: priorities[u]
	        });
	      }

	      units.sort(function (a, b) {
	        return a.priority - b.priority;
	      });
	      return units;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	      var absNumber = '' + Math.abs(number),
	          zerosToFill = targetLength - absNumber.length,
	          sign = number >= 0;
	      return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	    var formatFunctions = {};
	    var formatTokenFunctions = {}; // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }

	    function addFormatToken(token, padded, ordinal, callback) {
	      var func = callback;

	      if (typeof callback === 'string') {
	        func = function () {
	          return this[callback]();
	        };
	      }

	      if (token) {
	        formatTokenFunctions[token] = func;
	      }

	      if (padded) {
	        formatTokenFunctions[padded[0]] = function () {
	          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	        };
	      }

	      if (ordinal) {
	        formatTokenFunctions[ordinal] = function () {
	          return this.localeData().ordinal(func.apply(this, arguments), token);
	        };
	      }
	    }

	    function removeFormattingTokens(input) {
	      if (input.match(/\[[\s\S]/)) {
	        return input.replace(/^\[|\]$/g, '');
	      }

	      return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	      var array = format.match(formattingTokens),
	          i,
	          length;

	      for (i = 0, length = array.length; i < length; i++) {
	        if (formatTokenFunctions[array[i]]) {
	          array[i] = formatTokenFunctions[array[i]];
	        } else {
	          array[i] = removeFormattingTokens(array[i]);
	        }
	      }

	      return function (mom) {
	        var output = '',
	            i;

	        for (i = 0; i < length; i++) {
	          output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
	        }

	        return output;
	      };
	    } // format date using native date object


	    function formatMoment(m, format) {
	      if (!m.isValid()) {
	        return m.localeData().invalidDate();
	      }

	      format = expandFormat(format, m.localeData());
	      formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
	      return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	      var i = 5;

	      function replaceLongDateFormatTokens(input) {
	        return locale.longDateFormat(input) || input;
	      }

	      localFormattingTokens.lastIndex = 0;

	      while (i >= 0 && localFormattingTokens.test(format)) {
	        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	        localFormattingTokens.lastIndex = 0;
	        i -= 1;
	      }

	      return format;
	    }

	    var match1 = /\d/; //       0 - 9

	    var match2 = /\d\d/; //      00 - 99

	    var match3 = /\d{3}/; //     000 - 999

	    var match4 = /\d{4}/; //    0000 - 9999

	    var match6 = /[+-]?\d{6}/; // -999999 - 999999

	    var match1to2 = /\d\d?/; //       0 - 99

	    var match3to4 = /\d\d\d\d?/; //     999 - 9999

	    var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999

	    var match1to3 = /\d{1,3}/; //       0 - 999

	    var match1to4 = /\d{1,4}/; //       0 - 9999

	    var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

	    var matchUnsigned = /\d+/; //       0 - inf

	    var matchSigned = /[+-]?\d+/; //    -inf - inf

	    var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months

	    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
	    var regexes = {};

	    function addRegexToken(token, regex, strictRegex) {
	      regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	        return isStrict && strictRegex ? strictRegex : regex;
	      };
	    }

	    function getParseRegexForToken(token, config) {
	      if (!hasOwnProp(regexes, token)) {
	        return new RegExp(unescapeFormat(token));
	      }

	      return regexes[token](config._strict, config._locale);
	    } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


	    function unescapeFormat(s) {
	      return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	        return p1 || p2 || p3 || p4;
	      }));
	    }

	    function regexEscape(s) {
	      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken(token, callback) {
	      var i,
	          func = callback;

	      if (typeof token === 'string') {
	        token = [token];
	      }

	      if (isNumber(callback)) {
	        func = function (input, array) {
	          array[callback] = toInt(input);
	        };
	      }

	      for (i = 0; i < token.length; i++) {
	        tokens[token[i]] = func;
	      }
	    }

	    function addWeekParseToken(token, callback) {
	      addParseToken(token, function (input, array, config, token) {
	        config._w = config._w || {};
	        callback(input, config._w, config, token);
	      });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	      if (input != null && hasOwnProp(tokens, token)) {
	        tokens[token](input, config._a, config, token);
	      }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8; // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	      var y = this.year();
	      return y <= 9999 ? '' + y : '+' + y;
	    });
	    addFormatToken(0, ['YY', 2], 0, function () {
	      return this.year() % 100;
	    });
	    addFormatToken(0, ['YYYY', 4], 0, 'year');
	    addFormatToken(0, ['YYYYY', 5], 0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year'); // ALIASES

	    addUnitAlias('year', 'y'); // PRIORITIES

	    addUnitPriority('year', 1); // PARSING

	    addRegexToken('Y', matchSigned);
	    addRegexToken('YY', match1to2, match2);
	    addRegexToken('YYYY', match1to4, match4);
	    addRegexToken('YYYYY', match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);
	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	      array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	      array[YEAR] = hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	      array[YEAR] = parseInt(input, 10);
	    }); // HELPERS

	    function daysInYear(year) {
	      return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	    } // HOOKS


	    hooks.parseTwoDigitYear = function (input) {
	      return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    }; // MOMENTS


	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear() {
	      return isLeapYear(this.year());
	    }

	    function makeGetSet(unit, keepTime) {
	      return function (value) {
	        if (value != null) {
	          set$1(this, unit, value);
	          hooks.updateOffset(this, keepTime);
	          return this;
	        } else {
	          return get(this, unit);
	        }
	      };
	    }

	    function get(mom, unit) {
	      return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function set$1(mom, unit, value) {
	      if (mom.isValid() && !isNaN(value)) {
	        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
	          mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
	        } else {
	          mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	      }
	    } // MOMENTS


	    function stringGet(units) {
	      units = normalizeUnits(units);

	      if (isFunction(this[units])) {
	        return this[units]();
	      }

	      return this;
	    }

	    function stringSet(units, value) {
	      if (typeof units === 'object') {
	        units = normalizeObjectUnits(units);
	        var prioritized = getPrioritizedUnits(units);

	        for (var i = 0; i < prioritized.length; i++) {
	          this[prioritized[i].unit](units[prioritized[i].unit]);
	        }
	      } else {
	        units = normalizeUnits(units);

	        if (isFunction(this[units])) {
	          return this[units](value);
	        }
	      }

	      return this;
	    }

	    function mod(n, x) {
	      return (n % x + x) % x;
	    }

	    var indexOf;

	    if (Array.prototype.indexOf) {
	      indexOf = Array.prototype.indexOf;
	    } else {
	      indexOf = function (o) {
	        // I know
	        var i;

	        for (i = 0; i < this.length; ++i) {
	          if (this[i] === o) {
	            return i;
	          }
	        }

	        return -1;
	      };
	    }

	    function daysInMonth(year, month) {
	      if (isNaN(year) || isNaN(month)) {
	        return NaN;
	      }

	      var modMonth = mod(month, 12);
	      year += (month - modMonth) / 12;
	      return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
	    } // FORMATTING


	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	      return this.month() + 1;
	    });
	    addFormatToken('MMM', 0, 0, function (format) {
	      return this.localeData().monthsShort(this, format);
	    });
	    addFormatToken('MMMM', 0, 0, function (format) {
	      return this.localeData().months(this, format);
	    }); // ALIASES

	    addUnitAlias('month', 'M'); // PRIORITY

	    addUnitPriority('month', 8); // PARSING

	    addRegexToken('M', match1to2);
	    addRegexToken('MM', match1to2, match2);
	    addRegexToken('MMM', function (isStrict, locale) {
	      return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	      return locale.monthsRegex(isStrict);
	    });
	    addParseToken(['M', 'MM'], function (input, array) {
	      array[MONTH] = toInt(input) - 1;
	    });
	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	      var month = config._locale.monthsParse(input, token, config._strict); // if we didn't find a month name, mark the date as invalid.


	      if (month != null) {
	        array[MONTH] = month;
	      } else {
	        getParsingFlags(config).invalidMonth = input;
	      }
	    }); // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');

	    function localeMonths(m, format) {
	      if (!m) {
	        return isArray(this._months) ? this._months : this._months['standalone'];
	      }

	      return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');

	    function localeMonthsShort(m, format) {
	      if (!m) {
	        return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
	      }

	      return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function handleStrictParse(monthName, format, strict) {
	      var i,
	          ii,
	          mom,
	          llc = monthName.toLocaleLowerCase();

	      if (!this._monthsParse) {
	        // this is not used
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];

	        for (i = 0; i < 12; ++i) {
	          mom = createUTC([2000, i]);
	          this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	          this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	        }
	      }

	      if (strict) {
	        if (format === 'MMM') {
	          ii = indexOf.call(this._shortMonthsParse, llc);
	          return ii !== -1 ? ii : null;
	        } else {
	          ii = indexOf.call(this._longMonthsParse, llc);
	          return ii !== -1 ? ii : null;
	        }
	      } else {
	        if (format === 'MMM') {
	          ii = indexOf.call(this._shortMonthsParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._longMonthsParse, llc);
	          return ii !== -1 ? ii : null;
	        } else {
	          ii = indexOf.call(this._longMonthsParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._shortMonthsParse, llc);
	          return ii !== -1 ? ii : null;
	        }
	      }
	    }

	    function localeMonthsParse(monthName, format, strict) {
	      var i, mom, regex;

	      if (this._monthsParseExact) {
	        return handleStrictParse.call(this, monthName, format, strict);
	      }

	      if (!this._monthsParse) {
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	      } // TODO: add sorting
	      // Sorting makes sure if one month (or abbr) is a prefix of another
	      // see sorting in computeMonthsParse


	      for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);

	        if (strict && !this._longMonthsParse[i]) {
	          this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	          this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	        }

	        if (!strict && !this._monthsParse[i]) {
	          regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	          this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        } // test the regex


	        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	          return i;
	        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	          return i;
	        } else if (!strict && this._monthsParse[i].test(monthName)) {
	          return i;
	        }
	      }
	    } // MOMENTS


	    function setMonth(mom, value) {
	      var dayOfMonth;

	      if (!mom.isValid()) {
	        // No op
	        return mom;
	      }

	      if (typeof value === 'string') {
	        if (/^\d+$/.test(value)) {
	          value = toInt(value);
	        } else {
	          value = mom.localeData().monthsParse(value); // TODO: Another silent failure?

	          if (!isNumber(value)) {
	            return mom;
	          }
	        }
	      }

	      dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));

	      mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);

	      return mom;
	    }

	    function getSetMonth(value) {
	      if (value != null) {
	        setMonth(this, value);
	        hooks.updateOffset(this, true);
	        return this;
	      } else {
	        return get(this, 'Month');
	      }
	    }

	    function getDaysInMonth() {
	      return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;

	    function monthsShortRegex(isStrict) {
	      if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	          computeMonthsParse.call(this);
	        }

	        if (isStrict) {
	          return this._monthsShortStrictRegex;
	        } else {
	          return this._monthsShortRegex;
	        }
	      } else {
	        if (!hasOwnProp(this, '_monthsShortRegex')) {
	          this._monthsShortRegex = defaultMonthsShortRegex;
	        }

	        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
	      }
	    }

	    var defaultMonthsRegex = matchWord;

	    function monthsRegex(isStrict) {
	      if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	          computeMonthsParse.call(this);
	        }

	        if (isStrict) {
	          return this._monthsStrictRegex;
	        } else {
	          return this._monthsRegex;
	        }
	      } else {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	          this._monthsRegex = defaultMonthsRegex;
	        }

	        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
	      }
	    }

	    function computeMonthsParse() {
	      function cmpLenRev(a, b) {
	        return b.length - a.length;
	      }

	      var shortPieces = [],
	          longPieces = [],
	          mixedPieces = [],
	          i,
	          mom;

	      for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        shortPieces.push(this.monthsShort(mom, ''));
	        longPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.monthsShort(mom, ''));
	      } // Sorting makes sure if one month (or abbr) is a prefix of another it
	      // will match the longer piece.


	      shortPieces.sort(cmpLenRev);
	      longPieces.sort(cmpLenRev);
	      mixedPieces.sort(cmpLenRev);

	      for (i = 0; i < 12; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	      }

	      for (i = 0; i < 24; i++) {
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	      }

	      this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	      this._monthsShortRegex = this._monthsRegex;
	      this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	      this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }

	    function createDate(y, m, d, h, M, s, ms) {
	      // can't just apply() to create a date:
	      // https://stackoverflow.com/q/181348
	      var date; // the date constructor remaps years 0-99 to 1900-1999

	      if (y < 100 && y >= 0) {
	        // preserve leap years using a full 400 year cycle, then reset
	        date = new Date(y + 400, m, d, h, M, s, ms);

	        if (isFinite(date.getFullYear())) {
	          date.setFullYear(y);
	        }
	      } else {
	        date = new Date(y, m, d, h, M, s, ms);
	      }

	      return date;
	    }

	    function createUTCDate(y) {
	      var date; // the Date.UTC function remaps years 0-99 to 1900-1999

	      if (y < 100 && y >= 0) {
	        var args = Array.prototype.slice.call(arguments); // preserve leap years using a full 400 year cycle, then reset

	        args[0] = y + 400;
	        date = new Date(Date.UTC.apply(null, args));

	        if (isFinite(date.getUTCFullYear())) {
	          date.setUTCFullYear(y);
	        }
	      } else {
	        date = new Date(Date.UTC.apply(null, arguments));
	      }

	      return date;
	    } // start-of-first-week - start-of-year


	    function firstWeekOffset(year, dow, doy) {
	      var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	      fwd = 7 + dow - doy,
	          // first-week day local weekday -- which local weekday is fwd
	      fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
	      return -fwdlw + fwd - 1;
	    } // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	      var localWeekday = (7 + weekday - dow) % 7,
	          weekOffset = firstWeekOffset(year, dow, doy),
	          dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	          resYear,
	          resDayOfYear;

	      if (dayOfYear <= 0) {
	        resYear = year - 1;
	        resDayOfYear = daysInYear(resYear) + dayOfYear;
	      } else if (dayOfYear > daysInYear(year)) {
	        resYear = year + 1;
	        resDayOfYear = dayOfYear - daysInYear(year);
	      } else {
	        resYear = year;
	        resDayOfYear = dayOfYear;
	      }

	      return {
	        year: resYear,
	        dayOfYear: resDayOfYear
	      };
	    }

	    function weekOfYear(mom, dow, doy) {
	      var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	          week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	          resWeek,
	          resYear;

	      if (week < 1) {
	        resYear = mom.year() - 1;
	        resWeek = week + weeksInYear(resYear, dow, doy);
	      } else if (week > weeksInYear(mom.year(), dow, doy)) {
	        resWeek = week - weeksInYear(mom.year(), dow, doy);
	        resYear = mom.year() + 1;
	      } else {
	        resYear = mom.year();
	        resWeek = week;
	      }

	      return {
	        week: resWeek,
	        year: resYear
	      };
	    }

	    function weeksInYear(year, dow, doy) {
	      var weekOffset = firstWeekOffset(year, dow, doy),
	          weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    } // FORMATTING


	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek'); // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W'); // PRIORITIES

	    addUnitPriority('week', 5);
	    addUnitPriority('isoWeek', 5); // PARSING

	    addRegexToken('w', match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W', match1to2);
	    addRegexToken('WW', match1to2, match2);
	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	      week[token.substr(0, 1)] = toInt(input);
	    }); // HELPERS
	    // LOCALES

	    function localeWeek(mom) {
	      return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	      dow: 0,
	      // Sunday is the first day of the week.
	      doy: 6 // The week that contains Jan 6th is the first week of the year.

	    };

	    function localeFirstDayOfWeek() {
	      return this._week.dow;
	    }

	    function localeFirstDayOfYear() {
	      return this._week.doy;
	    } // MOMENTS


	    function getSetWeek(input) {
	      var week = this.localeData().week(this);
	      return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek(input) {
	      var week = weekOfYear(this, 1, 4).week;
	      return input == null ? week : this.add((input - week) * 7, 'd');
	    } // FORMATTING


	    addFormatToken('d', 0, 'do', 'day');
	    addFormatToken('dd', 0, 0, function (format) {
	      return this.localeData().weekdaysMin(this, format);
	    });
	    addFormatToken('ddd', 0, 0, function (format) {
	      return this.localeData().weekdaysShort(this, format);
	    });
	    addFormatToken('dddd', 0, 0, function (format) {
	      return this.localeData().weekdays(this, format);
	    });
	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday'); // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E'); // PRIORITY

	    addUnitPriority('day', 11);
	    addUnitPriority('weekday', 11);
	    addUnitPriority('isoWeekday', 11); // PARSING

	    addRegexToken('d', match1to2);
	    addRegexToken('e', match1to2);
	    addRegexToken('E', match1to2);
	    addRegexToken('dd', function (isStrict, locale) {
	      return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd', function (isStrict, locale) {
	      return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd', function (isStrict, locale) {
	      return locale.weekdaysRegex(isStrict);
	    });
	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	      var weekday = config._locale.weekdaysParse(input, token, config._strict); // if we didn't get a weekday name, mark the date as invalid


	      if (weekday != null) {
	        week.d = weekday;
	      } else {
	        getParsingFlags(config).invalidWeekday = input;
	      }
	    });
	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	      week[token] = toInt(input);
	    }); // HELPERS

	    function parseWeekday(input, locale) {
	      if (typeof input !== 'string') {
	        return input;
	      }

	      if (!isNaN(input)) {
	        return parseInt(input, 10);
	      }

	      input = locale.weekdaysParse(input);

	      if (typeof input === 'number') {
	        return input;
	      }

	      return null;
	    }

	    function parseIsoWeekday(input, locale) {
	      if (typeof input === 'string') {
	        return locale.weekdaysParse(input) % 7 || 7;
	      }

	      return isNaN(input) ? null : input;
	    } // LOCALES


	    function shiftWeekdays(ws, n) {
	      return ws.slice(n, 7).concat(ws.slice(0, n));
	    }

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');

	    function localeWeekdays(m, format) {
	      var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
	      return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');

	    function localeWeekdaysShort(m) {
	      return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');

	    function localeWeekdaysMin(m) {
	      return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	    }

	    function handleStrictParse$1(weekdayName, format, strict) {
	      var i,
	          ii,
	          mom,
	          llc = weekdayName.toLocaleLowerCase();

	      if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._minWeekdaysParse = [];

	        for (i = 0; i < 7; ++i) {
	          mom = createUTC([2000, 1]).day(i);
	          this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	          this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	          this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	        }
	      }

	      if (strict) {
	        if (format === 'dddd') {
	          ii = indexOf.call(this._weekdaysParse, llc);
	          return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	          ii = indexOf.call(this._shortWeekdaysParse, llc);
	          return ii !== -1 ? ii : null;
	        } else {
	          ii = indexOf.call(this._minWeekdaysParse, llc);
	          return ii !== -1 ? ii : null;
	        }
	      } else {
	        if (format === 'dddd') {
	          ii = indexOf.call(this._weekdaysParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._shortWeekdaysParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._minWeekdaysParse, llc);
	          return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	          ii = indexOf.call(this._shortWeekdaysParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._weekdaysParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._minWeekdaysParse, llc);
	          return ii !== -1 ? ii : null;
	        } else {
	          ii = indexOf.call(this._minWeekdaysParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._weekdaysParse, llc);

	          if (ii !== -1) {
	            return ii;
	          }

	          ii = indexOf.call(this._shortWeekdaysParse, llc);
	          return ii !== -1 ? ii : null;
	        }
	      }
	    }

	    function localeWeekdaysParse(weekdayName, format, strict) {
	      var i, mom, regex;

	      if (this._weekdaysParseExact) {
	        return handleStrictParse$1.call(this, weekdayName, format, strict);
	      }

	      if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._minWeekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._fullWeekdaysParse = [];
	      }

	      for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, 1]).day(i);

	        if (strict && !this._fullWeekdaysParse[i]) {
	          this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
	          this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
	          this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
	        }

	        if (!this._weekdaysParse[i]) {
	          regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	          this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        } // test the regex


	        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	          return i;
	        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	          return i;
	        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	          return i;
	        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	          return i;
	        }
	      }
	    } // MOMENTS


	    function getSetDayOfWeek(input) {
	      if (!this.isValid()) {
	        return input != null ? this : NaN;
	      }

	      var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

	      if (input != null) {
	        input = parseWeekday(input, this.localeData());
	        return this.add(input - day, 'd');
	      } else {
	        return day;
	      }
	    }

	    function getSetLocaleDayOfWeek(input) {
	      if (!this.isValid()) {
	        return input != null ? this : NaN;
	      }

	      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	      return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek(input) {
	      if (!this.isValid()) {
	        return input != null ? this : NaN;
	      } // behaves the same as moment#day except
	      // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	      // as a setter, sunday should belong to the previous week.


	      if (input != null) {
	        var weekday = parseIsoWeekday(input, this.localeData());
	        return this.day(this.day() % 7 ? weekday : weekday - 7);
	      } else {
	        return this.day() || 7;
	      }
	    }

	    var defaultWeekdaysRegex = matchWord;

	    function weekdaysRegex(isStrict) {
	      if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	          computeWeekdaysParse.call(this);
	        }

	        if (isStrict) {
	          return this._weekdaysStrictRegex;
	        } else {
	          return this._weekdaysRegex;
	        }
	      } else {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	          this._weekdaysRegex = defaultWeekdaysRegex;
	        }

	        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
	      }
	    }

	    var defaultWeekdaysShortRegex = matchWord;

	    function weekdaysShortRegex(isStrict) {
	      if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	          computeWeekdaysParse.call(this);
	        }

	        if (isStrict) {
	          return this._weekdaysShortStrictRegex;
	        } else {
	          return this._weekdaysShortRegex;
	        }
	      } else {
	        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	          this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	        }

	        return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	      }
	    }

	    var defaultWeekdaysMinRegex = matchWord;

	    function weekdaysMinRegex(isStrict) {
	      if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	          computeWeekdaysParse.call(this);
	        }

	        if (isStrict) {
	          return this._weekdaysMinStrictRegex;
	        } else {
	          return this._weekdaysMinRegex;
	        }
	      } else {
	        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	          this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	        }

	        return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	      }
	    }

	    function computeWeekdaysParse() {
	      function cmpLenRev(a, b) {
	        return b.length - a.length;
	      }

	      var minPieces = [],
	          shortPieces = [],
	          longPieces = [],
	          mixedPieces = [],
	          i,
	          mom,
	          minp,
	          shortp,
	          longp;

	      for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, 1]).day(i);
	        minp = this.weekdaysMin(mom, '');
	        shortp = this.weekdaysShort(mom, '');
	        longp = this.weekdays(mom, '');
	        minPieces.push(minp);
	        shortPieces.push(shortp);
	        longPieces.push(longp);
	        mixedPieces.push(minp);
	        mixedPieces.push(shortp);
	        mixedPieces.push(longp);
	      } // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	      // will match the longer piece.


	      minPieces.sort(cmpLenRev);
	      shortPieces.sort(cmpLenRev);
	      longPieces.sort(cmpLenRev);
	      mixedPieces.sort(cmpLenRev);

	      for (i = 0; i < 7; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	      }

	      this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	      this._weekdaysShortRegex = this._weekdaysRegex;
	      this._weekdaysMinRegex = this._weekdaysRegex;
	      this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	      this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	      this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    } // FORMATTING


	    function hFormat() {
	      return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	      return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);
	    addFormatToken('hmm', 0, 0, function () {
	      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });
	    addFormatToken('hmmss', 0, 0, function () {
	      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
	    });
	    addFormatToken('Hmm', 0, 0, function () {
	      return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });
	    addFormatToken('Hmmss', 0, 0, function () {
	      return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
	    });

	    function meridiem(token, lowercase) {
	      addFormatToken(token, 0, 0, function () {
	        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	      });
	    }

	    meridiem('a', true);
	    meridiem('A', false); // ALIASES

	    addUnitAlias('hour', 'h'); // PRIORITY

	    addUnitPriority('hour', 13); // PARSING

	    function matchMeridiem(isStrict, locale) {
	      return locale._meridiemParse;
	    }

	    addRegexToken('a', matchMeridiem);
	    addRegexToken('A', matchMeridiem);
	    addRegexToken('H', match1to2);
	    addRegexToken('h', match1to2);
	    addRegexToken('k', match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);
	    addRegexToken('kk', match1to2, match2);
	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);
	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['k', 'kk'], function (input, array, config) {
	      var kInput = toInt(input);
	      array[HOUR] = kInput === 24 ? 0 : kInput;
	    });
	    addParseToken(['a', 'A'], function (input, array, config) {
	      config._isPm = config._locale.isPM(input);
	      config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	      array[HOUR] = toInt(input);
	      getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	      var pos = input.length - 2;
	      array[HOUR] = toInt(input.substr(0, pos));
	      array[MINUTE] = toInt(input.substr(pos));
	      getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	      var pos1 = input.length - 4;
	      var pos2 = input.length - 2;
	      array[HOUR] = toInt(input.substr(0, pos1));
	      array[MINUTE] = toInt(input.substr(pos1, 2));
	      array[SECOND] = toInt(input.substr(pos2));
	      getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	      var pos = input.length - 2;
	      array[HOUR] = toInt(input.substr(0, pos));
	      array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	      var pos1 = input.length - 4;
	      var pos2 = input.length - 2;
	      array[HOUR] = toInt(input.substr(0, pos1));
	      array[MINUTE] = toInt(input.substr(pos1, 2));
	      array[SECOND] = toInt(input.substr(pos2));
	    }); // LOCALES

	    function localeIsPM(input) {
	      // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	      // Using charAt should be more compatible.
	      return (input + '').toLowerCase().charAt(0) === 'p';
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

	    function localeMeridiem(hours, minutes, isLower) {
	      if (hours > 11) {
	        return isLower ? 'pm' : 'PM';
	      } else {
	        return isLower ? 'am' : 'AM';
	      }
	    } // MOMENTS
	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour they want. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.


	    var getSetHour = makeGetSet('Hours', true);
	    var baseConfig = {
	      calendar: defaultCalendar,
	      longDateFormat: defaultLongDateFormat,
	      invalidDate: defaultInvalidDate,
	      ordinal: defaultOrdinal,
	      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
	      relativeTime: defaultRelativeTime,
	      months: defaultLocaleMonths,
	      monthsShort: defaultLocaleMonthsShort,
	      week: defaultLocaleWeek,
	      weekdays: defaultLocaleWeekdays,
	      weekdaysMin: defaultLocaleWeekdaysMin,
	      weekdaysShort: defaultLocaleWeekdaysShort,
	      meridiemParse: defaultLocaleMeridiemParse
	    }; // internal storage for locale config files

	    var locales = {};
	    var localeFamilies = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	      return key ? key.toLowerCase().replace('_', '-') : key;
	    } // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


	    function chooseLocale(names) {
	      var i = 0,
	          j,
	          next,
	          locale,
	          split;

	      while (i < names.length) {
	        split = normalizeLocale(names[i]).split('-');
	        j = split.length;
	        next = normalizeLocale(names[i + 1]);
	        next = next ? next.split('-') : null;

	        while (j > 0) {
	          locale = loadLocale(split.slice(0, j).join('-'));

	          if (locale) {
	            return locale;
	          }

	          if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	            //the next array item is better than a shallower substring of this one
	            break;
	          }

	          j--;
	        }

	        i++;
	      }

	      return globalLocale;
	    }

	    function loadLocale(name) {
	      var oldLocale = null; // TODO: Find a better way to register and load all the locales in Node

	      if (!locales[name] && 'object' !== 'undefined' && module && module.exports) {
	        try {
	          oldLocale = globalLocale._abbr;
	          var aliasedRequire = commonjsRequire;
	          aliasedRequire('./locale/' + name);
	          getSetGlobalLocale(oldLocale);
	        } catch (e) {}
	      }

	      return locales[name];
	    } // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.


	    function getSetGlobalLocale(key, values) {
	      var data;

	      if (key) {
	        if (isUndefined(values)) {
	          data = getLocale(key);
	        } else {
	          data = defineLocale(key, values);
	        }

	        if (data) {
	          // moment.duration._locale = moment._locale = data;
	          globalLocale = data;
	        } else {
	          if (typeof console !== 'undefined' && console.warn) {
	            //warn user if arguments are passed but the locale could not be set
	            console.warn('Locale ' + key + ' not found. Did you forget to load it?');
	          }
	        }
	      }

	      return globalLocale._abbr;
	    }

	    function defineLocale(name, config) {
	      if (config !== null) {
	        var locale,
	            parentConfig = baseConfig;
	        config.abbr = name;

	        if (locales[name] != null) {
	          deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	          parentConfig = locales[name]._config;
	        } else if (config.parentLocale != null) {
	          if (locales[config.parentLocale] != null) {
	            parentConfig = locales[config.parentLocale]._config;
	          } else {
	            locale = loadLocale(config.parentLocale);

	            if (locale != null) {
	              parentConfig = locale._config;
	            } else {
	              if (!localeFamilies[config.parentLocale]) {
	                localeFamilies[config.parentLocale] = [];
	              }

	              localeFamilies[config.parentLocale].push({
	                name: name,
	                config: config
	              });
	              return null;
	            }
	          }
	        }

	        locales[name] = new Locale(mergeConfigs(parentConfig, config));

	        if (localeFamilies[name]) {
	          localeFamilies[name].forEach(function (x) {
	            defineLocale(x.name, x.config);
	          });
	        } // backwards compat for now: also set the locale
	        // make sure we set the locale AFTER all child locales have been
	        // created, so we won't end up with the child locale set.


	        getSetGlobalLocale(name);
	        return locales[name];
	      } else {
	        // useful for testing
	        delete locales[name];
	        return null;
	      }
	    }

	    function updateLocale(name, config) {
	      if (config != null) {
	        var locale,
	            tmpLocale,
	            parentConfig = baseConfig; // MERGE

	        tmpLocale = loadLocale(name);

	        if (tmpLocale != null) {
	          parentConfig = tmpLocale._config;
	        }

	        config = mergeConfigs(parentConfig, config);
	        locale = new Locale(config);
	        locale.parentLocale = locales[name];
	        locales[name] = locale; // backwards compat for now: also set the locale

	        getSetGlobalLocale(name);
	      } else {
	        // pass null for config to unupdate, useful for tests
	        if (locales[name] != null) {
	          if (locales[name].parentLocale != null) {
	            locales[name] = locales[name].parentLocale;
	          } else if (locales[name] != null) {
	            delete locales[name];
	          }
	        }
	      }

	      return locales[name];
	    } // returns locale data


	    function getLocale(key) {
	      var locale;

	      if (key && key._locale && key._locale._abbr) {
	        key = key._locale._abbr;
	      }

	      if (!key) {
	        return globalLocale;
	      }

	      if (!isArray(key)) {
	        //short-circuit everything else
	        locale = loadLocale(key);

	        if (locale) {
	          return locale;
	        }

	        key = [key];
	      }

	      return chooseLocale(key);
	    }

	    function listLocales() {
	      return keys(locales);
	    }

	    function checkOverflow(m) {
	      var overflow;
	      var a = m._a;

	      if (a && getParsingFlags(m).overflow === -2) {
	        overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

	        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	          overflow = DATE;
	        }

	        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	          overflow = WEEK;
	        }

	        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	          overflow = WEEKDAY;
	        }

	        getParsingFlags(m).overflow = overflow;
	      }

	      return m;
	    } // Pick the first defined of two or three arguments.


	    function defaults(a, b, c) {
	      if (a != null) {
	        return a;
	      }

	      if (b != null) {
	        return b;
	      }

	      return c;
	    }

	    function currentDateArray(config) {
	      // hooks is actually the exported moment object
	      var nowValue = new Date(hooks.now());

	      if (config._useUTC) {
	        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	      }

	      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    } // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]


	    function configFromArray(config) {
	      var i,
	          date,
	          input = [],
	          currentDate,
	          expectedWeekday,
	          yearToUse;

	      if (config._d) {
	        return;
	      }

	      currentDate = currentDateArray(config); //compute day of the year from weeks and weekdays

	      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	        dayOfYearFromWeekInfo(config);
	      } //if the day of the year is set, figure out what it is


	      if (config._dayOfYear != null) {
	        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
	          getParsingFlags(config)._overflowDayOfYear = true;
	        }

	        date = createUTCDate(yearToUse, 0, config._dayOfYear);
	        config._a[MONTH] = date.getUTCMonth();
	        config._a[DATE] = date.getUTCDate();
	      } // Default to current date.
	      // * if no year, month, day of month are given, default to today
	      // * if day of month is given, default month and year
	      // * if month is given, default only year
	      // * if year is given, don't default anything


	      for (i = 0; i < 3 && config._a[i] == null; ++i) {
	        config._a[i] = input[i] = currentDate[i];
	      } // Zero out whatever was not defaulted, including time


	      for (; i < 7; i++) {
	        config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
	      } // Check for 24:00:00.000


	      if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
	        config._nextDay = true;
	        config._a[HOUR] = 0;
	      }

	      config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	      expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay(); // Apply timezone offset from input. The actual utcOffset can be changed
	      // with parseZone.

	      if (config._tzm != null) {
	        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	      }

	      if (config._nextDay) {
	        config._a[HOUR] = 24;
	      } // check for mismatching day of week


	      if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
	        getParsingFlags(config).weekdayMismatch = true;
	      }
	    }

	    function dayOfYearFromWeekInfo(config) {
	      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
	      w = config._w;

	      if (w.GG != null || w.W != null || w.E != null) {
	        dow = 1;
	        doy = 4; // TODO: We need to take the current isoWeekYear, but that depends on
	        // how we interpret now (local, utc, fixed offset). So create
	        // a now version of current config (take local/utc/offset flags, and
	        // create now).

	        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
	        week = defaults(w.W, 1);
	        weekday = defaults(w.E, 1);

	        if (weekday < 1 || weekday > 7) {
	          weekdayOverflow = true;
	        }
	      } else {
	        dow = config._locale._week.dow;
	        doy = config._locale._week.doy;
	        var curWeek = weekOfYear(createLocal(), dow, doy);
	        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year); // Default to current week.

	        week = defaults(w.w, curWeek.week);

	        if (w.d != null) {
	          // weekday -- low day numbers are considered next week
	          weekday = w.d;

	          if (weekday < 0 || weekday > 6) {
	            weekdayOverflow = true;
	          }
	        } else if (w.e != null) {
	          // local weekday -- counting starts from beginning of week
	          weekday = w.e + dow;

	          if (w.e < 0 || w.e > 6) {
	            weekdayOverflow = true;
	          }
	        } else {
	          // default to beginning of week
	          weekday = dow;
	        }
	      }

	      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	        getParsingFlags(config)._overflowWeeks = true;
	      } else if (weekdayOverflow != null) {
	        getParsingFlags(config)._overflowWeekday = true;
	      } else {
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	      }
	    } // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)


	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
	    var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], // YYYYMM is NOT allowed by the standard
	    ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]]; // iso time formats and regexes

	    var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];
	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i; // date from iso format

	    function configFromISO(config) {
	      var i,
	          l,
	          string = config._i,
	          match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	          allowTime,
	          dateFormat,
	          timeFormat,
	          tzFormat;

	      if (match) {
	        getParsingFlags(config).iso = true;

	        for (i = 0, l = isoDates.length; i < l; i++) {
	          if (isoDates[i][1].exec(match[1])) {
	            dateFormat = isoDates[i][0];
	            allowTime = isoDates[i][2] !== false;
	            break;
	          }
	        }

	        if (dateFormat == null) {
	          config._isValid = false;
	          return;
	        }

	        if (match[3]) {
	          for (i = 0, l = isoTimes.length; i < l; i++) {
	            if (isoTimes[i][1].exec(match[3])) {
	              // match[2] should be 'T' or space
	              timeFormat = (match[2] || ' ') + isoTimes[i][0];
	              break;
	            }
	          }

	          if (timeFormat == null) {
	            config._isValid = false;
	            return;
	          }
	        }

	        if (!allowTime && timeFormat != null) {
	          config._isValid = false;
	          return;
	        }

	        if (match[4]) {
	          if (tzRegex.exec(match[4])) {
	            tzFormat = 'Z';
	          } else {
	            config._isValid = false;
	            return;
	          }
	        }

	        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	        configFromStringAndFormat(config);
	      } else {
	        config._isValid = false;
	      }
	    } // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3


	    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

	    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
	      var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

	      if (secondStr) {
	        result.push(parseInt(secondStr, 10));
	      }

	      return result;
	    }

	    function untruncateYear(yearStr) {
	      var year = parseInt(yearStr, 10);

	      if (year <= 49) {
	        return 2000 + year;
	      } else if (year <= 999) {
	        return 1900 + year;
	      }

	      return year;
	    }

	    function preprocessRFC2822(s) {
	      // Remove comments and folding whitespace and replace multiple-spaces with a single space
	      return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	    }

	    function checkWeekday(weekdayStr, parsedInput, config) {
	      if (weekdayStr) {
	        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
	        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
	            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();

	        if (weekdayProvided !== weekdayActual) {
	          getParsingFlags(config).weekdayMismatch = true;
	          config._isValid = false;
	          return false;
	        }
	      }

	      return true;
	    }

	    var obsOffsets = {
	      UT: 0,
	      GMT: 0,
	      EDT: -4 * 60,
	      EST: -5 * 60,
	      CDT: -5 * 60,
	      CST: -6 * 60,
	      MDT: -6 * 60,
	      MST: -7 * 60,
	      PDT: -7 * 60,
	      PST: -8 * 60
	    };

	    function calculateOffset(obsOffset, militaryOffset, numOffset) {
	      if (obsOffset) {
	        return obsOffsets[obsOffset];
	      } else if (militaryOffset) {
	        // the only allowed military tz is Z
	        return 0;
	      } else {
	        var hm = parseInt(numOffset, 10);
	        var m = hm % 100,
	            h = (hm - m) / 100;
	        return h * 60 + m;
	      }
	    } // date and time from ref 2822 format


	    function configFromRFC2822(config) {
	      var match = rfc2822.exec(preprocessRFC2822(config._i));

	      if (match) {
	        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);

	        if (!checkWeekday(match[1], parsedArray, config)) {
	          return;
	        }

	        config._a = parsedArray;
	        config._tzm = calculateOffset(match[8], match[9], match[10]);
	        config._d = createUTCDate.apply(null, config._a);

	        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

	        getParsingFlags(config).rfc2822 = true;
	      } else {
	        config._isValid = false;
	      }
	    } // date from iso format or fallback


	    function configFromString(config) {
	      var matched = aspNetJsonRegex.exec(config._i);

	      if (matched !== null) {
	        config._d = new Date(+matched[1]);
	        return;
	      }

	      configFromISO(config);

	      if (config._isValid === false) {
	        delete config._isValid;
	      } else {
	        return;
	      }

	      configFromRFC2822(config);

	      if (config._isValid === false) {
	        delete config._isValid;
	      } else {
	        return;
	      } // Final attempt, use Input Fallback


	      hooks.createFromInputFallback(config);
	    }

	    hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
	      config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	    }); // constant that refers to the ISO standard

	    hooks.ISO_8601 = function () {}; // constant that refers to the RFC 2822 form


	    hooks.RFC_2822 = function () {}; // date from string and format string


	    function configFromStringAndFormat(config) {
	      // TODO: Move this to another part of the creation flow to prevent circular deps
	      if (config._f === hooks.ISO_8601) {
	        configFromISO(config);
	        return;
	      }

	      if (config._f === hooks.RFC_2822) {
	        configFromRFC2822(config);
	        return;
	      }

	      config._a = [];
	      getParsingFlags(config).empty = true; // This array is used to make a Date, either with `new Date` or `Date.UTC`

	      var string = '' + config._i,
	          i,
	          parsedInput,
	          tokens,
	          token,
	          skipped,
	          stringLength = string.length,
	          totalParsedInputLength = 0;
	      tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	      for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0]; // console.log('token', token, 'parsedInput', parsedInput,
	        //         'regex', getParseRegexForToken(token, config));

	        if (parsedInput) {
	          skipped = string.substr(0, string.indexOf(parsedInput));

	          if (skipped.length > 0) {
	            getParsingFlags(config).unusedInput.push(skipped);
	          }

	          string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	          totalParsedInputLength += parsedInput.length;
	        } // don't parse if it's not a known token


	        if (formatTokenFunctions[token]) {
	          if (parsedInput) {
	            getParsingFlags(config).empty = false;
	          } else {
	            getParsingFlags(config).unusedTokens.push(token);
	          }

	          addTimeToArrayFromToken(token, parsedInput, config);
	        } else if (config._strict && !parsedInput) {
	          getParsingFlags(config).unusedTokens.push(token);
	        }
	      } // add remaining unparsed input length to the string


	      getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;

	      if (string.length > 0) {
	        getParsingFlags(config).unusedInput.push(string);
	      } // clear _12h flag if hour is <= 12


	      if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
	        getParsingFlags(config).bigHour = undefined;
	      }

	      getParsingFlags(config).parsedDateParts = config._a.slice(0);
	      getParsingFlags(config).meridiem = config._meridiem; // handle meridiem

	      config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	      configFromArray(config);
	      checkOverflow(config);
	    }

	    function meridiemFixWrap(locale, hour, meridiem) {
	      var isPm;

	      if (meridiem == null) {
	        // nothing to do
	        return hour;
	      }

	      if (locale.meridiemHour != null) {
	        return locale.meridiemHour(hour, meridiem);
	      } else if (locale.isPM != null) {
	        // Fallback
	        isPm = locale.isPM(meridiem);

	        if (isPm && hour < 12) {
	          hour += 12;
	        }

	        if (!isPm && hour === 12) {
	          hour = 0;
	        }

	        return hour;
	      } else {
	        // this is not supposed to happen
	        return hour;
	      }
	    } // date from string and array of format strings


	    function configFromStringAndArray(config) {
	      var tempConfig, bestMoment, scoreToBeat, i, currentScore;

	      if (config._f.length === 0) {
	        getParsingFlags(config).invalidFormat = true;
	        config._d = new Date(NaN);
	        return;
	      }

	      for (i = 0; i < config._f.length; i++) {
	        currentScore = 0;
	        tempConfig = copyConfig({}, config);

	        if (config._useUTC != null) {
	          tempConfig._useUTC = config._useUTC;
	        }

	        tempConfig._f = config._f[i];
	        configFromStringAndFormat(tempConfig);

	        if (!isValid(tempConfig)) {
	          continue;
	        } // if there is any input that was not parsed add a penalty for that format


	        currentScore += getParsingFlags(tempConfig).charsLeftOver; //or tokens

	        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
	        getParsingFlags(tempConfig).score = currentScore;

	        if (scoreToBeat == null || currentScore < scoreToBeat) {
	          scoreToBeat = currentScore;
	          bestMoment = tempConfig;
	        }
	      }

	      extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	      if (config._d) {
	        return;
	      }

	      var i = normalizeObjectUnits(config._i);
	      config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	        return obj && parseInt(obj, 10);
	      });
	      configFromArray(config);
	    }

	    function createFromConfig(config) {
	      var res = new Moment(checkOverflow(prepareConfig(config)));

	      if (res._nextDay) {
	        // Adding is smart enough around DST
	        res.add(1, 'd');
	        res._nextDay = undefined;
	      }

	      return res;
	    }

	    function prepareConfig(config) {
	      var input = config._i,
	          format = config._f;
	      config._locale = config._locale || getLocale(config._l);

	      if (input === null || format === undefined && input === '') {
	        return createInvalid({
	          nullInput: true
	        });
	      }

	      if (typeof input === 'string') {
	        config._i = input = config._locale.preparse(input);
	      }

	      if (isMoment(input)) {
	        return new Moment(checkOverflow(input));
	      } else if (isDate(input)) {
	        config._d = input;
	      } else if (isArray(format)) {
	        configFromStringAndArray(config);
	      } else if (format) {
	        configFromStringAndFormat(config);
	      } else {
	        configFromInput(config);
	      }

	      if (!isValid(config)) {
	        config._d = null;
	      }

	      return config;
	    }

	    function configFromInput(config) {
	      var input = config._i;

	      if (isUndefined(input)) {
	        config._d = new Date(hooks.now());
	      } else if (isDate(input)) {
	        config._d = new Date(input.valueOf());
	      } else if (typeof input === 'string') {
	        configFromString(config);
	      } else if (isArray(input)) {
	        config._a = map(input.slice(0), function (obj) {
	          return parseInt(obj, 10);
	        });
	        configFromArray(config);
	      } else if (isObject(input)) {
	        configFromObject(config);
	      } else if (isNumber(input)) {
	        // from milliseconds
	        config._d = new Date(input);
	      } else {
	        hooks.createFromInputFallback(config);
	      }
	    }

	    function createLocalOrUTC(input, format, locale, strict, isUTC) {
	      var c = {};

	      if (locale === true || locale === false) {
	        strict = locale;
	        locale = undefined;
	      }

	      if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
	        input = undefined;
	      } // object construction must be done this way.
	      // https://github.com/moment/moment/issues/1423


	      c._isAMomentObject = true;
	      c._useUTC = c._isUTC = isUTC;
	      c._l = locale;
	      c._i = input;
	      c._f = format;
	      c._strict = strict;
	      return createFromConfig(c);
	    }

	    function createLocal(input, format, locale, strict) {
	      return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
	      var other = createLocal.apply(null, arguments);

	      if (this.isValid() && other.isValid()) {
	        return other < this ? this : other;
	      } else {
	        return createInvalid();
	      }
	    });
	    var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
	      var other = createLocal.apply(null, arguments);

	      if (this.isValid() && other.isValid()) {
	        return other > this ? this : other;
	      } else {
	        return createInvalid();
	      }
	    }); // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.

	    function pickBy(fn, moments) {
	      var res, i;

	      if (moments.length === 1 && isArray(moments[0])) {
	        moments = moments[0];
	      }

	      if (!moments.length) {
	        return createLocal();
	      }

	      res = moments[0];

	      for (i = 1; i < moments.length; ++i) {
	        if (!moments[i].isValid() || moments[i][fn](res)) {
	          res = moments[i];
	        }
	      }

	      return res;
	    } // TODO: Use [].sort instead?


	    function min() {
	      var args = [].slice.call(arguments, 0);
	      return pickBy('isBefore', args);
	    }

	    function max() {
	      var args = [].slice.call(arguments, 0);
	      return pickBy('isAfter', args);
	    }

	    var now = function () {
	      return Date.now ? Date.now() : +new Date();
	    };

	    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

	    function isDurationValid(m) {
	      for (var key in m) {
	        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
	          return false;
	        }
	      }

	      var unitHasDecimal = false;

	      for (var i = 0; i < ordering.length; ++i) {
	        if (m[ordering[i]]) {
	          if (unitHasDecimal) {
	            return false; // only allow non-integers for smallest unit
	          }

	          if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
	            unitHasDecimal = true;
	          }
	        }
	      }

	      return true;
	    }

	    function isValid$1() {
	      return this._isValid;
	    }

	    function createInvalid$1() {
	      return createDuration(NaN);
	    }

	    function Duration(duration) {
	      var normalizedInput = normalizeObjectUnits(duration),
	          years = normalizedInput.year || 0,
	          quarters = normalizedInput.quarter || 0,
	          months = normalizedInput.month || 0,
	          weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
	          days = normalizedInput.day || 0,
	          hours = normalizedInput.hour || 0,
	          minutes = normalizedInput.minute || 0,
	          seconds = normalizedInput.second || 0,
	          milliseconds = normalizedInput.millisecond || 0;
	      this._isValid = isDurationValid(normalizedInput); // representation for dateAddRemove

	      this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
	      minutes * 6e4 + // 1000 * 60
	      hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	      // Because of dateAddRemove treats 24 hours as different from a
	      // day when working around DST, we need to store them separately

	      this._days = +days + weeks * 7; // It is impossible to translate months into days without knowing
	      // which months you are are talking about, so we have to store
	      // it separately.

	      this._months = +months + quarters * 3 + years * 12;
	      this._data = {};
	      this._locale = getLocale();

	      this._bubble();
	    }

	    function isDuration(obj) {
	      return obj instanceof Duration;
	    }

	    function absRound(number) {
	      if (number < 0) {
	        return Math.round(-1 * number) * -1;
	      } else {
	        return Math.round(number);
	      }
	    } // FORMATTING


	    function offset(token, separator) {
	      addFormatToken(token, 0, 0, function () {
	        var offset = this.utcOffset();
	        var sign = '+';

	        if (offset < 0) {
	          offset = -offset;
	          sign = '-';
	        }

	        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
	      });
	    }

	    offset('Z', ':');
	    offset('ZZ', ''); // PARSING

	    addRegexToken('Z', matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	      config._useUTC = true;
	      config._tzm = offsetFromString(matchShortOffset, input);
	    }); // HELPERS
	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']

	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	      var matches = (string || '').match(matcher);

	      if (matches === null) {
	        return null;
	      }

	      var chunk = matches[matches.length - 1] || [];
	      var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	      var minutes = +(parts[1] * 60) + toInt(parts[2]);
	      return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
	    } // Return a moment from input, that is local/utc/zone equivalent to model.


	    function cloneWithOffset(input, model) {
	      var res, diff;

	      if (model._isUTC) {
	        res = model.clone();
	        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf(); // Use low-level api, because this fn is low-level api.

	        res._d.setTime(res._d.valueOf() + diff);

	        hooks.updateOffset(res, false);
	        return res;
	      } else {
	        return createLocal(input).local();
	      }
	    }

	    function getDateOffset(m) {
	      // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	      // https://github.com/moment/moment/pull/1871
	      return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    } // HOOKS
	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.


	    hooks.updateOffset = function () {}; // MOMENTS
	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.


	    function getSetOffset(input, keepLocalTime, keepMinutes) {
	      var offset = this._offset || 0,
	          localAdjust;

	      if (!this.isValid()) {
	        return input != null ? this : NaN;
	      }

	      if (input != null) {
	        if (typeof input === 'string') {
	          input = offsetFromString(matchShortOffset, input);

	          if (input === null) {
	            return this;
	          }
	        } else if (Math.abs(input) < 16 && !keepMinutes) {
	          input = input * 60;
	        }

	        if (!this._isUTC && keepLocalTime) {
	          localAdjust = getDateOffset(this);
	        }

	        this._offset = input;
	        this._isUTC = true;

	        if (localAdjust != null) {
	          this.add(localAdjust, 'm');
	        }

	        if (offset !== input) {
	          if (!keepLocalTime || this._changeInProgress) {
	            addSubtract(this, createDuration(input - offset, 'm'), 1, false);
	          } else if (!this._changeInProgress) {
	            this._changeInProgress = true;
	            hooks.updateOffset(this, true);
	            this._changeInProgress = null;
	          }
	        }

	        return this;
	      } else {
	        return this._isUTC ? offset : getDateOffset(this);
	      }
	    }

	    function getSetZone(input, keepLocalTime) {
	      if (input != null) {
	        if (typeof input !== 'string') {
	          input = -input;
	        }

	        this.utcOffset(input, keepLocalTime);
	        return this;
	      } else {
	        return -this.utcOffset();
	      }
	    }

	    function setOffsetToUTC(keepLocalTime) {
	      return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal(keepLocalTime) {
	      if (this._isUTC) {
	        this.utcOffset(0, keepLocalTime);
	        this._isUTC = false;

	        if (keepLocalTime) {
	          this.subtract(getDateOffset(this), 'm');
	        }
	      }

	      return this;
	    }

	    function setOffsetToParsedOffset() {
	      if (this._tzm != null) {
	        this.utcOffset(this._tzm, false, true);
	      } else if (typeof this._i === 'string') {
	        var tZone = offsetFromString(matchOffset, this._i);

	        if (tZone != null) {
	          this.utcOffset(tZone);
	        } else {
	          this.utcOffset(0, true);
	        }
	      }

	      return this;
	    }

	    function hasAlignedHourOffset(input) {
	      if (!this.isValid()) {
	        return false;
	      }

	      input = input ? createLocal(input).utcOffset() : 0;
	      return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime() {
	      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
	    }

	    function isDaylightSavingTimeShifted() {
	      if (!isUndefined(this._isDSTShifted)) {
	        return this._isDSTShifted;
	      }

	      var c = {};
	      copyConfig(c, this);
	      c = prepareConfig(c);

	      if (c._a) {
	        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	        this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
	      } else {
	        this._isDSTShifted = false;
	      }

	      return this._isDSTShifted;
	    }

	    function isLocal() {
	      return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset() {
	      return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc() {
	      return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    } // ASP.NET json date format regex


	    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/; // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day

	    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

	    function createDuration(input, key) {
	      var duration = input,
	          // matching against regexp is expensive, do it on demand
	      match = null,
	          sign,
	          ret,
	          diffRes;

	      if (isDuration(input)) {
	        duration = {
	          ms: input._milliseconds,
	          d: input._days,
	          M: input._months
	        };
	      } else if (isNumber(input)) {
	        duration = {};

	        if (key) {
	          duration[key] = input;
	        } else {
	          duration.milliseconds = input;
	        }
	      } else if (!!(match = aspNetRegex.exec(input))) {
	        sign = match[1] === '-' ? -1 : 1;
	        duration = {
	          y: 0,
	          d: toInt(match[DATE]) * sign,
	          h: toInt(match[HOUR]) * sign,
	          m: toInt(match[MINUTE]) * sign,
	          s: toInt(match[SECOND]) * sign,
	          ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match

	        };
	      } else if (!!(match = isoRegex.exec(input))) {
	        sign = match[1] === '-' ? -1 : 1;
	        duration = {
	          y: parseIso(match[2], sign),
	          M: parseIso(match[3], sign),
	          w: parseIso(match[4], sign),
	          d: parseIso(match[5], sign),
	          h: parseIso(match[6], sign),
	          m: parseIso(match[7], sign),
	          s: parseIso(match[8], sign)
	        };
	      } else if (duration == null) {
	        // checks for null or undefined
	        duration = {};
	      } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
	        duration = {};
	        duration.ms = diffRes.milliseconds;
	        duration.M = diffRes.months;
	      }

	      ret = new Duration(duration);

	      if (isDuration(input) && hasOwnProp(input, '_locale')) {
	        ret._locale = input._locale;
	      }

	      return ret;
	    }

	    createDuration.fn = Duration.prototype;
	    createDuration.invalid = createInvalid$1;

	    function parseIso(inp, sign) {
	      // We'd normally use ~~inp for this, but unfortunately it also
	      // converts floats to ints.
	      // inp may be undefined, so careful calling replace on it.
	      var res = inp && parseFloat(inp.replace(',', '.')); // apply sign while we're at it

	      return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	      var res = {};
	      res.months = other.month() - base.month() + (other.year() - base.year()) * 12;

	      if (base.clone().add(res.months, 'M').isAfter(other)) {
	        --res.months;
	      }

	      res.milliseconds = +other - +base.clone().add(res.months, 'M');
	      return res;
	    }

	    function momentsDifference(base, other) {
	      var res;

	      if (!(base.isValid() && other.isValid())) {
	        return {
	          milliseconds: 0,
	          months: 0
	        };
	      }

	      other = cloneWithOffset(other, base);

	      if (base.isBefore(other)) {
	        res = positiveMomentsDifference(base, other);
	      } else {
	        res = positiveMomentsDifference(other, base);
	        res.milliseconds = -res.milliseconds;
	        res.months = -res.months;
	      }

	      return res;
	    } // TODO: remove 'name' arg after deprecation is removed


	    function createAdder(direction, name) {
	      return function (val, period) {
	        var dur, tmp; //invert the arguments, but complain about it

	        if (period !== null && !isNaN(+period)) {
	          deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	          tmp = val;
	          val = period;
	          period = tmp;
	        }

	        val = typeof val === 'string' ? +val : val;
	        dur = createDuration(val, period);
	        addSubtract(this, dur, direction);
	        return this;
	      };
	    }

	    function addSubtract(mom, duration, isAdding, updateOffset) {
	      var milliseconds = duration._milliseconds,
	          days = absRound(duration._days),
	          months = absRound(duration._months);

	      if (!mom.isValid()) {
	        // No op
	        return;
	      }

	      updateOffset = updateOffset == null ? true : updateOffset;

	      if (months) {
	        setMonth(mom, get(mom, 'Month') + months * isAdding);
	      }

	      if (days) {
	        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
	      }

	      if (milliseconds) {
	        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	      }

	      if (updateOffset) {
	        hooks.updateOffset(mom, days || months);
	      }
	    }

	    var add = createAdder(1, 'add');
	    var subtract = createAdder(-1, 'subtract');

	    function getCalendarFormat(myMoment, now) {
	      var diff = myMoment.diff(now, 'days', true);
	      return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
	    }

	    function calendar$1(time, formats) {
	      // We want to compare the start of today, vs this.
	      // Getting start-of-today depends on whether we're local/utc/offset or not.
	      var now = time || createLocal(),
	          sod = cloneWithOffset(now, this).startOf('day'),
	          format = hooks.calendarFormat(this, sod) || 'sameElse';
	      var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
	      return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
	    }

	    function clone() {
	      return new Moment(this);
	    }

	    function isAfter(input, units) {
	      var localInput = isMoment(input) ? input : createLocal(input);

	      if (!(this.isValid() && localInput.isValid())) {
	        return false;
	      }

	      units = normalizeUnits(units) || 'millisecond';

	      if (units === 'millisecond') {
	        return this.valueOf() > localInput.valueOf();
	      } else {
	        return localInput.valueOf() < this.clone().startOf(units).valueOf();
	      }
	    }

	    function isBefore(input, units) {
	      var localInput = isMoment(input) ? input : createLocal(input);

	      if (!(this.isValid() && localInput.isValid())) {
	        return false;
	      }

	      units = normalizeUnits(units) || 'millisecond';

	      if (units === 'millisecond') {
	        return this.valueOf() < localInput.valueOf();
	      } else {
	        return this.clone().endOf(units).valueOf() < localInput.valueOf();
	      }
	    }

	    function isBetween(from, to, units, inclusivity) {
	      var localFrom = isMoment(from) ? from : createLocal(from),
	          localTo = isMoment(to) ? to : createLocal(to);

	      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
	        return false;
	      }

	      inclusivity = inclusivity || '()';
	      return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
	    }

	    function isSame(input, units) {
	      var localInput = isMoment(input) ? input : createLocal(input),
	          inputMs;

	      if (!(this.isValid() && localInput.isValid())) {
	        return false;
	      }

	      units = normalizeUnits(units) || 'millisecond';

	      if (units === 'millisecond') {
	        return this.valueOf() === localInput.valueOf();
	      } else {
	        inputMs = localInput.valueOf();
	        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	      }
	    }

	    function isSameOrAfter(input, units) {
	      return this.isSame(input, units) || this.isAfter(input, units);
	    }

	    function isSameOrBefore(input, units) {
	      return this.isSame(input, units) || this.isBefore(input, units);
	    }

	    function diff(input, units, asFloat) {
	      var that, zoneDelta, output;

	      if (!this.isValid()) {
	        return NaN;
	      }

	      that = cloneWithOffset(input, this);

	      if (!that.isValid()) {
	        return NaN;
	      }

	      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
	      units = normalizeUnits(units);

	      switch (units) {
	        case 'year':
	          output = monthDiff(this, that) / 12;
	          break;

	        case 'month':
	          output = monthDiff(this, that);
	          break;

	        case 'quarter':
	          output = monthDiff(this, that) / 3;
	          break;

	        case 'second':
	          output = (this - that) / 1e3;
	          break;
	        // 1000

	        case 'minute':
	          output = (this - that) / 6e4;
	          break;
	        // 1000 * 60

	        case 'hour':
	          output = (this - that) / 36e5;
	          break;
	        // 1000 * 60 * 60

	        case 'day':
	          output = (this - that - zoneDelta) / 864e5;
	          break;
	        // 1000 * 60 * 60 * 24, negate dst

	        case 'week':
	          output = (this - that - zoneDelta) / 6048e5;
	          break;
	        // 1000 * 60 * 60 * 24 * 7, negate dst

	        default:
	          output = this - that;
	      }

	      return asFloat ? output : absFloor(output);
	    }

	    function monthDiff(a, b) {
	      // difference in months
	      var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
	          // b is in (anchor - 1 month, anchor + 1 month)
	      anchor = a.clone().add(wholeMonthDiff, 'months'),
	          anchor2,
	          adjust;

	      if (b - anchor < 0) {
	        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month

	        adjust = (b - anchor) / (anchor - anchor2);
	      } else {
	        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month

	        adjust = (b - anchor) / (anchor2 - anchor);
	      } //check for negative zero, return zero if negative zero


	      return -(wholeMonthDiff + adjust) || 0;
	    }

	    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString() {
	      return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function toISOString(keepOffset) {
	      if (!this.isValid()) {
	        return null;
	      }

	      var utc = keepOffset !== true;
	      var m = utc ? this.clone().utc() : this;

	      if (m.year() < 0 || m.year() > 9999) {
	        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
	      }

	      if (isFunction(Date.prototype.toISOString)) {
	        // native implementation is ~50x faster, use it when we can
	        if (utc) {
	          return this.toDate().toISOString();
	        } else {
	          return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
	        }
	      }

	      return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
	    }
	    /**
	     * Return a human readable representation of a moment that can
	     * also be evaluated to get a new moment which is the same
	     *
	     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
	     */


	    function inspect() {
	      if (!this.isValid()) {
	        return 'moment.invalid(/* ' + this._i + ' */)';
	      }

	      var func = 'moment';
	      var zone = '';

	      if (!this.isLocal()) {
	        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
	        zone = 'Z';
	      }

	      var prefix = '[' + func + '("]';
	      var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
	      var datetime = '-MM-DD[T]HH:mm:ss.SSS';
	      var suffix = zone + '[")]';
	      return this.format(prefix + year + datetime + suffix);
	    }

	    function format(inputString) {
	      if (!inputString) {
	        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
	      }

	      var output = formatMoment(this, inputString);
	      return this.localeData().postformat(output);
	    }

	    function from(time, withoutSuffix) {
	      if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
	        return createDuration({
	          to: this,
	          from: time
	        }).locale(this.locale()).humanize(!withoutSuffix);
	      } else {
	        return this.localeData().invalidDate();
	      }
	    }

	    function fromNow(withoutSuffix) {
	      return this.from(createLocal(), withoutSuffix);
	    }

	    function to(time, withoutSuffix) {
	      if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
	        return createDuration({
	          from: this,
	          to: time
	        }).locale(this.locale()).humanize(!withoutSuffix);
	      } else {
	        return this.localeData().invalidDate();
	      }
	    }

	    function toNow(withoutSuffix) {
	      return this.to(createLocal(), withoutSuffix);
	    } // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.


	    function locale(key) {
	      var newLocaleData;

	      if (key === undefined) {
	        return this._locale._abbr;
	      } else {
	        newLocaleData = getLocale(key);

	        if (newLocaleData != null) {
	          this._locale = newLocaleData;
	        }

	        return this;
	      }
	    }

	    var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
	      if (key === undefined) {
	        return this.localeData();
	      } else {
	        return this.locale(key);
	      }
	    });

	    function localeData() {
	      return this._locale;
	    }

	    var MS_PER_SECOND = 1000;
	    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
	    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
	    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR; // actual modulo - handles negative numbers (for dates before 1970):

	    function mod$1(dividend, divisor) {
	      return (dividend % divisor + divisor) % divisor;
	    }

	    function localStartOfDate(y, m, d) {
	      // the date constructor remaps years 0-99 to 1900-1999
	      if (y < 100 && y >= 0) {
	        // preserve leap years using a full 400 year cycle, then reset
	        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
	      } else {
	        return new Date(y, m, d).valueOf();
	      }
	    }

	    function utcStartOfDate(y, m, d) {
	      // Date.UTC remaps years 0-99 to 1900-1999
	      if (y < 100 && y >= 0) {
	        // preserve leap years using a full 400 year cycle, then reset
	        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
	      } else {
	        return Date.UTC(y, m, d);
	      }
	    }

	    function startOf(units) {
	      var time;
	      units = normalizeUnits(units);

	      if (units === undefined || units === 'millisecond' || !this.isValid()) {
	        return this;
	      }

	      var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

	      switch (units) {
	        case 'year':
	          time = startOfDate(this.year(), 0, 1);
	          break;

	        case 'quarter':
	          time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
	          break;

	        case 'month':
	          time = startOfDate(this.year(), this.month(), 1);
	          break;

	        case 'week':
	          time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
	          break;

	        case 'isoWeek':
	          time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
	          break;

	        case 'day':
	        case 'date':
	          time = startOfDate(this.year(), this.month(), this.date());
	          break;

	        case 'hour':
	          time = this._d.valueOf();
	          time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
	          break;

	        case 'minute':
	          time = this._d.valueOf();
	          time -= mod$1(time, MS_PER_MINUTE);
	          break;

	        case 'second':
	          time = this._d.valueOf();
	          time -= mod$1(time, MS_PER_SECOND);
	          break;
	      }

	      this._d.setTime(time);

	      hooks.updateOffset(this, true);
	      return this;
	    }

	    function endOf(units) {
	      var time;
	      units = normalizeUnits(units);

	      if (units === undefined || units === 'millisecond' || !this.isValid()) {
	        return this;
	      }

	      var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

	      switch (units) {
	        case 'year':
	          time = startOfDate(this.year() + 1, 0, 1) - 1;
	          break;

	        case 'quarter':
	          time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
	          break;

	        case 'month':
	          time = startOfDate(this.year(), this.month() + 1, 1) - 1;
	          break;

	        case 'week':
	          time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
	          break;

	        case 'isoWeek':
	          time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
	          break;

	        case 'day':
	        case 'date':
	          time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
	          break;

	        case 'hour':
	          time = this._d.valueOf();
	          time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
	          break;

	        case 'minute':
	          time = this._d.valueOf();
	          time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
	          break;

	        case 'second':
	          time = this._d.valueOf();
	          time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
	          break;
	      }

	      this._d.setTime(time);

	      hooks.updateOffset(this, true);
	      return this;
	    }

	    function valueOf() {
	      return this._d.valueOf() - (this._offset || 0) * 60000;
	    }

	    function unix() {
	      return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate() {
	      return new Date(this.valueOf());
	    }

	    function toArray() {
	      var m = this;
	      return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject() {
	      var m = this;
	      return {
	        years: m.year(),
	        months: m.month(),
	        date: m.date(),
	        hours: m.hours(),
	        minutes: m.minutes(),
	        seconds: m.seconds(),
	        milliseconds: m.milliseconds()
	      };
	    }

	    function toJSON() {
	      // new Date(NaN).toJSON() === null
	      return this.isValid() ? this.toISOString() : null;
	    }

	    function isValid$2() {
	      return isValid(this);
	    }

	    function parsingFlags() {
	      return extend({}, getParsingFlags(this));
	    }

	    function invalidAt() {
	      return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	      return {
	        input: this._i,
	        format: this._f,
	        locale: this._locale,
	        isUTC: this._isUTC,
	        strict: this._strict
	      };
	    } // FORMATTING


	    addFormatToken(0, ['gg', 2], 0, function () {
	      return this.weekYear() % 100;
	    });
	    addFormatToken(0, ['GG', 2], 0, function () {
	      return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken(token, getter) {
	      addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg', 'weekYear');
	    addWeekYearFormatToken('ggggg', 'weekYear');
	    addWeekYearFormatToken('GGGG', 'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear'); // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG'); // PRIORITY

	    addUnitPriority('weekYear', 1);
	    addUnitPriority('isoWeekYear', 1); // PARSING

	    addRegexToken('G', matchSigned);
	    addRegexToken('g', matchSigned);
	    addRegexToken('GG', match1to2, match2);
	    addRegexToken('gg', match1to2, match2);
	    addRegexToken('GGGG', match1to4, match4);
	    addRegexToken('gggg', match1to4, match4);
	    addRegexToken('GGGGG', match1to6, match6);
	    addRegexToken('ggggg', match1to6, match6);
	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	      week[token.substr(0, 2)] = toInt(input);
	    });
	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	      week[token] = hooks.parseTwoDigitYear(input);
	    }); // MOMENTS

	    function getSetWeekYear(input) {
	      return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear(input) {
	      return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear() {
	      return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear() {
	      var weekInfo = this.localeData()._week;

	      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	      var weeksTarget;

	      if (input == null) {
	        return weekOfYear(this, dow, doy).year;
	      } else {
	        weeksTarget = weeksInYear(input, dow, doy);

	        if (week > weeksTarget) {
	          week = weeksTarget;
	        }

	        return setWeekAll.call(this, input, week, weekday, dow, doy);
	      }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	          date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
	      this.year(date.getUTCFullYear());
	      this.month(date.getUTCMonth());
	      this.date(date.getUTCDate());
	      return this;
	    } // FORMATTING


	    addFormatToken('Q', 0, 'Qo', 'quarter'); // ALIASES

	    addUnitAlias('quarter', 'Q'); // PRIORITY

	    addUnitPriority('quarter', 7); // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	      array[MONTH] = (toInt(input) - 1) * 3;
	    }); // MOMENTS

	    function getSetQuarter(input) {
	      return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    } // FORMATTING


	    addFormatToken('D', ['DD', 2], 'Do', 'date'); // ALIASES

	    addUnitAlias('date', 'D'); // PRIORITY

	    addUnitPriority('date', 9); // PARSING

	    addRegexToken('D', match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	      // TODO: Remove "ordinalParse" fallback in next major release.
	      return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
	    });
	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	      array[DATE] = toInt(input.match(match1to2)[0]);
	    }); // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true); // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'); // ALIASES

	    addUnitAlias('dayOfYear', 'DDD'); // PRIORITY

	    addUnitPriority('dayOfYear', 4); // PARSING

	    addRegexToken('DDD', match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	      config._dayOfYear = toInt(input);
	    }); // HELPERS
	    // MOMENTS

	    function getSetDayOfYear(input) {
	      var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	      return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
	    } // FORMATTING


	    addFormatToken('m', ['mm', 2], 0, 'minute'); // ALIASES

	    addUnitAlias('minute', 'm'); // PRIORITY

	    addUnitPriority('minute', 14); // PARSING

	    addRegexToken('m', match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE); // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false); // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second'); // ALIASES

	    addUnitAlias('second', 's'); // PRIORITY

	    addUnitPriority('second', 15); // PARSING

	    addRegexToken('s', match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND); // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false); // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	      return ~~(this.millisecond() / 100);
	    });
	    addFormatToken(0, ['SS', 2], 0, function () {
	      return ~~(this.millisecond() / 10);
	    });
	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	      return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	      return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	      return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	      return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	      return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	      return this.millisecond() * 1000000;
	    }); // ALIASES

	    addUnitAlias('millisecond', 'ms'); // PRIORITY

	    addUnitPriority('millisecond', 16); // PARSING

	    addRegexToken('S', match1to3, match1);
	    addRegexToken('SS', match1to3, match2);
	    addRegexToken('SSS', match1to3, match3);
	    var token;

	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	      addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	      array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	      addParseToken(token, parseMs);
	    } // MOMENTS


	    var getSetMillisecond = makeGetSet('Milliseconds', false); // FORMATTING

	    addFormatToken('z', 0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName'); // MOMENTS

	    function getZoneAbbr() {
	      return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName() {
	      return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var proto = Moment.prototype;
	    proto.add = add;
	    proto.calendar = calendar$1;
	    proto.clone = clone;
	    proto.diff = diff;
	    proto.endOf = endOf;
	    proto.format = format;
	    proto.from = from;
	    proto.fromNow = fromNow;
	    proto.to = to;
	    proto.toNow = toNow;
	    proto.get = stringGet;
	    proto.invalidAt = invalidAt;
	    proto.isAfter = isAfter;
	    proto.isBefore = isBefore;
	    proto.isBetween = isBetween;
	    proto.isSame = isSame;
	    proto.isSameOrAfter = isSameOrAfter;
	    proto.isSameOrBefore = isSameOrBefore;
	    proto.isValid = isValid$2;
	    proto.lang = lang;
	    proto.locale = locale;
	    proto.localeData = localeData;
	    proto.max = prototypeMax;
	    proto.min = prototypeMin;
	    proto.parsingFlags = parsingFlags;
	    proto.set = stringSet;
	    proto.startOf = startOf;
	    proto.subtract = subtract;
	    proto.toArray = toArray;
	    proto.toObject = toObject;
	    proto.toDate = toDate;
	    proto.toISOString = toISOString;
	    proto.inspect = inspect;
	    proto.toJSON = toJSON;
	    proto.toString = toString;
	    proto.unix = unix;
	    proto.valueOf = valueOf;
	    proto.creationData = creationData;
	    proto.year = getSetYear;
	    proto.isLeapYear = getIsLeapYear;
	    proto.weekYear = getSetWeekYear;
	    proto.isoWeekYear = getSetISOWeekYear;
	    proto.quarter = proto.quarters = getSetQuarter;
	    proto.month = getSetMonth;
	    proto.daysInMonth = getDaysInMonth;
	    proto.week = proto.weeks = getSetWeek;
	    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
	    proto.weeksInYear = getWeeksInYear;
	    proto.isoWeeksInYear = getISOWeeksInYear;
	    proto.date = getSetDayOfMonth;
	    proto.day = proto.days = getSetDayOfWeek;
	    proto.weekday = getSetLocaleDayOfWeek;
	    proto.isoWeekday = getSetISODayOfWeek;
	    proto.dayOfYear = getSetDayOfYear;
	    proto.hour = proto.hours = getSetHour;
	    proto.minute = proto.minutes = getSetMinute;
	    proto.second = proto.seconds = getSetSecond;
	    proto.millisecond = proto.milliseconds = getSetMillisecond;
	    proto.utcOffset = getSetOffset;
	    proto.utc = setOffsetToUTC;
	    proto.local = setOffsetToLocal;
	    proto.parseZone = setOffsetToParsedOffset;
	    proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    proto.isDST = isDaylightSavingTime;
	    proto.isLocal = isLocal;
	    proto.isUtcOffset = isUtcOffset;
	    proto.isUtc = isUtc;
	    proto.isUTC = isUtc;
	    proto.zoneAbbr = getZoneAbbr;
	    proto.zoneName = getZoneName;
	    proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

	    function createUnix(input) {
	      return createLocal(input * 1000);
	    }

	    function createInZone() {
	      return createLocal.apply(null, arguments).parseZone();
	    }

	    function preParsePostFormat(string) {
	      return string;
	    }

	    var proto$1 = Locale.prototype;
	    proto$1.calendar = calendar;
	    proto$1.longDateFormat = longDateFormat;
	    proto$1.invalidDate = invalidDate;
	    proto$1.ordinal = ordinal;
	    proto$1.preparse = preParsePostFormat;
	    proto$1.postformat = preParsePostFormat;
	    proto$1.relativeTime = relativeTime;
	    proto$1.pastFuture = pastFuture;
	    proto$1.set = set;
	    proto$1.months = localeMonths;
	    proto$1.monthsShort = localeMonthsShort;
	    proto$1.monthsParse = localeMonthsParse;
	    proto$1.monthsRegex = monthsRegex;
	    proto$1.monthsShortRegex = monthsShortRegex;
	    proto$1.week = localeWeek;
	    proto$1.firstDayOfYear = localeFirstDayOfYear;
	    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
	    proto$1.weekdays = localeWeekdays;
	    proto$1.weekdaysMin = localeWeekdaysMin;
	    proto$1.weekdaysShort = localeWeekdaysShort;
	    proto$1.weekdaysParse = localeWeekdaysParse;
	    proto$1.weekdaysRegex = weekdaysRegex;
	    proto$1.weekdaysShortRegex = weekdaysShortRegex;
	    proto$1.weekdaysMinRegex = weekdaysMinRegex;
	    proto$1.isPM = localeIsPM;
	    proto$1.meridiem = localeMeridiem;

	    function get$1(format, index, field, setter) {
	      var locale = getLocale();
	      var utc = createUTC().set(setter, index);
	      return locale[field](utc, format);
	    }

	    function listMonthsImpl(format, index, field) {
	      if (isNumber(format)) {
	        index = format;
	        format = undefined;
	      }

	      format = format || '';

	      if (index != null) {
	        return get$1(format, index, field, 'month');
	      }

	      var i;
	      var out = [];

	      for (i = 0; i < 12; i++) {
	        out[i] = get$1(format, i, field, 'month');
	      }

	      return out;
	    } // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)


	    function listWeekdaysImpl(localeSorted, format, index, field) {
	      if (typeof localeSorted === 'boolean') {
	        if (isNumber(format)) {
	          index = format;
	          format = undefined;
	        }

	        format = format || '';
	      } else {
	        format = localeSorted;
	        index = format;
	        localeSorted = false;

	        if (isNumber(format)) {
	          index = format;
	          format = undefined;
	        }

	        format = format || '';
	      }

	      var locale = getLocale(),
	          shift = localeSorted ? locale._week.dow : 0;

	      if (index != null) {
	        return get$1(format, (index + shift) % 7, field, 'day');
	      }

	      var i;
	      var out = [];

	      for (i = 0; i < 7; i++) {
	        out[i] = get$1(format, (i + shift) % 7, field, 'day');
	      }

	      return out;
	    }

	    function listMonths(format, index) {
	      return listMonthsImpl(format, index, 'months');
	    }

	    function listMonthsShort(format, index) {
	      return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function listWeekdays(localeSorted, format, index) {
	      return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function listWeekdaysShort(localeSorted, format, index) {
	      return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function listWeekdaysMin(localeSorted, format, index) {
	      return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    getSetGlobalLocale('en', {
	      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
	      ordinal: function (number) {
	        var b = number % 10,
	            output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	        return number + output;
	      }
	    }); // Side effect imports

	    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
	    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
	    var mathAbs = Math.abs;

	    function abs() {
	      var data = this._data;
	      this._milliseconds = mathAbs(this._milliseconds);
	      this._days = mathAbs(this._days);
	      this._months = mathAbs(this._months);
	      data.milliseconds = mathAbs(data.milliseconds);
	      data.seconds = mathAbs(data.seconds);
	      data.minutes = mathAbs(data.minutes);
	      data.hours = mathAbs(data.hours);
	      data.months = mathAbs(data.months);
	      data.years = mathAbs(data.years);
	      return this;
	    }

	    function addSubtract$1(duration, input, value, direction) {
	      var other = createDuration(input, value);
	      duration._milliseconds += direction * other._milliseconds;
	      duration._days += direction * other._days;
	      duration._months += direction * other._months;
	      return duration._bubble();
	    } // supports only 2.0-style add(1, 's') or add(duration)


	    function add$1(input, value) {
	      return addSubtract$1(this, input, value, 1);
	    } // supports only 2.0-style subtract(1, 's') or subtract(duration)


	    function subtract$1(input, value) {
	      return addSubtract$1(this, input, value, -1);
	    }

	    function absCeil(number) {
	      if (number < 0) {
	        return Math.floor(number);
	      } else {
	        return Math.ceil(number);
	      }
	    }

	    function bubble() {
	      var milliseconds = this._milliseconds;
	      var days = this._days;
	      var months = this._months;
	      var data = this._data;
	      var seconds, minutes, hours, years, monthsFromDays; // if we have a mix of positive and negative values, bubble down first
	      // check: https://github.com/moment/moment/issues/2166

	      if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
	        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	        days = 0;
	        months = 0;
	      } // The following code bubbles up values, see the tests for
	      // examples of what that means.


	      data.milliseconds = milliseconds % 1000;
	      seconds = absFloor(milliseconds / 1000);
	      data.seconds = seconds % 60;
	      minutes = absFloor(seconds / 60);
	      data.minutes = minutes % 60;
	      hours = absFloor(minutes / 60);
	      data.hours = hours % 24;
	      days += absFloor(hours / 24); // convert days to months

	      monthsFromDays = absFloor(daysToMonths(days));
	      months += monthsFromDays;
	      days -= absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year

	      years = absFloor(months / 12);
	      months %= 12;
	      data.days = days;
	      data.months = months;
	      data.years = years;
	      return this;
	    }

	    function daysToMonths(days) {
	      // 400 years have 146097 days (taking into account leap year rules)
	      // 400 years have 12 months === 4800
	      return days * 4800 / 146097;
	    }

	    function monthsToDays(months) {
	      // the reverse of daysToMonths
	      return months * 146097 / 4800;
	    }

	    function as(units) {
	      if (!this.isValid()) {
	        return NaN;
	      }

	      var days;
	      var months;
	      var milliseconds = this._milliseconds;
	      units = normalizeUnits(units);

	      if (units === 'month' || units === 'quarter' || units === 'year') {
	        days = this._days + milliseconds / 864e5;
	        months = this._months + daysToMonths(days);

	        switch (units) {
	          case 'month':
	            return months;

	          case 'quarter':
	            return months / 3;

	          case 'year':
	            return months / 12;
	        }
	      } else {
	        // handle milliseconds separately because of floating point math errors (issue #1867)
	        days = this._days + Math.round(monthsToDays(this._months));

	        switch (units) {
	          case 'week':
	            return days / 7 + milliseconds / 6048e5;

	          case 'day':
	            return days + milliseconds / 864e5;

	          case 'hour':
	            return days * 24 + milliseconds / 36e5;

	          case 'minute':
	            return days * 1440 + milliseconds / 6e4;

	          case 'second':
	            return days * 86400 + milliseconds / 1000;
	          // Math.floor prevents floating point math errors here

	          case 'millisecond':
	            return Math.floor(days * 864e5) + milliseconds;

	          default:
	            throw new Error('Unknown unit ' + units);
	        }
	      }
	    } // TODO: Use this.as('ms')?


	    function valueOf$1() {
	      if (!this.isValid()) {
	        return NaN;
	      }

	      return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
	    }

	    function makeAs(alias) {
	      return function () {
	        return this.as(alias);
	      };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds = makeAs('s');
	    var asMinutes = makeAs('m');
	    var asHours = makeAs('h');
	    var asDays = makeAs('d');
	    var asWeeks = makeAs('w');
	    var asMonths = makeAs('M');
	    var asQuarters = makeAs('Q');
	    var asYears = makeAs('y');

	    function clone$1() {
	      return createDuration(this);
	    }

	    function get$2(units) {
	      units = normalizeUnits(units);
	      return this.isValid() ? this[units + 's']() : NaN;
	    }

	    function makeGetter(name) {
	      return function () {
	        return this.isValid() ? this._data[name] : NaN;
	      };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds = makeGetter('seconds');
	    var minutes = makeGetter('minutes');
	    var hours = makeGetter('hours');
	    var days = makeGetter('days');
	    var months = makeGetter('months');
	    var years = makeGetter('years');

	    function weeks() {
	      return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	      ss: 44,
	      // a few seconds to seconds
	      s: 45,
	      // seconds to minute
	      m: 45,
	      // minutes to hour
	      h: 22,
	      // hours to day
	      d: 26,
	      // days to month
	      M: 11 // months to year

	    }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize

	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	      return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function relativeTime$1(posNegDuration, withoutSuffix, locale) {
	      var duration = createDuration(posNegDuration).abs();
	      var seconds = round(duration.as('s'));
	      var minutes = round(duration.as('m'));
	      var hours = round(duration.as('h'));
	      var days = round(duration.as('d'));
	      var months = round(duration.as('M'));
	      var years = round(duration.as('y'));
	      var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
	      a[2] = withoutSuffix;
	      a[3] = +posNegDuration > 0;
	      a[4] = locale;
	      return substituteTimeAgo.apply(null, a);
	    } // This function allows you to set the rounding function for relative time strings


	    function getSetRelativeTimeRounding(roundingFunction) {
	      if (roundingFunction === undefined) {
	        return round;
	      }

	      if (typeof roundingFunction === 'function') {
	        round = roundingFunction;
	        return true;
	      }

	      return false;
	    } // This function allows you to set a threshold for relative time strings


	    function getSetRelativeTimeThreshold(threshold, limit) {
	      if (thresholds[threshold] === undefined) {
	        return false;
	      }

	      if (limit === undefined) {
	        return thresholds[threshold];
	      }

	      thresholds[threshold] = limit;

	      if (threshold === 's') {
	        thresholds.ss = limit - 1;
	      }

	      return true;
	    }

	    function humanize(withSuffix) {
	      if (!this.isValid()) {
	        return this.localeData().invalidDate();
	      }

	      var locale = this.localeData();
	      var output = relativeTime$1(this, !withSuffix, locale);

	      if (withSuffix) {
	        output = locale.pastFuture(+this, output);
	      }

	      return locale.postformat(output);
	    }

	    var abs$1 = Math.abs;

	    function sign(x) {
	      return (x > 0) - (x < 0) || +x;
	    }

	    function toISOString$1() {
	      // for ISO strings we do not use the normal bubbling rules:
	      //  * milliseconds bubble up until they become hours
	      //  * days do not bubble at all
	      //  * months bubble up until they become years
	      // This is because there is no context-free conversion between hours and days
	      // (think of clock changes)
	      // and also not between days and months (28-31 days per month)
	      if (!this.isValid()) {
	        return this.localeData().invalidDate();
	      }

	      var seconds = abs$1(this._milliseconds) / 1000;
	      var days = abs$1(this._days);
	      var months = abs$1(this._months);
	      var minutes, hours, years; // 3600 seconds -> 60 minutes -> 1 hour

	      minutes = absFloor(seconds / 60);
	      hours = absFloor(minutes / 60);
	      seconds %= 60;
	      minutes %= 60; // 12 months -> 1 year

	      years = absFloor(months / 12);
	      months %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

	      var Y = years;
	      var M = months;
	      var D = days;
	      var h = hours;
	      var m = minutes;
	      var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
	      var total = this.asSeconds();

	      if (!total) {
	        // this is the same as C#'s (Noda) and python (isodate)...
	        // but not other JS (goog.date)
	        return 'P0D';
	      }

	      var totalSign = total < 0 ? '-' : '';
	      var ymSign = sign(this._months) !== sign(total) ? '-' : '';
	      var daysSign = sign(this._days) !== sign(total) ? '-' : '';
	      var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
	      return totalSign + 'P' + (Y ? ymSign + Y + 'Y' : '') + (M ? ymSign + M + 'M' : '') + (D ? daysSign + D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? hmsSign + h + 'H' : '') + (m ? hmsSign + m + 'M' : '') + (s ? hmsSign + s + 'S' : '');
	    }

	    var proto$2 = Duration.prototype;
	    proto$2.isValid = isValid$1;
	    proto$2.abs = abs;
	    proto$2.add = add$1;
	    proto$2.subtract = subtract$1;
	    proto$2.as = as;
	    proto$2.asMilliseconds = asMilliseconds;
	    proto$2.asSeconds = asSeconds;
	    proto$2.asMinutes = asMinutes;
	    proto$2.asHours = asHours;
	    proto$2.asDays = asDays;
	    proto$2.asWeeks = asWeeks;
	    proto$2.asMonths = asMonths;
	    proto$2.asQuarters = asQuarters;
	    proto$2.asYears = asYears;
	    proto$2.valueOf = valueOf$1;
	    proto$2._bubble = bubble;
	    proto$2.clone = clone$1;
	    proto$2.get = get$2;
	    proto$2.milliseconds = milliseconds;
	    proto$2.seconds = seconds;
	    proto$2.minutes = minutes;
	    proto$2.hours = hours;
	    proto$2.days = days;
	    proto$2.weeks = weeks;
	    proto$2.months = months;
	    proto$2.years = years;
	    proto$2.humanize = humanize;
	    proto$2.toISOString = toISOString$1;
	    proto$2.toString = toISOString$1;
	    proto$2.toJSON = toISOString$1;
	    proto$2.locale = locale;
	    proto$2.localeData = localeData;
	    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
	    proto$2.lang = lang; // Side effect imports
	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf'); // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	      config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	      config._d = new Date(toInt(input));
	    }); // Side effect imports

	    hooks.version = '2.24.0';
	    setHookCallback(createLocal);
	    hooks.fn = proto;
	    hooks.min = min;
	    hooks.max = max;
	    hooks.now = now;
	    hooks.utc = createUTC;
	    hooks.unix = createUnix;
	    hooks.months = listMonths;
	    hooks.isDate = isDate;
	    hooks.locale = getSetGlobalLocale;
	    hooks.invalid = createInvalid;
	    hooks.duration = createDuration;
	    hooks.isMoment = isMoment;
	    hooks.weekdays = listWeekdays;
	    hooks.parseZone = createInZone;
	    hooks.localeData = getLocale;
	    hooks.isDuration = isDuration;
	    hooks.monthsShort = listMonthsShort;
	    hooks.weekdaysMin = listWeekdaysMin;
	    hooks.defineLocale = defineLocale;
	    hooks.updateLocale = updateLocale;
	    hooks.locales = listLocales;
	    hooks.weekdaysShort = listWeekdaysShort;
	    hooks.normalizeUnits = normalizeUnits;
	    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
	    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
	    hooks.calendarFormat = getCalendarFormat;
	    hooks.prototype = proto; // currently HTML5 input type only supports 24-hour formats

	    hooks.HTML5_FMT = {
	      DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
	      // <input type="datetime-local" />
	      DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
	      // <input type="datetime-local" step="1" />
	      DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
	      // <input type="datetime-local" step="0.001" />
	      DATE: 'YYYY-MM-DD',
	      // <input type="date" />
	      TIME: 'HH:mm',
	      // <input type="time" />
	      TIME_SECONDS: 'HH:mm:ss',
	      // <input type="time" step="1" />
	      TIME_MS: 'HH:mm:ss.SSS',
	      // <input type="time" step="0.001" />
	      WEEK: 'GGGG-[W]WW',
	      // <input type="week" />
	      MONTH: 'YYYY-MM' // <input type="month" />

	    };
	    return hooks;
	  });
	});

	function ownKeys$1(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context30; forEach$2(_context30 = ownKeys$1(Object(source), true)).call(_context30, function (key) { defineProperty$8(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context31; forEach$2(_context31 = ownKeys$1(Object(source))).call(_context31, function (key) { defineProperty$5(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }

	function _createSuper(Derived) { return function () { var Super = getPrototypeOf$5(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }

	function _createForOfIteratorHelper(o) { if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$3(o) || (o = _unsupportedIterableToArray$1(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$1(o, minLen) { var _context21; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice$5(_context21 = Object.prototype.toString.call(o)).call(_context21, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

	function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	/* eslint @typescript-eslint/member-ordering: ["error", { "classes": ["field", "constructor", "method"] }] */

	/**
	 * Create new data pipe.
	 *
	 * @param from - The source data set or data view.
	 *
	 * @remarks
	 * Example usage:
	 * ```typescript
	 * interface AppItem {
	 *   whoami: string;
	 *   appData: unknown;
	 *   visData: VisItem;
	 * }
	 * interface VisItem {
	 *   id: number;
	 *   label: string;
	 *   color: string;
	 *   x: number;
	 *   y: number;
	 * }
	 *
	 * const ds1 = new DataSet<AppItem, "whoami">([], { fieldId: "whoami" });
	 * const ds2 = new DataSet<VisItem, "id">();
	 *
	 * const pipe = createNewDataPipeFrom(ds1)
	 *   .filter((item): boolean => item.enabled === true)
	 *   .map<VisItem, "id">((item): VisItem => item.visData)
	 *   .to(ds2);
	 *
	 * pipe.start();
	 * ```
	 *
	 * @returns A factory whose methods can be used to configure the pipe.
	 */

	function createNewDataPipeFrom(from) {
	  return new DataPipeUnderConstruction(from);
	}
	/**
	 * Internal implementation of the pipe. This should be accessible only through
	 * `createNewDataPipeFrom` from the outside.
	 *
	 * @typeparam SI - Source item type.
	 * @typeparam SP - Source item type's id property name.
	 * @typeparam TI - Target item type.
	 * @typeparam TP - Target item type's id property name.
	 */


	var SimpleDataPipe = /*#__PURE__*/function () {
	  /**
	   * Create a new data pipe.
	   *
	   * @param _source - The data set or data view that will be observed.
	   * @param _transformers - An array of transforming functions to be used to
	   * filter or transform the items in the pipe.
	   * @param _target - The data set or data view that will receive the items.
	   */
	  function SimpleDataPipe(_source, _transformers, _target) {
	    var _context, _context2, _context3;

	    classCallCheck(this, SimpleDataPipe);

	    this._source = _source;
	    this._transformers = _transformers;
	    this._target = _target;
	    /**
	     * Bound listeners for use with `DataInterface['on' | 'off']`.
	     */

	    this._listeners = {
	      add: bind$2(_context = this._add).call(_context, this),
	      remove: bind$2(_context2 = this._remove).call(_context2, this),
	      update: bind$2(_context3 = this._update).call(_context3, this)
	    };
	  }
	  /** @inheritdoc */


	  createClass(SimpleDataPipe, [{
	    key: "all",
	    value: function all() {
	      this._target.update(this._transformItems(this._source.get()));

	      return this;
	    }
	    /** @inheritdoc */

	  }, {
	    key: "start",
	    value: function start() {
	      this._source.on("add", this._listeners.add);

	      this._source.on("remove", this._listeners.remove);

	      this._source.on("update", this._listeners.update);

	      return this;
	    }
	    /** @inheritdoc */

	  }, {
	    key: "stop",
	    value: function stop() {
	      this._source.off("add", this._listeners.add);

	      this._source.off("remove", this._listeners.remove);

	      this._source.off("update", this._listeners.update);

	      return this;
	    }
	    /**
	     * Apply the transformers to the items.
	     *
	     * @param items - The items to be transformed.
	     *
	     * @returns The transformed items.
	     */

	  }, {
	    key: "_transformItems",
	    value: function _transformItems(items) {
	      var _context4;

	      return reduce$2(_context4 = this._transformers).call(_context4, function (items, transform) {
	        return transform(items);
	      }, items);
	    }
	    /**
	     * Handle an add event.
	     *
	     * @param _name - Ignored.
	     * @param payload - The payload containing the ids of the added items.
	     */

	  }, {
	    key: "_add",
	    value: function _add(_name, payload) {
	      if (payload == null) {
	        return;
	      }

	      this._target.add(this._transformItems(this._source.get(payload.items)));
	    }
	    /**
	     * Handle an update event.
	     *
	     * @param _name - Ignored.
	     * @param payload - The payload containing the ids of the updated items.
	     */

	  }, {
	    key: "_update",
	    value: function _update(_name, payload) {
	      if (payload == null) {
	        return;
	      }

	      this._target.update(this._transformItems(this._source.get(payload.items)));
	    }
	    /**
	     * Handle a remove event.
	     *
	     * @param _name - Ignored.
	     * @param payload - The payload containing the data of the removed items.
	     */

	  }, {
	    key: "_remove",
	    value: function _remove(_name, payload) {
	      if (payload == null) {
	        return;
	      }

	      this._target.remove(this._transformItems(payload.oldData));
	    }
	  }]);

	  return SimpleDataPipe;
	}();
	/**
	 * Internal implementation of the pipe factory. This should be accessible
	 * only through `createNewDataPipeFrom` from the outside.
	 *
	 * @typeparam TI - Target item type.
	 * @typeparam TP - Target item type's id property name.
	 */


	var DataPipeUnderConstruction = /*#__PURE__*/function () {
	  /**
	   * Create a new data pipe factory. This is an internal constructor that
	   * should never be called from outside of this file.
	   *
	   * @param _source - The source data set or data view for this pipe.
	   */
	  function DataPipeUnderConstruction(_source) {
	    classCallCheck(this, DataPipeUnderConstruction);

	    this._source = _source;
	    /**
	     * Array transformers used to transform items within the pipe. This is typed
	     * as any for the sake of simplicity.
	     */

	    this._transformers = [];
	  }
	  /**
	   * Filter the items.
	   *
	   * @param callback - A filtering function that returns true if given item
	   * should be piped and false if not.
	   *
	   * @returns This factory for further configuration.
	   */


	  createClass(DataPipeUnderConstruction, [{
	    key: "filter",
	    value: function filter(callback) {
	      this._transformers.push(function (input) {
	        return filter$2(input).call(input, callback);
	      });

	      return this;
	    }
	    /**
	     * Map each source item to a new type.
	     *
	     * @param callback - A mapping function that takes a source item and returns
	     * corresponding mapped item.
	     *
	     * @typeparam TI - Target item type.
	     * @typeparam TP - Target item type's id property name.
	     *
	     * @returns This factory for further configuration.
	     */

	  }, {
	    key: "map",
	    value: function map(callback) {
	      this._transformers.push(function (input) {
	        return map$2(input).call(input, callback);
	      });

	      return this;
	    }
	    /**
	     * Map each source item to zero or more items of a new type.
	     *
	     * @param callback - A mapping function that takes a source item and returns
	     * an array of corresponding mapped items.
	     *
	     * @typeparam TI - Target item type.
	     * @typeparam TP - Target item type's id property name.
	     *
	     * @returns This factory for further configuration.
	     */

	  }, {
	    key: "flatMap",
	    value: function flatMap(callback) {
	      this._transformers.push(function (input) {
	        return flatMap$2(input).call(input, callback);
	      });

	      return this;
	    }
	    /**
	     * Connect this pipe to given data set.
	     *
	     * @param target - The data set that will receive the items from this pipe.
	     *
	     * @returns The pipe connected between given data sets and performing
	     * configured transformation on the processed items.
	     */

	  }, {
	    key: "to",
	    value: function to(target) {
	      return new SimpleDataPipe(this._source, this._transformers, target);
	    }
	  }]);

	  return DataPipeUnderConstruction;
	}();

	function createCommonjsModule$1(fn, module) {
	  return module = {
	    exports: {}
	  }, fn(module, module.exports), module.exports;
	}

	var rngBrowser = createCommonjsModule$1(function (module) {
	  var _context5, _context6;

	  // Unique ID creation requires a high quality random # generator.  In the
	  // browser this is a little complicated due to unknown quality of Math.random()
	  // and inconsistent support for the `crypto` API.  We do the best we can via
	  // feature-detection
	  // getRandomValues needs to be invoked in a context where "this" is a Crypto
	  // implementation. Also, find the complete implementation of crypto on IE11.
	  var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && bind$2(_context5 = crypto.getRandomValues).call(_context5, crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && bind$2(_context6 = msCrypto.getRandomValues).call(_context6, msCrypto);

	  if (getRandomValues) {
	    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

	    module.exports = function whatwgRNG() {
	      getRandomValues(rnds8);
	      return rnds8;
	    };
	  } else {
	    // Math.random()-based (RNG)
	    //
	    // If all else fails, use Math.random().  It's fast, but is of unspecified
	    // quality.
	    var rnds = new Array(16);

	    module.exports = function mathRNG() {
	      for (var i = 0, r; i < 16; i++) {
	        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	      }

	      return rnds;
	    };
	  }
	});
	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */

	var byteToHex = [];

	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

	  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
	}

	var bytesToUuid_1 = bytesToUuid;

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof options == 'string') {
	    buf = options === 'binary' ? new Array(16) : null;
	    options = null;
	  }

	  options = options || {};
	  var rnds = options.random || (options.rng || rngBrowser)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid_1(rnds);
	}

	var v4_1 = v4; // utility functions
	// parse ASP.Net Date pattern,
	// for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
	// code from http://momentjs.com/

	var ASPDateRegex = /^\/?Date\((-?\d+)/i;
	/**
	 * Test whether given object is a Moment date.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if Moment instance, false otherwise.
	 */

	function isMoment(value) {
	  return moment.isMoment(value);
	}
	/**
	 * Convert an object into another type
	 *
	 * @param object - Value of unknown type.
	 * @param type - Name of the desired type.
	 *
	 * @returns Object in the desired type.
	 * @throws Error
	 */


	function convert(object, type) {
	  var match;

	  if (object === undefined) {
	    return undefined;
	  }

	  if (object === null) {
	    return null;
	  }

	  if (!type) {
	    return object;
	  }

	  if (!(typeof type === "string") && !(type instanceof String)) {
	    throw new Error("Type must be a string");
	  } //noinspection FallthroughInSwitchStatementJS


	  switch (type) {
	    case "boolean":
	    case "Boolean":
	      return Boolean(object);

	    case "number":
	    case "Number":
	      if (isString(object) && !isNaN(Date.parse(object))) {
	        return moment(object).valueOf();
	      } else {
	        // @TODO: I don't think that Number and String constructors are a good idea.
	        // This could also fail if the object doesn't have valueOf method or if it's redefined.
	        // For example: Object.create(null) or { valueOf: 7 }.
	        return Number(object.valueOf());
	      }

	    case "string":
	    case "String":
	      return String(object);

	    case "Date":
	      if (isNumber(object)) {
	        return new Date(object);
	      }

	      if (object instanceof Date) {
	        return new Date(object.valueOf());
	      } else if (isMoment(object)) {
	        return new Date(object.valueOf());
	      }

	      if (isString(object)) {
	        match = ASPDateRegex.exec(object);

	        if (match) {
	          // object is an ASP date
	          return new Date(Number(match[1])); // parse number
	        } else {
	          return moment(new Date(object)).toDate(); // parse string
	        }
	      } else {
	        throw new Error("Cannot convert object of type " + getType(object) + " to type Date");
	      }

	    case "Moment":
	      if (isNumber(object)) {
	        return moment(object);
	      }

	      if (object instanceof Date) {
	        return moment(object.valueOf());
	      } else if (isMoment(object)) {
	        return moment(object);
	      }

	      if (isString(object)) {
	        match = ASPDateRegex.exec(object);

	        if (match) {
	          // object is an ASP date
	          return moment(Number(match[1])); // parse number
	        } else {
	          return moment(object); // parse string
	        }
	      } else {
	        throw new Error("Cannot convert object of type " + getType(object) + " to type Date");
	      }

	    case "ISODate":
	      if (isNumber(object)) {
	        return new Date(object);
	      } else if (object instanceof Date) {
	        return object.toISOString();
	      } else if (isMoment(object)) {
	        return object.toDate().toISOString();
	      } else if (isString(object)) {
	        match = ASPDateRegex.exec(object);

	        if (match) {
	          // object is an ASP date
	          return new Date(Number(match[1])).toISOString(); // parse number
	        } else {
	          return moment(object).format(); // ISO 8601
	        }
	      } else {
	        throw new Error("Cannot convert object of type " + getType(object) + " to type ISODate");
	      }

	    case "ASPDate":
	      if (isNumber(object)) {
	        return "/Date(" + object + ")/";
	      } else if (object instanceof Date || isMoment(object)) {
	        return "/Date(" + object.valueOf() + ")/";
	      } else if (isString(object)) {
	        match = ASPDateRegex.exec(object);
	        var value;

	        if (match) {
	          // object is an ASP date
	          value = new Date(Number(match[1])).valueOf(); // parse number
	        } else {
	          value = new Date(object).valueOf(); // parse string
	        }

	        return "/Date(" + value + ")/";
	      } else {
	        throw new Error("Cannot convert object of type " + getType(object) + " to type ASPDate");
	      }

	    default:
	      var never = type;
	      throw new Error("Unknown type ".concat(never));
	  }
	}
	/**
	 * Determine whether a value can be used as an id.
	 *
	 * @param value - Input value of unknown type.
	 *
	 * @returns True if the value is valid id, false otherwise.
	 */


	function isId(value) {
	  return typeof value === "string" || typeof value === "number";
	}
	/* eslint @typescript-eslint/member-ordering: ["error", { "classes": ["field", "constructor", "method"] }] */

	/**
	 * A queue.
	 *
	 * @typeParam T - The type of method names to be replaced by queued versions.
	 */


	var Queue = /*#__PURE__*/function () {
	  /**
	   * Construct a new Queue.
	   *
	   * @param options - Queue configuration.
	   */
	  function Queue(options) {
	    classCallCheck(this, Queue);

	    this._queue = [];
	    this._timeout = null;
	    this._extended = null; // options

	    this.delay = null;
	    this.max = Infinity;
	    this.setOptions(options);
	  }
	  /**
	   * Update the configuration of the queue.
	   *
	   * @param options - Queue configuration.
	   */


	  createClass(Queue, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options && typeof options.delay !== "undefined") {
	        this.delay = options.delay;
	      }

	      if (options && typeof options.max !== "undefined") {
	        this.max = options.max;
	      }

	      this._flushIfNeeded();
	    }
	    /**
	     * Extend an object with queuing functionality.
	     * The object will be extended with a function flush, and the methods provided in options.replace will be replaced with queued ones.
	     *
	     * @param object - The object to be extended.
	     * @param options - Additional options.
	     *
	     * @returns The created queue.
	     */

	  }, {
	    key: "destroy",

	    /**
	     * Destroy the queue. The queue will first flush all queued actions, and in case it has extended an object, will restore the original object.
	     */
	    value: function destroy() {
	      this.flush();

	      if (this._extended) {
	        var object = this._extended.object;
	        var methods = this._extended.methods;

	        for (var _i = 0; _i < methods.length; _i++) {
	          var method = methods[_i];

	          if (method.original) {
	            // @TODO: better solution?
	            object[method.name] = method.original;
	          } else {
	            // @TODO: better solution?
	            delete object[method.name];
	          }
	        }

	        this._extended = null;
	      }
	    }
	    /**
	     * Replace a method on an object with a queued version.
	     *
	     * @param object - Object having the method.
	     * @param method - The method name.
	     */

	  }, {
	    key: "replace",
	    value: function replace(object, method) {
	      /* eslint-disable-next-line @typescript-eslint/no-this-alias */
	      var me = this;
	      var original = object[method];

	      if (!original) {
	        throw new Error("Method " + method + " undefined");
	      }

	      object[method] = function () {
	        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        // add this call to the queue
	        me.queue({
	          args: args,
	          fn: original,
	          context: this
	        });
	      };
	    }
	    /**
	     * Queue a call.
	     *
	     * @param entry - The function or entry to be queued.
	     */

	  }, {
	    key: "queue",
	    value: function queue(entry) {
	      if (typeof entry === "function") {
	        this._queue.push({
	          fn: entry
	        });
	      } else {
	        this._queue.push(entry);
	      }

	      this._flushIfNeeded();
	    }
	    /**
	     * Check whether the queue needs to be flushed.
	     */

	  }, {
	    key: "_flushIfNeeded",
	    value: function _flushIfNeeded() {
	      var _this = this;

	      // flush when the maximum is exceeded.
	      if (this._queue.length > this.max) {
	        this.flush();
	      } // flush after a period of inactivity when a delay is configured


	      if (this._timeout != null) {
	        clearTimeout(this._timeout);
	        this._timeout = null;
	      }

	      if (this.queue.length > 0 && typeof this.delay === "number") {
	        this._timeout = setTimeout$1(function () {
	          _this.flush();
	        }, this.delay);
	      }
	    }
	    /**
	     * Flush all queued calls
	     */

	  }, {
	    key: "flush",
	    value: function flush() {
	      var _context7, _context8;

	      forEach$2(_context7 = splice$2(_context8 = this._queue).call(_context8, 0)).call(_context7, function (entry) {
	        entry.fn.apply(entry.context || entry.fn, entry.args || []);
	      });
	    }
	  }], [{
	    key: "extend",
	    value: function extend(object, options) {
	      var queue = new Queue(options);

	      if (object.flush !== undefined) {
	        throw new Error("Target object already has a property flush");
	      }

	      object.flush = function () {
	        queue.flush();
	      };

	      var methods = [{
	        name: "flush",
	        original: undefined
	      }];

	      if (options && options.replace) {
	        for (var _i2 = 0; _i2 < options.replace.length; _i2++) {
	          var name = options.replace[_i2];
	          methods.push({
	            name: name,
	            // @TODO: better solution?
	            original: object[name]
	          }); // @TODO: better solution?

	          queue.replace(object, name);
	        }
	      }

	      queue._extended = {
	        object: object,
	        methods: methods
	      };
	      return queue;
	    }
	  }]);

	  return Queue;
	}();
	/* eslint-disable @typescript-eslint/member-ordering */

	/**
	 * [[DataSet]] code that can be reused in [[DataView]] or other similar implementations of [[DataInterface]].
	 *
	 * @typeParam Item - Item type that may or may not have an id.
	 * @typeParam IdProp - Name of the property that contains the id.
	 */


	var DataSetPart = /*#__PURE__*/function () {
	  function DataSetPart() {
	    classCallCheck(this, DataSetPart);

	    this._subscribers = {
	      "*": [],
	      add: [],
	      remove: [],
	      update: []
	    };
	    /**
	     * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
	     */

	    this.subscribe = DataSetPart.prototype.on;
	    /**
	     * @deprecated Use off instead (PS: DataView.unsubscribe === DataView.off).
	     */

	    this.unsubscribe = DataSetPart.prototype.off;
	  }
	  /**
	   * Trigger an event
	   *
	   * @param event - Event name.
	   * @param payload - Event payload.
	   * @param senderId - Id of the sender.
	   */


	  createClass(DataSetPart, [{
	    key: "_trigger",
	    value: function _trigger(event, payload, senderId) {
	      var _context9, _context10;

	      if (event === "*") {
	        throw new Error("Cannot trigger event *");
	      }

	      forEach$2(_context9 = concat$2(_context10 = []).call(_context10, toConsumableArray(this._subscribers[event]), toConsumableArray(this._subscribers["*"]))).call(_context9, function (subscriber) {
	        subscriber(event, payload, senderId != null ? senderId : null);
	      });
	    }
	    /**
	     * Subscribe to an event, add an event listener.
	     *
	     * @remarks Non-function callbacks are ignored.
	     *
	     * @param event - Event name.
	     * @param callback - Callback method.
	     */

	  }, {
	    key: "on",
	    value: function on(event, callback) {
	      if (typeof callback === "function") {
	        this._subscribers[event].push(callback);
	      } // @TODO: Maybe throw for invalid callbacks?

	    }
	    /**
	     * Unsubscribe from an event, remove an event listener.
	     *
	     * @remarks If the same callback was subscribed more than once **all** occurences will be removed.
	     *
	     * @param event - Event name.
	     * @param callback - Callback method.
	     */

	  }, {
	    key: "off",
	    value: function off(event, callback) {
	      var _context11;

	      this._subscribers[event] = filter$2(_context11 = this._subscribers[event]).call(_context11, function (subscriber) {
	        return subscriber !== callback;
	      });
	    }
	  }]);

	  return DataSetPart;
	}();
	/**
	 * Data stream
	 *
	 * @remarks
	 * [[DataStream]] offers an always up to date stream of items from a [[DataSet]] or [[DataView]].
	 * That means that the stream is evaluated at the time of iteration, conversion to another data type or when [[cache]] is called, not when the [[DataStream]] was created.
	 * Multiple invocations of for example [[toItemArray]] may yield different results (if the data source like for example [[DataSet]] gets modified).
	 *
	 * @typeparam Item - The item type this stream is going to work with.
	 */


	var DataStream = /*#__PURE__*/function () {
	  /**
	   * Create a new data stream.
	   *
	   * @param _pairs - The id, item pairs.
	   */
	  function DataStream(_pairs) {
	    classCallCheck(this, DataStream);

	    this._pairs = _pairs;
	  }
	  /**
	   * Return an iterable of key, value pairs for every entry in the stream.
	   */


	  createClass(DataStream, [{
	    key: iterator$4,
	    value: /*#__PURE__*/regenerator.mark(function value() {
	      var _iterator, _step, _step$value, id, item;

	      return regenerator.wrap(function value$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              _iterator = _createForOfIteratorHelper(this._pairs);
	              _context12.prev = 1;

	              _iterator.s();

	            case 3:
	              if ((_step = _iterator.n()).done) {
	                _context12.next = 9;
	                break;
	              }

	              _step$value = slicedToArray(_step.value, 2), id = _step$value[0], item = _step$value[1];
	              _context12.next = 7;
	              return [id, item];

	            case 7:
	              _context12.next = 3;
	              break;

	            case 9:
	              _context12.next = 14;
	              break;

	            case 11:
	              _context12.prev = 11;
	              _context12.t0 = _context12["catch"](1);

	              _iterator.e(_context12.t0);

	            case 14:
	              _context12.prev = 14;

	              _iterator.f();

	              return _context12.finish(14);

	            case 17:
	            case "end":
	              return _context12.stop();
	          }
	        }
	      }, value, this, [[1, 11, 14, 17]]);
	    })
	    /**
	     * Return an iterable of key, value pairs for every entry in the stream.
	     */

	  }, {
	    key: "entries",
	    value: /*#__PURE__*/regenerator.mark(function entries() {
	      var _iterator2, _step2, _step2$value, id, item;

	      return regenerator.wrap(function entries$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              _iterator2 = _createForOfIteratorHelper(this._pairs);
	              _context13.prev = 1;

	              _iterator2.s();

	            case 3:
	              if ((_step2 = _iterator2.n()).done) {
	                _context13.next = 9;
	                break;
	              }

	              _step2$value = slicedToArray(_step2.value, 2), id = _step2$value[0], item = _step2$value[1];
	              _context13.next = 7;
	              return [id, item];

	            case 7:
	              _context13.next = 3;
	              break;

	            case 9:
	              _context13.next = 14;
	              break;

	            case 11:
	              _context13.prev = 11;
	              _context13.t0 = _context13["catch"](1);

	              _iterator2.e(_context13.t0);

	            case 14:
	              _context13.prev = 14;

	              _iterator2.f();

	              return _context13.finish(14);

	            case 17:
	            case "end":
	              return _context13.stop();
	          }
	        }
	      }, entries, this, [[1, 11, 14, 17]]);
	    })
	    /**
	     * Return an iterable of keys in the stream.
	     */

	  }, {
	    key: "keys",
	    value: /*#__PURE__*/regenerator.mark(function keys() {
	      var _iterator3, _step3, _step3$value, id;

	      return regenerator.wrap(function keys$(_context14) {
	        while (1) {
	          switch (_context14.prev = _context14.next) {
	            case 0:
	              _iterator3 = _createForOfIteratorHelper(this._pairs);
	              _context14.prev = 1;

	              _iterator3.s();

	            case 3:
	              if ((_step3 = _iterator3.n()).done) {
	                _context14.next = 9;
	                break;
	              }

	              _step3$value = slicedToArray(_step3.value, 1), id = _step3$value[0];
	              _context14.next = 7;
	              return id;

	            case 7:
	              _context14.next = 3;
	              break;

	            case 9:
	              _context14.next = 14;
	              break;

	            case 11:
	              _context14.prev = 11;
	              _context14.t0 = _context14["catch"](1);

	              _iterator3.e(_context14.t0);

	            case 14:
	              _context14.prev = 14;

	              _iterator3.f();

	              return _context14.finish(14);

	            case 17:
	            case "end":
	              return _context14.stop();
	          }
	        }
	      }, keys, this, [[1, 11, 14, 17]]);
	    })
	    /**
	     * Return an iterable of values in the stream.
	     */

	  }, {
	    key: "values",
	    value: /*#__PURE__*/regenerator.mark(function values() {
	      var _iterator4, _step4, _step4$value, item;

	      return regenerator.wrap(function values$(_context15) {
	        while (1) {
	          switch (_context15.prev = _context15.next) {
	            case 0:
	              _iterator4 = _createForOfIteratorHelper(this._pairs);
	              _context15.prev = 1;

	              _iterator4.s();

	            case 3:
	              if ((_step4 = _iterator4.n()).done) {
	                _context15.next = 9;
	                break;
	              }

	              _step4$value = slicedToArray(_step4.value, 2), item = _step4$value[1];
	              _context15.next = 7;
	              return item;

	            case 7:
	              _context15.next = 3;
	              break;

	            case 9:
	              _context15.next = 14;
	              break;

	            case 11:
	              _context15.prev = 11;
	              _context15.t0 = _context15["catch"](1);

	              _iterator4.e(_context15.t0);

	            case 14:
	              _context15.prev = 14;

	              _iterator4.f();

	              return _context15.finish(14);

	            case 17:
	            case "end":
	              return _context15.stop();
	          }
	        }
	      }, values, this, [[1, 11, 14, 17]]);
	    })
	    /**
	     * Return an array containing all the ids in this stream.
	     *
	     * @remarks
	     * The array may contain duplicities.
	     *
	     * @returns The array with all ids from this stream.
	     */

	  }, {
	    key: "toIdArray",
	    value: function toIdArray() {
	      var _context16;

	      return map$2(_context16 = toConsumableArray(this._pairs)).call(_context16, function (pair) {
	        return pair[0];
	      });
	    }
	    /**
	     * Return an array containing all the items in this stream.
	     *
	     * @remarks
	     * The array may contain duplicities.
	     *
	     * @returns The array with all items from this stream.
	     */

	  }, {
	    key: "toItemArray",
	    value: function toItemArray() {
	      var _context17;

	      return map$2(_context17 = toConsumableArray(this._pairs)).call(_context17, function (pair) {
	        return pair[1];
	      });
	    }
	    /**
	     * Return an array containing all the entries in this stream.
	     *
	     * @remarks
	     * The array may contain duplicities.
	     *
	     * @returns The array with all entries from this stream.
	     */

	  }, {
	    key: "toEntryArray",
	    value: function toEntryArray() {
	      return toConsumableArray(this._pairs);
	    }
	    /**
	     * Return an object map containing all the items in this stream accessible by ids.
	     *
	     * @remarks
	     * In case of duplicate ids (coerced to string so `7 == '7'`) the last encoutered appears in the returned object.
	     *
	     * @returns The object map of all id ??? item pairs from this stream.
	     */

	  }, {
	    key: "toObjectMap",
	    value: function toObjectMap() {
	      var map = create$2(null);

	      var _iterator5 = _createForOfIteratorHelper(this._pairs),
	          _step5;

	      try {
	        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
	          var _step5$value = slicedToArray(_step5.value, 2),
	              id = _step5$value[0],
	              item = _step5$value[1];

	          map[id] = item;
	        }
	      } catch (err) {
	        _iterator5.e(err);
	      } finally {
	        _iterator5.f();
	      }

	      return map;
	    }
	    /**
	     * Return a map containing all the items in this stream accessible by ids.
	     *
	     * @returns The map of all id ??? item pairs from this stream.
	     */

	  }, {
	    key: "toMap",
	    value: function toMap() {
	      return new map$5(this._pairs);
	    }
	    /**
	     * Return a set containing all the (unique) ids in this stream.
	     *
	     * @returns The set of all ids from this stream.
	     */

	  }, {
	    key: "toIdSet",
	    value: function toIdSet() {
	      return new set$3(this.toIdArray());
	    }
	    /**
	     * Return a set containing all the (unique) items in this stream.
	     *
	     * @returns The set of all items from this stream.
	     */

	  }, {
	    key: "toItemSet",
	    value: function toItemSet() {
	      return new set$3(this.toItemArray());
	    }
	    /**
	     * Cache the items from this stream.
	     *
	     * @remarks
	     * This method allows for items to be fetched immediatelly and used (possibly multiple times) later.
	     * It can also be used to optimize performance as [[DataStream]] would otherwise reevaluate everything upon each iteration.
	     *
	     * ## Example
	     * ```javascript
	     * const ds = new DataSet([???])
	     *
	     * const cachedStream = ds.stream()
	     *   .filter(???)
	     *   .sort(???)
	     *   .map(???)
	     *   .cached(???) // Data are fetched, processed and cached here.
	     *
	     * ds.clear()
	     * chachedStream // Still has all the items.
	     * ```
	     *
	     * @returns A new [[DataStream]] with cached items (detached from the original [[DataSet]]).
	     */

	  }, {
	    key: "cache",
	    value: function cache() {
	      return new DataStream(toConsumableArray(this._pairs));
	    }
	    /**
	     * Get the distinct values of given property.
	     *
	     * @param callback - The function that picks and possibly converts the property.
	     *
	     * @typeparam T - The type of the distinct value.
	     *
	     * @returns A set of all distinct properties.
	     */

	  }, {
	    key: "distinct",
	    value: function distinct(callback) {
	      var set = new set$3();

	      var _iterator6 = _createForOfIteratorHelper(this._pairs),
	          _step6;

	      try {
	        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
	          var _step6$value = slicedToArray(_step6.value, 2),
	              id = _step6$value[0],
	              item = _step6$value[1];

	          set.add(callback(item, id));
	        }
	      } catch (err) {
	        _iterator6.e(err);
	      } finally {
	        _iterator6.f();
	      }

	      return set;
	    }
	    /**
	     * Filter the items of the stream.
	     *
	     * @param callback - The function that decides whether an item will be included.
	     *
	     * @returns A new data stream with the filtered items.
	     */

	  }, {
	    key: "filter",
	    value: function filter(callback) {
	      var pairs = this._pairs;
	      return new DataStream(defineProperty$8({}, iterator$4, /*#__PURE__*/regenerator.mark(function _callee() {
	        var _iterator7, _step7, _step7$value, id, item;

	        return regenerator.wrap(function _callee$(_context18) {
	          while (1) {
	            switch (_context18.prev = _context18.next) {
	              case 0:
	                _iterator7 = _createForOfIteratorHelper(pairs);
	                _context18.prev = 1;

	                _iterator7.s();

	              case 3:
	                if ((_step7 = _iterator7.n()).done) {
	                  _context18.next = 10;
	                  break;
	                }

	                _step7$value = slicedToArray(_step7.value, 2), id = _step7$value[0], item = _step7$value[1];

	                if (!callback(item, id)) {
	                  _context18.next = 8;
	                  break;
	                }

	                _context18.next = 8;
	                return [id, item];

	              case 8:
	                _context18.next = 3;
	                break;

	              case 10:
	                _context18.next = 15;
	                break;

	              case 12:
	                _context18.prev = 12;
	                _context18.t0 = _context18["catch"](1);

	                _iterator7.e(_context18.t0);

	              case 15:
	                _context18.prev = 15;

	                _iterator7.f();

	                return _context18.finish(15);

	              case 18:
	              case "end":
	                return _context18.stop();
	            }
	          }
	        }, _callee, null, [[1, 12, 15, 18]]);
	      })));
	    }
	    /**
	     * Execute a callback for each item of the stream.
	     *
	     * @param callback - The function that will be invoked for each item.
	     */

	  }, {
	    key: "forEach",
	    value: function forEach(callback) {
	      var _iterator8 = _createForOfIteratorHelper(this._pairs),
	          _step8;

	      try {
	        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
	          var _step8$value = slicedToArray(_step8.value, 2),
	              id = _step8$value[0],
	              item = _step8$value[1];

	          callback(item, id);
	        }
	      } catch (err) {
	        _iterator8.e(err);
	      } finally {
	        _iterator8.f();
	      }
	    }
	    /**
	     * Map the items into a different type.
	     *
	     * @param callback - The function that does the conversion.
	     *
	     * @typeparam Mapped - The type of the item after mapping.
	     *
	     * @returns A new data stream with the mapped items.
	     */

	  }, {
	    key: "map",
	    value: function map(callback) {
	      var pairs = this._pairs;
	      return new DataStream(defineProperty$8({}, iterator$4, /*#__PURE__*/regenerator.mark(function _callee2() {
	        var _iterator9, _step9, _step9$value, id, item;

	        return regenerator.wrap(function _callee2$(_context19) {
	          while (1) {
	            switch (_context19.prev = _context19.next) {
	              case 0:
	                _iterator9 = _createForOfIteratorHelper(pairs);
	                _context19.prev = 1;

	                _iterator9.s();

	              case 3:
	                if ((_step9 = _iterator9.n()).done) {
	                  _context19.next = 9;
	                  break;
	                }

	                _step9$value = slicedToArray(_step9.value, 2), id = _step9$value[0], item = _step9$value[1];
	                _context19.next = 7;
	                return [id, callback(item, id)];

	              case 7:
	                _context19.next = 3;
	                break;

	              case 9:
	                _context19.next = 14;
	                break;

	              case 11:
	                _context19.prev = 11;
	                _context19.t0 = _context19["catch"](1);

	                _iterator9.e(_context19.t0);

	              case 14:
	                _context19.prev = 14;

	                _iterator9.f();

	                return _context19.finish(14);

	              case 17:
	              case "end":
	                return _context19.stop();
	            }
	          }
	        }, _callee2, null, [[1, 11, 14, 17]]);
	      })));
	    }
	    /**
	     * Get the item with the maximum value of given property.
	     *
	     * @param callback - The function that picks and possibly converts the property.
	     *
	     * @returns The item with the maximum if found otherwise null.
	     */

	  }, {
	    key: "max",
	    value: function max(callback) {
	      var iter = getIterator$1(this._pairs);

	      var curr = iter.next();

	      if (curr.done) {
	        return null;
	      }

	      var maxItem = curr.value[1];
	      var maxValue = callback(curr.value[1], curr.value[0]);

	      while (!(curr = iter.next()).done) {
	        var _curr$value = slicedToArray(curr.value, 2),
	            id = _curr$value[0],
	            item = _curr$value[1];

	        var _value = callback(item, id);

	        if (_value > maxValue) {
	          maxValue = _value;
	          maxItem = item;
	        }
	      }

	      return maxItem;
	    }
	    /**
	     * Get the item with the minimum value of given property.
	     *
	     * @param callback - The function that picks and possibly converts the property.
	     *
	     * @returns The item with the minimum if found otherwise null.
	     */

	  }, {
	    key: "min",
	    value: function min(callback) {
	      var iter = getIterator$1(this._pairs);

	      var curr = iter.next();

	      if (curr.done) {
	        return null;
	      }

	      var minItem = curr.value[1];
	      var minValue = callback(curr.value[1], curr.value[0]);

	      while (!(curr = iter.next()).done) {
	        var _curr$value2 = slicedToArray(curr.value, 2),
	            id = _curr$value2[0],
	            item = _curr$value2[1];

	        var _value2 = callback(item, id);

	        if (_value2 < minValue) {
	          minValue = _value2;
	          minItem = item;
	        }
	      }

	      return minItem;
	    }
	    /**
	     * Reduce the items into a single value.
	     *
	     * @param callback - The function that does the reduction.
	     * @param accumulator - The initial value of the accumulator.
	     *
	     * @typeparam T - The type of the accumulated value.
	     *
	     * @returns The reduced value.
	     */

	  }, {
	    key: "reduce",
	    value: function reduce(callback, accumulator) {
	      var _iterator10 = _createForOfIteratorHelper(this._pairs),
	          _step10;

	      try {
	        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
	          var _step10$value = slicedToArray(_step10.value, 2),
	              id = _step10$value[0],
	              item = _step10$value[1];

	          accumulator = callback(accumulator, item, id);
	        }
	      } catch (err) {
	        _iterator10.e(err);
	      } finally {
	        _iterator10.f();
	      }

	      return accumulator;
	    }
	    /**
	     * Sort the items.
	     *
	     * @param callback - Item comparator.
	     *
	     * @returns A new stream with sorted items.
	     */

	  }, {
	    key: "sort",
	    value: function sort(callback) {
	      var _this2 = this;

	      return new DataStream(defineProperty$8({}, iterator$4, function () {
	        var _context20;

	        return getIterator$1(sort$2(_context20 = toConsumableArray(_this2._pairs)).call(_context20, function (_ref, _ref2) {
	          var _ref3 = slicedToArray(_ref, 2),
	              idA = _ref3[0],
	              itemA = _ref3[1];

	          var _ref4 = slicedToArray(_ref2, 2),
	              idB = _ref4[0],
	              itemB = _ref4[1];

	          return callback(itemA, itemB, idA, idB);
	        }));
	      }));
	    }
	  }]);

	  return DataStream;
	}();
	/* eslint @typescript-eslint/member-ordering: ["error", { "classes": ["field", "constructor", "method"] }] */


	var warnTypeCorectionDeprecation = function warnTypeCorectionDeprecation() {
	  console.warn("Type coercion has been deprecated. " + "Please, use data pipes instead. " + "See https://visjs.github.io/vis-data/data/datapipe.html#TypeCoercion for more details with working migration example.");
	};
	/**
	 * # DataSet
	 *
	 * Vis.js comes with a flexible DataSet, which can be used to hold and manipulate unstructured data and listen for changes in the data. The DataSet is key/value based. Data items can be added, updated and removed from the DataSet, and one can subscribe to changes in the DataSet. The data in the DataSet can be filtered and ordered, and fields (like dates) can be converted to a specific type. Data can be normalized when appending it to the DataSet as well.
	 *
	 * ## Example
	 *
	 * The following example shows how to use a DataSet.
	 *
	 * ```javascript
	 * // create a DataSet
	 * var options = {};
	 * var data = new vis.DataSet(options);
	 *
	 * // add items
	 * // note that the data items can contain different properties and data formats
	 * data.add([
	 *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
	 *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
	 *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
	 *   {id: 4, text: 'item 4'}
	 * ]);
	 *
	 * // subscribe to any change in the DataSet
	 * data.on('*', function (event, properties, senderId) {
	 *   console.log('event', event, properties);
	 * });
	 *
	 * // update an existing item
	 * data.update({id: 2, group: 1});
	 *
	 * // remove an item
	 * data.remove(4);
	 *
	 * // get all ids
	 * var ids = data.getIds();
	 * console.log('ids', ids);
	 *
	 * // get a specific item
	 * var item1 = data.get(1);
	 * console.log('item1', item1);
	 *
	 * // retrieve a filtered subset of the data
	 * var items = data.get({
	 *   filter: function (item) {
	 *     return item.group == 1;
	 *   }
	 * });
	 * console.log('filtered items', items);
	 * ```
	 *
	 * @typeParam Item - Item type that may or may not have an id.
	 * @typeParam IdProp - Name of the property that contains the id.
	 */


	var DataSet = /*#__PURE__*/function (_DataSetPart) {
	  inherits(DataSet, _DataSetPart);

	  var _super = _createSuper(DataSet);

	  /**
	   * Construct a new DataSet.
	   *
	   * @param data - Initial data or options.
	   * @param options - Options (type error if data is also options).
	   */
	  function DataSet(data, options) {
	    var _this3;

	    classCallCheck(this, DataSet);

	    _this3 = _super.call(this); // correctly read optional arguments

	    if (data && !isArray$3(data)) {
	      options = data;
	      data = [];
	    }

	    _this3._options = options || {};
	    _this3._data = new map$5(); // map with data indexed by id

	    _this3.length = 0; // number of items in the DataSet

	    _this3._idProp = _this3._options.fieldId || "id"; // name of the field containing id

	    _this3._type = {}; // internal field types (NOTE: this can differ from this._options.type)
	    // all variants of a Date are internally stored as Date, so we can convert
	    // from everything to everything (also from ISODate to Number for example)

	    if (_this3._options.type) {
	      warnTypeCorectionDeprecation();

	      var fields = keys$3(_this3._options.type);

	      for (var _i3 = 0, len = fields.length; _i3 < len; _i3++) {
	        var field = fields[_i3];
	        var _value3 = _this3._options.type[field];

	        if (_value3 == "Date" || _value3 == "ISODate" || _value3 == "ASPDate") {
	          _this3._type[field] = "Date";
	        } else {
	          _this3._type[field] = _value3;
	        }
	      }
	    } // add initial data when provided


	    if (data && data.length) {
	      _this3.add(data);
	    }

	    _this3.setOptions(options);

	    return _this3;
	  }
	  /**
	   * Set new options.
	   *
	   * @param options - The new options.
	   */


	  createClass(DataSet, [{
	    key: "setOptions",
	    value: function setOptions(options) {
	      if (options && options.queue !== undefined) {
	        if (options.queue === false) {
	          // delete queue if loaded
	          if (this._queue) {
	            this._queue.destroy();

	            delete this._queue;
	          }
	        } else {
	          // create queue and update its options
	          if (!this._queue) {
	            this._queue = Queue.extend(this, {
	              replace: ["add", "update", "remove"]
	            });
	          }

	          if (options.queue && _typeof_1(options.queue) === "object") {
	            this._queue.setOptions(options.queue);
	          }
	        }
	      }
	    }
	    /**
	     * Add a data item or an array with items.
	     *
	     * After the items are added to the DataSet, the DataSet will trigger an event `add`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
	     *
	     * ## Example
	     *
	     * ```javascript
	     * // create a DataSet
	     * const data = new vis.DataSet()
	     *
	     * // add items
	     * const ids = data.add([
	     *   { id: 1, text: 'item 1' },
	     *   { id: 2, text: 'item 2' },
	     *   { text: 'item without an id' }
	     * ])
	     *
	     * console.log(ids) // [1, 2, '<UUIDv4>']
	     * ```
	     *
	     * @param data - Items to be added (ids will be generated if missing).
	     * @param senderId - Sender id.
	     *
	     * @returns addedIds - Array with the ids (generated if not present) of the added items.
	     *
	     * @throws When an item with the same id as any of the added items already exists.
	     */

	  }, {
	    key: "add",
	    value: function add(data, senderId) {
	      var _this4 = this;

	      var addedIds = [];
	      var id;

	      if (isArray$3(data)) {
	        // Array
	        var idsToAdd = map$2(data).call(data, function (d) {
	          return d[_this4._idProp];
	        });

	        if (some$2(idsToAdd).call(idsToAdd, function (id) {
	          return _this4._data.has(id);
	        })) {
	          throw new Error("A duplicate id was found in the parameter array.");
	        }

	        for (var _i4 = 0, len = data.length; _i4 < len; _i4++) {
	          id = this._addItem(data[_i4]);
	          addedIds.push(id);
	        }
	      } else if (data && _typeof_1(data) === "object") {
	        // Single item
	        id = this._addItem(data);
	        addedIds.push(id);
	      } else {
	        throw new Error("Unknown dataType");
	      }

	      if (addedIds.length) {
	        this._trigger("add", {
	          items: addedIds
	        }, senderId);
	      }

	      return addedIds;
	    }
	    /**
	     * Update existing items. When an item does not exist, it will be created.
	     *
	     * @remarks
	     * The provided properties will be merged in the existing item. When an item does not exist, it will be created.
	     *
	     * After the items are updated, the DataSet will trigger an event `add` for the added items, and an event `update`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
	     *
	     * ## Example
	     *
	     * ```javascript
	     * // create a DataSet
	     * const data = new vis.DataSet([
	     *   { id: 1, text: 'item 1' },
	     *   { id: 2, text: 'item 2' },
	     *   { id: 3, text: 'item 3' }
	     * ])
	     *
	     * // update items
	     * const ids = data.update([
	     *   { id: 2, text: 'item 2 (updated)' },
	     *   { id: 4, text: 'item 4 (new)' }
	     * ])
	     *
	     * console.log(ids) // [2, 4]
	     * ```
	     *
	     * ## Warning for TypeScript users
	     * This method may introduce partial items into the data set. Use add or updateOnly instead for better type safety.
	     *
	     * @param data - Items to be updated (if the id is already present) or added (if the id is missing).
	     * @param senderId - Sender id.
	     *
	     * @returns updatedIds - The ids of the added (these may be newly generated if there was no id in the item from the data) or updated items.
	     *
	     * @throws When the supplied data is neither an item nor an array of items.
	     */

	  }, {
	    key: "update",
	    value: function update(data, senderId) {
	      var _this5 = this;

	      var addedIds = [];
	      var updatedIds = [];
	      var oldData = [];
	      var updatedData = [];
	      var idProp = this._idProp;

	      var addOrUpdate = function addOrUpdate(item) {
	        var origId = item[idProp];

	        if (origId != null && _this5._data.has(origId)) {
	          var fullItem = item; // it has an id, therefore it is a fullitem

	          var oldItem = assign$2({}, _this5._data.get(origId)); // update item


	          var id = _this5._updateItem(fullItem);

	          updatedIds.push(id);
	          updatedData.push(fullItem);
	          oldData.push(oldItem);
	        } else {
	          // add new item
	          var _id = _this5._addItem(item);

	          addedIds.push(_id);
	        }
	      };

	      if (isArray$3(data)) {
	        // Array
	        for (var _i5 = 0, len = data.length; _i5 < len; _i5++) {
	          if (data[_i5] && _typeof_1(data[_i5]) === "object") {
	            addOrUpdate(data[_i5]);
	          } else {
	            console.warn("Ignoring input item, which is not an object at index " + _i5);
	          }
	        }
	      } else if (data && _typeof_1(data) === "object") {
	        // Single item
	        addOrUpdate(data);
	      } else {
	        throw new Error("Unknown dataType");
	      }

	      if (addedIds.length) {
	        this._trigger("add", {
	          items: addedIds
	        }, senderId);
	      }

	      if (updatedIds.length) {
	        var props = {
	          items: updatedIds,
	          oldData: oldData,
	          data: updatedData
	        }; // TODO: remove deprecated property 'data' some day
	        //Object.defineProperty(props, 'data', {
	        //  'get': (function() {
	        //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
	        //    return updatedData;
	        //  }).bind(this)
	        //});

	        this._trigger("update", props, senderId);
	      }

	      return concat$2(addedIds).call(addedIds, updatedIds);
	    }
	    /**
	     * Update existing items. When an item does not exist, an error will be thrown.
	     *
	     * @remarks
	     * The provided properties will be deeply merged into the existing item.
	     * When an item does not exist (id not present in the data set or absent), an error will be thrown and nothing will be changed.
	     *
	     * After the items are updated, the DataSet will trigger an event `update`.
	     * When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
	     *
	     * ## Example
	     *
	     * ```javascript
	     * // create a DataSet
	     * const data = new vis.DataSet([
	     *   { id: 1, text: 'item 1' },
	     *   { id: 2, text: 'item 2' },
	     *   { id: 3, text: 'item 3' },
	     * ])
	     *
	     * // update items
	     * const ids = data.update([
	     *   { id: 2, text: 'item 2 (updated)' }, // works
	     *   // { id: 4, text: 'item 4 (new)' }, // would throw
	     *   // { text: 'item 4 (new)' }, // would also throw
	     * ])
	     *
	     * console.log(ids) // [2]
	     * ```
	     *
	     * @param data - Updates (the id and optionally other props) to the items in this data set.
	     * @param senderId - Sender id.
	     *
	     * @returns updatedIds - The ids of the updated items.
	     *
	     * @throws When the supplied data is neither an item nor an array of items, when the ids are missing.
	     */

	  }, {
	    key: "updateOnly",
	    value: function updateOnly(data, senderId) {
	      var _context22,
	          _this6 = this;

	      if (!isArray$3(data)) {
	        data = [data];
	      }

	      var updateEventData = map$2(_context22 = map$2(data).call(data, function (update) {
	        var oldData = _this6._data.get(update[_this6._idProp]);

	        if (oldData == null) {
	          throw new Error("Updating non-existent items is not allowed.");
	        }

	        return {
	          oldData: oldData,
	          update: update
	        };
	      })).call(_context22, function (_ref5) {
	        var oldData = _ref5.oldData,
	            update = _ref5.update;
	        var id = oldData[_this6._idProp];
	        var updatedData = deepExtend(deepExtend({}, oldData), update);

	        _this6._data.set(id, updatedData);

	        return {
	          id: id,
	          oldData: oldData,
	          updatedData: updatedData
	        };
	      });

	      if (updateEventData.length) {
	        var props = {
	          items: map$2(updateEventData).call(updateEventData, function (value) {
	            return value.id;
	          }),
	          oldData: map$2(updateEventData).call(updateEventData, function (value) {
	            return value.oldData;
	          }),
	          data: map$2(updateEventData).call(updateEventData, function (value) {
	            return value.updatedData;
	          })
	        }; // TODO: remove deprecated property 'data' some day
	        //Object.defineProperty(props, 'data', {
	        //  'get': (function() {
	        //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
	        //    return updatedData;
	        //  }).bind(this)
	        //});

	        this._trigger("update", props, senderId);

	        return props.items;
	      } else {
	        return [];
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "get",
	    value: function get(first, second) {
	      // @TODO: Woudn't it be better to split this into multiple methods?
	      // parse the arguments
	      var id = undefined;
	      var ids = undefined;
	      var options = undefined;

	      if (isId(first)) {
	        // get(id [, options])
	        id = first;
	        options = second;
	      } else if (isArray$3(first)) {
	        // get(ids [, options])
	        ids = first;
	        options = second;
	      } else {
	        // get([, options])
	        options = first;
	      } // determine the return type


	      var returnType = options && options.returnType === "Object" ? "Object" : "Array"; // @TODO: WTF is this? Or am I missing something?
	      // var returnType
	      // if (options && options.returnType) {
	      //   var allowedValues = ['Array', 'Object']
	      //   returnType =
	      //     allowedValues.indexOf(options.returnType) == -1
	      //       ? 'Array'
	      //       : options.returnType
	      // } else {
	      //   returnType = 'Array'
	      // }
	      // build options

	      var type = options && options.type || this._options.type;

	      var filter = options && filter$2(options);

	      var items = [];
	      var item = null;
	      var itemIds = null;
	      var itemId = null; // convert items

	      if (id != null) {
	        // return a single item
	        item = this._getItem(id, type);

	        if (item && filter && !filter(item)) {
	          item = null;
	        }
	      } else if (ids != null) {
	        // return a subset of items
	        for (var _i6 = 0, len = ids.length; _i6 < len; _i6++) {
	          item = this._getItem(ids[_i6], type);

	          if (item != null && (!filter || filter(item))) {
	            items.push(item);
	          }
	        }
	      } else {
	        var _context23;

	        // return all items
	        itemIds = toConsumableArray(keys$6(_context23 = this._data).call(_context23));

	        for (var _i7 = 0, _len2 = itemIds.length; _i7 < _len2; _i7++) {
	          itemId = itemIds[_i7];
	          item = this._getItem(itemId, type);

	          if (item != null && (!filter || filter(item))) {
	            items.push(item);
	          }
	        }
	      } // order the results


	      if (options && options.order && id == undefined) {
	        this._sort(items, options.order);
	      } // filter fields of the items


	      if (options && options.fields) {
	        var fields = options.fields;

	        if (id != undefined && item != null) {
	          item = this._filterFields(item, fields);
	        } else {
	          for (var _i8 = 0, _len3 = items.length; _i8 < _len3; _i8++) {
	            items[_i8] = this._filterFields(items[_i8], fields);
	          }
	        }
	      } // return the results


	      if (returnType == "Object") {
	        var result = {};

	        for (var _i9 = 0, _len4 = items.length; _i9 < _len4; _i9++) {
	          var resultant = items[_i9]; // @TODO: Shoudn't this be this._fieldId?
	          // result[resultant.id] = resultant

	          var _id2 = resultant[this._idProp];
	          result[_id2] = resultant;
	        }

	        return result;
	      } else {
	        if (id != null) {
	          // a single item
	          return item;
	        } else {
	          // just return our array
	          return items;
	        }
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "getIds",
	    value: function getIds(options) {
	      var data = this._data;

	      var filter = options && filter$2(options);

	      var order = options && options.order;
	      var type = options && options.type || this._options.type;

	      var itemIds = toConsumableArray(keys$6(data).call(data));

	      var ids = [];
	      var item;
	      var items;

	      if (filter) {
	        // get filtered items
	        if (order) {
	          // create ordered list
	          items = [];

	          for (var _i10 = 0, len = itemIds.length; _i10 < len; _i10++) {
	            var id = itemIds[_i10];
	            item = this._getItem(id, type);

	            if (filter(item)) {
	              items.push(item);
	            }
	          }

	          this._sort(items, order);

	          for (var _i11 = 0, _len5 = items.length; _i11 < _len5; _i11++) {
	            ids.push(items[_i11][this._idProp]);
	          }
	        } else {
	          // create unordered list
	          for (var _i12 = 0, _len6 = itemIds.length; _i12 < _len6; _i12++) {
	            var _id3 = itemIds[_i12];
	            item = this._getItem(_id3, type);

	            if (filter(item)) {
	              ids.push(item[this._idProp]);
	            }
	          }
	        }
	      } else {
	        // get all items
	        if (order) {
	          // create an ordered list
	          items = [];

	          for (var _i13 = 0, _len7 = itemIds.length; _i13 < _len7; _i13++) {
	            var _id4 = itemIds[_i13];
	            items.push(data.get(_id4));
	          }

	          this._sort(items, order);

	          for (var _i14 = 0, _len8 = items.length; _i14 < _len8; _i14++) {
	            ids.push(items[_i14][this._idProp]);
	          }
	        } else {
	          // create unordered list
	          for (var _i15 = 0, _len9 = itemIds.length; _i15 < _len9; _i15++) {
	            var _id5 = itemIds[_i15];
	            item = data.get(_id5);
	            ids.push(item[this._idProp]);
	          }
	        }
	      }

	      return ids;
	    }
	    /** @inheritdoc */

	  }, {
	    key: "getDataSet",
	    value: function getDataSet() {
	      return this;
	    }
	    /** @inheritdoc */

	  }, {
	    key: "forEach",
	    value: function forEach(callback, options) {
	      var filter = options && filter$2(options);

	      var type = options && options.type || this._options.type;
	      var data = this._data;

	      var itemIds = toConsumableArray(keys$6(data).call(data));

	      if (options && options.order) {
	        // execute forEach on ordered list
	        var items = this.get(options);

	        for (var _i16 = 0, len = items.length; _i16 < len; _i16++) {
	          var item = items[_i16];
	          var id = item[this._idProp];
	          callback(item, id);
	        }
	      } else {
	        // unordered
	        for (var _i17 = 0, _len10 = itemIds.length; _i17 < _len10; _i17++) {
	          var _id6 = itemIds[_i17];

	          var _item = this._getItem(_id6, type);

	          if (!filter || filter(_item)) {
	            callback(_item, _id6);
	          }
	        }
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "map",
	    value: function map(callback, options) {
	      var filter = options && filter$2(options);

	      var type = options && options.type || this._options.type;
	      var mappedItems = [];
	      var data = this._data;

	      var itemIds = toConsumableArray(keys$6(data).call(data)); // convert and filter items


	      for (var _i18 = 0, len = itemIds.length; _i18 < len; _i18++) {
	        var id = itemIds[_i18];

	        var item = this._getItem(id, type);

	        if (!filter || filter(item)) {
	          mappedItems.push(callback(item, id));
	        }
	      } // order items


	      if (options && options.order) {
	        this._sort(mappedItems, options.order);
	      }

	      return mappedItems;
	    }
	    /**
	     * Filter the fields of an item.
	     *
	     * @param item - The item whose fields should be filtered.
	     * @param fields - The names of the fields that will be kept.
	     *
	     * @typeParam K - Field name type.
	     *
	     * @returns The item without any additional fields.
	     */

	  }, {
	    key: "_filterFields",
	    value: function _filterFields(item, fields) {
	      var _context24;

	      if (!item) {
	        // item is null
	        return item;
	      }

	      return reduce$2(_context24 = isArray$3(fields) ? // Use the supplied array
	      fields : // Use the keys of the supplied object
	      keys$3(fields)).call(_context24, function (filteredItem, field) {
	        filteredItem[field] = item[field];
	        return filteredItem;
	      }, {});
	    }
	    /**
	     * Sort the provided array with items.
	     *
	     * @param items - Items to be sorted in place.
	     * @param order - A field name or custom sort function.
	     *
	     * @typeParam T - The type of the items in the items array.
	     */

	  }, {
	    key: "_sort",
	    value: function _sort(items, order) {
	      if (typeof order === "string") {
	        // order by provided field name
	        var name = order; // field name

	        sort$2(items).call(items, function (a, b) {
	          // @TODO: How to treat missing properties?
	          var av = a[name];
	          var bv = b[name];
	          return av > bv ? 1 : av < bv ? -1 : 0;
	        });
	      } else if (typeof order === "function") {
	        // order by sort function
	        sort$2(items).call(items, order);
	      } else {
	        // TODO: extend order by an Object {field:string, direction:string}
	        //       where direction can be 'asc' or 'desc'
	        throw new TypeError("Order must be a function or a string");
	      }
	    }
	    /**
	     * Remove an item or multiple items by ???reference??? (only the id is used) or by id.
	     *
	     * The method ignores removal of non-existing items, and returns an array containing the ids of the items which are actually removed from the DataSet.
	     *
	     * After the items are removed, the DataSet will trigger an event `remove` for the removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
	     *
	     * ## Example
	     * ```javascript
	     * // create a DataSet
	     * const data = new vis.DataSet([
	     *   { id: 1, text: 'item 1' },
	     *   { id: 2, text: 'item 2' },
	     *   { id: 3, text: 'item 3' }
	     * ])
	     *
	     * // remove items
	     * const ids = data.remove([2, { id: 3 }, 4])
	     *
	     * console.log(ids) // [2, 3]
	     * ```
	     *
	     * @param id - One or more items or ids of items to be removed.
	     * @param senderId - Sender id.
	     *
	     * @returns The ids of the removed items.
	     */

	  }, {
	    key: "remove",
	    value: function remove(id, senderId) {
	      var removedIds = [];
	      var removedItems = []; // force everything to be an array for simplicity

	      var ids = isArray$3(id) ? id : [id];

	      for (var _i19 = 0, len = ids.length; _i19 < len; _i19++) {
	        var item = this._remove(ids[_i19]);

	        if (item) {
	          var itemId = item[this._idProp];

	          if (itemId != null) {
	            removedIds.push(itemId);
	            removedItems.push(item);
	          }
	        }
	      }

	      if (removedIds.length) {
	        this._trigger("remove", {
	          items: removedIds,
	          oldData: removedItems
	        }, senderId);
	      }

	      return removedIds;
	    }
	    /**
	     * Remove an item by its id or reference.
	     *
	     * @param id - Id of an item or the item itself.
	     *
	     * @returns The removed item if removed, null otherwise.
	     */

	  }, {
	    key: "_remove",
	    value: function _remove(id) {
	      // @TODO: It origianlly returned the item although the docs say id.
	      // The code expects the item, so probably an error in the docs.
	      var ident; // confirm the id to use based on the args type

	      if (isId(id)) {
	        ident = id;
	      } else if (id && _typeof_1(id) === "object") {
	        ident = id[this._idProp]; // look for the identifier field using ._idProp
	      } // do the removing if the item is found


	      if (ident != null && this._data.has(ident)) {
	        var item = this._data.get(ident) || null;

	        this._data.delete(ident);

	        --this.length;
	        return item;
	      }

	      return null;
	    }
	    /**
	     * Clear the entire data set.
	     *
	     * After the items are removed, the [[DataSet]] will trigger an event `remove` for all removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
	     *
	     * @param senderId - Sender id.
	     *
	     * @returns removedIds - The ids of all removed items.
	     */

	  }, {
	    key: "clear",
	    value: function clear(senderId) {
	      var _context25;

	      var ids = toConsumableArray(keys$6(_context25 = this._data).call(_context25));

	      var items = [];

	      for (var _i20 = 0, len = ids.length; _i20 < len; _i20++) {
	        items.push(this._data.get(ids[_i20]));
	      }

	      this._data.clear();

	      this.length = 0;

	      this._trigger("remove", {
	        items: ids,
	        oldData: items
	      }, senderId);

	      return ids;
	    }
	    /**
	     * Find the item with maximum value of a specified field.
	     *
	     * @param field - Name of the property that should be searched for max value.
	     *
	     * @returns Item containing max value, or null if no items.
	     */

	  }, {
	    key: "max",
	    value: function max(field) {
	      var _context26;

	      var max = null;
	      var maxField = null;

	      var _iterator11 = _createForOfIteratorHelper(values$2(_context26 = this._data).call(_context26)),
	          _step11;

	      try {
	        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
	          var item = _step11.value;
	          var itemField = item[field];

	          if (typeof itemField === "number" && (maxField == null || itemField > maxField)) {
	            max = item;
	            maxField = itemField;
	          }
	        }
	      } catch (err) {
	        _iterator11.e(err);
	      } finally {
	        _iterator11.f();
	      }

	      return max || null;
	    }
	    /**
	     * Find the item with minimum value of a specified field.
	     *
	     * @param field - Name of the property that should be searched for min value.
	     *
	     * @returns Item containing min value, or null if no items.
	     */

	  }, {
	    key: "min",
	    value: function min(field) {
	      var _context27;

	      var min = null;
	      var minField = null;

	      var _iterator12 = _createForOfIteratorHelper(values$2(_context27 = this._data).call(_context27)),
	          _step12;

	      try {
	        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
	          var item = _step12.value;
	          var itemField = item[field];

	          if (typeof itemField === "number" && (minField == null || itemField < minField)) {
	            min = item;
	            minField = itemField;
	          }
	        }
	      } catch (err) {
	        _iterator12.e(err);
	      } finally {
	        _iterator12.f();
	      }

	      return min || null;
	    }
	    /**
	     * Find all distinct values of a specified field
	     *
	     * @param prop - The property name whose distinct values should be returned.
	     *
	     * @returns Unordered array containing all distinct values. Items without specified property are ignored.
	     */

	  }, {
	    key: "distinct",
	    value: function distinct(prop) {
	      var data = this._data;

	      var itemIds = toConsumableArray(keys$6(data).call(data));

	      var values = [];
	      var fieldType = this._options.type && this._options.type[prop] || null;
	      var count = 0;

	      for (var _i21 = 0, len = itemIds.length; _i21 < len; _i21++) {
	        var id = itemIds[_i21];
	        var item = data.get(id);
	        var _value4 = item[prop];
	        var exists = false;

	        for (var j = 0; j < count; j++) {
	          if (values[j] == _value4) {
	            exists = true;
	            break;
	          }
	        }

	        if (!exists && _value4 !== undefined) {
	          values[count] = _value4;
	          count++;
	        }
	      }

	      if (fieldType) {
	        for (var _i22 = 0, _len11 = values.length; _i22 < _len11; _i22++) {
	          values[_i22] = convert(values[_i22], fieldType);
	        }
	      }

	      return values;
	    }
	    /**
	     * Add a single item. Will fail when an item with the same id already exists.
	     *
	     * @param item - A new item to be added.
	     *
	     * @returns Added item's id. An id is generated when it is not present in the item.
	     */

	  }, {
	    key: "_addItem",
	    value: function _addItem(item) {
	      var id = item[this._idProp];

	      if (id != null) {
	        // check whether this id is already taken
	        if (this._data.has(id)) {
	          // item already exists
	          throw new Error("Cannot add item: item with id " + id + " already exists");
	        }
	      } else {
	        // generate an id
	        id = v4_1();
	        item[this._idProp] = id;
	      }

	      var d = {};

	      var fields = keys$3(item);

	      for (var _i23 = 0, len = fields.length; _i23 < len; _i23++) {
	        var field = fields[_i23];
	        var fieldType = this._type[field]; // type may be undefined

	        d[field] = convert(item[field], fieldType);
	      }

	      this._data.set(id, d);

	      ++this.length;
	      return id;
	    }
	    /**
	     * Get an item. Fields can be converted to a specific type
	     *
	     * @param id - Id of the requested item.
	     * @param types - Property name to type name object map of type converstions.
	     *
	     * @returns The item, optionally after type conversion.
	     */

	  }, {
	    key: "_getItem",
	    value: function _getItem(id, types) {
	      // @TODO: I have no idea how to type this.
	      // get the item from the dataset
	      var raw = this._data.get(id);

	      if (!raw) {
	        return null;
	      } // convert the items field types


	      var converted;

	      var fields = keys$3(raw);

	      if (types) {
	        warnTypeCorectionDeprecation();
	        converted = {};

	        for (var _i24 = 0, len = fields.length; _i24 < len; _i24++) {
	          var field = fields[_i24];
	          var _value5 = raw[field];
	          converted[field] = convert(_value5, types[field]);
	        }
	      } else {
	        // no field types specified, no converting needed
	        converted = _objectSpread({}, raw);
	      }

	      if (converted[this._idProp] == null) {
	        converted[this._idProp] = raw.id;
	      }

	      return converted;
	    }
	    /**
	     * Update a single item: merge with existing item.
	     * Will fail when the item has no id, or when there does not exist an item with the same id.
	     *
	     * @param item - The new item
	     *
	     * @returns The id of the updated item.
	     */

	  }, {
	    key: "_updateItem",
	    value: function _updateItem(item) {
	      var id = item[this._idProp];

	      if (id == null) {
	        throw new Error("Cannot update item: item has no id (item: " + stringify$2(item) + ")");
	      }

	      var d = this._data.get(id);

	      if (!d) {
	        // item doesn't exist
	        throw new Error("Cannot update item: no item with id " + id + " found");
	      } // merge with current item


	      var fields = keys$3(item);

	      for (var _i25 = 0, len = fields.length; _i25 < len; _i25++) {
	        var field = fields[_i25];
	        var fieldType = this._type[field]; // type may be undefined

	        d[field] = convert(item[field], fieldType);
	      }

	      return id;
	    }
	    /** @inheritdoc */

	  }, {
	    key: "stream",
	    value: function stream(ids) {
	      if (ids) {
	        var data = this._data;
	        return new DataStream(defineProperty$8({}, iterator$4, /*#__PURE__*/regenerator.mark(function _callee3() {
	          var _iterator13, _step13, id, item;

	          return regenerator.wrap(function _callee3$(_context28) {
	            while (1) {
	              switch (_context28.prev = _context28.next) {
	                case 0:
	                  _iterator13 = _createForOfIteratorHelper(ids);
	                  _context28.prev = 1;

	                  _iterator13.s();

	                case 3:
	                  if ((_step13 = _iterator13.n()).done) {
	                    _context28.next = 11;
	                    break;
	                  }

	                  id = _step13.value;
	                  item = data.get(id);

	                  if (!(item != null)) {
	                    _context28.next = 9;
	                    break;
	                  }

	                  _context28.next = 9;
	                  return [id, item];

	                case 9:
	                  _context28.next = 3;
	                  break;

	                case 11:
	                  _context28.next = 16;
	                  break;

	                case 13:
	                  _context28.prev = 13;
	                  _context28.t0 = _context28["catch"](1);

	                  _iterator13.e(_context28.t0);

	                case 16:
	                  _context28.prev = 16;

	                  _iterator13.f();

	                  return _context28.finish(16);

	                case 19:
	                case "end":
	                  return _context28.stop();
	              }
	            }
	          }, _callee3, null, [[1, 13, 16, 19]]);
	        })));
	      } else {
	        var _context29;

	        return new DataStream(defineProperty$8({}, iterator$4, bind$2(_context29 = entries$2(this._data)).call(_context29, this._data)));
	      }
	    }
	  }]);

	  return DataSet;
	}(DataSetPart);
	/**
	 * DataView
	 *
	 * A DataView offers a filtered and/or formatted view on a DataSet. One can subscribe to changes in a DataView, and easily get filtered or formatted data without having to specify filters and field types all the time.
	 *
	 * ## Example
	 * ```javascript
	 * // create a DataSet
	 * var data = new vis.DataSet();
	 * data.add([
	 *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
	 *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
	 *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
	 *   {id: 4, text: 'item 4'}
	 * ]);
	 *
	 * // create a DataView
	 * // the view will only contain items having a property group with value 1,
	 * // and will only output fields id, text, and date.
	 * var view = new vis.DataView(data, {
	 *   filter: function (item) {
	 *     return (item.group == 1);
	 *   },
	 *   fields: ['id', 'text', 'date']
	 * });
	 *
	 * // subscribe to any change in the DataView
	 * view.on('*', function (event, properties, senderId) {
	 *   console.log('event', event, properties);
	 * });
	 *
	 * // update an item in the data set
	 * data.update({id: 2, group: 1});
	 *
	 * // get all ids in the view
	 * var ids = view.getIds();
	 * console.log('ids', ids); // will output [1, 2]
	 *
	 * // get all items in the view
	 * var items = view.get();
	 * ```
	 *
	 * @typeParam Item - Item type that may or may not have an id.
	 * @typeParam IdProp - Name of the property that contains the id.
	 */


	var DataView = /*#__PURE__*/function (_DataSetPart2) {
	  inherits(DataView, _DataSetPart2);

	  var _super2 = _createSuper(DataView);

	  /**
	   * Create a DataView.
	   *
	   * @param data - The instance containing data (directly or indirectly).
	   * @param options - Options to configure this data view.
	   */
	  function DataView(data, options) {
	    var _context32;

	    var _this7;

	    classCallCheck(this, DataView);

	    _this7 = _super2.call(this);
	    /** @inheritdoc */

	    _this7.length = 0;
	    _this7._ids = new set$3(); // ids of the items currently in memory (just contains a boolean true)

	    _this7._options = options || {};
	    _this7._listener = bind$2(_context32 = _this7._onEvent).call(_context32, assertThisInitialized(_this7));

	    _this7.setData(data);

	    return _this7;
	  } // TODO: implement a function .config() to dynamically update things like configured filter
	  // and trigger changes accordingly

	  /**
	   * Set a data source for the view.
	   *
	   * @param data - The instance containing data (directly or indirectly).
	   *
	   * @remarks
	   * Note that when the data view is bound to a data set it won't be garbage
	   * collected unless the data set is too. Use `dataView.setData(null)` or
	   * `dataView.dispose()` to enable garbage collection before you lose the last
	   * reference.
	   */


	  createClass(DataView, [{
	    key: "setData",
	    value: function setData(data) {
	      if (this._data) {
	        // unsubscribe from current dataset
	        if (this._data.off) {
	          this._data.off("*", this._listener);
	        } // trigger a remove of all items in memory


	        var ids = this._data.getIds({
	          filter: filter$2(this._options)
	        });

	        var items = this._data.get(ids);

	        this._ids.clear();

	        this.length = 0;

	        this._trigger("remove", {
	          items: ids,
	          oldData: items
	        });
	      }

	      if (data != null) {
	        this._data = data; // trigger an add of all added items

	        var _ids = this._data.getIds({
	          filter: filter$2(this._options)
	        });

	        for (var _i26 = 0, len = _ids.length; _i26 < len; _i26++) {
	          var id = _ids[_i26];

	          this._ids.add(id);
	        }

	        this.length = _ids.length;

	        this._trigger("add", {
	          items: _ids
	        });
	      } else {
	        this._data = new DataSet();
	      } // subscribe to new dataset


	      if (this._data.on) {
	        this._data.on("*", this._listener);
	      }
	    }
	    /**
	     * Refresh the DataView.
	     * Useful when the DataView has a filter function containing a variable parameter.
	     */

	  }, {
	    key: "refresh",
	    value: function refresh() {
	      var ids = this._data.getIds({
	        filter: filter$2(this._options)
	      });

	      var oldIds = toConsumableArray(this._ids);

	      var newIds = {};
	      var addedIds = [];
	      var removedIds = [];
	      var removedItems = []; // check for additions

	      for (var _i27 = 0, len = ids.length; _i27 < len; _i27++) {
	        var id = ids[_i27];
	        newIds[id] = true;

	        if (!this._ids.has(id)) {
	          addedIds.push(id);

	          this._ids.add(id);
	        }
	      } // check for removals


	      for (var _i28 = 0, _len12 = oldIds.length; _i28 < _len12; _i28++) {
	        var _id7 = oldIds[_i28];

	        var item = this._data.get(_id7);

	        if (item == null) {
	          // @TODO: Investigate.
	          // Doesn't happen during tests or examples.
	          // Is it really impossible or could it eventually happen?
	          // How to handle it if it does? The types guarantee non-nullable items.
	          console.error("If you see this, report it please.");
	        } else if (!newIds[_id7]) {
	          removedIds.push(_id7);
	          removedItems.push(item);

	          this._ids.delete(_id7);
	        }
	      }

	      this.length += addedIds.length - removedIds.length; // trigger events

	      if (addedIds.length) {
	        this._trigger("add", {
	          items: addedIds
	        });
	      }

	      if (removedIds.length) {
	        this._trigger("remove", {
	          items: removedIds,
	          oldData: removedItems
	        });
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "get",
	    value: function get(first, second) {
	      if (this._data == null) {
	        return null;
	      } // parse the arguments


	      var ids = null;
	      var options;

	      if (isId(first) || isArray$3(first)) {
	        ids = first;
	        options = second;
	      } else {
	        options = first;
	      } // extend the options with the default options and provided options


	      var viewOptions = assign$2({}, this._options, options); // create a combined filter method when needed


	      var thisFilter = filter$2(this._options);

	      var optionsFilter = options && filter$2(options);

	      if (thisFilter && optionsFilter) {
	        viewOptions.filter = function (item) {
	          return thisFilter(item) && optionsFilter(item);
	        };
	      }

	      if (ids == null) {
	        return this._data.get(viewOptions);
	      } else {
	        return this._data.get(ids, viewOptions);
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "getIds",
	    value: function getIds(options) {
	      if (this._data.length) {
	        var defaultFilter = filter$2(this._options);

	        var optionsFilter = options != null ? filter$2(options) : null;
	        var filter;

	        if (optionsFilter) {
	          if (defaultFilter) {
	            filter = function filter(item) {
	              return defaultFilter(item) && optionsFilter(item);
	            };
	          } else {
	            filter = optionsFilter;
	          }
	        } else {
	          filter = defaultFilter;
	        }

	        return this._data.getIds({
	          filter: filter,
	          order: options && options.order
	        });
	      } else {
	        return [];
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "forEach",
	    value: function forEach(callback, options) {
	      if (this._data) {
	        var _context33;

	        var defaultFilter = filter$2(this._options);

	        var optionsFilter = options && filter$2(options);

	        var filter;

	        if (optionsFilter) {
	          if (defaultFilter) {
	            filter = function filter(item) {
	              return defaultFilter(item) && optionsFilter(item);
	            };
	          } else {
	            filter = optionsFilter;
	          }
	        } else {
	          filter = defaultFilter;
	        }

	        forEach$2(_context33 = this._data).call(_context33, callback, {
	          filter: filter,
	          order: options && options.order
	        });
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "map",
	    value: function map(callback, options) {
	      if (this._data) {
	        var _context34;

	        var defaultFilter = filter$2(this._options);

	        var optionsFilter = options && filter$2(options);

	        var filter;

	        if (optionsFilter) {
	          if (defaultFilter) {
	            filter = function filter(item) {
	              return defaultFilter(item) && optionsFilter(item);
	            };
	          } else {
	            filter = optionsFilter;
	          }
	        } else {
	          filter = defaultFilter;
	        }

	        return map$2(_context34 = this._data).call(_context34, callback, {
	          filter: filter,
	          order: options && options.order
	        });
	      } else {
	        return [];
	      }
	    }
	    /** @inheritdoc */

	  }, {
	    key: "getDataSet",
	    value: function getDataSet() {
	      return this._data.getDataSet();
	    }
	    /** @inheritdoc */

	  }, {
	    key: "stream",
	    value: function stream(ids) {
	      var _context35;

	      return this._data.stream(ids || defineProperty$8({}, iterator$4, bind$2(_context35 = keys$6(this._ids)).call(_context35, this._ids)));
	    }
	    /**
	     * Render the instance unusable prior to garbage collection.
	     *
	     * @remarks
	     * The intention of this method is to help discover scenarios where the data
	     * view is being used when the programmer thinks it has been garbage collected
	     * already. It's stricter version of `dataView.setData(null)`.
	     */

	  }, {
	    key: "dispose",
	    value: function dispose() {
	      var _a;

	      if ((_a = this._data) === null || _a === void 0 ? void 0 : _a.off) {
	        this._data.off("*", this._listener);
	      }

	      var message = "This data view has already been disposed of.";

	      defineProperty$5(this, "_data", {
	        get: function get() {
	          throw new Error(message);
	        },
	        set: function set() {
	          throw new Error(message);
	        },
	        configurable: false
	      });
	    }
	    /**
	     * Event listener. Will propagate all events from the connected data set to the subscribers of the DataView, but will filter the items and only trigger when there are changes in the filtered data set.
	     *
	     * @param event - The name of the event.
	     * @param params - Parameters of the event.
	     * @param senderId - Id supplied by the sender.
	     */

	  }, {
	    key: "_onEvent",
	    value: function _onEvent(event, params, senderId) {
	      if (!params || !params.items || !this._data) {
	        return;
	      }

	      var ids = params.items;
	      var addedIds = [];
	      var updatedIds = [];
	      var removedIds = [];
	      var oldItems = [];
	      var updatedItems = [];
	      var removedItems = [];

	      switch (event) {
	        case "add":
	          // filter the ids of the added items
	          for (var _i29 = 0, len = ids.length; _i29 < len; _i29++) {
	            var id = ids[_i29];
	            var item = this.get(id);

	            if (item) {
	              this._ids.add(id);

	              addedIds.push(id);
	            }
	          }

	          break;

	        case "update":
	          // determine the event from the views viewpoint: an updated
	          // item can be added, updated, or removed from this view.
	          for (var _i30 = 0, _len13 = ids.length; _i30 < _len13; _i30++) {
	            var _id8 = ids[_i30];

	            var _item2 = this.get(_id8);

	            if (_item2) {
	              if (this._ids.has(_id8)) {
	                updatedIds.push(_id8);
	                updatedItems.push(params.data[_i30]);
	                oldItems.push(params.oldData[_i30]);
	              } else {
	                this._ids.add(_id8);

	                addedIds.push(_id8);
	              }
	            } else {
	              if (this._ids.has(_id8)) {
	                this._ids.delete(_id8);

	                removedIds.push(_id8);
	                removedItems.push(params.oldData[_i30]);
	              }
	            }
	          }

	          break;

	        case "remove":
	          // filter the ids of the removed items
	          for (var _i31 = 0, _len14 = ids.length; _i31 < _len14; _i31++) {
	            var _id9 = ids[_i31];

	            if (this._ids.has(_id9)) {
	              this._ids.delete(_id9);

	              removedIds.push(_id9);
	              removedItems.push(params.oldData[_i31]);
	            }
	          }

	          break;
	      }

	      this.length += addedIds.length - removedIds.length;

	      if (addedIds.length) {
	        this._trigger("add", {
	          items: addedIds
	        }, senderId);
	      }

	      if (updatedIds.length) {
	        this._trigger("update", {
	          items: updatedIds,
	          oldData: oldItems,
	          data: updatedItems
	        }, senderId);
	      }

	      if (removedIds.length) {
	        this._trigger("remove", {
	          items: removedIds,
	          oldData: removedItems
	        }, senderId);
	      }
	    }
	  }]);

	  return DataView;
	}(DataSetPart);

	/**
	 * @prototype Range
	 *
	 * Helper class to make working with related min and max values easier.
	 *
	 * The range is inclusive; a given value is considered part of the range if:
	 *
	 *    this.min <= value <= this.max
	 */
	function Range() {
	  this.min = undefined;
	  this.max = undefined;
	}
	/**
	 * Adjust the range so that the passed value fits in it.
	 *
	 * If the value is outside of the current extremes, adjust
	 * the min or max so that the value is within the range.
	 *
	 * @param {number} value Numeric value to fit in range
	 */


	Range.prototype.adjust = function (value) {
	  if (value === undefined) return;

	  if (this.min === undefined || this.min > value) {
	    this.min = value;
	  }

	  if (this.max === undefined || this.max < value) {
	    this.max = value;
	  }
	};
	/**
	 * Adjust the current range so that the passed range fits in it.
	 *
	 * @param {Range} range Range instance to fit in current instance
	 */


	Range.prototype.combine = function (range) {
	  this.add(range.min);
	  this.add(range.max);
	};
	/**
	 * Expand the range by the given value
	 *
	 * min will be lowered by given value;
	 * max will be raised by given value
	 *
	 * Shrinking by passing a negative value is allowed.
	 *
	 * @param {number} val Amount by which to expand or shrink current range with
	 */


	Range.prototype.expand = function (val) {
	  if (val === undefined) {
	    return;
	  }

	  var newMin = this.min - val;
	  var newMax = this.max + val; // Note that following allows newMin === newMax.
	  // This should be OK, since method expand() allows this also.

	  if (newMin > newMax) {
	    throw new Error('Passed expansion value makes range invalid');
	  }

	  this.min = newMin;
	  this.max = newMax;
	};
	/**
	 * Determine the full range width of current instance.
	 *
	 * @returns {num} The calculated width of this range
	 */


	Range.prototype.range = function () {
	  return this.max - this.min;
	};
	/**
	 * Determine the central point of current instance.
	 *
	 * @returns {number} the value in the middle of min and max
	 */


	Range.prototype.center = function () {
	  return (this.min + this.max) / 2;
	};

	var Range_1 = Range;

	/**
	 * @class Filter
	 *
	 * @param {DataGroup} dataGroup the data group 
	 * @param {number}  column             The index of the column to be filtered
	 * @param {Graph3d} graph              The graph
	 */

	function Filter(dataGroup, column, graph) {
	  this.dataGroup = dataGroup;
	  this.column = column;
	  this.graph = graph; // the parent graph

	  this.index = undefined;
	  this.value = undefined; // read all distinct values and select the first one

	  this.values = dataGroup.getDistinctValues(this.column);

	  if (values$2(this).length > 0) {
	    this.selectValue(0);
	  } // create an array with the filtered datapoints. this will be loaded afterwards


	  this.dataPoints = [];
	  this.loaded = false;
	  this.onLoadCallback = undefined;

	  if (graph.animationPreload) {
	    this.loaded = false;
	    this.loadInBackground();
	  } else {
	    this.loaded = true;
	  }
	}
	/**
	 * Return the label
	 * @return {string} label
	 */


	Filter.prototype.isLoaded = function () {
	  return this.loaded;
	};
	/**
	 * Return the loaded progress
	 * @return {number} percentage between 0 and 100
	 */


	Filter.prototype.getLoadedProgress = function () {
	  var len = values$2(this).length;

	  var i = 0;

	  while (this.dataPoints[i]) {
	    i++;
	  }

	  return Math.round(i / len * 100);
	};
	/**
	 * Return the label
	 * @return {string} label
	 */


	Filter.prototype.getLabel = function () {
	  return this.graph.filterLabel;
	};
	/**
	 * Return the columnIndex of the filter
	 * @return {number} columnIndex
	 */


	Filter.prototype.getColumn = function () {
	  return this.column;
	};
	/**
	 * Return the currently selected value. Returns undefined if there is no selection
	 * @return {*} value
	 */


	Filter.prototype.getSelectedValue = function () {
	  if (this.index === undefined) return undefined;
	  return values$2(this)[this.index];
	};
	/**
	 * Retrieve all values of the filter
	 * @return {Array} values
	 */


	Filter.prototype.getValues = function () {
	  return values$2(this);
	};
	/**
	 * Retrieve one value of the filter
	 * @param {number}  index
	 * @return {*} value
	 */


	Filter.prototype.getValue = function (index) {
	  if (index >= values$2(this).length) throw new Error('Index out of range');
	  return values$2(this)[index];
	};
	/**
	 * Retrieve the (filtered) dataPoints for the currently selected filter index
	 * @param {number} [index] (optional)
	 * @return {Array} dataPoints
	 */


	Filter.prototype._getDataPoints = function (index) {
	  if (index === undefined) index = this.index;
	  if (index === undefined) return [];
	  var dataPoints;

	  if (this.dataPoints[index]) {
	    dataPoints = this.dataPoints[index];
	  } else {
	    var f = {};
	    f.column = this.column;
	    f.value = values$2(this)[index];
	    var dataView = new DataView(this.dataGroup.getDataSet(), {
	      filter: function filter(item) {
	        return item[f.column] == f.value;
	      }
	    }).get();
	    dataPoints = this.dataGroup._getDataPoints(dataView);
	    this.dataPoints[index] = dataPoints;
	  }

	  return dataPoints;
	};
	/**
	 * Set a callback function when the filter is fully loaded.
	 *
	 * @param {function} callback
	 */


	Filter.prototype.setOnLoadCallback = function (callback) {
	  this.onLoadCallback = callback;
	};
	/**
	 * Add a value to the list with available values for this filter
	 * No double entries will be created.
	 * @param {number} index
	 */


	Filter.prototype.selectValue = function (index) {
	  if (index >= values$2(this).length) throw new Error('Index out of range');
	  this.index = index;
	  this.value = values$2(this)[index];
	};
	/**
	 * Load all filtered rows in the background one by one
	 * Start this method without providing an index!
	 *
	 * @param {number} [index=0]
	 */


	Filter.prototype.loadInBackground = function (index) {
	  if (index === undefined) index = 0;
	  var frame = this.graph.frame;

	  if (index < values$2(this).length) {
	    // create a progress box
	    if (frame.progress === undefined) {
	      frame.progress = document.createElement('DIV');
	      frame.progress.style.position = 'absolute';
	      frame.progress.style.color = 'gray';
	      frame.appendChild(frame.progress);
	    }

	    var progress = this.getLoadedProgress();
	    frame.progress.innerHTML = 'Loading animation... ' + progress + '%'; // TODO: this is no nice solution...

	    frame.progress.style.bottom = 60 + 'px'; // TODO: use height of slider

	    frame.progress.style.left = 10 + 'px';
	    var me = this;

	    setTimeout$1(function () {
	      me.loadInBackground(index + 1);
	    }, 10);

	    this.loaded = false;
	  } else {
	    this.loaded = true; // remove the progress box

	    if (frame.progress !== undefined) {
	      frame.removeChild(frame.progress);
	      frame.progress = undefined;
	    }

	    if (this.onLoadCallback) this.onLoadCallback();
	  }
	};

	/**
	 * Creates a container for all data of one specific 3D-graph.
	 *
	 * On construction, the container is totally empty; the data
	 * needs to be initialized with method initializeData().
	 * Failure to do so will result in the following exception begin thrown
	 * on instantiation of Graph3D:
	 *
	 *     Error: Array, DataSet, or DataView expected
	 *
	 * @constructor DataGroup
	 */

	function DataGroup() {
	  this.dataTable = null; // The original data table
	}
	/**
	 * Initializes the instance from the passed data.
	 *
	 * Calculates minimum and maximum values and column index values.
	 *
	 * The graph3d instance is used internally to access the settings for
	 * the given instance.
	 * TODO: Pass settings only instead.
	 *
	 * @param {vis.Graph3d}  graph3d Reference to the calling Graph3D instance.
	 * @param {Array | DataSet | DataView} rawData The data containing the items for
	 *                                             the Graph.
	 * @param {number}   style   Style Number
	 * @returns {Array.<Object>}
	 */


	DataGroup.prototype.initializeData = function (graph3d, rawData, style) {
	  if (rawData === undefined) return;

	  if (isArray$3(rawData)) {
	    rawData = new DataSet(rawData);
	  }

	  var data;

	  if (rawData instanceof DataSet || rawData instanceof DataView) {
	    data = rawData.get();
	  } else {
	    throw new Error('Array, DataSet, or DataView expected');
	  }

	  if (data.length == 0) return;
	  this.style = style; // unsubscribe from the dataTable

	  if (this.dataSet) {
	    this.dataSet.off('*', this._onChange);
	  }

	  this.dataSet = rawData;
	  this.dataTable = data; // subscribe to changes in the dataset

	  var me = this;

	  this._onChange = function () {
	    graph3d.setData(me.dataSet);
	  };

	  this.dataSet.on('*', this._onChange); // determine the location of x,y,z,value,filter columns

	  this.colX = 'x';
	  this.colY = 'y';
	  this.colZ = 'z';
	  var withBars = graph3d.hasBars(style); // determine barWidth from data

	  if (withBars) {
	    if (graph3d.defaultXBarWidth !== undefined) {
	      this.xBarWidth = graph3d.defaultXBarWidth;
	    } else {
	      this.xBarWidth = this.getSmallestDifference(data, this.colX) || 1;
	    }

	    if (graph3d.defaultYBarWidth !== undefined) {
	      this.yBarWidth = graph3d.defaultYBarWidth;
	    } else {
	      this.yBarWidth = this.getSmallestDifference(data, this.colY) || 1;
	    }
	  } // calculate minima and maxima


	  this._initializeRange(data, this.colX, graph3d, withBars);

	  this._initializeRange(data, this.colY, graph3d, withBars);

	  this._initializeRange(data, this.colZ, graph3d, false);

	  if (data[0].hasOwnProperty('style')) {
	    this.colValue = 'style';
	    var valueRange = this.getColumnRange(data, this.colValue);

	    this._setRangeDefaults(valueRange, graph3d.defaultValueMin, graph3d.defaultValueMax);

	    this.valueRange = valueRange;
	  } else {
	    this.colValue = 'z';
	    this.valueRange = this.zRange;
	  } // Initialize data filter if a filter column is provided


	  var table = this.getDataTable();

	  if (table[0].hasOwnProperty('filter')) {
	    if (this.dataFilter === undefined) {
	      this.dataFilter = new Filter(this, 'filter', graph3d);
	      this.dataFilter.setOnLoadCallback(function () {
	        graph3d.redraw();
	      });
	    }
	  }

	  var dataPoints;

	  if (this.dataFilter) {
	    // apply filtering
	    dataPoints = this.dataFilter._getDataPoints();
	  } else {
	    // no filtering. load all data
	    dataPoints = this._getDataPoints(this.getDataTable());
	  }

	  return dataPoints;
	};
	/**
	 * Collect the range settings for the given data column.
	 *
	 * This internal method is intended to make the range 
	 * initalization more generic.
	 *
	 * TODO: if/when combined settings per axis defined, get rid of this.
	 *
	 * @private
	 *
	 * @param {'x'|'y'|'z'} column  The data column to process
	 * @param {vis.Graph3d} graph3d Reference to the calling Graph3D instance;
	 *                              required for access to settings
	 * @returns {Object}
	 */


	DataGroup.prototype._collectRangeSettings = function (column, graph3d) {
	  var _context;

	  var index = indexOf$3(_context = ['x', 'y', 'z']).call(_context, column);

	  if (index == -1) {
	    throw new Error('Column \'' + column + '\' invalid');
	  }

	  var upper = column.toUpperCase();
	  return {
	    barWidth: this[column + 'BarWidth'],
	    min: graph3d['default' + upper + 'Min'],
	    max: graph3d['default' + upper + 'Max'],
	    step: graph3d['default' + upper + 'Step'],
	    range_label: column + 'Range',
	    // Name of instance field to write to
	    step_label: column + 'Step' // Name of instance field to write to

	  };
	};
	/**
	 * Initializes the settings per given column.
	 *
	 * TODO: if/when combined settings per axis defined, rewrite this.
	 *
	 * @private
	 *
	 * @param {DataSet | DataView} data     The data containing the items for the Graph
	 * @param {'x'|'y'|'z'}        column   The data column to process
	 * @param {vis.Graph3d}        graph3d  Reference to the calling Graph3D instance;
	 *                                      required for access to settings
	 * @param {boolean}            withBars True if initializing for bar graph
	 */


	DataGroup.prototype._initializeRange = function (data, column, graph3d, withBars) {
	  var NUMSTEPS = 5;

	  var settings = this._collectRangeSettings(column, graph3d);

	  var range = this.getColumnRange(data, column);

	  if (withBars && column != 'z') {
	    // Safeguard for 'z'; it doesn't have a bar width
	    range.expand(settings.barWidth / 2);
	  }

	  this._setRangeDefaults(range, settings.min, settings.max);

	  this[settings.range_label] = range;
	  this[settings.step_label] = settings.step !== undefined ? settings.step : range.range() / NUMSTEPS;
	};
	/**
	 * Creates a list with all the different values in the data for the given column.
	 *
	 * If no data passed, use the internal data of this instance.
	 *
	 * @param {'x'|'y'|'z'}                column The data column to process
	 * @param {DataSet|DataView|undefined} data   The data containing the items for the Graph
	 *
	 * @returns {Array} All distinct values in the given column data, sorted ascending.
	 */


	DataGroup.prototype.getDistinctValues = function (column, data) {
	  if (data === undefined) {
	    data = this.dataTable;
	  }

	  var values = [];

	  for (var i = 0; i < data.length; i++) {
	    var value = data[i][column] || 0;

	    if (indexOf$3(values).call(values, value) === -1) {
	      values.push(value);
	    }
	  }

	  return sort$2(values).call(values, function (a, b) {
	    return a - b;
	  });
	};
	/**
	 * Determine the smallest difference between the values for given
	 * column in the passed data set.
	 *
	 * @param {DataSet|DataView|undefined} data   The data containing the items for the Graph
	 * @param {'x'|'y'|'z'}                column The data column to process
	 *
	 * @returns {number|null} Smallest difference value or
	 *                        null, if it can't be determined.
	 */


	DataGroup.prototype.getSmallestDifference = function (data, column) {
	  var values = this.getDistinctValues(data, column); // Get all the distinct diffs
	  // Array values is assumed to be sorted here

	  var smallest_diff = null;

	  for (var i = 1; i < values.length; i++) {
	    var diff = values[i] - values[i - 1];

	    if (smallest_diff == null || smallest_diff > diff) {
	      smallest_diff = diff;
	    }
	  }

	  return smallest_diff;
	};
	/**
	 * Get the absolute min/max values for the passed data column.
	 *
	 * @param {DataSet|DataView|undefined} data   The data containing the items for the Graph
	 * @param {'x'|'y'|'z'}                column The data column to process
	 *
	 * @returns {Range} A Range instance with min/max members properly set.
	 */


	DataGroup.prototype.getColumnRange = function (data, column) {
	  var range = new Range_1(); // Adjust the range so that it covers all values in the passed data elements.

	  for (var i = 0; i < data.length; i++) {
	    var item = data[i][column];
	    range.adjust(item);
	  }

	  return range;
	};
	/**
	 * Determines the number of rows in the current data.
	 *
	 * @returns {number}
	 */


	DataGroup.prototype.getNumberOfRows = function () {
	  return this.dataTable.length;
	};
	/**
	 * Set default values for range
	 *
	 * The default values override the range values, if defined.
	 *
	 * Because it's possible that only defaultMin or defaultMax is set, it's better
	 * to pass in a range already set with the min/max set from the data. Otherwise,
	 * it's quite hard to process the min/max properly.
	 *
	 * @param {vis.Range} range
	 * @param {number} [defaultMin=range.min]
	 * @param {number} [defaultMax=range.max]
	 * @private
	 */


	DataGroup.prototype._setRangeDefaults = function (range, defaultMin, defaultMax) {
	  if (defaultMin !== undefined) {
	    range.min = defaultMin;
	  }

	  if (defaultMax !== undefined) {
	    range.max = defaultMax;
	  } // This is the original way that the default min/max values were adjusted.
	  // TODO: Perhaps it's better if an error is thrown if the values do not agree.
	  //       But this will change the behaviour.


	  if (range.max <= range.min) range.max = range.min + 1;
	};

	DataGroup.prototype.getDataTable = function () {
	  return this.dataTable;
	};

	DataGroup.prototype.getDataSet = function () {
	  return this.dataSet;
	};
	/**
	 * Return all data values as a list of Point3d objects
	 * @param {Array.<Object>} data
	 * @returns {Array.<Object>}
	 */


	DataGroup.prototype.getDataPoints = function (data) {
	  var dataPoints = [];

	  for (var i = 0; i < data.length; i++) {
	    var point = new Point3d_1();
	    point.x = data[i][this.colX] || 0;
	    point.y = data[i][this.colY] || 0;
	    point.z = data[i][this.colZ] || 0;
	    point.data = data[i];
	    point.value = data[i][this.colValue] || 0;
	    var obj = {};
	    obj.point = point;
	    obj.bottom = new Point3d_1(point.x, point.y, this.zRange.min);
	    obj.trans = undefined;
	    obj.screen = undefined;
	    dataPoints.push(obj);
	  }

	  return dataPoints;
	};
	/**
	 * Copy all values from the data table to a matrix.
	 *
	 * The provided values are supposed to form a grid of (x,y) positions.
	 * @param {Array.<Object>} data
	 * @returns {Array.<Object>}
	 * @private
	 */


	DataGroup.prototype.initDataAsMatrix = function (data) {
	  // TODO: store the created matrix dataPoints in the filters instead of
	  //       reloading each time.
	  var x, y, i, obj; // create two lists with all present x and y values

	  var dataX = this.getDistinctValues(this.colX, data);
	  var dataY = this.getDistinctValues(this.colY, data);
	  var dataPoints = this.getDataPoints(data); // create a grid, a 2d matrix, with all values.

	  var dataMatrix = []; // temporary data matrix

	  for (i = 0; i < dataPoints.length; i++) {
	    obj = dataPoints[i]; // TODO: implement Array().indexOf() for Internet Explorer

	    var xIndex = indexOf$3(dataX).call(dataX, obj.point.x);

	    var yIndex = indexOf$3(dataY).call(dataY, obj.point.y);

	    if (dataMatrix[xIndex] === undefined) {
	      dataMatrix[xIndex] = [];
	    }

	    dataMatrix[xIndex][yIndex] = obj;
	  } // fill in the pointers to the neighbors.


	  for (x = 0; x < dataMatrix.length; x++) {
	    for (y = 0; y < dataMatrix[x].length; y++) {
	      if (dataMatrix[x][y]) {
	        dataMatrix[x][y].pointRight = x < dataMatrix.length - 1 ? dataMatrix[x + 1][y] : undefined;
	        dataMatrix[x][y].pointTop = y < dataMatrix[x].length - 1 ? dataMatrix[x][y + 1] : undefined;
	        dataMatrix[x][y].pointCross = x < dataMatrix.length - 1 && y < dataMatrix[x].length - 1 ? dataMatrix[x + 1][y + 1] : undefined;
	      }
	    }
	  }

	  return dataPoints;
	};
	/**
	 * Return common information, if present
	 *
	 * @returns {string}
	 */


	DataGroup.prototype.getInfo = function () {
	  var dataFilter = this.dataFilter;
	  if (!dataFilter) return undefined;
	  return dataFilter.getLabel() + ': ' + dataFilter.getSelectedValue();
	};
	/**
	 * Reload the data
	 */


	DataGroup.prototype.reload = function () {
	  if (this.dataTable) {
	    this.setData(this.dataTable);
	  }
	};
	/**
	 * Filter the data based on the current filter
	 *
	 * @param   {Array} data
	 * @returns {Array} dataPoints Array with point objects which can be drawn on
	 *                             screen
	 */


	DataGroup.prototype._getDataPoints = function (data) {
	  var dataPoints = [];

	  if (this.style === STYLE.GRID || this.style === STYLE.SURFACE) {
	    dataPoints = this.initDataAsMatrix(data);
	  } else {
	    // 'dot', 'dot-line', etc.
	    dataPoints = this.getDataPoints(data);

	    if (this.style === STYLE.LINE) {
	      // Add next member points for line drawing
	      for (var i = 0; i < dataPoints.length; i++) {
	        if (i > 0) {
	          dataPoints[i - 1].pointNext = dataPoints[i];
	        }
	      }
	    }
	  }

	  return dataPoints;
	};

	Graph3d.STYLE = STYLE;
	/**
	 * Following label is used in the settings to describe values which should be
	 * determined by the code while running, from the current data and graph style.
	 *
	 * Using 'undefined' directly achieves the same thing, but this is more
	 * descriptive by describing the intent.
	 */

	var autoByDefault = undefined;
	/**
	 * Default values for option settings.
	 *
	 * These are the values used when a Graph3d instance is initialized without
	 * custom settings.
	 *
	 * If a field is not in this list, a default value of 'autoByDefault' is assumed,
	 * which is just an alias for 'undefined'.
	 */

	Graph3d.DEFAULTS = {
	  width: '400px',
	  height: '400px',
	  filterLabel: 'time',
	  legendLabel: 'value',
	  xLabel: 'x',
	  yLabel: 'y',
	  zLabel: 'z',
	  xValueLabel: function xValueLabel(v) {
	    return v;
	  },
	  yValueLabel: function yValueLabel(v) {
	    return v;
	  },
	  zValueLabel: function zValueLabel(v) {
	    return v;
	  },
	  showXAxis: true,
	  showYAxis: true,
	  showZAxis: true,
	  showGrayBottom: false,
	  showGrid: true,
	  showPerspective: true,
	  showShadow: false,
	  showSurfaceGrid: true,
	  keepAspectRatio: true,
	  rotateAxisLabels: true,
	  verticalRatio: 0.5,
	  // 0.1 to 1.0, where 1.0 results in a 'cube'
	  dotSizeRatio: 0.02,
	  // size of the dots as a fraction of the graph width
	  dotSizeMinFraction: 0.5,
	  // size of min-value dot as a fraction of dotSizeRatio	
	  dotSizeMaxFraction: 2.5,
	  // size of max-value dot as a fraction of dotSizeRatio	
	  showAnimationControls: autoByDefault,
	  animationInterval: 1000,
	  // milliseconds
	  animationPreload: false,
	  animationAutoStart: autoByDefault,
	  axisFontSize: 14,
	  axisFontType: 'arial',
	  axisColor: '#4D4D4D',
	  gridColor: '#D3D3D3',
	  xCenter: '55%',
	  yCenter: '50%',
	  style: Graph3d.STYLE.DOT,
	  tooltip: false,
	  tooltipDelay: 300,
	  // milliseconds
	  tooltipStyle: {
	    content: {
	      padding: '10px',
	      border: '1px solid #4d4d4d',
	      color: '#1a1a1a',
	      background: 'rgba(255,255,255,0.7)',
	      borderRadius: '2px',
	      boxShadow: '5px 5px 10px rgba(128,128,128,0.5)'
	    },
	    line: {
	      height: '40px',
	      width: '0',
	      borderLeft: '1px solid #4d4d4d',
	      pointerEvents: 'none'
	    },
	    dot: {
	      height: '0',
	      width: '0',
	      border: '5px solid #4d4d4d',
	      borderRadius: '5px',
	      pointerEvents: 'none'
	    }
	  },
	  dataColor: {
	    fill: '#7DC1FF',
	    stroke: '#3267D2',
	    strokeWidth: 1 // px

	  },
	  surfaceColors: autoByDefault,
	  colormap: autoByDefault,
	  cameraPosition: {
	    horizontal: 1.0,
	    vertical: 0.5,
	    distance: 1.7
	  },
	  zoomable: true,
	  ctrlToZoom: false,

	  /*
	    The following fields are 'auto by default', see above.
	   */
	  showLegend: autoByDefault,
	  // determined by graph style
	  backgroundColor: autoByDefault,
	  xBarWidth: autoByDefault,
	  yBarWidth: autoByDefault,
	  valueMin: autoByDefault,
	  valueMax: autoByDefault,
	  xMin: autoByDefault,
	  xMax: autoByDefault,
	  xStep: autoByDefault,
	  yMin: autoByDefault,
	  yMax: autoByDefault,
	  yStep: autoByDefault,
	  zMin: autoByDefault,
	  zMax: autoByDefault,
	  zStep: autoByDefault
	}; // -----------------------------------------------------------------------------
	// Class Graph3d
	// -----------------------------------------------------------------------------

	/**
	 * Graph3d displays data in 3d.
	 *
	 * Graph3d is developed in javascript as a Google Visualization Chart.
	 *
	 * @constructor Graph3d
	 * @param {Element} container   The DOM element in which the Graph3d will
	 *                              be created. Normally a div element.
	 * @param {DataSet | DataView | Array} [data]
	 * @param {Object} [options]
	 */

	function Graph3d(container, data, options) {
	  if (!(this instanceof Graph3d)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  } // create variables and set default values


	  this.containerElement = container;
	  this.dataGroup = new DataGroup();
	  this.dataPoints = null; // The table with point objects
	  // create a frame and canvas

	  this.create();
	  setDefaults(Graph3d.DEFAULTS, this); // the column indexes

	  this.colX = undefined;
	  this.colY = undefined;
	  this.colZ = undefined;
	  this.colValue = undefined; // TODO: customize axis range
	  // apply options (also when undefined)

	  this.setOptions(options); // apply data

	  this.setData(data);
	} // Extend Graph3d with an Emitter mixin


	componentEmitter(Graph3d.prototype);
	/**
	 * Calculate the scaling values, dependent on the range in x, y, and z direction
	 */

	Graph3d.prototype._setScale = function () {
	  this.scale = new Point3d_1(1 / this.xRange.range(), 1 / this.yRange.range(), 1 / this.zRange.range()); // keep aspect ration between x and y scale if desired

	  if (this.keepAspectRatio) {
	    if (this.scale.x < this.scale.y) {
	      //noinspection JSSuspiciousNameCombination
	      this.scale.y = this.scale.x;
	    } else {
	      //noinspection JSSuspiciousNameCombination
	      this.scale.x = this.scale.y;
	    }
	  } // scale the vertical axis


	  this.scale.z *= this.verticalRatio; // TODO: can this be automated? verticalRatio?
	  // determine scale for (optional) value

	  if (this.valueRange !== undefined) {
	    this.scale.value = 1 / this.valueRange.range();
	  } // position the camera arm


	  var xCenter = this.xRange.center() * this.scale.x;
	  var yCenter = this.yRange.center() * this.scale.y;
	  var zCenter = this.zRange.center() * this.scale.z;
	  this.camera.setArmLocation(xCenter, yCenter, zCenter);
	};
	/**
	 * Convert a 3D location to a 2D location on screen
	 * Source: ttp://en.wikipedia.org/wiki/3D_projection
	 *
	 * @param   {Point3d} point3d  A 3D point with parameters x, y, z
	 * @returns {Point2d} point2d  A 2D point with parameters x, y
	 */


	Graph3d.prototype._convert3Dto2D = function (point3d) {
	  var translation = this._convertPointToTranslation(point3d);

	  return this._convertTranslationToScreen(translation);
	};
	/**
	 * Convert a 3D location its translation seen from the camera
	 * Source: http://en.wikipedia.org/wiki/3D_projection
	 *
	 * @param   {Point3d} point3d     A 3D point with parameters x, y, z
	 * @returns {Point3d} translation A 3D point with parameters x, y, z This is
	 *                                the translation of the point, seen from the
	 *                                camera.
	 */


	Graph3d.prototype._convertPointToTranslation = function (point3d) {
	  var cameraLocation = this.camera.getCameraLocation(),
	      cameraRotation = this.camera.getCameraRotation(),
	      ax = point3d.x * this.scale.x,
	      ay = point3d.y * this.scale.y,
	      az = point3d.z * this.scale.z,
	      cx = cameraLocation.x,
	      cy = cameraLocation.y,
	      cz = cameraLocation.z,
	      // calculate angles
	  sinTx = Math.sin(cameraRotation.x),
	      cosTx = Math.cos(cameraRotation.x),
	      sinTy = Math.sin(cameraRotation.y),
	      cosTy = Math.cos(cameraRotation.y),
	      sinTz = Math.sin(cameraRotation.z),
	      cosTz = Math.cos(cameraRotation.z),
	      // calculate translation
	  dx = cosTy * (sinTz * (ay - cy) + cosTz * (ax - cx)) - sinTy * (az - cz),
	      dy = sinTx * (cosTy * (az - cz) + sinTy * (sinTz * (ay - cy) + cosTz * (ax - cx))) + cosTx * (cosTz * (ay - cy) - sinTz * (ax - cx)),
	      dz = cosTx * (cosTy * (az - cz) + sinTy * (sinTz * (ay - cy) + cosTz * (ax - cx))) - sinTx * (cosTz * (ay - cy) - sinTz * (ax - cx));
	  return new Point3d_1(dx, dy, dz);
	};
	/**
	 * Convert a translation point to a point on the screen
	 *
	 * @param   {Point3d} translation A 3D point with parameters x, y, z This is
	 *                                the translation of the point, seen from the
	 *                                camera.
	 * @returns {Point2d} point2d     A 2D point with parameters x, y
	 */


	Graph3d.prototype._convertTranslationToScreen = function (translation) {
	  var ex = this.eye.x,
	      ey = this.eye.y,
	      ez = this.eye.z,
	      dx = translation.x,
	      dy = translation.y,
	      dz = translation.z; // calculate position on screen from translation

	  var bx;
	  var by;

	  if (this.showPerspective) {
	    bx = (dx - ex) * (ez / dz);
	    by = (dy - ey) * (ez / dz);
	  } else {
	    bx = dx * -(ez / this.camera.getArmLength());
	    by = dy * -(ez / this.camera.getArmLength());
	  } // shift and scale the point to the center of the screen
	  // use the width of the graph to scale both horizontally and vertically.


	  return new Point2d_1(this.currentXCenter + bx * this.frame.canvas.clientWidth, this.currentYCenter - by * this.frame.canvas.clientWidth);
	};
	/**
	 * Calculate the translations and screen positions of all points
	 *
	 * @param {Array.<Point3d>} points
	 * @private
	 */


	Graph3d.prototype._calcTranslations = function (points) {
	  for (var i = 0; i < points.length; i++) {
	    var point = points[i];
	    point.trans = this._convertPointToTranslation(point.point);
	    point.screen = this._convertTranslationToScreen(point.trans); // calculate the translation of the point at the bottom (needed for sorting)

	    var transBottom = this._convertPointToTranslation(point.bottom);

	    point.dist = this.showPerspective ? transBottom.length() : -transBottom.z;
	  } // sort the points on depth of their (x,y) position (not on z)


	  var sortDepth = function sortDepth(a, b) {
	    return b.dist - a.dist;
	  };

	  sort$2(points).call(points, sortDepth);
	};
	/**
	 * Transfer min/max values to the Graph3d instance.
	 */


	Graph3d.prototype._initializeRanges = function () {
	  // TODO: later on, all min/maxes of all datagroups will be combined here
	  var dg = this.dataGroup;
	  this.xRange = dg.xRange;
	  this.yRange = dg.yRange;
	  this.zRange = dg.zRange;
	  this.valueRange = dg.valueRange; // Values currently needed but which need to be sorted out for
	  // the multiple graph case.

	  this.xStep = dg.xStep;
	  this.yStep = dg.yStep;
	  this.zStep = dg.zStep;
	  this.xBarWidth = dg.xBarWidth;
	  this.yBarWidth = dg.yBarWidth;
	  this.colX = dg.colX;
	  this.colY = dg.colY;
	  this.colZ = dg.colZ;
	  this.colValue = dg.colValue; // set the scale dependent on the ranges.

	  this._setScale();
	};
	/**
	 * Return all data values as a list of Point3d objects
	 *
	 * @param {vis.DataSet} data
	 * @returns {Array.<Object>}
	 */


	Graph3d.prototype.getDataPoints = function (data) {
	  var dataPoints = [];

	  for (var i = 0; i < data.length; i++) {
	    var point = new Point3d_1();
	    point.x = data[i][this.colX] || 0;
	    point.y = data[i][this.colY] || 0;
	    point.z = data[i][this.colZ] || 0;
	    point.data = data[i];
	    point.value = data[i][this.colValue] || 0;
	    var obj = {};
	    obj.point = point;
	    obj.bottom = new Point3d_1(point.x, point.y, this.zRange.min);
	    obj.trans = undefined;
	    obj.screen = undefined;
	    dataPoints.push(obj);
	  }

	  return dataPoints;
	};
	/**
	 * Filter the data based on the current filter
	 *
	 * @param   {Array} data
	 * @returns {Array} dataPoints Array with point objects which can be drawn on
	 *                             screen
	 */


	Graph3d.prototype._getDataPoints = function (data) {
	  // TODO: store the created matrix dataPoints in the filters instead of
	  //       reloading each time.
	  var x, y, i, obj;
	  var dataPoints = [];

	  if (this.style === Graph3d.STYLE.GRID || this.style === Graph3d.STYLE.SURFACE) {
	    // copy all values from the data table to a matrix
	    // the provided values are supposed to form a grid of (x,y) positions
	    // create two lists with all present x and y values
	    var dataX = this.dataGroup.getDistinctValues(this.colX, data);
	    var dataY = this.dataGroup.getDistinctValues(this.colY, data);
	    dataPoints = this.getDataPoints(data); // create a grid, a 2d matrix, with all values.

	    var dataMatrix = []; // temporary data matrix

	    for (i = 0; i < dataPoints.length; i++) {
	      obj = dataPoints[i]; // TODO: implement Array().indexOf() for Internet Explorer

	      var xIndex = indexOf$3(dataX).call(dataX, obj.point.x);

	      var yIndex = indexOf$3(dataY).call(dataY, obj.point.y);

	      if (dataMatrix[xIndex] === undefined) {
	        dataMatrix[xIndex] = [];
	      }

	      dataMatrix[xIndex][yIndex] = obj;
	    } // fill in the pointers to the neighbors.


	    for (x = 0; x < dataMatrix.length; x++) {
	      for (y = 0; y < dataMatrix[x].length; y++) {
	        if (dataMatrix[x][y]) {
	          dataMatrix[x][y].pointRight = x < dataMatrix.length - 1 ? dataMatrix[x + 1][y] : undefined;
	          dataMatrix[x][y].pointTop = y < dataMatrix[x].length - 1 ? dataMatrix[x][y + 1] : undefined;
	          dataMatrix[x][y].pointCross = x < dataMatrix.length - 1 && y < dataMatrix[x].length - 1 ? dataMatrix[x + 1][y + 1] : undefined;
	        }
	      }
	    }
	  } else {
	    // 'dot', 'dot-line', etc.
	    dataPoints = this.getDataPoints(data);

	    if (this.style === Graph3d.STYLE.LINE) {
	      // Add next member points for line drawing
	      for (i = 0; i < dataPoints.length; i++) {
	        if (i > 0) {
	          dataPoints[i - 1].pointNext = dataPoints[i];
	        }
	      }
	    }
	  }

	  return dataPoints;
	};
	/**
	 * Create the main frame for the Graph3d.
	 *
	 * This function is executed once when a Graph3d object is created. The frame
	 * contains a canvas, and this canvas contains all objects like the axis and
	 * nodes.
	 */


	Graph3d.prototype.create = function () {
	  // remove all elements from the container element.
	  while (this.containerElement.hasChildNodes()) {
	    this.containerElement.removeChild(this.containerElement.firstChild);
	  }

	  this.frame = document.createElement('div');
	  this.frame.style.position = 'relative';
	  this.frame.style.overflow = 'hidden'; // create the graph canvas (HTML canvas element)

	  this.frame.canvas = document.createElement('canvas');
	  this.frame.canvas.style.position = 'relative';
	  this.frame.appendChild(this.frame.canvas); //if (!this.frame.canvas.getContext) {

	  {
	    var noCanvas = document.createElement('DIV');
	    noCanvas.style.color = 'red';
	    noCanvas.style.fontWeight = 'bold';
	    noCanvas.style.padding = '10px';
	    noCanvas.innerHTML = 'Error: your browser does not support HTML canvas';
	    this.frame.canvas.appendChild(noCanvas);
	  }
	  this.frame.filter = document.createElement('div');
	  filter$2(this.frame).style.position = 'absolute';
	  filter$2(this.frame).style.bottom = '0px';
	  filter$2(this.frame).style.left = '0px';
	  filter$2(this.frame).style.width = '100%';
	  this.frame.appendChild(filter$2(this.frame)); // add event listeners to handle moving and zooming the contents

	  var me = this;

	  var onmousedown = function onmousedown(event) {
	    me._onMouseDown(event);
	  };

	  var ontouchstart = function ontouchstart(event) {
	    me._onTouchStart(event);
	  };

	  var onmousewheel = function onmousewheel(event) {
	    me._onWheel(event);
	  };

	  var ontooltip = function ontooltip(event) {
	    me._onTooltip(event);
	  };

	  var onclick = function onclick(event) {
	    me._onClick(event);
	  }; // TODO: these events are never cleaned up... can give a 'memory leakage'


	  addEventListener(this.frame.canvas, 'mousedown', onmousedown);
	  addEventListener(this.frame.canvas, 'touchstart', ontouchstart);
	  addEventListener(this.frame.canvas, 'mousewheel', onmousewheel);
	  addEventListener(this.frame.canvas, 'mousemove', ontooltip);
	  addEventListener(this.frame.canvas, 'click', onclick); // add the new graph to the container element

	  this.containerElement.appendChild(this.frame);
	};
	/**
	 * Set a new size for the graph
	 *
	 * @param {number} width
	 * @param {number} height
	 * @private
	 */


	Graph3d.prototype._setSize = function (width, height) {
	  this.frame.style.width = width;
	  this.frame.style.height = height;

	  this._resizeCanvas();
	};
	/**
	 * Resize the canvas to the current size of the frame
	 */


	Graph3d.prototype._resizeCanvas = function () {
	  this.frame.canvas.style.width = '100%';
	  this.frame.canvas.style.height = '100%';
	  this.frame.canvas.width = this.frame.canvas.clientWidth;
	  this.frame.canvas.height = this.frame.canvas.clientHeight; // adjust with for margin

	  filter$2(this.frame).style.width = this.frame.canvas.clientWidth - 2 * 10 + 'px';
	};
	/**
	 * Start playing the animation, if requested and filter present. Only applicable
	 * when animation data is available.
	 */


	Graph3d.prototype.animationStart = function () {
	  // start animation when option is true
	  if (!this.animationAutoStart || !this.dataGroup.dataFilter) return;
	  if (!filter$2(this.frame) || !filter$2(this.frame).slider) throw new Error('No animation available');

	  filter$2(this.frame).slider.play();
	};
	/**
	 * Stop animation
	 */


	Graph3d.prototype.animationStop = function () {
	  if (!filter$2(this.frame) || !filter$2(this.frame).slider) return;

	  filter$2(this.frame).slider.stop();
	};
	/**
	 * Resize the center position based on the current values in this.xCenter
	 * and this.yCenter (which are strings with a percentage or a value
	 * in pixels). The center positions are the variables this.currentXCenter
	 * and this.currentYCenter
	 */


	Graph3d.prototype._resizeCenter = function () {
	  // calculate the horizontal center position
	  if (this.xCenter.charAt(this.xCenter.length - 1) === '%') {
	    this.currentXCenter = _parseFloat$2(this.xCenter) / 100 * this.frame.canvas.clientWidth;
	  } else {
	    this.currentXCenter = _parseFloat$2(this.xCenter); // supposed to be in px
	  } // calculate the vertical center position


	  if (this.yCenter.charAt(this.yCenter.length - 1) === '%') {
	    this.currentYCenter = _parseFloat$2(this.yCenter) / 100 * (this.frame.canvas.clientHeight - filter$2(this.frame).clientHeight);
	  } else {
	    this.currentYCenter = _parseFloat$2(this.yCenter); // supposed to be in px
	  }
	};
	/**
	 * Retrieve the current camera rotation
	 *
	 * @returns {object} An object with parameters horizontal, vertical, and
	 *                   distance
	 */


	Graph3d.prototype.getCameraPosition = function () {
	  var pos = this.camera.getArmRotation();
	  pos.distance = this.camera.getArmLength();
	  return pos;
	};
	/**
	 * Load data into the 3D Graph
	 *
	 * @param {vis.DataSet} data
	 * @private
	 */


	Graph3d.prototype._readData = function (data) {
	  // read the data
	  this.dataPoints = this.dataGroup.initializeData(this, data, this.style);

	  this._initializeRanges();

	  this._redrawFilter();
	};
	/**
	 * Replace the dataset of the Graph3d
	 *
	 * @param {Array | DataSet | DataView} data
	 */


	Graph3d.prototype.setData = function (data) {
	  if (data === undefined || data === null) return;

	  this._readData(data);

	  this.redraw();
	  this.animationStart();
	};
	/**
	 * Update the options. Options will be merged with current options
	 *
	 * @param {Object} options
	 */


	Graph3d.prototype.setOptions = function (options) {
	  if (options === undefined) return;
	  var errorFound = Validator.validate(options, allOptions$1);

	  if (errorFound === true) {
	    console.log('%cErrors have been found in the supplied options object.', printStyle);
	  }

	  this.animationStop();
	  setOptions(options, this);
	  this.setPointDrawingMethod();

	  this._setSize(this.width, this.height);

	  this.setAxisLabelMethod();
	  this.setData(this.dataGroup.getDataTable());
	  this.animationStart();
	};
	/**
	 * Determine which point drawing method to use for the current graph style.
	 */


	Graph3d.prototype.setPointDrawingMethod = function () {
	  var method = undefined;

	  switch (this.style) {
	    case Graph3d.STYLE.BAR:
	      method = this._redrawBarGraphPoint;
	      break;

	    case Graph3d.STYLE.BARCOLOR:
	      method = this._redrawBarColorGraphPoint;
	      break;

	    case Graph3d.STYLE.BARSIZE:
	      method = this._redrawBarSizeGraphPoint;
	      break;

	    case Graph3d.STYLE.DOT:
	      method = this._redrawDotGraphPoint;
	      break;

	    case Graph3d.STYLE.DOTLINE:
	      method = this._redrawDotLineGraphPoint;
	      break;

	    case Graph3d.STYLE.DOTCOLOR:
	      method = this._redrawDotColorGraphPoint;
	      break;

	    case Graph3d.STYLE.DOTSIZE:
	      method = this._redrawDotSizeGraphPoint;
	      break;

	    case Graph3d.STYLE.SURFACE:
	      method = this._redrawSurfaceGraphPoint;
	      break;

	    case Graph3d.STYLE.GRID:
	      method = this._redrawGridGraphPoint;
	      break;

	    case Graph3d.STYLE.LINE:
	      method = this._redrawLineGraphPoint;
	      break;

	    default:
	      throw new Error('Can not determine point drawing method ' + 'for graph style \'' + this.style + '\'');
	  }

	  this._pointDrawingMethod = method;
	};
	/**
	 * Determine which functions to use to draw axis labels.
	 */


	Graph3d.prototype.setAxisLabelMethod = function () {
	  if (this.rotateAxisLabels) {
	    this._drawAxisLabelX = this.drawAxisLabelXRotate;
	    this._drawAxisLabelY = this.drawAxisLabelYRotate;
	    this._drawAxisLabelZ = this.drawAxisLabelZRotate;
	  } else {
	    this._drawAxisLabelX = this.drawAxisLabelX;
	    this._drawAxisLabelY = this.drawAxisLabelY;
	    this._drawAxisLabelZ = this.drawAxisLabelZ;
	  }
	};
	/**
	 * Redraw the Graph.
	 */

	
	Graph3d.prototype.redraw = function () {
	  if (this.dataPoints === undefined) {
	    throw new Error('Graph data not initialized');
	  }
	  
	  this._resizeCanvas();

	  this._resizeCenter();

	  this._redrawSlider();

	  this._redrawClear();
      if(true) {
	  this._redrawAxis();
	  }
	  this._redrawDataGraph();

	  this._redrawInfo();

	  this._redrawLegend();
	};
	/**
	 * Get drawing context without exposing canvas
	 *
	 * @returns {CanvasRenderingContext2D}
	 * @private
	 */


	Graph3d.prototype._getContext = function () {
	  var canvas = this.frame.canvas;
	  var ctx = canvas.getContext('2d');
	  ctx.lineJoin = 'round';
	  ctx.lineCap = 'round';
	  return ctx;
	};
	/**
	 * Clear the canvas before redrawing
	 */


	Graph3d.prototype._redrawClear = function () {
	  var canvas = this.frame.canvas;
	  var ctx = canvas.getContext('2d');
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	Graph3d.prototype._dotSize = function () {
	  return this.frame.clientWidth * this.dotSizeRatio;
	};
	/**
	 * Get legend width
	 *
	 * @returns {*}
	 * @private
	 */


	Graph3d.prototype._getLegendWidth = function () {
	  var width;

	  if (this.style === Graph3d.STYLE.DOTSIZE) {
	    var dotSize = this._dotSize(); //width =  dotSize / 2 + dotSize * 2;


	    width = dotSize * this.dotSizeMaxFraction;
	  } else if (this.style === Graph3d.STYLE.BARSIZE) {
	    width = this.xBarWidth;
	  } else {
	    width = 20;
	  }

	  return width;
	};
	/**
	 * Redraw the legend based on size, dot color, or surface height
	 */


	Graph3d.prototype._redrawLegend = function () {
	  //Return without drawing anything, if no legend is specified
	  if (this.showLegend !== true) {
	    return;
	  } // Do not draw legend when graph style does not support


	  if (this.style === Graph3d.STYLE.LINE || this.style === Graph3d.STYLE.BARSIZE //TODO add legend support for BARSIZE
	  ) {
	      return;
	    } // Legend types - size and color. Determine if size legend.


	  var isSizeLegend = this.style === Graph3d.STYLE.BARSIZE || this.style === Graph3d.STYLE.DOTSIZE; // Legend is either tracking z values or style values. This flag if false means use z values.

	  var isValueLegend = this.style === Graph3d.STYLE.DOTSIZE || this.style === Graph3d.STYLE.DOTCOLOR || this.style === Graph3d.STYLE.SURFACE || this.style === Graph3d.STYLE.BARCOLOR;
	  var height = Math.max(this.frame.clientHeight * 0.25, 100);
	  var top = this.margin;

	  var width = this._getLegendWidth(); // px - overwritten by size legend


	  var right = this.frame.clientWidth - this.margin;
	  var left = right - width;
	  var bottom = top + height;

	  var ctx = this._getContext();

	  ctx.lineWidth = 1;
	  ctx.font = '14px arial'; // TODO: put in options

	  if (isSizeLegend === false) {
	    // draw the color bar
	    var ymin = 0;
	    var ymax = height; // Todo: make height customizable

	    var y;

	    for (y = ymin; y < ymax; y++) {
	      // Need (1 - x) because y runs from top to bottom:
	      var f = 1 - (y - ymin) / (ymax - ymin);

	      var color = this._colormap(f, 1);

	      ctx.strokeStyle = color;
	      ctx.beginPath();
	      ctx.moveTo(left, top + y);
	      ctx.lineTo(right, top + y);
	      ctx.stroke();
	    }

	    ctx.strokeStyle = this.axisColor;
	    ctx.strokeRect(left, top, width, height);
	  } else {
	    // draw the size legend box
	    var widthMin;

	    if (this.style === Graph3d.STYLE.DOTSIZE) {
	      // Get the proportion to max and min right
	      widthMin = width * (this.dotSizeMinFraction / this.dotSizeMaxFraction);
	    } else if (this.style === Graph3d.STYLE.BARSIZE) ;

	    ctx.strokeStyle = this.axisColor;
	    ctx.fillStyle = fill$2(this.dataColor);
	    ctx.beginPath();
	    ctx.moveTo(left, top);
	    ctx.lineTo(right, top);
	    ctx.lineTo(left + widthMin, bottom);
	    ctx.lineTo(left, bottom);
	    ctx.closePath();

	    fill$2(ctx).call(ctx);

	    ctx.stroke();
	  } // print value text along the legend edge


	  var gridLineLen = 5; // px

	  var legendMin = isValueLegend ? this.valueRange.min : this.zRange.min;
	  var legendMax = isValueLegend ? this.valueRange.max : this.zRange.max;
	  var step = new StepNumber_1(legendMin, legendMax, (legendMax - legendMin) / 5, true);
	  step.start(true);
	  var from;
	  var to;

	  while (!step.end()) {
	    y = bottom - (step.getCurrent() - legendMin) / (legendMax - legendMin) * height;
	    from = new Point2d_1(left - gridLineLen, y);
	    to = new Point2d_1(left, y);

	    this._line(ctx, from, to);

	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(step.getCurrent(), left - 2 * gridLineLen, y);
	    step.next();
	  }

	  ctx.textAlign = 'right';
	  ctx.textBaseline = 'top';
	  var label = this.legendLabel;
	  ctx.fillText(label, right, bottom + this.margin);
	};
	/**
	 * Redraw the filter
	 */


	Graph3d.prototype._redrawFilter = function () {
	  var dataFilter = this.dataGroup.dataFilter;

	  var filter = filter$2(this.frame);

	  filter.innerHTML = '';

	  if (!dataFilter) {
	    filter.slider = undefined;
	    return;
	  }

	  var options = {
	    'visible': this.showAnimationControls
	  };
	  var slider = new Slider(filter, options);
	  filter.slider = slider; // TODO: css here is not nice here...

	  filter.style.padding = '10px'; //this.frame.filter.style.backgroundColor = '#EFEFEF';

	  slider.setValues(values$2(dataFilter));
	  slider.setPlayInterval(this.animationInterval); // create an event handler

	  var me = this;

	  var onchange = function onchange() {
	    var dataFilter = me.dataGroup.dataFilter;
	    var index = slider.getIndex();
	    dataFilter.selectValue(index);
	    me.dataPoints = dataFilter._getDataPoints();
	    me.redraw();
	  };

	  slider.setOnChangeCallback(onchange);
	};
	/**
	 * Redraw the slider
	 */


	Graph3d.prototype._redrawSlider = function () {
	  if (filter$2(this.frame).slider !== undefined) {
	    filter$2(this.frame).slider.redraw();
	  }
	};
	/**
	 * Redraw common information
	 */


	Graph3d.prototype._redrawInfo = function () {
	  var info = this.dataGroup.getInfo();
	  if (info === undefined) return;

	  var ctx = this._getContext();

	  ctx.font = '14px arial'; // TODO: put in options

	  ctx.lineStyle = 'gray';
	  ctx.fillStyle = 'gray';
	  ctx.textAlign = 'left';
	  ctx.textBaseline = 'top';
	  var x = this.margin;
	  var y = this.margin;
	  ctx.fillText(info, x, y);
	};
	/**
	 * Draw a line between 2d points 'from' and 'to'.
	 *
	 * If stroke style specified, set that as well.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point2d} from
	 * @param {vis.Point2d} to
	 * @param {string} [strokeStyle]
	 * @private
	 */


	Graph3d.prototype._line = function (ctx, from, to, strokeStyle) {
	  if (strokeStyle !== undefined) {
	    ctx.strokeStyle = strokeStyle;
	  }

	  ctx.beginPath();
	  ctx.moveTo(from.x, from.y);
	  ctx.lineTo(to.x, to.y);
	  ctx.stroke();
	};
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point3d} point3d
	 * @param {string} text
	 * @param {number} armAngle
	 * @param {number} [yMargin=0]
	 */


	Graph3d.prototype.drawAxisLabelX = function (ctx, point3d, text, armAngle, yMargin) {
	  if (yMargin === undefined) {
	    yMargin = 0;
	  }

	  var point2d = this._convert3Dto2D(point3d);

	  if (Math.cos(armAngle * 2) > 0) {
	    ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
	    point2d.y += yMargin;
	  } else if (Math.sin(armAngle * 2) < 0) {
	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	  } else {
	    ctx.textAlign = 'left';
	    ctx.textBaseline = 'middle';
	  }

	  ctx.fillStyle = this.axisColor;
	  ctx.fillText(text, point2d.x, point2d.y);
	};
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point3d} point3d
	 * @param {string} text
	 * @param {number} armAngle
	 * @param {number} [yMargin=0]
	 */


	Graph3d.prototype.drawAxisLabelY = function (ctx, point3d, text, armAngle, yMargin) {
	  if (yMargin === undefined) {
	    yMargin = 0;
	  }

	  var point2d = this._convert3Dto2D(point3d);

	  if (Math.cos(armAngle * 2) < 0) {
	    ctx.textAlign = 'center';
	    ctx.textBaseline = 'top';
	    point2d.y += yMargin;
	  } else if (Math.sin(armAngle * 2) > 0) {
	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	  } else {
	    ctx.textAlign = 'left';
	    ctx.textBaseline = 'middle';
	  }

	  ctx.fillStyle = this.axisColor;
	  ctx.fillText(text, point2d.x, point2d.y);
	};
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point3d} point3d
	 * @param {string} text
	 * @param {number} [offset=0]
	 */


	Graph3d.prototype.drawAxisLabelZ = function (ctx, point3d, text, offset) {
	  if (offset === undefined) {
	    offset = 0;
	  }

	  var point2d = this._convert3Dto2D(point3d);

	  ctx.textAlign = 'right';
	  ctx.textBaseline = 'middle';
	  ctx.fillStyle = this.axisColor;
	  ctx.fillText(text, point2d.x - offset, point2d.y);
	};
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point3d} point3d
	 * @param {string} text
	 * @param {number} armAngle
	 * @param {number} [yMargin=0]
	 */


	Graph3d.prototype.drawAxisLabelXRotate = function (ctx, point3d, text, armAngle, yMargin) {

	  var point2d = this._convert3Dto2D(point3d);

	  if (Math.cos(armAngle * 2) > 0) {
	    ctx.save();
	    ctx.translate(point2d.x, point2d.y);
	    ctx.rotate(-Math.PI / 2);
	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(text, 0, 0);
	    ctx.restore();
	  } else if (Math.sin(armAngle * 2) < 0) {
	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(text, point2d.x, point2d.y);
	  } else {
	    ctx.textAlign = 'left';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(text, point2d.x, point2d.y);
	  }
	};
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point3d} point3d
	 * @param {string} text
	 * @param {number} armAngle
	 * @param {number} [yMargin=0]
	 */


	Graph3d.prototype.drawAxisLabelYRotate = function (ctx, point3d, text, armAngle, yMargin) {

	  var point2d = this._convert3Dto2D(point3d);

	  if (Math.cos(armAngle * 2) < 0) {
	    ctx.save();
	    ctx.translate(point2d.x, point2d.y);
	    ctx.rotate(-Math.PI / 2);
	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(text, 0, 0);
	    ctx.restore();
	  } else if (Math.sin(armAngle * 2) > 0) {
	    ctx.textAlign = 'right';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(text, point2d.x, point2d.y);
	  } else {
	    ctx.textAlign = 'left';
	    ctx.textBaseline = 'middle';
	    ctx.fillStyle = this.axisColor;
	    ctx.fillText(text, point2d.x, point2d.y);
	  }
	};
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point3d} point3d
	 * @param {string} text
	 * @param {number} [offset=0]
	 */


	Graph3d.prototype.drawAxisLabelZRotate = function (ctx, point3d, text, offset) {
	  if (offset === undefined) {
	    offset = 0;
	  }

	  var point2d = this._convert3Dto2D(point3d);

	  ctx.textAlign = 'right';
	  ctx.textBaseline = 'middle';
	  ctx.fillStyle = this.axisColor;
	  ctx.fillText(text, point2d.x - offset, point2d.y);
	};
	/**


	/**
	 * Draw a line between 2d points 'from' and 'to'.
	 *
	 * If stroke style specified, set that as well.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {vis.Point2d} from
	 * @param {vis.Point2d} to
	 * @param {string} [strokeStyle]
	 * @private
	 */


	Graph3d.prototype._line3d = function (ctx, from, to, strokeStyle) {
	  var from2d = this._convert3Dto2D(from);

	  var to2d = this._convert3Dto2D(to);

	  this._line(ctx, from2d, to2d, strokeStyle);
	};
	/**
	 * Redraw the axis
	 */


	Graph3d.prototype._redrawAxis = function () {
	  var ctx = this._getContext(),
	      from,
	      to,
	      step,
	      prettyStep,
	      text,
	      xText,
	      yText,
	      zText,
	      offset,
	      xOffset,
	      yOffset; // TODO: get the actual rendered style of the containerElement
	  //ctx.font = this.containerElement.style.font;
	  //ctx.font = 24 / this.camera.getArmLength() + 'px arial';


	  ctx.font = this.axisFontSize / this.camera.getArmLength() + 'px ' + this.axisFontType; // calculate the length for the short grid lines

	  var gridLenX = 0.025 / this.scale.x;
	  var gridLenY = 0.025 / this.scale.y;
	  var textMargin = 5 / this.camera.getArmLength(); // px

	  var armAngle = this.camera.getArmRotation().horizontal;
	  var armVector = new Point2d_1(Math.cos(armAngle), Math.sin(armAngle));
	  var xRange = this.xRange;
	  var yRange = this.yRange;
	  var zRange = this.zRange;
	  var point3d; // draw x-grid lines

	  ctx.lineWidth = 1;
	  prettyStep = this.defaultXStep === undefined;
	  step = new StepNumber_1(xRange.min, xRange.max, this.xStep, prettyStep);
	  step.start(true);

	  while (!step.end()) {
	    var x = step.getCurrent();

	    if (this.showGrid) {
	      from = new Point3d_1(x, yRange.min, zRange.min);
	      to = new Point3d_1(x, yRange.max, zRange.min);

	      this._line3d(ctx, from, to, this.gridColor);
	    } else if (this.showXAxis) {
	      from = new Point3d_1(x, yRange.min, zRange.min);
	      to = new Point3d_1(x, yRange.min + gridLenX, zRange.min);

	      this._line3d(ctx, from, to, this.axisColor);

	      from = new Point3d_1(x, yRange.max, zRange.min);
	      to = new Point3d_1(x, yRange.max - gridLenX, zRange.min);

	      this._line3d(ctx, from, to, this.axisColor);
	    }

	    if (this.showXAxis) {
	      yText = armVector.x > 0 ? yRange.min : yRange.max;
	      point3d = new Point3d_1(x, yText, zRange.min);
	      var msg = '  ' + this.xValueLabel(x) + '  ';

	      this._drawAxisLabelX.call(this, ctx, point3d, msg, armAngle, textMargin);
	    }

	    step.next();
	  } // draw y-grid lines


	  ctx.lineWidth = 1;
	  prettyStep = this.defaultYStep === undefined;
	  step = new StepNumber_1(yRange.min, yRange.max, this.yStep, prettyStep);
	  step.start(true);

	  while (!step.end()) {
	    var y = step.getCurrent();

	    if (this.showGrid) {
	      from = new Point3d_1(xRange.min, y, zRange.min);
	      to = new Point3d_1(xRange.max, y, zRange.min);

	      this._line3d(ctx, from, to, this.gridColor);
	    } else if (this.showYAxis) {
	      from = new Point3d_1(xRange.min, y, zRange.min);
	      to = new Point3d_1(xRange.min + gridLenY, y, zRange.min);

	      this._line3d(ctx, from, to, this.axisColor);

	      from = new Point3d_1(xRange.max, y, zRange.min);
	      to = new Point3d_1(xRange.max - gridLenY, y, zRange.min);

	      this._line3d(ctx, from, to, this.axisColor);
	    }

	    if (this.showYAxis) {
	      xText = armVector.y > 0 ? xRange.min : xRange.max;
	      point3d = new Point3d_1(xText, y, zRange.min);

	      var _msg = '  ' + this.yValueLabel(y) + '  ';

	      this._drawAxisLabelY.call(this, ctx, point3d, _msg, armAngle, textMargin);
	    }

	    step.next();
	  } // draw z-grid lines and axis


	  if (this.showZAxis) {
	    ctx.lineWidth = 1;
	    prettyStep = this.defaultZStep === undefined;
	    step = new StepNumber_1(zRange.min, zRange.max, this.zStep, prettyStep);
	    step.start(true);
	    xText = armVector.x > 0 ? xRange.min : xRange.max;
	    yText = armVector.y < 0 ? yRange.min : yRange.max;

	    while (!step.end()) {
	      var z = step.getCurrent(); // TODO: make z-grid lines really 3d?

	      var from3d = new Point3d_1(xText, yText, z);

	      var from2d = this._convert3Dto2D(from3d);

	      to = new Point2d_1(from2d.x - textMargin, from2d.y);

	      this._line(ctx, from2d, to, this.axisColor);

	      var _msg2 = this.zValueLabel(z) + ' ';

	      this._drawAxisLabelZ.call(this, ctx, from3d, _msg2, 5);

	      step.next();
	    }

	    ctx.lineWidth = 1;
	    from = new Point3d_1(xText, yText, zRange.min);
	    to = new Point3d_1(xText, yText, zRange.max);

	    this._line3d(ctx, from, to, this.axisColor);
	  } // draw x-axis


	  if (this.showXAxis) {
	    var xMin2d;
	    var xMax2d;
	    ctx.lineWidth = 1; // line at yMin

	    xMin2d = new Point3d_1(xRange.min, yRange.min, zRange.min);
	    xMax2d = new Point3d_1(xRange.max, yRange.min, zRange.min);

	    this._line3d(ctx, xMin2d, xMax2d, this.axisColor); // line at ymax


	    xMin2d = new Point3d_1(xRange.min, yRange.max, zRange.min);
	    xMax2d = new Point3d_1(xRange.max, yRange.max, zRange.min);

	    this._line3d(ctx, xMin2d, xMax2d, this.axisColor);
	  } // draw y-axis


	  if (this.showYAxis) {
	    ctx.lineWidth = 1; // line at xMin

	    from = new Point3d_1(xRange.min, yRange.min, zRange.min);
	    to = new Point3d_1(xRange.min, yRange.max, zRange.min);

	    this._line3d(ctx, from, to, this.axisColor); // line at xMax


	    from = new Point3d_1(xRange.max, yRange.min, zRange.min);
	    to = new Point3d_1(xRange.max, yRange.max, zRange.min);

	    this._line3d(ctx, from, to, this.axisColor);
	  } // draw x-label


	  var xLabel = this.xLabel;

	  if (xLabel.length > 0 && this.showXAxis) {
	    yOffset = 0.1 / this.scale.y;
	    xText = (xRange.max + 3 * xRange.min) / 4;
	    yText = armVector.x > 0 ? yRange.min - yOffset : yRange.max + yOffset;
	    text = new Point3d_1(xText, yText, zRange.min);
	    this.drawAxisLabelX(ctx, text, xLabel, armAngle);
	  } // draw y-label


	  var yLabel = this.yLabel;

	  if (yLabel.length > 0 && this.showYAxis) {
	    xOffset = 0.1 / this.scale.x;
	    xText = armVector.y > 0 ? xRange.min - xOffset : xRange.max + xOffset;
	    yText = (yRange.max + 3 * yRange.min) / 4;
	    text = new Point3d_1(xText, yText, zRange.min);
	    this.drawAxisLabelY(ctx, text, yLabel, armAngle);
	  } // draw z-label


	  var zLabel = this.zLabel;

	  if (zLabel.length > 0 && this.showZAxis) {
	    offset = 30; // pixels.  // TODO: relate to the max width of the values on the z axis?

	    xText = armVector.x > 0 ? xRange.min : xRange.max;
	    yText = armVector.y < 0 ? yRange.min : yRange.max;
	    zText = (zRange.max + 3 * zRange.min) / 4;
	    text = new Point3d_1(xText, yText, zText);
	    this.drawAxisLabelZ(ctx, text, zLabel, offset);
	  }
	};
	/**
	 *
	 * @param {vis.Point3d} point
	 * @returns {*}
	 * @private
	 */


	Graph3d.prototype._getStrokeWidth = function (point) {
	  if (point !== undefined) {
	    if (this.showPerspective) {
	      return 1 / -point.trans.z * this.dataColor.strokeWidth;
	    } else {
	      return -(this.eye.z / this.camera.getArmLength()) * this.dataColor.strokeWidth;
	    }
	  }

	  return this.dataColor.strokeWidth;
	}; // -----------------------------------------------------------------------------
	// Drawing primitives for the graphs
	// -----------------------------------------------------------------------------

	/**
	 * Draw a bar element in the view with the given properties.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @param {number} xWidth
	 * @param {number} yWidth
	 * @param {string} color
	 * @param {string} borderColor
	 * @private
	 */


	Graph3d.prototype._redrawBar = function (ctx, point, xWidth, yWidth, color, borderColor) {
	  var surface; // calculate all corner points

	  var me = this;
	  var point3d = point.point;
	  var zMin = this.zRange.min;
	  var top = [{
	    point: new Point3d_1(point3d.x - xWidth, point3d.y - yWidth, point3d.z)
	  }, {
	    point: new Point3d_1(point3d.x + xWidth, point3d.y - yWidth, point3d.z)
	  }, {
	    point: new Point3d_1(point3d.x + xWidth, point3d.y + yWidth, point3d.z)
	  }, {
	    point: new Point3d_1(point3d.x - xWidth, point3d.y + yWidth, point3d.z)
	  }];
	  var bottom = [{
	    point: new Point3d_1(point3d.x - xWidth, point3d.y - yWidth, zMin)
	  }, {
	    point: new Point3d_1(point3d.x + xWidth, point3d.y - yWidth, zMin)
	  }, {
	    point: new Point3d_1(point3d.x + xWidth, point3d.y + yWidth, zMin)
	  }, {
	    point: new Point3d_1(point3d.x - xWidth, point3d.y + yWidth, zMin)
	  }]; // calculate screen location of the points

	  forEach$2(top).call(top, function (obj) {
	    obj.screen = me._convert3Dto2D(obj.point);
	  });

	  forEach$2(bottom).call(bottom, function (obj) {
	    obj.screen = me._convert3Dto2D(obj.point);
	  }); // create five sides, calculate both corner points and center points


	  var surfaces = [{
	    corners: top,
	    center: Point3d_1.avg(bottom[0].point, bottom[2].point)
	  }, {
	    corners: [top[0], top[1], bottom[1], bottom[0]],
	    center: Point3d_1.avg(bottom[1].point, bottom[0].point)
	  }, {
	    corners: [top[1], top[2], bottom[2], bottom[1]],
	    center: Point3d_1.avg(bottom[2].point, bottom[1].point)
	  }, {
	    corners: [top[2], top[3], bottom[3], bottom[2]],
	    center: Point3d_1.avg(bottom[3].point, bottom[2].point)
	  }, {
	    corners: [top[3], top[0], bottom[0], bottom[3]],
	    center: Point3d_1.avg(bottom[0].point, bottom[3].point)
	  }];
	  point.surfaces = surfaces; // calculate the distance of each of the surface centers to the camera

	  for (var j = 0; j < surfaces.length; j++) {
	    surface = surfaces[j];

	    var transCenter = this._convertPointToTranslation(surface.center);

	    surface.dist = this.showPerspective ? transCenter.length() : -transCenter.z; // TODO: this dept calculation doesn't work 100% of the cases due to perspective,
	    //     but the current solution is fast/simple and works in 99.9% of all cases
	    //     the issue is visible in example 14, with graph.setCameraPosition({horizontal: 2.97, vertical: 0.5, distance: 0.9})
	  } // order the surfaces by their (translated) depth


	  sort$2(surfaces).call(surfaces, function (a, b) {
	    var diff = b.dist - a.dist;
	    if (diff) return diff; // if equal depth, sort the top surface last

	    if (a.corners === top) return 1;
	    if (b.corners === top) return -1; // both are equal

	    return 0;
	  }); // draw the ordered surfaces


	  ctx.lineWidth = this._getStrokeWidth(point);
	  ctx.strokeStyle = borderColor;
	  ctx.fillStyle = color; // NOTE: we start at j=2 instead of j=0 as we don't need to draw the two surfaces at the backside

	  for (var _j = 2; _j < surfaces.length; _j++) {
	    surface = surfaces[_j];

	    this._polygon(ctx, surface.corners);
	  }
	};
	/**
	 * Draw a polygon using the passed points and fill it with the passed style and stroke.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Array.<vis.Point3d>} points      an array of points.
	 * @param {string} [fillStyle] the fill style to set
	 * @param {string} [strokeStyle] the stroke style to set
	 */


	Graph3d.prototype._polygon = function (ctx, points, fillStyle, strokeStyle) {
	  if (points.length < 2) {
	    return;
	  }

	  if (fillStyle !== undefined) {
	    ctx.fillStyle = fillStyle;
	  }

	  if (strokeStyle !== undefined) {
	    ctx.strokeStyle = strokeStyle;
	  }

	  ctx.beginPath();
	  ctx.moveTo(points[0].screen.x, points[0].screen.y);

	  for (var i = 1; i < points.length; ++i) {
	    var point = points[i];
	    ctx.lineTo(point.screen.x, point.screen.y);
	  }

	  ctx.closePath();

	  fill$2(ctx).call(ctx);

	  ctx.stroke(); // TODO: only draw stroke when strokeWidth > 0
	};
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {object} point
	 * @param {string} color
	 * @param {string} borderColor
	 * @param {number} [size=this._dotSize()]
	 * @private
	 */


	Graph3d.prototype._drawCircle = function (ctx, point, color, borderColor, size) {
	  var radius = this._calcRadius(point, size);

	  ctx.lineWidth = this._getStrokeWidth(point);
	  ctx.strokeStyle = borderColor;
	  ctx.fillStyle = color;
	  ctx.beginPath();
	  ctx.arc(point.screen.x, point.screen.y, radius, 0, Math.PI * 2, true);

	  fill$2(ctx).call(ctx);

	  ctx.stroke();
	};
	/**
	 * Determine the colors for the 'regular' graph styles.
	 *
	 * @param {object} point
	 * @returns {{fill, border}}
	 * @private
	 */


	Graph3d.prototype._getColorsRegular = function (point) {
	  var f = (point.point.value - this.valueRange.min) * this.scale.value;

	  var color = this._colormap(f, 1);

	  var borderColor = this._colormap(f, 0.8);

	  return {
	    fill: color,
	    border: borderColor
	  };
	};
	/**
	 * Get the colors for the 'color' graph styles.
	 * These styles are currently: 'bar-color' and 'dot-color'
	 * Color may be set as a string representation of HTML color, like #ff00ff,
	 * or calculated from a number, for example, distance from this point
	 * The first option is useful when we have some pre-given legend, to which we have to adjust ourselves
	 * The second option is useful when we are interested in automatically setting the color, from some value,
	 * using some color scale
	 * @param {object} point
	 * @returns {{fill: *, border: *}}
	 * @private
	 */


	Graph3d.prototype._getColorsColor = function (point) {
	  // calculate the color based on the value
	  var color, borderColor, pointStyle;

	  if (point && point.point && point.point.data && point.point.data.style) {
	    pointStyle = point.point.data.style;
	  }

	  if (pointStyle && _typeof_1(pointStyle) === 'object' && fill$2(pointStyle) && pointStyle.stroke) {
	    return {
	      fill: fill$2(pointStyle),
	      border: pointStyle.stroke
	    };
	  }

	  if (typeof point.point.value === "string") {
	    color = point.point.value;
	    borderColor = point.point.value;
	  } else {
	    var f = (point.point.value - this.valueRange.min) * this.scale.value;
	    color = this._colormap(f, 1);
	    borderColor = this._colormap(f, 0.8);
	  }

	  return {
	    fill: color,
	    border: borderColor
	  };
	};
	/**
	 * Get the colors for the 'size' graph styles.
	 * These styles are currently: 'bar-size' and 'dot-size'
	 *
	 * @returns {{fill: *, border: (string|colorOptions.stroke|{string, undefined}|string|colorOptions.stroke|{string}|*)}}
	 * @private
	 */


	Graph3d.prototype._getColorsSize = function () {
	  return {
	    fill: fill$2(this.dataColor),
	    border: this.dataColor.stroke
	  };
	};
	/**
	 * Determine the color corresponding to a given value on the color scale.
	 *
	 * @param {number} [x] the data value to be mapped running from 0 to 1
	 * @param {number} [v] scale factor between 0 and 1 for the color brightness
	 * @returns {string}
	 * @private
	 */


	Graph3d.prototype._colormap = function (x) {
	  var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var r, g, b, a;
	  var colormap = this.colormap;

	  if (isArray$3(colormap)) {
	    var maxIndex = colormap.length - 1;
	    var startIndex = Math.max(Math.floor(x * maxIndex), 0);
	    var endIndex = Math.min(startIndex + 1, maxIndex);
	    var innerRatio = x * maxIndex - startIndex;
	    var min = colormap[startIndex];
	    var max = colormap[endIndex];
	    r = min.r + innerRatio * (max.r - min.r);
	    g = min.g + innerRatio * (max.g - min.g);
	    b = min.b + innerRatio * (max.b - min.b);
	  } else if (typeof colormap === 'function') {
	    var _colormap = colormap(x);

	    r = _colormap.r;
	    g = _colormap.g;
	    b = _colormap.b;
	    a = _colormap.a;
	  } else {
	    var hue = (1 - x) * 240;

	    var _util$HSVToRGB = HSVToRGB(hue / 360, 1, 1);

	    r = _util$HSVToRGB.r;
	    g = _util$HSVToRGB.g;
	    b = _util$HSVToRGB.b;
	  }

	  if (typeof a === 'number' && !isNan$2(a)) {
	    var _context, _context2, _context3;

	    return concat$2(_context = concat$2(_context2 = concat$2(_context3 = "RGBA(".concat(Math.round(r * v), ", ")).call(_context3, Math.round(g * v), ", ")).call(_context2, Math.round(b * v), ", ")).call(_context, a, ")");
	  } else {
	    var _context4, _context5;

	    return concat$2(_context4 = concat$2(_context5 = "RGB(".concat(Math.round(r * v), ", ")).call(_context5, Math.round(g * v), ", ")).call(_context4, Math.round(b * v), ")");
	  }
	};
	/**
	 * Determine the size of a point on-screen, as determined by the
	 * distance to the camera.
	 *
	 * @param {Object} point
	 * @param {number} [size=this._dotSize()] the size that needs to be translated to screen coordinates.
	 *             optional; if not passed, use the default point size.
	 * @returns {number}
	 * @private
	 */


	Graph3d.prototype._calcRadius = function (point, size) {
	  if (size === undefined) {
	    size = this._dotSize();
	  }

	  var radius;

	  if (this.showPerspective) {
	    radius = size / -point.trans.z;
	  } else {
	    radius = size * -(this.eye.z / this.camera.getArmLength());
	  }

	  if (radius < 0) {
	    radius = 0;
	  }

	  return radius;
	}; // -----------------------------------------------------------------------------
	// Methods for drawing points per graph style.
	// -----------------------------------------------------------------------------

	/**
	 * Draw single datapoint for graph style 'bar'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawBarGraphPoint = function (ctx, point) {
	  var xWidth = this.xBarWidth / 2;
	  var yWidth = this.yBarWidth / 2;

	  var colors = this._getColorsRegular(point);

	  this._redrawBar(ctx, point, xWidth, yWidth, fill$2(colors), colors.border);
	};
	/**
	 * Draw single datapoint for graph style 'bar-color'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawBarColorGraphPoint = function (ctx, point) {
	  var xWidth = this.xBarWidth / 2;
	  var yWidth = this.yBarWidth / 2;

	  var colors = this._getColorsColor(point);

	  this._redrawBar(ctx, point, xWidth, yWidth, fill$2(colors), colors.border);
	};
	/**
	 * Draw single datapoint for graph style 'bar-size'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawBarSizeGraphPoint = function (ctx, point) {
	  // calculate size for the bar
	  var fraction = (point.point.value - this.valueRange.min) / this.valueRange.range();
	  var xWidth = this.xBarWidth / 2 * (fraction * 0.8 + 0.2);
	  var yWidth = this.yBarWidth / 2 * (fraction * 0.8 + 0.2);

	  var colors = this._getColorsSize();

	  this._redrawBar(ctx, point, xWidth, yWidth, fill$2(colors), colors.border);
	};
	/**
	 * Draw single datapoint for graph style 'dot'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawDotGraphPoint = function (ctx, point) {
	  var colors = this._getColorsRegular(point);

	  this._drawCircle(ctx, point, fill$2(colors), colors.border);
	};
	/**
	 * Draw single datapoint for graph style 'dot-line'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawDotLineGraphPoint = function (ctx, point) {
	  // draw a vertical line from the XY-plane to the graph value
	  var from = this._convert3Dto2D(point.bottom);

	  ctx.lineWidth = 1;

	  this._line(ctx, from, point.screen, this.gridColor);

	  this._redrawDotGraphPoint(ctx, point);
	};
	/**
	 * Draw single datapoint for graph style 'dot-color'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawDotColorGraphPoint = function (ctx, point) {
	  var colors = this._getColorsColor(point);

	  this._drawCircle(ctx, point, fill$2(colors), colors.border);
	};
	/**
	 * Draw single datapoint for graph style 'dot-size'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawDotSizeGraphPoint = function (ctx, point) {
	  var dotSize = this._dotSize();

	  var fraction = (point.point.value - this.valueRange.min) / this.valueRange.range();
	  var sizeMin = dotSize * this.dotSizeMinFraction;
	  var sizeRange = dotSize * this.dotSizeMaxFraction - sizeMin;
	  var size = sizeMin + sizeRange * fraction;

	  var colors = this._getColorsSize();

	  this._drawCircle(ctx, point, fill$2(colors), colors.border, size);
	};
	/**
	 * Draw single datapoint for graph style 'surface'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawSurfaceGraphPoint = function (ctx, point) {
	  var right = point.pointRight;
	  var top = point.pointTop;
	  var cross = point.pointCross;

	  if (point === undefined || right === undefined || top === undefined || cross === undefined) {
	    return;
	  }

	  var topSideVisible = true;
	  var fillStyle;
	  var strokeStyle;
	  var cosViewAngle;

	  if (this.showGrayBottom || this.showShadow) {
	    // calculate the cross product of the two vectors from center
	    // to left and right, in order to know whether we are looking at the
	    // bottom or at the top side. We can also use the cross product
	    // for calculating light intensity
	    var aDiff = Point3d_1.subtract(cross.trans, point.trans);
	    var bDiff = Point3d_1.subtract(top.trans, right.trans);
	    var surfaceNormal = Point3d_1.crossProduct(aDiff, bDiff);

	    if (this.showPerspective) {
	      var surfacePosition = Point3d_1.avg(Point3d_1.avg(point.trans, cross.trans), Point3d_1.avg(right.trans, top.trans)); // This corresponds to diffuse lighting with light source at (0, 0, 0).
	      // More generally, we would need `surfacePosition - lightPosition`:

	      cosViewAngle = -Point3d_1.dotProduct(surfaceNormal.normalize(), surfacePosition.normalize());
	    } else {
	      cosViewAngle = surfaceNormal.z / surfaceNormal.length();
	    }

	    topSideVisible = cosViewAngle > 0;
	  }

	  if (topSideVisible || !this.showGrayBottom) {
	    var vAvg = (point.point.value + right.point.value + top.point.value + cross.point.value) / 4;
	    var ratio = (vAvg - this.valueRange.min) * this.scale.value; // lighting factor. TODO: let user specify lighting model as function(?)

	    var v = this.showShadow ? (1 + cosViewAngle) / 2 : 1;
	    fillStyle = this._colormap(ratio, v);
	  } else {
	    fillStyle = 'gray';
	  }

	  if (this.showSurfaceGrid) {
	    strokeStyle = this.axisColor; // TODO: should be customizable
	  } else {
	    strokeStyle = fillStyle;
	  }

	  ctx.lineWidth = this._getStrokeWidth(point); // TODO: only draw stroke when strokeWidth > 0

	  var points = [point, right, cross, top];

	  this._polygon(ctx, points, fillStyle, strokeStyle);
	};
	/**
	 * Helper method for _redrawGridGraphPoint()
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} from
	 * @param {Object} to
	 * @private
	 */


	Graph3d.prototype._drawGridLine = function (ctx, from, to) {
	  if (from === undefined || to === undefined) {
	    return;
	  }

	  var vAvg = (from.point.value + to.point.value) / 2;
	  var f = (vAvg - this.valueRange.min) * this.scale.value;
	  ctx.lineWidth = this._getStrokeWidth(from) * 2;
	  ctx.strokeStyle = this._colormap(f, 1);

	  this._line(ctx, from.screen, to.screen);
	};
	/**
	 * Draw single datapoint for graph style 'Grid'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawGridGraphPoint = function (ctx, point) {
	  this._drawGridLine(ctx, point, point.pointRight);

	  this._drawGridLine(ctx, point, point.pointTop);
	};
	/**
	 * Draw single datapoint for graph style 'line'.
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} point
	 * @private
	 */


	Graph3d.prototype._redrawLineGraphPoint = function (ctx, point) {
	  if (point.pointNext === undefined) {
	    return;
	  }

	  ctx.lineWidth = this._getStrokeWidth(point);
	  ctx.strokeStyle = this.dataColor.stroke;

	  this._line(ctx, point.screen, point.pointNext.screen);
	};
	/**
	 * Draw all datapoints for currently selected graph style.
	 *
	 */


	Graph3d.prototype._redrawDataGraph = function () {
	  var ctx = this._getContext();

	  var i;
	  if (this.dataPoints === undefined || this.dataPoints.length <= 0) return; // TODO: throw exception?

	  this._calcTranslations(this.dataPoints);

	  for (i = 0; i < this.dataPoints.length; i++) {
	    var point = this.dataPoints[i]; // Using call() ensures that the correct context is used

	    this._pointDrawingMethod.call(this, ctx, point);
	  }
	}; // -----------------------------------------------------------------------------
	// End methods for drawing points per graph style.
	// -----------------------------------------------------------------------------

	/**
	 * Store startX, startY and startOffset for mouse operations
	 *
	 * @param {Event}     event     The event that occurred
	 */


	Graph3d.prototype._storeMousePosition = function (event) {
	  // get mouse position (different code for IE and all other browsers)
	  this.startMouseX = getMouseX(event);
	  this.startMouseY = getMouseY(event);
	  this._startCameraOffset = this.camera.getOffset();
	};
	/**
	 * Start a moving operation inside the provided parent element
	 * @param {Event}     event     The event that occurred (required for
	 *                  retrieving the  mouse position)
	 */


	Graph3d.prototype._onMouseDown = function (event) {
	  event = event || window.event; // check if mouse is still down (may be up when focus is lost for example
	  // in an iframe)

	  if (this.leftButtonDown) {
	    this._onMouseUp(event);
	  } // only react on left mouse button down


	  this.leftButtonDown = event.which ? event.which === 1 : event.button === 1;
	  if (!this.leftButtonDown && !this.touchDown) return;

	  this._storeMousePosition(event);

	  this.startStart = new Date(this.start);
	  this.startEnd = new Date(this.end);
	  this.startArmRotation = this.camera.getArmRotation();
	  this.frame.style.cursor = 'move'; // add event listeners to handle moving the contents
	  // we store the function onmousemove and onmouseup in the graph, so we can
	  // remove the eventlisteners lateron in the function mouseUp()

	  var me = this;

	  this.onmousemove = function (event) {
	    me._onMouseMove(event);
	  };

	  this.onmouseup = function (event) {
	    me._onMouseUp(event);
	  };

	  addEventListener(document, 'mousemove', me.onmousemove);
	  addEventListener(document, 'mouseup', me.onmouseup);
	  preventDefault(event);
	};
	/**
	 * Perform moving operating.
	 * This function activated from within the funcion Graph.mouseDown().
	 * @param {Event}   event  Well, eehh, the event
	 */


	Graph3d.prototype._onMouseMove = function (event) {
	  this.moving = true;
	  event = event || window.event; // calculate change in mouse position

	  var diffX = _parseFloat$2(getMouseX(event)) - this.startMouseX;
	  var diffY = _parseFloat$2(getMouseY(event)) - this.startMouseY; // move with ctrl or rotate by other

	  if (event && event.ctrlKey === true) {
	    // calculate change in mouse position
	    var scaleX = this.frame.clientWidth * 0.5;
	    var scaleY = this.frame.clientHeight * 0.5;
	    var offXNew = (this._startCameraOffset.x || 0) - diffX / scaleX * this.camera.armLength * 0.8;
	    var offYNew = (this._startCameraOffset.y || 0) + diffY / scaleY * this.camera.armLength * 0.8;
	    this.camera.setOffset(offXNew, offYNew);

	    this._storeMousePosition(event);
	  } else {
	    var horizontalNew = this.startArmRotation.horizontal + diffX / 200;
	    var verticalNew = this.startArmRotation.vertical + diffY / 200;
	    var snapAngle = 4; // degrees

	    var snapValue = Math.sin(snapAngle / 360 * 2 * Math.PI); // snap horizontally to nice angles at 0pi, 0.5pi, 1pi, 1.5pi, etc...
	    // the -0.001 is to take care that the vertical axis is always drawn at the left front corner

	    if (Math.abs(Math.sin(horizontalNew)) < snapValue) {
	      horizontalNew = Math.round(horizontalNew / Math.PI) * Math.PI - 0.001;
	    }

	    if (Math.abs(Math.cos(horizontalNew)) < snapValue) {
	      horizontalNew = (Math.round(horizontalNew / Math.PI - 0.5) + 0.5) * Math.PI - 0.001;
	    } // snap vertically to nice angles


	    if (Math.abs(Math.sin(verticalNew)) < snapValue) {
	      verticalNew = Math.round(verticalNew / Math.PI) * Math.PI;
	    }

	    if (Math.abs(Math.cos(verticalNew)) < snapValue) {
	      verticalNew = (Math.round(verticalNew / Math.PI - 0.5) + 0.5) * Math.PI;
	    }

	    this.camera.setArmRotation(horizontalNew, verticalNew);
	  }
	  
	  this.redraw(); // fire a cameraPositionChange event

	  var parameters = this.getCameraPosition();
	  this.emit('cameraPositionChange', parameters);
	  preventDefault(event);
	};
	/**
	 * Stop moving operating.
	 * This function activated from within the funcion Graph.mouseDown().
	 * @param {Event}  event   The event
	 */


	Graph3d.prototype._onMouseUp = function (event) {
	  this.frame.style.cursor = 'auto';
	  this.leftButtonDown = false; // remove event listeners here

	  removeEventListener(document, 'mousemove', this.onmousemove);
	  removeEventListener(document, 'mouseup', this.onmouseup);
	  preventDefault(event);
	};
	/**
	 * @param {Event}  event   The event
	 */


	Graph3d.prototype._onClick = function (event) {
	  // NOTE: onclick_callback is deprecated and may be removed in a future version.
	  if (!this.onclick_callback && !this.hasListeners('click')) return;

	  if (!this.moving) {
	    var boundingRect = this.frame.getBoundingClientRect();
	    var mouseX = getMouseX(event) - boundingRect.left;
	    var mouseY = getMouseY(event) - boundingRect.top;

	    var dataPoint = this._dataPointFromXY(mouseX, mouseY);

	    if (dataPoint) {
	      if (this.onclick_callback) this.onclick_callback(dataPoint.point.data);
	      this.emit('click', dataPoint.point.data);
	    }
	  } else {
	    // disable onclick callback, if it came immediately after rotate/pan
	    this.moving = false;
	  }

	  preventDefault(event);
	};
	/**
	 * After having moved the mouse, a tooltip should pop up when the mouse is resting on a data point
	 * @param {Event}  event   A mouse move event
	 */


	Graph3d.prototype._onTooltip = function (event) {
	  var delay = this.tooltipDelay; // ms

	  var boundingRect = this.frame.getBoundingClientRect();
	  var mouseX = getMouseX(event) - boundingRect.left;
	  var mouseY = getMouseY(event) - boundingRect.top;

	  if (!this.showTooltip) {
	    return;
	  }

	  if (this.tooltipTimeout) {
	    clearTimeout(this.tooltipTimeout);
	  } // (delayed) display of a tooltip only if no mouse button is down


	  if (this.leftButtonDown) {
	    this._hideTooltip();

	    return;
	  }

	  if (this.tooltip && this.tooltip.dataPoint) {
	    // tooltip is currently visible
	    var dataPoint = this._dataPointFromXY(mouseX, mouseY);

	    if (dataPoint !== this.tooltip.dataPoint) {
	      // datapoint changed
	      if (dataPoint) {
	        this._showTooltip(dataPoint);
	      } else {
	        this._hideTooltip();
	      }
	    }
	  } else {
	    // tooltip is currently not visible
	    var me = this;
	    this.tooltipTimeout = setTimeout$1(function () {
	      me.tooltipTimeout = null; // show a tooltip if we have a data point

	      var dataPoint = me._dataPointFromXY(mouseX, mouseY);

	      if (dataPoint) {
	        me._showTooltip(dataPoint);
	      }
	    }, delay);
	  }
	};
	/**
	 * Event handler for touchstart event on mobile devices
	 * @param {Event}  event   The event
	 */


	Graph3d.prototype._onTouchStart = function (event) {
	  this.touchDown = true;
	  var me = this;

	  this.ontouchmove = function (event) {
	    me._onTouchMove(event);
	  };

	  this.ontouchend = function (event) {
	    me._onTouchEnd(event);
	  };

	  addEventListener(document, 'touchmove', me.ontouchmove);
	  addEventListener(document, 'touchend', me.ontouchend);

	  this._onMouseDown(event);
	};
	/**
	 * Event handler for touchmove event on mobile devices
	 * @param {Event}  event   The event
	 */


	Graph3d.prototype._onTouchMove = function (event) {
	  this._onMouseMove(event);
	};
	/**
	 * Event handler for touchend event on mobile devices
	 * @param {Event}  event   The event
	 */


	Graph3d.prototype._onTouchEnd = function (event) {
	  this.touchDown = false;
	  removeEventListener(document, 'touchmove', this.ontouchmove);
	  removeEventListener(document, 'touchend', this.ontouchend);

	  this._onMouseUp(event);
	};
	/**
	 * Event handler for mouse wheel event, used to zoom the graph
	 * Code from http://adomas.org/javascript-mouse-wheel/
	 * @param {Event}  event   The event
	 */


	Graph3d.prototype._onWheel = function (event) {
	  if (!event)
	    /* For IE. */
	    event = window.event;

	  if (this.zoomable && (!this.ctrlToZoom || event.ctrlKey)) {
	    // retrieve delta
	    var delta = 0;

	    if (event.wheelDelta) {
	      /* IE/Opera. */
	      delta = event.wheelDelta / 120;
	    } else if (event.detail) {
	      /* Mozilla case. */
	      // In Mozilla, sign of delta is different than in IE.
	      // Also, delta is multiple of 3.
	      delta = -event.detail / 3;
	    } // If delta is nonzero, handle it.
	    // Basically, delta is now positive if wheel was scrolled up,
	    // and negative, if wheel was scrolled down.


	    if (delta) {
	      var oldLength = this.camera.getArmLength();
	      var newLength = oldLength * (1 - delta / 10);
	      this.camera.setArmLength(newLength);
	      this.redraw();

	      this._hideTooltip();
	    } // fire a cameraPositionChange event


	    var parameters = this.getCameraPosition();
	    this.emit('cameraPositionChange', parameters); // Prevent default actions caused by mouse wheel.
	    // That might be ugly, but we handle scrolls somehow
	    // anyway, so don't bother here..

	    preventDefault(event);
	  }
	};
	/**
	 * Test whether a point lies inside given 2D triangle
	 *
	 * @param   {vis.Point2d}   point
	 * @param   {vis.Point2d[]} triangle
	 * @returns {boolean}   true if given point lies inside or on the edge of the
	 *                      triangle, false otherwise
	 * @private
	 */


	Graph3d.prototype._insideTriangle = function (point, triangle) {
	  var a = triangle[0],
	      b = triangle[1],
	      c = triangle[2];
	  /**
	   *
	   * @param {number} x
	   * @returns {number}
	   */

	  function sign(x) {
	    return x > 0 ? 1 : x < 0 ? -1 : 0;
	  }

	  var as = sign((b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x));
	  var bs = sign((c.x - b.x) * (point.y - b.y) - (c.y - b.y) * (point.x - b.x));
	  var cs = sign((a.x - c.x) * (point.y - c.y) - (a.y - c.y) * (point.x - c.x)); // each of the three signs must be either equal to each other or zero

	  return (as == 0 || bs == 0 || as == bs) && (bs == 0 || cs == 0 || bs == cs) && (as == 0 || cs == 0 || as == cs);
	};
	/**
	 * Find a data point close to given screen position (x, y)
	 *
	 * @param   {number} x
	 * @param   {number} y
	 * @returns {Object | null} The closest data point or null if not close to any
	 *                          data point
	 * @private
	 */


	Graph3d.prototype._dataPointFromXY = function (x, y) {
	  var i,
	      distMax = 100,
	      // px
	  dataPoint = null,
	      closestDataPoint = null,
	      closestDist = null,
	      center = new Point2d_1(x, y);

	  if (this.style === Graph3d.STYLE.BAR || this.style === Graph3d.STYLE.BARCOLOR || this.style === Graph3d.STYLE.BARSIZE) {
	    // the data points are ordered from far away to closest
	    for (i = this.dataPoints.length - 1; i >= 0; i--) {
	      dataPoint = this.dataPoints[i];
	      var surfaces = dataPoint.surfaces;

	      if (surfaces) {
	        for (var s = surfaces.length - 1; s >= 0; s--) {
	          // split each surface in two triangles, and see if the center point is inside one of these
	          var surface = surfaces[s];
	          var corners = surface.corners;
	          var triangle1 = [corners[0].screen, corners[1].screen, corners[2].screen];
	          var triangle2 = [corners[2].screen, corners[3].screen, corners[0].screen];

	          if (this._insideTriangle(center, triangle1) || this._insideTriangle(center, triangle2)) {
	            // return immediately at the first hit
	            return dataPoint;
	          }
	        }
	      }
	    }
	  } else {
	    // find the closest data point, using distance to the center of the point on 2d screen
	    for (i = 0; i < this.dataPoints.length; i++) {
	      dataPoint = this.dataPoints[i];
	      var point = dataPoint.screen;

	      if (point) {
	        var distX = Math.abs(x - point.x);
	        var distY = Math.abs(y - point.y);
	        var dist = Math.sqrt(distX * distX + distY * distY);

	        if ((closestDist === null || dist < closestDist) && dist < distMax) {
	          closestDist = dist;
	          closestDataPoint = dataPoint;
	        }
	      }
	    }
	  }

	  return closestDataPoint;
	};
	/**
	 * Determine if the given style has bars
	 *
	 * @param   {number} style the style to check
	 * @returns {boolean} true if bar style, false otherwise
	 */


	Graph3d.prototype.hasBars = function (style) {
	  return style == Graph3d.STYLE.BAR || style == Graph3d.STYLE.BARCOLOR || style == Graph3d.STYLE.BARSIZE;
	};
	/**
	 * Display a tooltip for given data point
	 * @param {Object} dataPoint
	 * @private
	 */


	Graph3d.prototype._showTooltip = function (dataPoint) {
	  var content, line, dot;

	  if (!this.tooltip) {
	    content = document.createElement('div');

	    assign$2(content.style, {}, this.tooltipStyle.content);

	    content.style.position = 'absolute';
	    line = document.createElement('div');

	    assign$2(line.style, {}, this.tooltipStyle.line);

	    line.style.position = 'absolute';
	    dot = document.createElement('div');

	    assign$2(dot.style, {}, this.tooltipStyle.dot);

	    dot.style.position = 'absolute';
	    this.tooltip = {
	      dataPoint: null,
	      dom: {
	        content: content,
	        line: line,
	        dot: dot
	      }
	    };
	  } else {
	    content = this.tooltip.dom.content;
	    line = this.tooltip.dom.line;
	    dot = this.tooltip.dom.dot;
	  }

	  this._hideTooltip();

	  this.tooltip.dataPoint = dataPoint;

	  if (typeof this.showTooltip === 'function') {
	    content.innerHTML = this.showTooltip(dataPoint.point);
		  		 console.log(dataPoint.point.x, dataPoint.point.z, dataPoint.point.y);
	  } else {
	    content.innerHTML = '<table>' + '<tr><td>' + this.xLabel + ':</td><td>' + dataPoint.point.x + '</td></tr>' + '<tr><td>' + this.yLabel + ':</td><td>' + dataPoint.point.y + '</td></tr>' + '<tr><td>' + this.zLabel + ':</td><td>' + dataPoint.point.z + '</td></tr>' + '</table>';
	  }

	  content.style.left = '0';
	  content.style.top = '0';
	  this.frame.appendChild(content);
	  this.frame.appendChild(line);
	  this.frame.appendChild(dot); // calculate sizes

	  var contentWidth = content.offsetWidth;
	  var contentHeight = content.offsetHeight;
	  var lineHeight = line.offsetHeight;
	  var dotWidth = dot.offsetWidth;
	  var dotHeight = dot.offsetHeight;
	  var left = dataPoint.screen.x - contentWidth / 2;
	  left = Math.min(Math.max(left, 10), this.frame.clientWidth - 10 - contentWidth);
	  line.style.left = dataPoint.screen.x + 'px';
	  line.style.top = dataPoint.screen.y - lineHeight + 'px';
	  content.style.left = left + 'px';
	  content.style.top = dataPoint.screen.y - lineHeight - contentHeight + 'px';
	  dot.style.left = dataPoint.screen.x - dotWidth / 2 + 'px';
	  dot.style.top = dataPoint.screen.y - dotHeight / 2 + 'px';
	};
	/**
	 * Hide the tooltip when displayed
	 * @private
	 */


	Graph3d.prototype._hideTooltip = function () {
	  if (this.tooltip) {
	    this.tooltip.dataPoint = null;

	    for (var prop in this.tooltip.dom) {
	      if (this.tooltip.dom.hasOwnProperty(prop)) {
	        var elem = this.tooltip.dom[prop];

	        if (elem && elem.parentNode) {
	          elem.parentNode.removeChild(elem);
	        }
	      }
	    }
	  }
	};
	/**--------------------------------------------------------------------------**/

	/**
	 * Get the horizontal mouse position from a mouse event
	 *
	 * @param   {Event}  event
	 * @returns {number} mouse x
	 */


	function getMouseX(event) {
	  if ('clientX' in event) return event.clientX;
	  return event.targetTouches[0] && event.targetTouches[0].clientX || 0;
	}
	/**
	 * Get the vertical mouse position from a mouse event
	 *
	 * @param   {Event}  event
	 * @returns {number} mouse y
	 */


	function getMouseY(event) {
	  if ('clientY' in event) return event.clientY;
	  return event.targetTouches[0] && event.targetTouches[0].clientY || 0;
	} // -----------------------------------------------------------------------------
	//  Public methods for specific settings
	// -----------------------------------------------------------------------------

	/**
	 * Set the rotation and distance of the camera
	 *
	 * @param {Object}  pos            An object with the camera position
	 * @param {number} [pos.horizontal] The horizontal rotation, between 0 and 2*PI.
	 *                                 Optional, can be left undefined.
	 * @param {number} [pos.vertical]  The vertical rotation, between 0 and 0.5*PI.
	 *                                 if vertical=0.5*PI, the graph is shown from
	 *                                 the top. Optional, can be left undefined.
	 * @param {number} [pos.distance]  The (normalized) distance of the camera to the
	 *                                 center of the graph, a value between 0.71 and
	 *                                 5.0. Optional, can be left undefined.
	 */


	Graph3d.prototype.setCameraPosition = function (pos) {
	  setCameraPosition(pos, this);
	  this.redraw();
	};
	/**
	 * Set a new size for the graph
	 *
	 * @param {string} width  Width in pixels or percentage (for example '800px'
	 *                        or '50%')
	 * @param {string} height Height in pixels or percentage  (for example '400px'
	 *                        or '30%')
	 */


	Graph3d.prototype.setSize = function (width, height) {
	  this._setSize(width, height);

	  this.redraw();
	}; // -----------------------------------------------------------------------------

	exports.DataSet = DataSet;
	exports.DataStream = DataStream;
	exports.DataView = DataView;
	exports.Graph3d = Graph3d;
	exports.Graph3dCamera = Camera;
	exports.Graph3dFilter = Filter;
	exports.Graph3dPoint2d = Point2d_1;
	exports.Graph3dPoint3d = Point3d_1;
	exports.Graph3dSlider = Slider;
	exports.Graph3dStepNumber = StepNumber_1;
	exports.Queue = Queue;
	exports.createNewDataPipeFrom = createNewDataPipeFrom;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vis-graph3d.js.map
