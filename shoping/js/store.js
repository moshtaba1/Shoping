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


let userBasket = []
let totalPrice = 0


allProducts.forEach(function(product){
    let ShopItem = $.createElement("div")
    ShopItem.classList.add("shop-item")

    let shopItemTitle = $.createElement("span")
    shopItemTitle.classList.add("shop-item-title")
    shopItemTitle.innerHTML = product.title

    let shopItemImage = $.createElement("img")
    shopItemImage.classList.add("shop-item-Image")
    shopItemImage.setAttribute("src",product.img)

    let shopItemDetiles = $.createElement("div")
    shopItemDetiles.classList.add("shop-item-details")

    let shopItemPrice = $.createElement("span")
    shopItemPrice.innerHTML = "$"+product.price
    shopItemPrice.classList.add("shop-item-price")

    let addBtn = $.createElement("button")
    addBtn.className = "add-Btn btn btn-primary shop-item-button"
    addBtn.innerHTML = "ADD TO CART"
    addBtn.addEventListener("click", function(){
        addProductBasket(product)
    })
    
    shopItemDetiles.append(shopItemPrice,addBtn)
    ShopItem.append(shopItemTitle,shopItemImage,shopItemDetiles)
    shopItemContainer.append(ShopItem)
})
function addProductBasket(product){
    let mainProduct = product
    userBasket.push(mainProduct)
    basketGenrator(userBasket)
    totalPriceCount(userBasket)
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
    userBasket = userBasket.filter(function(product){
        return product.id !== productId
    })
    basketGenrator(userBasket)
    totalPriceCount(userBasket)

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
    userBasket.forEach(function(product){
        if(product.id === productId){
            product.count = inputValue
        }
    })

    totalPriceCount(userBasket)
}