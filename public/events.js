let ws = null;

//messages inputs
const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const userLastName = document.getElementById('userLastName');
const userAge = document.getElementById('userAge');
const userNickname = document.getElementById('userNickname');
const userAvatar = document.getElementById('userAvatar');
const userMessage = document.getElementById('userMessage');
const sendMessage = document.getElementById('sendMessage');
const sendMessageButton = document.getElementById('send-message-button');


//products inputs
const productsInfo = document.getElementById('productsInfo');
const addProductForm = document.getElementById('addProductForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('imageUrl');


//socket connection
(() => {
    startConnection()
})();

function startConnection() {
    ws = adonis.Ws().connect();

    ws.on('open', () => {
        subscribeToChannel();
        ws.getSubscription('messages').emit('messages');
        ws.getSubscription('products').emit('products');
    });
}

function subscribeToChannel () {
    const messages = ws.subscribe('messages');
    const products = ws.subscribe('products');

    messages.on('messages', (messages) => {
        document.getElementById('chat-list').innerHTML = "";
        messages.map(message => renderMessage(message));
    });

    products.on('products', (products) => {
        document.getElementById('productsTable').innerHTML = "";
        products.map(product => renderProduct(product));
    })

    
}


//messages events
sendMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(userMessage.value){
        const newMessage = {
            name: userName.value,
            lastName: userLastName.value,
            age: userAge.value,
            nickname: userNickname.value,
            avatar: userAvatar.value,
            text: userMessage.value,
        };

        ws.getSubscription('messages').emit('newMessage', newMessage);
        userMessage.value = '';

    } else {
        alert('Debes escribir un mensaje');
    }

});


const renderMessage = (newMessage) => {
    const div = document.createElement('div');
    if(newMessage){
        html=`<div class="my-messages">
                <span style="color: brown;"><span class="font-weight-bold text-primary">${newMessage.name} ${newMessage.lastName}</span>: <span class="font-italic text-success">${newMessage.text}</span></span><img src="${newMessage.avatar}" style="width: 40px; height: 40px;"><br/>
            </div>`;
    };

    div.innerHTML = html;
    document.getElementById('chat-list').appendChild(div);
};


//products events
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        title: nameInput.value,
        price: priceInput.value,
        thumbnail: imageUrlInput.value
    };

    ws.getSubscription('products').emit('newProduct', newProduct);
    nameInput.value = '';
    priceInput.value = '';
    imageUrlInput.value = '';
});

const renderProduct = (newProduct) => {
    const tr = document.createElement('tr');
    tr.style.textAlign = 'center';
    if(newProduct){
        html=`<td class="text-white">${newProduct.title}</td>
            <td class="text-white">$ ${newProduct.price}</td>
            <td class="text-white"><img src=${newProduct.thumbnail} alt={{this.title}} style="max-width: 100px; border-radius: 25px"></td>`
    }

    tr.innerHTML = html;
    document.getElementById('productsTable').appendChild(tr);
}

