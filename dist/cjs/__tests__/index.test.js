'use strict'

var _interopRequireWildcard = require('@babel/runtime-corejs2/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime-corejs2/helpers/interopRequireDefault')

var _extends2 = _interopRequireDefault(
  require('@babel/runtime-corejs2/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime-corejs2/helpers/inheritsLoose')
)

require('core-js/modules/web.dom.iterable')

var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs2/core-js/promise')
)

var _react = _interopRequireWildcard(require('react'))

var _reactDom = _interopRequireDefault(require('react-dom'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _index = _interopRequireDefault(require('../index'))

var _immutable = _interopRequireDefault(require('immutable'))

var resolveLater = function resolveLater(result) {
  return new _promise.default(function(resolve) {
    return setTimeout(function() {
      resolve(result)
    }, 10)
  })
}

function _ref9(_ref2) {
  var children = _ref2.children
  return _react.default.createElement('div', null, children)
}

function _getData() {
  return typeof this.props.data === 'function'
    ? this.props.data()
    : this.props.data
}

function _ref10() {
  return resolveLater(1)
}

function _ref11() {
  return resolveLater(2)
}

function _ref12() {
  return resolveLater(5)
}

function _ref13() {
  return resolveLater(6)
}

function _ref14() {
  return resolveLater(4)
}

function _ref15() {
  return resolveLater(3)
}

function _getDerivedStateFromP(props, state) {
  return {
    foo: state.foo + 'bar',
  }
}

function _ref18() {
  return true
}

function _render3() {
  return 'foo'
}

function _ref19() {
  return true
}

function _getChildContext() {
  return {
    foo: 'val',
  }
}

function _ref21() {
  return true
}

function _ref24() {
  throw new Error('Expected error was not thrown')
}

function _ref26() {
  throw new Error('Expected error was not thrown')
}

function _getChildContext2() {
  var _this2 = this

  this.id = 0
  return {
    foo: {
      getNextId: function getNextId() {
        _this2.id += 1
        return _this2.id
      },
    },
  }
}

function _render6() {
  return this.props.children
}

function _ref28(_Component6) {
  ;(0, _inheritsLoose2.default)(Wrapper, _Component6)

  function Wrapper() {
    return _Component6.apply(this, arguments) || this
  }

  var _proto6 = Wrapper.prototype
  _proto6.getChildContext = _getChildContext2
  _proto6.render = _render6
  return Wrapper
}

function _ref29(resolve) {
  return setTimeout(resolve, 1000)
}

function _render7() {
  return this.resolved ? this.props.children : null
}

function _visitor(element, instance) {
  if (instance && typeof instance.getData === 'function') {
    return instance.getData()
  }

  return undefined
}

function _ref30(_ref) {
  var Component = _ref.Component,
    h = _ref.h
  var Stateless = jest.fn(_ref9)
  Stateless.contextTypes = {
    theContext: _propTypes.default.string.isRequired,
  }

  function _render() {
    return h('div', null, this.props.children)
  }

  var Stateful =
    /*#__PURE__*/
    (function(_Component) {
      ;(0, _inheritsLoose2.default)(Stateful, _Component)

      function Stateful() {
        return _Component.apply(this, arguments) || this
      }

      var _proto = Stateful.prototype
      _proto.getData = _getData
      _proto.render = _render
      return Stateful
    })(Component)

  var createTree = function createTree(_temp) {
    var _ref3 =
        _temp === void 0
          ? {
              async: false,
            }
          : _temp,
      async = _ref3.async

    var Foo = Stateful
    var Bob = Stateless
    return h('div', null, [
      h('h1', null, 'Hello World!'),
      h(Foo, {
        data: async ? _ref10 : 1,
      }),
      h(
        Foo,
        {
          data: async ? _ref11 : 2,
        },
        h('div', null, [
          h(
            Bob,
            null,
            h(Foo, {
              children: [
                h(Foo, {
                  data: async ? _ref12 : 5,
                }),
                h(Foo, {
                  data: async ? _ref13 : 6,
                }),
              ],
              data: async ? _ref14 : 4,
            })
          ),
          h('div', null, 'hi!'),
        ])
      ),
      h(Foo, {
        data: async ? _ref15 : 3,
      }),
    ])
  }

  it('simple sync visitor', function() {
    var actual = []

    var visitor = function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        var data = instance.getData()
        actual.push(data)
      }
    }

    return (0, _index.default)(createTree(), visitor).then(function() {
      var expected = [1, 2, 3, 4, 5, 6]
      expect(actual).toEqual(expected)
    })
  })
  it('promise based visitor', function() {
    var actual = []

    function _ref16(data) {
      actual.push(data)
      return true
    }

    var visitor = function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        return instance.getData().then(_ref16)
      }

      return true
    }

    return (0, _index.default)(
      createTree({
        async: true,
      }),
      visitor
    ).then(function() {
      var expected = [1, 2, 3, 4, 5, 6]
      expect(actual).toEqual(expected)
    })
  })
  it('promise based visitor stops resolving', function() {
    var actual = []

    function _ref17(data) {
      actual.push(data)
      return data !== 4
    }

    var visitor = function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        return instance.getData().then(_ref17)
      }

      return true
    }

    return (0, _index.default)(
      createTree({
        async: true,
      }),
      visitor
    ).then(function() {
      var expected = [1, 2, 3, 4]
      expect(actual).toEqual(expected)
    })
  })
  it('getDerivedStateFromProps', function() {
    var actual = {}

    function _render2() {
      actual = this.state
      return h('div', null, this.state.foo)
    }

    var Foo =
      /*#__PURE__*/
      (function(_Component2) {
        ;(0, _inheritsLoose2.default)(Foo, _Component2)

        function Foo(props) {
          var _this

          _this = _Component2.call(this, props) || this
          _this.state = {
            foo: 'foo',
          }
          return _this
        }

        Foo.getDerivedStateFromProps = _getDerivedStateFromP
        var _proto2 = Foo.prototype
        _proto2.render = _render2
        return Foo
      })(Component)

    return (0, _index.default)(
      h(Foo, {
        value: 'foo',
      }),
      _ref18
    ).then(function() {
      var expected = {
        foo: 'foobar',
      }
      expect(actual).toMatchObject(expected)
    })
  })
  it('calls componentWillUnmount', function() {
    var called = true

    function _componentWillUnmount() {
      called = true
    }

    var Foo =
      /*#__PURE__*/
      (function(_Component3) {
        ;(0, _inheritsLoose2.default)(Foo, _Component3)

        function Foo() {
          return _Component3.apply(this, arguments) || this
        }

        var _proto3 = Foo.prototype
        _proto3.componentWillUnmount = _componentWillUnmount
        _proto3.render = _render3
        return Foo
      })(Component)

    return (0, _index.default)(h(Foo), _ref19, null, {
      componentWillUnmount: true,
    }).then(function() {
      expect(called).toBeTruthy()
    })
  })

  function _render4() {
    return h('div', null, this.props.children)
  }

  function _ref20(_Component4) {
    ;(0, _inheritsLoose2.default)(Foo, _Component4)

    function Foo() {
      return _Component4.apply(this, arguments) || this
    }

    var _proto4 = Foo.prototype
    _proto4.getChildContext = _getChildContext
    _proto4.render = _render4
    return Foo
  }

  it('getChildContext', function() {
    var Foo =
      /*#__PURE__*/
      _ref20(Component)

    var actual

    function Bar(props, context) {
      actual = context
      return 'bar'
    }

    Bar.contextTypes = {
      foo: _propTypes.default.string.isRequired,
    }
    return (0, _index.default)(h(Foo, null, h(Bar)), _ref21).then(function() {
      var expected = {
        foo: 'val',
      }
      expect(actual).toMatchObject(expected)
    })
  })

  function _render5() {
    return h('div', null, [
      h(Stateful, {
        data: 1,
      }),
      h(Stateful, {
        data: 2,
      }),
    ])
  }

  function _ref22(_Component5) {
    ;(0, _inheritsLoose2.default)(Foo, _Component5)

    function Foo() {
      return _Component5.apply(this, arguments) || this
    }

    var _proto5 = Foo.prototype
    _proto5.render = _render5
    return Foo
  }

  it('works with instance-as-result component', function() {
    var Foo =
      /*#__PURE__*/
      _ref22(Component)

    var Bar = function Bar(props) {
      return new Foo(props)
    }

    var actual = []

    var visitor = function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        var data = instance.getData()
        actual.push(data)
      }
    }

    return (0, _index.default)(h(Bar), visitor).then(function() {
      var expected = [1, 2]
      expect(actual).toEqual(expected)
    })
  })

  function _ref25() {
    var tree = createTree({
      async: true,
    })
    var actual = []

    function _ref23(data) {
      actual.push(data)

      if (data === 4) {
        return _promise.default.reject(new Error('Visitor made 💩'))
      }

      return true
    }

    var visitor = function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        return instance.getData().then(_ref23)
      }

      return true
    }

    return (0, _index.default)(tree, visitor).then(_ref24, function(err) {
      expect(err).toMatchObject(new Error('Visitor made 💩'))
      expect(actual).toEqual([1, 2, 3, 4])
    })
  }

  function _ref27() {
    var tree = createTree()
    var actual = []

    var visitor = function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        var data = instance.getData()
        actual.push(data)

        if (data === 4) {
          throw new Error('Visitor made 💩')
        }
      }

      return true
    }

    return (0, _index.default)(tree, visitor).then(_ref26, function(err) {
      expect(err).toMatchObject(new Error('Visitor made 💩'))
      expect(actual).toEqual([1, 2, 3, 4])
    })
  }

  describe('error handling', function() {
    it('throws async visitor errors', _ref25)
    it('throws sync visitor errors', _ref27)
  })
  it('complex context configuration', function() {
    var Wrapper =
      /*#__PURE__*/
      _ref28(Component)

    var ids = []

    function _getData2() {
      var _this3 = this

      if (!this.context.foo) {
        return undefined
      }

      return new _promise.default(_ref29).then(function() {
        _this3.resolved = true
        ids.push(_this3.context.foo.getNextId())
      })
    }

    var Baz =
      /*#__PURE__*/
      (function(_Component7) {
        ;(0, _inheritsLoose2.default)(Baz, _Component7)

        function Baz() {
          return _Component7.apply(this, arguments) || this
        }

        var _proto7 = Baz.prototype
        _proto7.getData = _getData2
        _proto7.render = _render7
        return Baz
      })(Component)

    var visitor = _visitor
    var app = h(
      Wrapper,
      null,
      h('div', null, h(Baz, null, h('div', null, [h(Baz), h(Baz), h(Baz)])))
    )
    return (0, _index.default)(app, visitor).then(function() {
      expect(ids).toEqual([1, 2, 3, 4])
    })
  })
}

