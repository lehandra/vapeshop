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

function addToLocalStorage(a, b, c) {
    ///добавление айтема в корзину///
    let products = []; //создание пустого массива
    if(localStorage.getItem('products')){ // берётся из лс знчение корзины и вставляется в переменную
        products = JSON.parse(localStorage.getItem('products'));
    }
    if (products.length === 0){
        products.push({'id': a, 'itemCount': 1, 'itemName': b, 'itemPrice': c, 'totalPrice': c}); //если длина массива не получила значений (длина = 0), то создаётся значение
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
                    products[i].totalPrice = c * products[i].itemCount;
                }
            }
        } else { //если не существует строки с айди, на которое мы нажали (а), то создаётся новая строка в массиве products с нашим значением и количеством 1
            products.push({'id': a, 'itemCount': 1, 'itemName': b, 'itemPrice': c, 'totalPrice': c});
        }
    }
    localStorage.setItem('products', JSON.stringify(products)); //отправляет новые значения в лс
    ///добавление айтема в корзину///
}

function addToCart(a, b, c) {
    addToLocalStorage(a, b, c);
    cartOn();
}
function removeFromCart(p){
    let products = []; //создание пустого массива
    if(localStorage.getItem('products')){ // берётся из лс знчение корзины и вставляется в переменную
        products = JSON.parse(localStorage.getItem('products'));
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === p) {
            products[i].itemCount = products[i].itemCount - 1;
            products[i].totalPrice = products[i].itemPrice * products[i].itemCount;
        }
        if (products[i].itemCount < 1){
            delete products[i];
            products = products.filter(x => x !== undefined);
        }
        localStorage.setItem('products', JSON.stringify(products));
    }
    document.location.reload(true);
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


function generateCartContent(array){ //генерация корзины
    var list = document.createElement('ul');
    for (var i = 0; i < array.length; i++) {

            var item = document.createElement('li');
            list.appendChild(item);

            var divName = document.createElement('div');
            divName.appendChild(document.createTextNode(array[i].itemName));
            let att1 = document.createAttribute("class");
            att1.value = "cartName";
            divName.setAttributeNode(att1);
            item.appendChild(divName);

            var divItemCount = document.createElement('div');
            divItemCount.appendChild(document.createTextNode('Кол-во: ' + array[i].itemCount));
            let att2 = document.createAttribute("class");
            att2.value = "divItemCount";
            divItemCount.setAttributeNode(att2);
            item.appendChild(divItemCount);

            var divItemPrice = document.createElement('div');
            divItemPrice.appendChild(document.createTextNode('Цена за единицу: ' + array[i].itemPrice));
            let att3 = document.createAttribute("class");
            att3.value = "cartItemPrice";
            divItemPrice.setAttributeNode(att3);
            item.appendChild(divItemPrice);

            var divTotalPrice = document.createElement('div');
            divTotalPrice.appendChild(document.createTextNode('Цена за все: ' + array[i].totalPrice));
            let att4 = document.createAttribute("class");
            att4.value = "cartTotalPrice";
            divTotalPrice.setAttributeNode(att4);
            item.appendChild(divTotalPrice);


            let btn = document.createElement("button");
            let u = array[i].id
            btn.innerHTML = "Убрать";
            btn.onclick = function () {
                removeFromCart(u);
            };

            var removeItem = document.createElement('div');
            removeItem.appendChild(btn);
            let att5 = document.createAttribute("class");
            att5.value = "removeItem";
            removeItem.setAttributeNode(att5);
            item.appendChild(removeItem);

    }
    return list;
}









