'use strict'

var _interopRequireDefault = require('@babel/runtime-corejs2/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = reactTreeWalker
exports.REACT_FORWARD_REF_TYPE = exports.REACT_CONTEXT_TYPE = exports.REACT_PROVIDER_TYPE = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime-corejs2/helpers/extends')
)

var _regenerator = _interopRequireDefault(
  require('@babel/runtime-corejs2/regenerator')
)

var _getIterator2 = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/get-iterator')
)

require('core-js/modules/web.dom.iterable')

require('core-js/modules/es6.array.iterator')

require('core-js/modules/es6.string.iterator')

require('regenerator-runtime/runtime')

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime-corejs2/helpers/asyncToGenerator')
)

var _map = _interopRequireDefault(require('@babel/runtime-corejs2/core-js/map'))

var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/promise')
)

var _isArray4 = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/array/is-array')
)

var _iterator4 = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/symbol/iterator')
)

var _for = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/symbol/for')
)

var _symbol = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/symbol')
)

// Inspired by the awesome work by the Apollo team: 😘
// https://github.com/apollographql/react-apollo/blob/master/src/getDataFromTree.ts
//
// This version has been adapted to be Promise based.
var defaultOpt = {
  componentWillUnmount: false,
}
var hasSymbol = typeof _symbol.default === 'function' && _for.default
var REACT_PROVIDER_TYPE = hasSymbol
  ? (0, _for.default)('react.provider')
  : 0xeacd
exports.REACT_PROVIDER_TYPE = REACT_PROVIDER_TYPE
var REACT_CONTEXT_TYPE = hasSymbol ? (0, _for.default)('react.context') : 0xeace
exports.REACT_CONTEXT_TYPE = REACT_CONTEXT_TYPE
var REACT_FORWARD_REF_TYPE = hasSymbol
  ? (0, _for.default)('react.forward_ref')
  : 0xead0
exports.REACT_FORWARD_REF_TYPE = REACT_FORWARD_REF_TYPE
var MAYBE_ITERATOR_SYMBOL =
  typeof _symbol.default === 'function' && _iterator4.default

var isIterator = function isIterator(maybeIterable) {
  if ((0, _isArray4.default)(maybeIterable)) {
    return true
  }

  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return false
  }

  var maybeIterator =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable['@@iterator']
  return typeof maybeIterator === 'function'
}

var ensureChild = function ensureChild(child) {
  return child !== void 0 &&
    child !== null &&
    typeof child.render === 'function'
    ? ensureChild(child.render())
    : child
}

var isForwardRef = function isForwardRef(Comp) {
  return Comp.type !== void 0 && Comp.type.$$typeof === REACT_FORWARD_REF_TYPE
} // const isMemo = Comp =>
// Recurse a React Element tree, running the provided visitor against each element.
// If a visitor call returns `false` then we will not recurse into the respective
// elements children.