function _ref31() {
  ;[
    {
      Component: _react.Component,
      h: _react.createElement,
    },
  ].forEach(_ref30)
}

function Foo(props) {
  return props.children
}

function _identity(x) {
  return x
}

function _ref32(_ref5) {
  var message = _ref5.message,
    identity = _ref5.identity
  return message + ': ' + identity('Hello world 1')
}

function _identity2(x) {
  return x
}

function _ref34() {
  var _React$createContext = _react.default.createContext(),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer

  function _ref33(_ref4) {
    var message = _ref4.message,
      identity = _ref4.identity
    return _react.default.createElement(
      'strong',
      null,
      _react.default.createElement(
        'i',
        null,
        message + ': ' + identity('Hello world 2')
      ),
      _react.default.createElement(
        Provider,
        {
          value: {
            message: 'Message first',
            identity: _identity,
          },
        },
        _react.default.createElement(Consumer, null, _ref32)
      )
    )
  }

  var Elsewhere = function Elsewhere() {
    return _react.default.createElement(Consumer, null, _ref33)
  }

  var tree = _react.default.createElement(
    Provider,
    {
      value: {
        message: 'Message second',
        identity: _identity2,
      },
    },
    'bar',
    _react.default.createElement(Foo, null, 'foo'),
    _react.default.createElement(Elsewhere, null)
  )

  var elements = []
  return (0, _index.default)(tree, function(element) {
    elements.push(element)
  }).then(function() {
    expect(elements.pop()).toBe('Message first: Hello world 1')
    expect(elements.pop()).toBe('Message second: Hello world 2')
    expect(elements.pop().type).toBe(Provider)
    expect(elements.pop().type).toBe('i')
    expect(elements.pop().type).toBe('strong')
    expect(elements.pop()).toBe('foo')
    expect(elements.pop().type).toBe(Elsewhere)
    expect(elements.pop().type).toBe(Foo)
    expect(elements.pop()).toBe('bar')
  })
}

