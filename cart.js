let prices = '{' +
    '"id1":"440",' +
    '"id2":"500",' +
    '"id3":"600",' +
    '"id4":"700",' +
    '"id5":"400",' +
    '"id6":"530",' +
    '"id7":"510",' +
    '"id8":"540",' +
    '"id9":"532"' +
    '}';
const db = JSON.parse(prices);
//x = db.window['id1']
//console.log(x)


//при загрузке страницы чекаются значения cart и count. Если они оба больше нуля, то запускается функция cartOn,
// которая выводит иконку с корзиной на видимую часть экрана. Эти значения
var cart = window.localStorage.getItem('cartOn'); //значение, показывающее, что должна ли показываться корзина или не.
var count = window.localStorage.getItem('count'); //значение, показывающее сколько раз нажато на кнопку добавления в корзину.
document.getElementById("cartCounter").innerHTML = count; //изменение значения в иконке с корзиной
if (cart > 0 && count > 0) {
    cartOn();
}
else {
    window.localStorage.setItem('cartOn', 0);
}

function cartOn() {
    /// счетчик в корзине ///
    var count = window.localStorage.getItem('count'); //берём старое значение из лс
    count = ++count; //прибавляем +1
    window.localStorage.setItem('count', count); //отправляем значение обратно в лс
    document.getElementById("cartCounter").innerHTML = count; //выводим значение под иконкой корзины
    /// счетчик в корзине ///

    var a = document.getElementById('cart');
    a.style.right = '35px';
    window.localStorage.setItem('cartOn', 1);
}

function addToLocalStorage(a) {
    ///добавление айтема в корзину///
    let products = []; //создание пустого массива
    if(localStorage.getItem('products')){ // берётся из лс знчение корзины и вставляется в переменную
        products = JSON.parse(localStorage.getItem('products'));
    }
    if (products.length === 0){
        products.push({'id': a, itemCount: 1, totalPrice: a}); //если длина массива не получила значений (длина = 0), то создаётся значение
    } else {
        var z = 0; //блок с проверкой, если существует в массиве строка с айди 'а'
        for (let i = 0; i < products.length; i++){
            if (products[i].id === a){
                z = 1;
                break;
            } else { z = 0 }
        }
        if (z > 0) { //если существует, строка со значением айди 'a', то в этой строке изменяется значение itemCount на +1
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === a) {
                    products[i].itemCount = products[i].itemCount + 1;
                    products[i].totalPrice = db.a * products[i].itemCount;
                }
            }
        } else { //если не существует строки с айди, на которое мы нажали (а), то создаётся новая строка в массиве products с нашим значением и количеством 1
            products.push({'id': a, itemCount: 1, totalPrice: db.a});
        }
    }
    localStorage.setItem('products', JSON.stringify(products)); //отправляет новые значения в лс
    ///добавление айтема в корзину///
}

function addToCart(a) {
    addToLocalStorage(a);
    cartOn();
}

//Фильтр по кнопкам
function displayItems(a){
    let searchItems = document.getElementsByClassName(a); //взять все элементы, которые надо оставить
    let allItems = document.getElementsByClassName('content-item'); //взять все элементы в меню
    document.getElementsByClassName('sim-slider')[0].style.display='none'; //скрыть слайдер
    for (let i = 0; i < allItems.length; i++){
        allItems[i].style.display='none';
    }   //скрыть всё ненужное
    for (let i = 0; i < searchItems.length; i++){
        searchItems[i].style.display='block';
    } //оставить всё нужное
}


function generateCartContent(array){
    var list = document.createElement('ul');
    for(var i = 0; i < array.length; i++) {
        for(var l = 0; l < db.length; l++) {
            var item = document.createElement('li');
            console.log(array[i])
            console.log(db[l])
            item.appendChild(document.createTextNode(array[i].id));
            list.appendChild(item);
        }
    }
    return list;
}






//  Code By Webdevtrick ( https://webdevtrick.com )
var cartId = "cart";

var localAdapter = {
    saveCart: function (object) {
        var stringified = JSON.stringify(object);
        localStorage.setItem(cartId, stringified);
        return true;
    },
    getCart: function () {
        return JSON.parse(localStorage.getItem(cartId));
    },
    clearCart: function () {
        localStorage.removeItem(cartId);
    }
};
var ajaxAdapter = {
    saveCart: function (object) {
        var stringified = JSON.stringify(object);
        // do an ajax request here
    },
    getCart: function () {
        // do an ajax request -- recognize user by cookie / ip / session
        return JSON.parse(data);
    },
    clearCart: function () {
        //do an ajax request here
    }
};
var storage = localAdapter;
var helpers = {
    getHtml: function (id) {
        return document.getElementById(id).innerHTML;
    },
    setHtml: function (id, html) {
        document.getElementById(id).innerHTML = html;
        return true;
    },
    itemData: function (object) {
        var count = object.querySelector(".count"),
            patt = new RegExp("^[1-9]([0-9]+)?$");
        count.value = (patt.test(count.value) === true) ? parseInt(count.value) : 1;
        var item = {
            name: object.getAttribute('data-name'),
            price: object.getAttribute('data-price'),
            id: object.getAttribute('data-id'),
            count: count.value,
            total: parseInt(object.getAttribute('data-price')) * parseInt(count.value)
        };
        return item;
    },
    updateView: function () {
        var items = cart.getItems(),
            template = this.getHtml('cartT'),
            compiled = _.template(template, {
                items: items
            });
        this.setHtml('cartItems', compiled);
        this.updateTotal();

    },
    emptyView: function () {
        this.setHtml('cartItems', '<p>Add some items to see</p>');
        this.updateTotal();
    },
    updateTotal: function () {
        this.setHtml('totalPrice', cart.total + '₹');
    }
};
var cart = {
    count: 0,
    total: 0,
    items: [],
    getItems: function () {
        return this.items;
    },
    setItems: function (items) {
        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            this.total += _item.total;
        }
    },
    clearItems: function () {
        this.items = [];
        this.total = 0;
        storage.clearCart();
        helpers.emptyView();
    },
    addItem: function (item) {
        if (this.containsItem(item.id) === false) {
            this.items.push({
                id: item.id,
                name: item.name,
                price: item.price,
                count: item.count,
                total: item.price * item.count
            });
            storage.saveCart(this.items);
        } else {
            this.updateItem(item);
        }
        this.total += item.price * item.count;
        this.count += item.count;
        helpers.updateView();

    },
    containsItem: function (id) {
        if (this.items === undefined) {
            return false;
        }
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            if (id == _item.id) {
                return true;
            }
        }
        return false;
    },
    updateItem: function (object) {
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            if (object.id === _item.id) {
                _item.count = parseInt(object.count) + parseInt(_item.count);
                _item.total = parseInt(object.total) + parseInt(_item.total);
                this.items[i] = _item;
                storage.saveCart(this.items);
            }
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    if (storage.getCart()) {
        cart.setItems(storage.getCart());
        helpers.updateView();
    } else {
        helpers.emptyView();
    }
    var products = document.querySelectorAll('.product button');
    [].forEach.call(products, function (product) {
        product.addEventListener('click', function (e) {
            var item = helpers.itemData(this.parentNode);
            cart.addItem(item);
        });
    });
    document.querySelector('#clear').addEventListener('click', function (e) {
        cart.clearItems();
    });
});










