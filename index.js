'use strict'

var pump = require('pump')
var duplexify = require('duplexify')
var through = require('through2')
var lpstream = require('length-prefixed-stream')
var msgpack = require('msgpack5')()

module.exports = function Msgpack5Stream (stream) {
  var msgEncode = through.obj(function (data, enc, cb) {
    cb(null, msgpack.encode(data))
  })

  var msgDecode = through.obj(function (data, enc, cb) {
    cb(null, msgpack.decode(data))
  })

  var dup = duplexify.obj()

  var lpEncode = lpstream.encode()
  var lpDecode = lpstream.decode()

  pump(msgEncode, lpEncode, stream)
  pump(stream, lpDecode, msgDecode)

  dup.setWritable(msgEncode)
  dup.setReadable(msgDecode)

  return dup
}