function _ref35(state, props) {
  return {
    other: 'I am ' + props.value + ' ' + state.foo,
  }
}

function _componentWillMount() {
  this.setState({
    foo: 'bar',
  })
  this.setState(_ref35)
}

function _ref36() {
  return true
}

function _ref37() {
  var actual = {}

  function _render8() {
    actual = this.state
    return _react.default.createElement('div', null, this.state.foo)
  }

  var Foo =
    /*#__PURE__*/
    (function(_React$Component) {
      ;(0, _inheritsLoose2.default)(Foo, _React$Component)

      function Foo(props) {
        var _this4

        _this4 = _React$Component.call(this, props) || this
        _this4.state = {
          foo: 'foo',
        }
        return _this4
      }

      var _proto8 = Foo.prototype
      _proto8.componentWillMount = _componentWillMount
      _proto8.render = _render8
      return Foo
    })(_react.default.Component)

  return (0, _index.default)(
    _react.default.createElement(Foo, {
      value: 'foo',
    }),
    _ref36
  ).then(function() {
    var expected = {
      foo: 'bar',
      other: 'I am foo bar',
    }
    expect(actual).toMatchObject(expected)
  })
}

function _UNSAFE_componentWill() {
  this.setState({
    foo: 'bar',
  })
}

function _ref38() {
  return true
}

