'use strict'

const Message = use('App/Models/Message');

class MessageController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onNewMessage (newMessage) {
    await Message.create(newMessage);
    const messages = await Message.all();
    this.socket.broadcastToAll('messages', messages);
  }

  async onMessages(){
    const messages = await Message.all();
    this.socket.emit('messages', messages);
  }
}

module.exports = MessageController