function reactTreeWalker(tree, visitor, context, options) {
  if (options === void 0) {
    options = defaultOpt
  }

  return new _promise.default(function(resolve, reject) {
    recursive(tree, context, new _map.default()).then(resolve, reject)

    function recursive(_x, _x2, _x3) {
      return _recursive.apply(this, arguments)
    }

    function _callee4(currentElement, currentContext, newContext) {
      var items,
        _iterator,
        _isArray,
        _i,
        _ref,
        el,
        typeOfElement,
        value,
        provider,
        visitCurrentElement,
        Component,
        props,
        instance,
        _result,
        childContext,
        result,
        children,
        elChildren,
        _iterator3,
        _isArray3,
        _i3,
        _ref4,
        _el

      function _callee3(render, compInstance, elContext, childContext) {
        var result,
          tempChildren,
          children,
          out,
          _iterator2,
          _isArray2,
          _i2,
          _ref3,
          child

        return _regenerator.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0
                  _context.next = 3
                  return visitor(
                    currentElement,
                    compInstance,
                    newContext,
                    elContext,
                    childContext
                  )

                case 3:
                  result = _context.sent
                  _context.next = 9
                  break

                case 6:
                  _context.prev = 6
                  _context.t0 = _context['catch'](0)
                  reject(_context.t0)

                case 9:
                  if (!(result !== false)) {
                    _context.next = 32
                    break
                  }

                  // A false wasn't returned so we will attempt to visit the children
                  // for the current element.
                  tempChildren = render()
                  children = ensureChild(tempChildren)

                  if (!(children !== null && children !== void 0)) {
                    _context.next = 32
                    break
                  }

                  if (!(isIterator(children) === true)) {
                    _context.next = 31
                    break
                  }

                  out = []
                  ;(_iterator2 = children),
                    (_isArray2 = (0, _isArray4.default)(_iterator2)),
                    (_i2 = 0),
                    (_iterator2 = _isArray2
                      ? _iterator2
                      : (0, _getIterator2.default)(_iterator2))

                case 16:
                  if (!_isArray2) {
                    _context.next = 22
                    break
                  }

                  if (!(_i2 >= _iterator2.length)) {
                    _context.next = 19
                    break
                  }

                  return _context.abrupt('break', 30)

                case 19:
                  _ref3 = _iterator2[_i2++]
                  _context.next = 26
                  break

                case 22:
                  _i2 = _iterator2.next()

                  if (!_i2.done) {
                    _context.next = 25
                    break
                  }

                  return _context.abrupt('break', 30)

                case 25:
                  _ref3 = _i2.value

                case 26:
                  child = _ref3
                  out.push(
                    child !== null && child !== void 0
                      ? recursive(child, childContext, newContext)
                      : void 0
                  )

                case 28:
                  _context.next = 16
                  break

                case 30:
                  return _context.abrupt(
                    'return',
                    _promise.default.all(out).catch(reject)
                  )

                case 31:
                  return _context.abrupt(
                    'return',
                    recursive(children, childContext, newContext).catch(reject)
                  )

                case 32:
                case 'end':
                  return _context.stop()
              }
            }
          },
          _callee3,
          this,
          [[0, 6]]
        )
      }

      function _ref5() {
        var _ref2 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(_callee3)
        )

        return function visitCurrentElement(_x4, _x5, _x6, _x7) {
          return _ref2.apply(this, arguments)
        }
      }

      function _ref6() {
        return currentElement.type.render(props)
      }

      function _ref7(newState) {
        if (typeof newState === 'function') {
          // eslint-disable-next-line no-param-reassign
          newState = newState(instance.state, instance.props, instance.context)
        }

        instance.state = (0, _extends2.default)({}, instance.state, newState)
      }

      function _ref8() {
        return instance.render(instance.props)
      }

      function _ref9() {
        return Component(props, currentContext)
      }

      function _ref10() {
        return currentElement.props.children
      }

      return _regenerator.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                if (!(isIterator(currentElement) === true)) {
                  _context2.next = 18
                  break
                }

                items = []
                ;(_iterator = currentElement),
                  (_isArray = (0, _isArray4.default)(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator2.default)(_iterator))

              case 3:
                if (!_isArray) {
                  _context2.next = 9
                  break
                }

                if (!(_i >= _iterator.length)) {
                  _context2.next = 6
                  break
                }

                return _context2.abrupt('break', 17)

              case 6:
                _ref = _iterator[_i++]
                _context2.next = 13
                break

              case 9:
                _i = _iterator.next()

                if (!_i.done) {
                  _context2.next = 12
                  break
                }

                return _context2.abrupt('break', 17)

              case 12:
                _ref = _i.value

              case 13:
                el = _ref
                items.push(recursive(el, currentContext, newContext))

              case 15:
                _context2.next = 3
                break

              case 17:
                return _context2.abrupt('return', _promise.default.all(items))

              case 18:
                if (!(currentElement === void 0 || currentElement === null)) {
                  _context2.next = 20
                  break
                }

                return _context2.abrupt('return')

              case 20:
                typeOfElement = typeof currentElement

                if (
                  !(typeOfElement === 'string' || typeOfElement === 'number')
                ) {
                  _context2.next = 30
                  break
                }

                _context2.prev = 22
                visitor(currentElement, null, newContext, currentContext)
                return _context2.abrupt('return')

              case 27:
                _context2.prev = 27
                _context2.t0 = _context2['catch'](22)
                reject(_context2.t0)

              case 30:
                if (!(currentElement.type !== void 0)) {
                  _context2.next = 71
                  break
                }

                if (
                  // isProvider
                  currentElement.type !== void 0 &&
                  currentElement.type.$$typeof === REACT_PROVIDER_TYPE
                ) {
                  newContext = new _map.default(newContext)
                  newContext.set(
                    currentElement.type,
                    currentElement.props.value
                  )
                }

                if (
                  !// isConsumer
                  (
                    currentElement.type !== void 0 &&
                    currentElement.type.$$typeof === REACT_CONTEXT_TYPE
                  )
                ) {
                  _context2.next = 37
                  break
                }

                value = currentElement.type._currentValue
                provider = currentElement.type._context
                  ? currentElement.type._context.Provider
                  : currentElement.type.Provider

                if (newContext.has(provider)) {
                  value = newContext.get(provider)
                }

                return _context2.abrupt(
                  'return',
                  recursive(
                    currentElement.props.children(value),
                    currentContext,
                    newContext
                  )
                )

              case 37:
                visitCurrentElement =
                  /*#__PURE__*/
                  _ref5()

                if (
                  !(
                    typeof currentElement.type === 'function' ||
                    isForwardRef(currentElement)
                  )
                ) {
                  _context2.next = 70
                  break
                }

                Component = currentElement.type
                props = (0, _extends2.default)(
                  {},
                  Component.defaultProps,
                  currentElement.props
                )

                if (!isForwardRef(currentElement)) {
                  _context2.next = 45
                  break
                }

                return _context2.abrupt(
                  'return',
                  visitCurrentElement(
                    _ref6,
                    null,
                    currentContext,
                    currentContext
                  )
                )

              case 45:
                if (
                  !// isClassComponent
                  (
                    Component.prototype &&
                    (Component.prototype.render !== void 0 ||
                      Component.prototype.isReactComponent !== void 0 ||
                      Component.prototype.isPureReactComponent !== void 0)
                  )
                ) {
                  _context2.next = 67
                  break
                }

                // Class component
                instance = new Component(props, currentContext) // In case the user doesn't pass these to super in the constructor

                Object.defineProperty(instance, 'props', {
                  value: instance.props || props,
                })
                instance.context = instance.context || currentContext // set the instance state to null (not undefined) if not set,
                // to match React behaviour

                instance.state = instance.state || null // Make the setState synchronous.

                instance.setState = _ref7

                if (Component.getDerivedStateFromProps) {
                  _result = Component.getDerivedStateFromProps(
                    instance.props,
                    instance.state
                  )

                  if (_result !== null) {
                    instance.state = (0, _extends2.default)(
                      {},
                      instance.state,
                      _result
                    )
                  }
                }

                childContext =
                  typeof instance.getChildContext === 'function'
                    ? (0, _extends2.default)(
                        {},
                        currentContext,
                        instance.getChildContext()
                      )
                    : currentContext

                if (instance.componentWillMount !== void 0) {
                  instance.componentWillMount()
                } else if (instance.UNSAFE_componentWillMount !== void 0) {
                  instance.UNSAFE_componentWillMount()
                }

                _context2.prev = 54
                _context2.next = 57
                return visitCurrentElement(
                  _ref8,
                  instance,
                  currentContext,
                  childContext
                )

              case 57:
                result = _context2.sent
                _context2.next = 63
                break

              case 60:
                _context2.prev = 60
                _context2.t1 = _context2['catch'](54)
                reject(_context2.t1)

              case 63:
                if (
                  options.componentWillUnmount === true &&
                  instance.componentWillUnmount !== void 0
                ) {
                  instance.componentWillUnmount()
                }

                return _context2.abrupt('return', result)

              case 67:
                return _context2.abrupt(
                  'return',
                  visitCurrentElement(
                    _ref9,
                    null,
                    currentContext,
                    currentContext
                  )
                )

              case 68:
                _context2.next = 71
                break

              case 70:
                return _context2.abrupt(
                  'return',
                  visitCurrentElement(
                    _ref10,
                    null,
                    currentContext,
                    currentContext
                  )
                )

              case 71:
                if (
                  !(
                    currentElement.containerInfo !== void 0 &&
                    currentElement.children !== void 0 &&
                    currentElement.children.props !== void 0 &&
                    isIterator(currentElement.children.props.children) === true
                  )
                ) {
                  _context2.next = 90
                  break
                }

                children = []
                elChildren = currentElement.children.props.children
                ;(_iterator3 = elChildren),
                  (_isArray3 = (0, _isArray4.default)(_iterator3)),
                  (_i3 = 0),
                  (_iterator3 = _isArray3
                    ? _iterator3
                    : (0, _getIterator2.default)(_iterator3))

              case 75:
                if (!_isArray3) {
                  _context2.next = 81
                  break
                }

                if (!(_i3 >= _iterator3.length)) {
                  _context2.next = 78
                  break
                }

                return _context2.abrupt('break', 89)

              case 78:
                _ref4 = _iterator3[_i3++]
                _context2.next = 85
                break

              case 81:
                _i3 = _iterator3.next()

                if (!_i3.done) {
                  _context2.next = 84
                  break
                }

                return _context2.abrupt('break', 89)

              case 84:
                _ref4 = _i3.value

              case 85:
                _el = _ref4
                children.push(recursive(_el, currentContext, newContext))

              case 87:
                _context2.next = 75
                break

              case 89:
                return _context2.abrupt(
                  'return',
                  _promise.default.all(children).catch(reject)
                )

              case 90:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee4,
        this,
        [[22, 27], [54, 60]]
      )
    }

    function _recursive() {
      _recursive = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(_callee4)
      )
      return _recursive.apply(this, arguments)
    }
  })
}