function _ref39() {
  var actual = {}

  function _render9() {
    actual = this.state
    return _react.default.createElement('div', null, this.state.foo)
  }

  var Foo =
    /*#__PURE__*/
    (function(_React$Component2) {
      ;(0, _inheritsLoose2.default)(Foo, _React$Component2)

      function Foo(props) {
        var _this5

        _this5 = _React$Component2.call(this, props) || this
        _this5.state = {
          foo: 'foo',
        }
        return _this5
      }

      var _proto9 = Foo.prototype
      _proto9.UNSAFE_componentWillMount = _UNSAFE_componentWill
      _proto9.render = _render9
      return Foo
    })(_react.default.Component)

  return (0, _index.default)(
    _react.default.createElement(Foo, {
      value: 'foo',
    }),
    _ref38
  ).then(function() {
    var expected = {
      foo: 'bar',
    }
    expect(actual).toMatchObject(expected)
  })
}

function _getData3() {
  return this.props.data
}

function _render10() {
  return 'foo'
}

function _ref40(_ReactComponent) {
  ;(0, _inheritsLoose2.default)(Foo, _ReactComponent)

  function Foo() {
    return _ReactComponent.apply(this, arguments) || this
  }

  var _proto10 = Foo.prototype
  _proto10.getData = _getData3
  _proto10.render = _render10
  return Foo
}

function _ref41() {
  var Foo =
    /*#__PURE__*/
    _ref40(_react.Component)

  var _ref6 =
    /*#__PURE__*/
    _react.default.createElement(
      'div',
      null,
      _react.default.createElement(Foo, {
        data: 1,
      }),
      _react.default.createElement(Foo, {
        data: 2,
      })
    )

  function Baz() {
    return _reactDom.default.createPortal(_ref6, document.createElement('div'))
  }

  var actual = []

  var visitor = function visitor(element, instance) {
    if (instance && typeof instance.getData === 'function') {
      var data = instance.getData()
      actual.push(data)
    }
  }

  return (0, _index.default)(
    _react.default.createElement(Baz, null),
    visitor
  ).then(function() {
    var expected = [1, 2]
    expect(actual).toEqual(expected)
  })
}

function _getData4() {
  return this.props.data
}

function _render11() {
  return 'foo'
}

