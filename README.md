# msgpack5-stream

Given a regular duplex stream, this module will return a duplex stream
optimised for sending and receiving
[msgpack5](https://github.com/mcollina/msgpack5) messages.

[![Build status](https://travis-ci.org/watson/msgpack5-stream.svg?branch=master)](https://travis-ci.org/watson/msgpack5-stream)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Usage

```js
var net = require('net')
var msgpack = require('msgpack5-stream')

var server = net.createServer(function (socket) {
  var dup = msgpack(socket)

  dup.on('data', function (obj) {
    console.log(obj) // { hello: 'world' }
  })
})

server.listen(3000, function () {
  var dup = msgpack(net.connect(3000))
  dup.write({hello: 'world'})
})
```

## License

MIT
