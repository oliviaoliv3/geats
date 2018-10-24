
var grandTotal = document.getElementById("grandTotal")
var name = document.body.querySelector('#n')
var phone = document.body.querySelector('#num')
var address = document.body.querySelector('#a')

fetch('https://galvanize-eats-api.herokuapp.com/menu')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {

        var menu = document.querySelector(".menuList")
        var list = document.createElement("ul")

        menu.appendChild(list)
        for (let i = 0; i < myJson.menu.length; i++) {
            let menuItem = document.createElement('li')
            menuItem.innerHTML = myJson.menu[i].name + ' ' + myJson.menu[i].price
            var newTotal = 0
            menuItem.addEventListener("click", function () {
                var menuList = document.getElementById("transfer")
                var items = document.createElement("ul")
                menuList.appendChild(items)
                var newMenuItem = menuItem.cloneNode(true)
                items.appendChild(newMenuItem)
                var price = myJson.menu[i].price
                var subTotal = document.getElementById("subTotal")
                var tax = document.getElementById("Tax")
                
                subTotal.innerHTML = (parseInt(subTotal.innerHTML) + price) * 100 / 100
                tax.innerHTML = ((parseInt(subTotal.innerHTML) * .07).toString(10) * 100) / 100
                grandTotal.innerHTML = (parseFloat(subTotal.innerHTML) + parseInt(tax.innerHTML)).toString(10)

            })
            list.appendChild(menuItem)

        }
    })
var button = document.getElementById("deliver")
button.addEventListener("click", function (e) {
    e.preventDefault()
    var data = {
        total: grandTotal.innerHTML,
        name: name.innerHTML,
        phone: phone.innerHTML,
        address: address.innerHTML
    }
    var settings = {
        method: 'POST',
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        },
        body: JSON.stringify(data)
    }
    
    var url = 'https://galvanize-eats-api.herokuapp.com/orders'
    fetch(url, settings)
    .then(res => {
        var data = res.text()
        return data
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
})



// myJson.menu
// make an unordered list with dom manip (createElement)
// append that list to a div thats hardcoded
// create a for loop that loops through and
//  creates an li
//  appends the li to ul
//  .appendChild
// To append an element : thing you want to append it to.appendChild(thing you wanna append) (div.appendChild(li)
// - to set text/html : thing you wanna put text in.innerHTML = 'text you wanna put in there'
// quantity field for menu
// create a form to append to
// input in