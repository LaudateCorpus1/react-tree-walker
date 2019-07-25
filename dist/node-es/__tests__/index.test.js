function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  return _extends.apply(this, arguments)
}

import React, {
  createElement as reactCreateElement,
  Component as ReactComponent,
} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import reactTreeWalker from '../index'
import Immutable from 'immutable'

const resolveLater = result =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(result)
    }, 10)
  )

function _ref4({children}) {
  return React.createElement('div', null, children)
}

function _ref5() {
  return resolveLater(1)
}

function _ref6() {
  return resolveLater(2)
}

function _ref7() {
  return resolveLater(5)
}

function _ref8() {
  return resolveLater(6)
}

function _ref9() {
  return resolveLater(4)
}

function _ref10() {
  return resolveLater(3)
}

function _ref13() {
  return true
}

function _ref14() {
  return true
}

function _ref15() {
  return true
}

function _ref17() {
  throw new Error('Expected error was not thrown')
}

function _ref19() {
  throw new Error('Expected error was not thrown')
}

function _ref21(resolve) {
  return setTimeout(resolve, 1000)
}

function _ref22(element, instance) {
  if (instance && typeof instance.getData === 'function') {
    return instance.getData()
  }

  return undefined
}

function _ref23({Component, h}) {
  const Stateless = jest.fn(_ref4)
  Stateless.contextTypes = {
    theContext: PropTypes.string.isRequired,
  }

  class Stateful extends Component {
    getData() {
      return typeof this.props.data === 'function'
        ? this.props.data()
        : this.props.data
    }

    render() {
      return h('div', null, this.props.children)
    }
  }

  const createTree = (
    {async} = {
      async: false,
    }
  ) => {
    const Foo = Stateful
    const Bob = Stateless
    return h('div', null, [
      h('h1', null, 'Hello World!'),
      h(Foo, {
        data: async ? _ref5 : 1,
      }),
      h(
        Foo,
        {
          data: async ? _ref6 : 2,
        },
        h('div', null, [
          h(
            Bob,
            null,
            h(Foo, {
              children: [
                h(Foo, {
                  data: async ? _ref7 : 5,
                }),
                h(Foo, {
                  data: async ? _ref8 : 6,
                }),
              ],
              data: async ? _ref9 : 4,
            })
          ),
          h('div', null, 'hi!'),
        ])
      ),
      h(Foo, {
        data: async ? _ref10 : 3,
      }),
    ])
  }

  it('simple sync visitor', () => {
    const actual = []

    const visitor = (element, instance) => {
      if (instance && typeof instance.getData === 'function') {
        const data = instance.getData()
        actual.push(data)
      }
    }

    return reactTreeWalker(createTree(), visitor).then(() => {
      const expected = [1, 2, 3, 4, 5, 6]
      expect(actual).toEqual(expected)
    })
  })
  it('promise based visitor', () => {
    const actual = []

    function _ref11(data) {
      actual.push(data)
      return true
    }

    const visitor = (element, instance) => {
      if (instance && typeof instance.getData === 'function') {
        return instance.getData().then(_ref11)
      }

      return true
    }

    return reactTreeWalker(
      createTree({
        async: true,
      }),
      visitor
    ).then(() => {
      const expected = [1, 2, 3, 4, 5, 6]
      expect(actual).toEqual(expected)
    })
  })
  it('promise based visitor stops resolving', () => {
    const actual = []

    function _ref12(data) {
      actual.push(data)
      return data !== 4
    }

    const visitor = (element, instance) => {
      if (instance && typeof instance.getData === 'function') {
        return instance.getData().then(_ref12)
      }

      return true
    }

    return reactTreeWalker(
      createTree({
        async: true,
      }),
      visitor
    ).then(() => {
      const expected = [1, 2, 3, 4]
      expect(actual).toEqual(expected)
    })
  })
  it('getDerivedStateFromProps', () => {
    let actual = {}

    class Foo extends Component {
      constructor(props) {
        super(props)
        this.state = {
          foo: 'foo',
        }
      }

      static getDerivedStateFromProps(props, state) {
        return {
          foo: `${state.foo}bar`,
        }
      }

      render() {
        actual = this.state
        return h('div', null, this.state.foo)
      }
    }

    return reactTreeWalker(
      h(Foo, {
        value: 'foo',
      }),
      _ref13
    ).then(() => {
      const expected = {
        foo: 'foobar',
      }
      expect(actual).toMatchObject(expected)
    })
  })
  it('calls componentWillUnmount', () => {
    let called = true

    class Foo extends Component {
      componentWillUnmount() {
        called = true
      }

      render() {
        return 'foo'
      }
    }

    return reactTreeWalker(h(Foo), _ref14, null, {
      componentWillUnmount: true,
    }).then(() => {
      expect(called).toBeTruthy()
    })
  })
  it('getChildContext', () => {
    class Foo extends Component {
      getChildContext() {
        return {
          foo: 'val',
        }
      }

      render() {
        return h('div', null, this.props.children)
      }
    }

    let actual

    function Bar(props, context) {
      actual = context
      return 'bar'
    }

    Bar.contextTypes = {
      foo: PropTypes.string.isRequired,
    }
    return reactTreeWalker(h(Foo, null, h(Bar)), _ref15).then(() => {
      const expected = {
        foo: 'val',
      }
      expect(actual).toMatchObject(expected)
    })
  })
  it('works with instance-as-result component', () => {
    class Foo extends Component {
      render() {
        return h('div', null, [
          h(Stateful, {
            data: 1,
          }),
          h(Stateful, {
            data: 2,
          }),
        ])
      }
    }

    const Bar = props => new Foo(props)

    const actual = []

    const visitor = (element, instance) => {
      if (instance && typeof instance.getData === 'function') {
        const data = instance.getData()
        actual.push(data)
      }
    }

    return reactTreeWalker(h(Bar), visitor).then(() => {
      const expected = [1, 2]
      expect(actual).toEqual(expected)
    })
  })

  function _ref18() {
    const tree = createTree({
      async: true,
    })
    const actual = []

    function _ref16(data) {
      actual.push(data)

      if (data === 4) {
        return Promise.reject(new Error('Visitor made 💩'))
      }

      return true
    }

    const visitor = (element, instance) => {
      if (instance && typeof instance.getData === 'function') {
        return instance.getData().then(_ref16)
      }

      return true
    }

    return reactTreeWalker(tree, visitor).then(_ref17, err => {
      expect(err).toMatchObject(new Error('Visitor made 💩'))
      expect(actual).toEqual([1, 2, 3, 4])
    })
  }

  function _ref20() {
    const tree = createTree()
    const actual = []

    const visitor = (element, instance) => {
      if (instance && typeof instance.getData === 'function') {
        const data = instance.getData()
        actual.push(data)

        if (data === 4) {
          throw new Error('Visitor made 💩')
        }
      }

      return true
    }

    return reactTreeWalker(tree, visitor).then(_ref19, err => {
      expect(err).toMatchObject(new Error('Visitor made 💩'))
      expect(actual).toEqual([1, 2, 3, 4])
    })
  }

  describe('error handling', () => {
    it('throws async visitor errors', _ref18)
    it('throws sync visitor errors', _ref20)
  })
  it('complex context configuration', () => {
    class Wrapper extends Component {
      getChildContext() {
        this.id = 0
        return {
          foo: {
            getNextId: () => {
              this.id += 1
              return this.id
            },
          },
        }
      }

      render() {
        return this.props.children
      }
    }

    const ids = []

    class Baz extends Component {
      getData() {
        if (!this.context.foo) {
          return undefined
        }

        return new Promise(_ref21).then(() => {
          this.resolved = true
          ids.push(this.context.foo.getNextId())
        })
      }

      render() {
        return this.resolved ? this.props.children : null
      }
    }

    const visitor = _ref22
    const app = h(
      Wrapper,
      null,
      h('div', null, h(Baz, null, h('div', null, [h(Baz), h(Baz), h(Baz)])))
    )
    return reactTreeWalker(app, visitor).then(() => {
      expect(ids).toEqual([1, 2, 3, 4])
    })
  })
}

