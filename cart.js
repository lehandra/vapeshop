var cart = window.localStorage.getItem('cartOn');
var count = window.localStorage.getItem('count');
document.getElementById("cartCounter").innerHTML = count;

if (cart > 0 && count > 0) {
    cartOn();
}
else {
    window.localStorage.setItem('cartOn', 0);
}

function cartOn() {
    var a = document.getElementById('cart');
    a.style.right = '35px';
    window.localStorage.setItem('cartOn', 1);
}

function addToLocalStorage() {
    var count = window.localStorage.getItem('count');
    count = ++count;
    window.localStorage.setItem('count', count);
    count = window.localStorage.getItem('count');
    document.getElementById("cartCounter").innerHTML = count;
}

function addToCart() {
    addToLocalStorage();
    cartOn();
}
