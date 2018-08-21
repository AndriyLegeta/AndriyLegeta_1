var amountProductsInCart = 0;

$(function ()  {             
    $("article button").click(function ()  {     
        // var name = this.previousElementSibling.innerText;
        var name = $(this).prev().text();

        var productExist = false;
        // отримати всі td в яких є назва товару td:nth-child(3)
        var td = document.querySelectorAll('#cart table tbody td:nth-child(3)');
        // Робимо перебір всіх клітинок
        for (var i = 0; i < td.length; i++) {
            // перевіряємо чи назва товару в клітинці == назві товару що хочемо додати
            if (td[i].innerText == name) {
                // якщо умова виконується
                productExist = true;
                // призупити перевірку
                break;
            }
        }

        // якщо товару в корзині НЕмає, додати товар
        if (!productExist) {
            // var price = this.nextElementSibling.innerText;
            var price = $(this).next().text();
            // var img = this.closest('article').querySelector('img');
            var img = $(this).closest('article').find('img');

            // var tr = document.createElement('tr');
            var tr = $('<tr/>');

            // var td1 = document.createElement('td');
            // td1.innerText = ++amountProductsInCart;
            // tr.appendChild(td1);
            $('<td/>', {
                text: ++amountProductsInCart
            }).appendTo(tr);

            // var td2 = document.createElement('td');
            // td2.appendChild(img.cloneNode(true));
            var td2 = $('<td/>');
            img.clone().appendTo(td2);

            // var p = document.createElement('p');
            // p.innerText = name;
            // td2.appendChild(p);
            $('<p/>', {
                text: name
            }).appendTo(td2);

            // tr.appendChild(td2);
            td2.appendTo(tr);

            // var td3 = document.createElement('td');
            // td3.innerText = name;
            // tr.appendChild(td3);
            $('<td/>', {
                text: name
            }).appendTo(tr);

            // var td4 = document.createElement('td');
            var td4 = $('<td/>');

            // var input = document.createElement('input');
            // input.type = 'number';
            // input.min = 1;
            // input.value = 1;
            // input.onchange = productSum;
            // td4.appendChild(input);
            $('<input/>', {
                type: 'number',
                min: 1,
                value: 1,
                change: productSum
            }).appendTo(td4);

            // var p = document.createElement('p');
            // p.innerText = price;
            // td4.appendChild(p);
            $('<p/>', {
                text: price
            }).appendTo(td4);

            // tr.appendChild(td4);
            td4.appendTo(tr);

            // var td5 = document.createElement('td');
            // td5.innerText = price;
            // tr.appendChild(td5);
            var td5 = $('<td/>', {
                text: price
            });
            td5.appendTo(tr);

            // tr.appendChild(td5.cloneNode(true));
            td5.clone().appendTo(tr);

            // var td7 = document.createElement('td');
            // var button = document.createElement('button');
            // button.innerText = 'x';
            // button.onclick = deleteProduct;
            // td7.appendChild(button);
            // tr.appendChild(td7);
            var td7 = $('<td/>');
            $('<button/>', {
                text: 'x',
                click: deleteProduct
            }).appendTo(td7);
            td7.appendTo(tr);

            // var table = document.querySelector('#cart table tbody');
            // table.appendChild(tr);
            tr.appendTo('#cart table tbody');

            recalc();
        }
        openCart();
    });

});

function openCart() {
    cart.style.display = 'block';
    dark.style.display = 'block';
}

function closeCart() {
    cart.style.display = 'none';
    dark.style.display = 'none';
}


function productSum() {
    var amount = this.value;
    var price = this.parentElement.nextElementSibling.innerText;
    price = price.substr(1);
    var sum = amount * price;
    this.parentElement.nextElementSibling.nextElementSibling.innerText = '$' + sum;
    recalc();
}

function recalc() {
    // отримати всі td в яких є сума за товар td:nth-child(6)
    var td = document.querySelectorAll('#cart table tbody td:nth-child(6)');
    // створюємо змінну яка буде підраховувати загальну суму. 
    var sum = 0;
    // Робимо перебір всіх клітинок зі сумою
    for (var i = 0; i < td.length; i++) {
        // отримуємо поточну суму за товар
        var price = td[i].innerText;
        // перетворюємо суму в число (забираємо $, примусово конвертуємо в число)
        price = price.substr(1);
        price = parseInt(price);
        // до загальної суми додаємо поточну суму за товар
        // sum = sum + price;
        sum += price;
    }
    // отримуємо у змінну allSum вузол strong, який є у tfoot корзини
    var allSum = document.querySelector('#cart table tfoot strong');
    // виводимо загальну суму в allSum
    allSum.innerText = '$' + sum;
}

function deleteProduct() {
    var table = this.closest('tbody');
    var tr = this.closest('tr');
    table.removeChild(tr);
    amountProductsInCart--;
    if (amountProductsInCart > 0) {
        recalc();

        // отримати всі td в яких є нумерація td:first-child
        var td = document.querySelectorAll('#cart table tbody td:first-child');
        // Робимо перебір всіх клітинок
        for (var i = 0; i < td.length; i++) {
            td[i].innerText = i + 1;
        }
    } else {
        closeCart();
    }
}
var closeElement = document.querySelectorAll('.close');
// Робимо перебір всіх елементів які закривають корзину
for (var i = 0; i < closeElement.length; i++) {
    closeElement[i].onclick = closeCart;
}