function placeOrder() {
            
    document.getElementById('foodList').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    
    const orderPromise = new Promise(resolve => {
        const randomSeconds = Math.floor(Math.random() * 5000) + 1000; 
        setTimeout(() => {
            resolve();
        }, randomSeconds);
    });

    orderPromise.then(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('foodImage').style.display = 'block';
        document.getElementById('foodImage').innerHTML = '<img src="images/food-photographer-E94j3rMcxlw-unsplash" alt="Ordered Food">';
        document.getElementById('orderID').style.display = 'block';
        document.getElementById('orderID').innerText = 'Order ID: ' + generateOrderID();
    });
}

function generateOrderID() {
    // A simple function to generate a random order ID
    return 'BK' + Math.floor(Math.random() * 10000);
}