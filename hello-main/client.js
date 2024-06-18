const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const feedback = document.getElementById('feedback')

const name = prompt('What is your name?')
appendMessage('<i class="fa fa-quote-right"></i>' + '&emsp;' +'You joined')
socket.emit('new-user', name)

//Client listening to server

socket.on('chat-message', data => {
  //data.name.style.fontWeight = 'bold';
  feedback.innerHTML = ''
  appendMessage(`<strong>${data.name}</strong>&ensp; ${data.message}`)
})

socket.on('typing', name => {
  feedback.innerHTML = '<p>'+name+' is typing a message...</p>'
})

socket.on('user-connected', name => {
  appendMessage(`<i class="fa fa-quote-right"></i>&emsp;${name} joined`)
})

socket.on('user-disconnected', name => {
  appendMessage(`<i class="fa fa-quote-right"></i>&emsp;${name} disconnected`)
})

// Listening for event from Client

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`<strong>You</strong>&ensp; ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

messageInput.addEventListener('keypress', () => {
  socket.emit('typing', name)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerHTML = message
  messageContainer.append(messageElement)
}