onload = function () {
  hash = '#', check = '✓', messages = []
  results = document.createElement('pre')
  button = document.createElement('button')
  button.textContent = text = 'run benchmark'
  button.onclick = function () {
    button.disabled = true
    button.textContent = 'running...'
    worker.postMessage('run')
  }

  document.body.appendChild(button)
  document.body.appendChild(results)

  worker = new Worker('benchmark.js')

  worker.onmessage = function (e) {
    e.data[0] === hash ||
    e.data[0] === check ?
      messages.push('\n' + e.data) :
      messages.push(e.data)

    results.textContent = (
      messages.join('\n').trim()
    )

    if (e.data[0] === check) {
      button.disabled = false
      button.textContent = text
    }
  }
}