function _ref24() {
  ;[
    {
      Component: ReactComponent,
      h: reactCreateElement,
    },
  ].forEach(_ref23)
}

function Foo(props) {
  return props.children
}

function _ref25(x) {
  return x
}

function _ref26({message, identity}) {
  return `${message}: ${identity('Hello world 1')}`
}

function _ref28(x) {
  return x
}

function _ref29() {
  const {Provider, Consumer} = React.createContext()

  function _ref27({message, identity}) {
    return React.createElement(
      'strong',
      null,
      React.createElement(
        'i',
        null,
        `${message}: ${identity('Hello world 2')}`
      ),
      React.createElement(
        Provider,
        {
          value: {
            message: 'Message first',
            identity: _ref25,
          },
        },
        React.createElement(Consumer, null, _ref26)
      )
    )
  }

  const Elsewhere = () => {
    return React.createElement(Consumer, null, _ref27)
  }

  const tree = React.createElement(
    Provider,
    {
      value: {
        message: 'Message second',
        identity: _ref28,
      },
    },
    'bar',
    React.createElement(Foo, null, 'foo'),
    React.createElement(Elsewhere, null)
  )
  const elements = []
  return reactTreeWalker(tree, element => {
    elements.push(element)
  }).then(() => {
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

function _ref30(state, props) {
  return {
    other: `I am ${props.value} ${state.foo}`,
  }
}

function _ref31() {
  return true
}

function _ref32() {
  let actual = {}

  class Foo extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        foo: 'foo',
      }
    }

    componentWillMount() {
      this.setState({
        foo: 'bar',
      })
      this.setState(_ref30)
    }

    render() {
      actual = this.state
      return React.createElement('div', null, this.state.foo)
    }
  }

  return reactTreeWalker(
    React.createElement(Foo, {
      value: 'foo',
    }),
    _ref31
  ).then(() => {
    const expected = {
      foo: 'bar',
      other: 'I am foo bar',
    }
    expect(actual).toMatchObject(expected)
  })
}

