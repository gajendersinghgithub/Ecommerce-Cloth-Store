let bagList;
let menuList = document.getElementById("menuList");
let cartButton = document.querySelector('.cart-button');
menuList.style.maxHeight = "0px";

onLoad();

function onLoad() {
    let bagListStr = localStorage.getItem('bagList');
    bagList = bagListStr ? JSON.parse(bagListStr) : [];
    displayItem();
    displaybutton();
}

function toggleMenu(){
    if(menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "400px";
    }
    else{
        menuList.style.maxHeight = "0px";
    }
}

function addToBag(itemId) {
    bagList.push(itemId);
    localStorage.setItem('bagList', JSON.stringify(bagList));
    displaybutton();
    
}

function displaybutton() {
    if (bagList.length > 0) {
        cartButton.innerHTML = `Cart(${bagList.length})`;
    }
    else {
        cartButton.innerHTML = 'Cart';
    }
} 

function displayItem() {
    let shoppingItems = document.querySelector('.shopping-items');
    innerHTML = '';
    items.forEach(item => {
        let discountPrice = item.original_price - item.current_price;
        innerHTML += `
            <div class="shopping-item">
                <img class="image-item"src="${item.image}" alt="item images">
                <div class="rating">${item.rating.stars} | ${item.rating.count}k</div>
                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">₹${item.current_price}</span>
                    <span class="original-price">₹${item.original_price}</span>
                    <span class="discount">(₹${discountPrice} OFF)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id});">Add to Bag</button>
            </div>
        `;
    });
    shoppingItems.innerHTML= innerHTML;
}

