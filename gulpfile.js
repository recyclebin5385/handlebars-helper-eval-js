const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const rimraf = require('rimraf')
const pkg = require('./package.json')

function clean (cb) {
  rimraf('dist', cb)
  rimraf('docs', cb)
}

function lint () {
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!docs/**'])
    .pipe(plugins.standard())
    .pipe(plugins.standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
}

function compile () {
  return gulp.src('src/*.js')
    .pipe(plugins.replace(/@@pkg\.([a-zA-Z0-9_]+)/g, (match, key) => pkg[key]))
    .pipe(gulp.dest('dist'))
}

function test () {
  return gulp.src('test/test.js', { read: false })
    .pipe(plugins.mocha({
      reporter: 'list'
    }))
    .on('error', plugins.util.log)
}

function doc () {
  return gulp.src('dist/*.js')
    .pipe(plugins.jsdoc3())
}

exports.clean = clean
exports.lint = lint
exports.test = test
exports.doc = doc
exports.default = gulp.series(lint, compile, test, doc)
