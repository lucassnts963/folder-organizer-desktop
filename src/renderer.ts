import './index.css'

const input = document.getElementById('input')
const button = document.getElementById('execute')
const spanPath = document.getElementById('path')

input.addEventListener('click', () => {
  window.api.selectFolder()
})

button.addEventListener('click', () => {
  window.api.execute(spanPath.innerText)
})
