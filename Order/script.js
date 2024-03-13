
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let menuList = document.querySelector('.menuList');
let cart = document.querySelector('.card');
let orderNowButton = document.querySelector('.orderNowButton');

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

let listCards = [];
let orderNumber = 1;

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
            <button onclick="orderNow(${key})">Order Now</button>`;
        list.appendChild(newDiv);
    });
}

function addToCart(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        showItemImage(key);
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;

        if (value != null) {
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
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
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
                alert(`Order placed for ${orderedProduct.name} successfully! Order Number: ${orderNumber}`);
                orderNumber++;
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
    return new Promise((resolve) => {
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

function showItemImage(key) {
    const selectedItems = getSelectedItems();
    list.innerHTML = '';

    selectedItems.forEach(itemKey => {
        const selectedItem = products[itemKey];
        
        if (selectedItem) {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item');

            const imageContainer = document.createElement('div');
            const image = document.createElement('img');

            image.style.height = '100px'; 
            image.style.width = '100px'; 

            image.src = `images/${selectedItem.image}`;
            image.alt = selectedItem.name;

            imageContainer.appendChild(image);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add To Cart';
            addToCartButton.onclick = function() {
                addToCart(itemKey);
            };

            const orderNowButton = document.createElement('button');
            orderNowButton.textContent = 'Order Now';
            orderNowButton.onclick = function() {
                orderNow(itemKey);
            };

            buttonsContainer.appendChild(addToCartButton);
            buttonsContainer.appendChild(orderNowButton);

            itemContainer.appendChild(imageContainer);
            itemContainer.appendChild(buttonsContainer);

            list.appendChild(itemContainer);
        }
    });
}

function getSelectedItems() {
    const checkboxes = document.querySelectorAll('.menuItemCheckbox');
    const selectedItems = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedItems.push(index);
        }
    });

    return selectedItems;
}

menuList.addEventListener('change', function (event) {
    const checkbox = event.target;
    
    if (checkbox.classList.contains('menuItemCheckbox')) {
        const key = checkbox.value;

        if (checkbox.checked) {
            showItemImage(key);
        }
    }
});

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

orderNowButton.addEventListener('click', function () {
    orderNowAll();
});

function orderNowAll() {
    if (listCards.length > 0) {
        simulateOrderAll(listCards)
            .then(() => {
                alert(`Order placed successfully! Order Number: ${orderNumber}`);
                orderNumber++;
                clearCart();
            })
            .catch(error => {
                alert(`Failed to place order. ${error}`);
            });
    } else {
        alert("Please add items to the cart before placing an order.");
    }
}

function simulateOrderAll(products) {
    return new Promise((resolve) => {
        // Simulate an asynchronous order placement process
        setTimeout(() => {
            // Assuming the order is successful
            resolve();
            // You can also reject the promise in case of an error
            // reject("Some error occurred while placing the order.");
        }, 2000); // Simulating a 2-second delay for the order process
    });
}

initApp();