function _ref33() {
  return true
}

function _ref34() {
  let actual = {}

  class Foo extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        foo: 'foo',
      }
    }

    UNSAFE_componentWillMount() {
      this.setState({
        foo: 'bar',
      })
    }

    render() {
      actual = this.state
      return React.createElement('div', null, this.state.foo)
    }
  }

  return reactTreeWalker(
    React.createElement(Foo, {
      value: 'foo',
    }),
    _ref33
  ).then(() => {
    const expected = {
      foo: 'bar',
    }
    expect(actual).toMatchObject(expected)
  })
}

function _ref35() {
  class Foo extends ReactComponent {
    getData() {
      return this.props.data
    }

    render() {
      return 'foo'
    }
  }

  var _ref =
    /*#__PURE__*/
    React.createElement(
      'div',
      null,
      React.createElement(Foo, {
        data: 1,
      }),
      React.createElement(Foo, {
        data: 2,
      })
    )

  function Baz() {
    return ReactDOM.createPortal(_ref, document.createElement('div'))
  }

  const actual = []

  const visitor = (element, instance) => {
    if (instance && typeof instance.getData === 'function') {
      const data = instance.getData()
      actual.push(data)
    }
  }

  return reactTreeWalker(React.createElement(Baz, null), visitor).then(() => {
    const expected = [1, 2]
    expect(actual).toEqual(expected)
  })
}

function _ref36() {
  class Foo extends ReactComponent {
    getData() {
      return this.props.data
    }

    render() {
      return 'foo'
    }
  }

  var _ref2 =
    /*#__PURE__*/
    React.createElement(Foo, {
      data: 1,
      key: 1,
    })

  var _ref3 =
    /*#__PURE__*/
    React.createElement(Foo, {
      data: 2,
      key: 2,
    })

  function Baz() {
    return ReactDOM.createPortal(
      React.createElement('div', null, Immutable.List([_ref2, _ref3])),
      document.createElement('div')
    )
  }

  const actual = []

  const visitor = (element, instance) => {
    if (instance && typeof instance.getData === 'function') {
      const data = instance.getData()
      actual.push(data)
    }
  }

  return reactTreeWalker(React.createElement(Baz, null), visitor).then(() => {
    const expected = [1, 2]
    expect(actual).toEqual(expected)
  })
}

function Foo(props) {
  return props.children
}

function _ref37(props, ref) {
  return React.createElement(
    Foo,
    _extends(
      {
        ref: ref,
      },
      props
    )
  )
}

function _ref38() {
  const Bar = React.forwardRef(_ref37)
  const ref = React.createRef()
  const tree = React.createElement(
    Bar,
    {
      ref: ref,
    },
    'foo'
  )
  const elements = []
  return reactTreeWalker(tree, element => {
    elements.push(element)
  }).then(() => {
    expect(elements.pop()).toBe('foo')
    expect(elements.pop().type).toBe(Foo)
    expect(elements.pop().type).toBe(Bar)
  })
}

function _ref39(props) {
  return React.createElement('div', null, props.children)
}

function _ref40() {
  const Foo = React.memo(_ref39)
  const tree = React.createElement(Foo, null, 'foo')
  const elements = []
  return reactTreeWalker(tree, element => {
    elements.push(element)
  }).then(() => {
    expect(elements.pop()).toBe('foo')
    expect(elements.pop().type).toBe(Foo)
  })
}

function _ref41() {
  return null
}

function _ref42() {
  const Foo = _ref41
  const tree = React.createElement(Foo, null)
  const elements = []
  return reactTreeWalker(tree, element => {
    elements.push(element)
  }).then(() => {
    expect(elements.pop().type).toBe(Foo)
  })
}

function Foo(props) {
  return Immutable.List([1, 2, 3])
}

function _ref43() {
  const tree = React.createElement(Foo, null)
  const elements = []
  return reactTreeWalker(tree, element => {
    elements.push(element)
  }).then(() => {
    expect(elements.pop()).toBe(3)
    expect(elements.pop()).toBe(2)
    expect(elements.pop()).toBe(1)
  })
}

function Foo(props) {
  return [1, 2, 3]
}

function _ref44() {
  const tree = React.createElement(Foo, null)
  const elements = []
  return reactTreeWalker(tree, element => {
    elements.push(element)
  }).then(() => {
    expect(elements.pop()).toBe(3)
    expect(elements.pop()).toBe(2)
    expect(elements.pop()).toBe(1)
  })
}

function _ref45() {
  it('supports new context API', _ref29)
  it('componentWillMount & setState', _ref32)
  it('UNSAFE_componentWillMount', _ref34)
  it('supports portals', _ref35)
  it('supports iterable portals', _ref36)
  it('supports forwardRef', _ref38)
  it('supports memo', _ref40)
  it('supports null', _ref42)
  it('supports iterable functions', _ref43)
  it('supports arrays', _ref44)
}

describe('reactTreeWalker', () => {
  describe('react', _ref24)
  describe('react', _ref45)
})
