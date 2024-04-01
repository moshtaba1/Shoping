let allProducts = [
    {id:1 , title: "album 1", price: 10, img:"images/album 1.png", count:1},
    {id:2 , title: "album 2", price: 20, img:"images/album 2.png", count:1},
    {id:3 , title: "album 3", price: 30, img:"images/album 3.png", count:1},
    {id:4 , title: "album 4", price: 40, img:"images/album 4.png", count:1},
]
let $ = document

let shopItemContainer = $.querySelector(".shop-items")
let itemContainer = $.querySelector(".cart-items")
let btnPurchase = $.querySelector(".btn-purchase")
let cartTotalPrice = $.querySelector(".cart-total-price")
let costumScroll = $.querySelector(".costum-scroll")

window.addEventListener("scroll",function(){
    let scrollTop = window.scrollY
    let documentHeight = document.body.clientHeight
    let windowHeight = window.innerHeight
    let scrollPercent = scrollTop / (documentHeight - windowHeight)
    let scrollPercentrouded = Math.round(scrollPercent * 100)
    costumScroll.style.width = scrollPercentrouded + "%"
})



let userBasket = []
let totalPrice = 0

allProducts.forEach(function(product){

    shopItemContainer.insertAdjacentHTML("beforeend", '<div class="shop-item"><span class="shop-item-title">'+product.title+'</span><img class="shop-item-Image" src="'+product.img+'"><div class="shop-item-details"><span class="shop-item-price">'+product.price+'$</span><button class="add-Btn btn btn-primary shop-item-button" onclick="addProductBasket('+product.id+')" >ADD TO CART</button></div></div>')
})
function addProductBasket(productId) {
    let mainProduct = allProducts.find(product => product.id === productId);
    userBasket.push(mainProduct);
    basketGenrator(userBasket);
    totalPriceCount(userBasket);
}


function basketGenrator (basketArray){
    itemContainer.innerHTML = ""
    basketArray.forEach(function(product){

        let cartRow = $.createElement("div")
        cartRow.classList.add("cart-row")

        let newItem = $.createElement("div")
        newItem.className = "cart-item cart-column"

        let newImg = $.createElement("img")
        newImg.classList.add("cart-item-image")
        newImg.setAttribute("height","100")
        newImg.setAttribute("width","100")
        newImg.setAttribute("src",product.img )

        
        let newItemName = $.createElement("span")
        newItemName.classList.add("cart-item-title")
        newItemName.innerHTML = product.title

        newItem.append(newImg,newItemName)
        
        let newPrice = $.createElement("span")
        newPrice.className = "cart-price cart-column"
        newPrice.innerHTML = "$"+product.price
        
        let newQuantity = $.createElement("div")
        newQuantity.className = "cart-quantity cart-column"

        let newInput = $.createElement("input")
        newInput.classList.add("cart-quantity-input")
        newInput.setAttribute("type","number")
        newInput.setAttribute("value",product.count)
        newInput.addEventListener("change", function(){
            updatePrice(product.id , newInput.value)
        })

        let newRemoveBtn = $.createElement("button")
        newRemoveBtn.className = "btn btn-danger"
        newRemoveBtn.innerHTML ="REMOVE"
        newRemoveBtn.addEventListener("click",function(){
            removeProduct(product.id)
            totalPriceCount(product)
        })

        newQuantity.append(newInput,newRemoveBtn)
        
        cartRow.append(newItem,newPrice,newQuantity)
        itemContainer.append(cartRow)
    })
}

function removeProduct (productId){
    let productIndex = userBasket.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        userBasket.splice(productIndex, 1);
        basketGenrator(userBasket);
        totalPriceCount(userBasket);
    }
}
btnPurchase.addEventListener("click",function(){
    userBasket = []
    basketGenrator(userBasket)
    totalPriceCount(userBasket)
})

function totalPriceCount (userBasketArray){
    let sum = 0 
    userBasketArray.forEach(function(product){
        sum += product.count * product.price
    })

    cartTotalPrice.innerHTML = "$" + sum
}

function updatePrice (productId, inputValue) {
    let product = userBasket.find(product => product.id === productId);
    if (product) {
        product.count = inputValue;
        totalPriceCount(userBasket);
    }
}
