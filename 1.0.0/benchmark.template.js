importScripts('https://pkg.mkr.sx/workbench/1.0.0/suite.js')

suite('basic arithmetic', function (run) {
  run('addition', () => 1 + 1)
  run('subtraction', () => 1 - 1)
})
