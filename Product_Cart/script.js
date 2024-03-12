let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Burger',
        image: '1.jpg',
        price: 1200
    },
    {
        id: 2,
        name: 'Pan Cake',
        image: '2.jpg',
        price: 220
    },
    {
        id: 3,
        name: 'Fresh Salad',
        image: '3.jpg',
        price: 550
    },
    {
        id: 4,
        name: 'Maple Toast',
        image: '4.jpg',
        price: 330
    },
    {
        id: 5,
        name: 'Ravioli',
        image: '5.jpg',
        price: 670
    },
    {
        id: 6,
        name: 'Mushroom',
        image: '6.jpg',
        price: 890
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
            <button onclick="orderNow(${key})">Order Now</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
function orderNow(key) {
    let orderedProduct = listCards[key];

    if (orderedProduct && orderedProduct.quantity > 0) {
        simulateOrder(orderedProduct)
            .then(() => {
                alert(`Order placed for ${orderedProduct.name} successfully!`);
                // Optional: You can clear the cart or perform other actions after successful order placement.
                clearCart();
            })
            .catch(error => {
                alert(`Failed to place order. ${error}`);
            });
    } else {
        alert("Please add items to the cart before placing an order.");
    }
}

function simulateOrder(product) {
    return new Promise((resolve, reject) => {
        // Simulating an asynchronous order placement process
        setTimeout(() => {
            // Assuming the order is successful
            resolve();
            // You can also reject the promise in case of an error
            // reject("Some error occurred while placing the order.");
        }, 2000); // Simulating a 2-second delay for the order process
    });
}

function clearCart() {
    listCards = [];
    reloadCard();
}
