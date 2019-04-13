/**
 * A Handlebars block helper which evaluates a JavaScript code.
 *
 * @module @@pkg.name
 */

'use strict'

/**
 * Register the helper to Handlebars.
 *
 * The return value is identical to options.handlebars.helpers (if specified).
 *
 * @param {Object} [options] - The options.
 * @param {Object} [options.handlebars] - The Handlebars module.
 * @param {Object} [options.rename] - The hash containig a pair of the default and changed name of the helper.
 * @param {string} [options.rename.eval] - The changed name of the "eval" helper.
 * @return {Object} The hash containing a pair of the name of the helper and the helper function.
 */
module.exports = function (options) {
  const assign = function (o1, o2) {
    for (let key in o2) {
      if (o2.hasOwnProperty(key)) {
        o1[key] = o2[key]
      }
    }
  }

  options = options || {}
  const hbs = options.handlebars || require('handlebars')
  const rename = {
    eval: 'eval'
  }
  assign(rename, options.rename || {})

  hbs.registerHelper(rename['eval'], function () {
    let expression = arguments[0]
    if (expression == null) {
      expression = ''
    }
    expression = expression.toString().trim()
    if (!expression) {
      expression = 'undefined'
    }

    const options = arguments[arguments.length - 1]

    const context = {}
    assign(context, options.data.root)
    for (let i = options.blockParams.length; i < arguments.length - 1; i++) {
      context[`_${i + 1 - options.blockParams.length}`] = arguments[i]
    }
    assign(context, options.hash)

    const args1 = []
    const args2 = []
    for (const key in context) {
      if (context.hasOwnProperty(key)) {
        args1.push(key)
        args2.push(context[key])
      }
    }
    args1.push(`return (${expression})`)
    const result = new Function(...args1)(...args2) // eslint-disable-line no-new-func

    return options.fn(this, {
      data: options.data,
      blockParams: [result]
    })
  })

  return hbs.helpers
}
