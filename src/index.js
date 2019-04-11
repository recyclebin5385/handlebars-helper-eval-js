'use strict'

function assign (o1, o2) {
  for (let key in o2) {
    if (o2.hasOwnProperty(key)) {
      o1[key] = o2[key]
    }
  }
}

module.exports = function helpers (options) {
  options = options || {}
  const hbs = options.handlebars || require('handlebars')
  const name = options.name || 'eval'

  hbs.registerHelper(name, function() {
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
    console.log(JSON.stringify(options))
    return options.fn(this, {
      data: options.data,
      blockParams: [result]
    })
  })

  return hbs.helpers
}
