/* global describe, it */

const assert = require('assert')

const root = {
  foo: {
    foo: 2,
    bar: 3,
    baz: 4
  },
  bar: 5,
  baz: {
    foo: 6,
    bar: 7
  }
}

describe('standalone', () => {
  describe('pass-handlebars-via-options', () => {
    it('default-name', () => {
      const hbs = require('handlebars')
      require('../dist/index')({
        handlebars: hbs
      })

      assert.strictEqual('74', hbs.compile('{{#with foo}}{{#eval "_1 * x + _2 * y + bar" bar ../baz/foo x=@root/bar y=9 as |z|}}{{z}}{{/eval}}{{/with}}')(root))
    })

    it('changed-name', () => {
      const hbs = require('handlebars')
      require('../dist/index')({
        handlebars: hbs,
        rename: {
          eval: 'hoge'
        }
      })

      assert.strictEqual('74', hbs.compile('{{#with foo}}{{#hoge "_1 * x + _2 * y + bar" bar ../baz/foo x=@root/bar y=9 as |z|}}{{z}}{{/hoge}}{{/with}}')(root))
    })
  })

  describe('pass-handlebars-via-handlebars-api', () => {
    it('default-name', () => {
      const hbs = require('handlebars')
      hbs.registerHelper(require('../dist/index')())

      assert.strictEqual('74', hbs.compile('{{#with foo}}{{#eval "_1 * x + _2 * y + bar" bar ../baz/foo x=@root/bar y=9 as |z|}}{{z}}{{/eval}}{{/with}}')(root))
    })

    it('changed-name', () => {
      const hbs = require('handlebars')
      hbs.registerHelper(require('../dist/index')({
        rename: {
          eval: 'hoge'
        }
      }))

      assert.strictEqual('74', hbs.compile('{{#with foo}}{{#hoge "_1 * x + _2 * y + bar" bar ../baz/foo x=@root/bar y=9 as |z|}}{{z}}{{/hoge}}{{/with}}')(root))
    })
  })
})
