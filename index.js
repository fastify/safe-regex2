'use strict'

const parse = require('ret')
const types = parse.types

/**
 * @param {string|RegExp} re - The regular expression to check, can be a string or RegExp object
 * @param {object} [opts]
 * @param {number} [opts.limit=25] - The maximum number of repetitions allowed
 * @returns {boolean}
 */
function safeRegex (re, opts) {
  if (!opts) opts = {}
  /* c8 ignore next */
  const replimit = opts.limit === undefined ? 25 : opts.limit

  /* c8 ignore next 2 */
  if (isRegExp(re)) re = re.source
  else if (typeof re !== 'string') re = String(re)

  try { re = parse(re) } catch { return false }

  let reps = 0
  return (function walk (node, starHeight) {
    let i
    let ok
    let len

    if (node.type === types.REPETITION) {
      starHeight++
      reps++
      if (starHeight > 1) return false
      if (reps > replimit) return false
    }

    if (node.options) {
      for (i = 0, len = node.options.length; i < len; i++) {
        ok = walk({ stack: node.options[i] }, starHeight)
        if (!ok) return false
      }
    }
    const stack = node.stack || node.value?.stack
    if (!stack) return true

    for (i = 0; i < stack.length; i++) {
      ok = walk(stack[i], starHeight)
      if (!ok) return false
    }

    return true
  })(re, 0)
}

function isRegExp (x) {
  return Object.prototype.toString.call(x) === '[object RegExp]'
}

module.exports = safeRegex
module.exports.default = safeRegex
module.exports.safeRegex = safeRegex