function _ref42(_ReactComponent2) {
  ;(0, _inheritsLoose2.default)(Foo, _ReactComponent2)

  function Foo() {
    return _ReactComponent2.apply(this, arguments) || this
  }

  var _proto11 = Foo.prototype
  _proto11.getData = _getData4
  _proto11.render = _render11
  return Foo
}

function _ref43() {
  var Foo =
    /*#__PURE__*/
    _ref42(_react.Component)

  var _ref7 =
    /*#__PURE__*/
    _react.default.createElement(Foo, {
      data: 1,
      key: 1,
    })

  var _ref8 =
    /*#__PURE__*/
    _react.default.createElement(Foo, {
      data: 2,
      key: 2,
    })

  function Baz() {
    return _reactDom.default.createPortal(
      _react.default.createElement(
        'div',
        null,
        _immutable.default.List([_ref7, _ref8])
      ),
      document.createElement('div')
    )
  }

  var actual = []

  var visitor = function visitor(element, instance) {
    if (instance && typeof instance.getData === 'function') {
      var data = instance.getData()
      actual.push(data)
    }
  }

  return (0, _index.default)(
    _react.default.createElement(Baz, null),
    visitor
  ).then(function() {
    var expected = [1, 2]
    expect(actual).toEqual(expected)
  })
}

function Foo(props) {
  return props.children
}

function _ref44(props, ref) {
  return _react.default.createElement(
    Foo,
    (0, _extends2.default)(
      {
        ref: ref,
      },
      props
    )
  )
}

function _ref45() {
  var Bar = _react.default.forwardRef(_ref44)

  var ref = _react.default.createRef()

  var tree = _react.default.createElement(
    Bar,
    {
      ref: ref,
    },
    'foo'
  )

  var elements = []
  return (0, _index.default)(tree, function(element) {
    elements.push(element)
  }).then(function() {
    expect(elements.pop()).toBe('foo')
    expect(elements.pop().type).toBe(Foo)
    expect(elements.pop().type).toBe(Bar)
  })
}

function _ref46(props) {
  return _react.default.createElement('div', null, props.children)
}

function _ref47() {
  var Foo = _react.default.memo(_ref46)

  var tree = _react.default.createElement(Foo, null, 'foo')

  var elements = []
  return (0, _index.default)(tree, function(element) {
    elements.push(element)
  }).then(function() {
    expect(elements.pop()).toBe('foo')
    expect(elements.pop().type).toBe(Foo)
  })
}

function _Foo() {
  return null
}

function _ref48() {
  var Foo = _Foo

  var tree = _react.default.createElement(Foo, null)

  var elements = []
  return (0, _index.default)(tree, function(element) {
    elements.push(element)
  }).then(function() {
    expect(elements.pop().type).toBe(Foo)
  })
}

function Foo(props) {
  return _immutable.default.List([1, 2, 3])
}

function _ref49() {
  var tree = _react.default.createElement(Foo, null)

  var elements = []
  return (0, _index.default)(tree, function(element) {
    elements.push(element)
  }).then(function() {
    expect(elements.pop()).toBe(3)
    expect(elements.pop()).toBe(2)
    expect(elements.pop()).toBe(1)
  })
}

function Foo(props) {
  return [1, 2, 3]
}

function _ref50() {
  var tree = _react.default.createElement(Foo, null)

  var elements = []
  return (0, _index.default)(tree, function(element) {
    elements.push(element)
  }).then(function() {
    expect(elements.pop()).toBe(3)
    expect(elements.pop()).toBe(2)
    expect(elements.pop()).toBe(1)
  })
}

function _ref51() {
  it('supports new context API', _ref34)
  it('componentWillMount & setState', _ref37)
  it('UNSAFE_componentWillMount', _ref39)
  it('supports portals', _ref41)
  it('supports iterable portals', _ref43)
  it('supports forwardRef', _ref45)
  it('supports memo', _ref47)
  it('supports null', _ref48)
  it('supports iterable functions', _ref49)
  it('supports arrays', _ref50)
}

describe('reactTreeWalker', function() {
  describe('react', _ref31)
  describe('react', _ref51)
})
