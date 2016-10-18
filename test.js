'use strict'

var assert = require('assert')
var net = require('net')
var msgpack = require('./')

var server = net.createServer(function (socket) {
  var dup = msgpack(socket)

  dup.on('data', function (obj) {
    assert.deepEqual(obj, {hello: 'world'})
    socket.destroy()
    server.close()
  })
})

server.listen(function () {
  var port = server.address().port
  var dup = msgpack(net.connect(port))
  dup.write({hello: 'world'})
})
