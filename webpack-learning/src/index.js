import './style.css'

const greet = (name) => {
  return `Hello, ${name}!`
}

const user = {
  name: 'Wafi',
}

const heading = document.createElement('h1')

heading.textContent = greet(user?.name)

document.body.appendChild(heading)