'use strict'

const Product = use('App/Models/Product');

class ProductController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onNewProduct (newProduct) {
    await Product.create(newProduct);
    const products = await Product.all();
    this.socket.broadcastToAll('products', products);
  }

  async onProducts(){
    const products = await Product.all();
    this.socket.emit('products', products);
  }

}

module.exports = ProductController
