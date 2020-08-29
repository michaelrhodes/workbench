importScripts('https://pkg.mkr.sx/benchmark/2.1.4.js')

suites = []
running = false
active = null

onmessage = function () {
  if (!running) next(
    running = true,
    index = 0
  )
}

function next () {
  active = suites[index++]
  active ? active(next) : done()
}

function done () {
  delay(500, function () {
    running = false
    postMessage('✓')
  })
}

function suite (name, run) {
  suites.push(function (done) {
    var suite = new Benchmark.Suite

    run(function (name, fn) {
      suite.add(name, fn)
    })

    delay(500, function () {
      postMessage('# ' + name)
      suite.on('cycle', report)
      suite.on('complete', done)
      suite.run()
    })
  })
}

function report (e) {
  postMessage(String(e.target))
}

function delay (ms, fn) {
  setTimeout(fn, ms)
}
