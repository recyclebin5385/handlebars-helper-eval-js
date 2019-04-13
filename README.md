# handlebars-helper-eval-js

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

A [Handlebars](https://handlebarsjs.com/) block helper "eval" which evaluates a JavaScript code.

## Install

With [Node.js](http://nodejs.org):

    $ npm install handlebars-helper-eval-js

## Usage

Before using the helper, You must register the helper to the Handlebars module.

The main export returns a function which takes a hash containing options as an optional argument.
Below is the structure of the options in YAML format.
Note that all options are optional.

    handlebars: [The Handlebars module]
    rename:
        eval: [The changed name of the "eval" helper (if you want to)]

You can pass the Handlebars module via option "handlebars".
If you don't to change the helper name, option "rename" is unnecessary.

```js
const hbs = require('handlebars')
require('handlebars-helper-eval-js')({
  handlebars: hbs,
  rename: {
    eval: 'myEval'
  }
})
```

If you use Handlebars API registerHelper(), option "handlebars" is unnecessary.

```js
const hbs = require('handlebars')
hbs.registerHelper(require('handlebars-helper-eval-js')({
  // Note that no "handlebars" is needed.
  rename: {
    eval: 'myEval'
  }
}))
```

With [assemble](https://www.npmjs.com/package/assemble) API:

```js
  const app = require('assemble')()
  app.helpers(require('handlebars-helper-eval-js')())
```

## Helpers

### eval

Evaluates a JavaScript expression and put the result into the block parameter.

This helper takes a JavaScript expression as the first argument.
Other arguments (both hash and non-hash) and the root context's properties are used as variables in the expression.
Hash arguments and the root context's direct child properties can be accessed by its name.
Non-hash arguments can be accessed by "_1", "_2", "_3", ....
The result will be put into the block parameter.

The name of the helper can be changed by specifying option "rename.eval" in the API, which is useful to prevent name conflict between helpers.

**Params**

* `expression` **{string}** - The JavaScript expression.
* `variables...` **{any}** - The arbitrary number of variables used in the expression.
* `returns` **{Object}**: The evaluated result of the expression.

**Example**

```handlebars
{{#with foo}}
  {{#eval "_1 * x + _2 * y + bar" bar ../baz/foo x=@root/bar y=9 as |z|}}
    {{z}}
  {{/eval}}
{{/with}}
```

Note that {{#eval}} is wrapped by {{#with}} and {{{z}} is wrapped by {{#eval}}.

The root context is:

```yaml
foo:
  foo: 2
  bar: 3
  baz: 4
bar: 5
baz:
  foo: 6
  bar: 7
```

In the JavaScript expression, variables "_1", "_2", "x", "y", and "bar" are
replaced with "@root/foo/bar", "@root/baz/foo", "@root/bar", "9" and "@root/bar", and the evaluated result "74" is put into block parameter "z".

## History

### version 0.1.0

Released on 2019-4-13

 -  initial release

## Development

This project uses [npm](https://www.npmjs.com/) for development.

Try these commands on the top folder of the project.

```sh
npm install
npm run build
```

## Author

 -  recyclebin5385
     - [github](https://github.com/recyclebin5385)
     - [twitter](https://twitter.com/recyclebin5385)

## License

Copyright (c) 2019, recyclebin5385

Released under the [BSD 3-Clause License](LICENSE.txt).
