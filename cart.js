let cartButton = document.querySelector('.cart-button');
let cartList = document.querySelector('.cart-list');
let billItems = document.querySelector('.bill-items');
let bagList;
let bagListStr = localStorage.getItem('bagList');
let menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";
bagList = bagListStr ? JSON.parse(bagListStr) : [];
let bagListCart = bagList.filter(function(value, index, array) {
    return array.indexOf(value) === index;
});
displaybutton();
displayItems();
displayItemsBill();

function displayItems() {
    let innerHTML = '';
    if (bagListCart.length > 0 ) {
        for(let i=0; i<bagListCart.length; i++) {
            items.forEach(item => {
                let discountPrice = item.original_price - item.current_price;
                let itemCount = 0;
                for(let b=0; b<bagList.length; b++) {
                    if(bagList[b] == item.id) {
                        itemCount++;
                    }
                }
                if (bagListCart[i] == item.id) {
                    innerHTML += `  
                        <div class="cart-item">
                            <img class="cart-image" src="${item.image}" alt="item images">
                            <div class="item-desc">
                                <div class="rating">${item.rating.stars} | ${item.rating.count}k</div>
                                    <div class="company-name">${item.company}</div>
                                    <div class="item-name">${item.item_name}</div>
                                    <div class="price">
                                        <span class="current-price">₹${item.current_price}</span>
                                        <span class="original-price">₹${item.original_price}</span>
                                        <span class="discount">(₹${discountPrice} OFF)</span>
                                    </div>
                                    <div class="item-total">Quanity: ${itemCount}</div>
                                    <button class='btn-delete' onclick="deleteItem(${item.id});   displayItems();">Delete Item<button>
                                </div>
                        </div>
                    `;
                }
            });
        }
    }
    else {
        innerHTML += '<div class="company-name" style="text-align: center">No items to display</div>';
    }
    cartList.innerHTML = innerHTML;
}
function displaybutton() {
    if (bagList.length > 0) {
        cartButton.innerHTML = `Cart(${bagList.length})`;
    }
    else {
        cartButton.innerHTML = 'Cart';
    }
} 
function deleteItem(deleteItemId) {
    let index = bagListCart.indexOf(deleteItemId);
    if (index !== -1) {
        bagListCart.splice(index, 1);
    }
    bagList = bagListCart;
    localStorage.setItem('bagList', JSON.stringify(bagList));
    displaybutton();
    displayItemsBill();
}
function toggleMenu(){
    if(menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "400px";
    }
    else{
        menuList.style.maxHeight = "0px";
    }
}
function displayItemsBill() {
    let itemsTotal = 0;
    let itemsDiscountPrice = 0;
    let gstPrice = 0;
    let grandTotal = 0;
    for(let i=0; i<bagList.length; i++) {
        items.forEach((item) => {
            if(bagList[i] == item.id) {
                itemsTotal += item.current_price;
                let discount = item.original_price - item.current_price;
                itemsDiscountPrice += discount;
            }
        });
    }
    gstPrice = Math.round(itemsTotal * 0.18);
    grandTotal = Math.round(itemsTotal + 400 + gstPrice);
    billItems.innerHTML = `
            <h2 class="bill-title">Your Total Bill</h2>
            <div class="item-total"><b>Item Total:</b> &nbsp;  &nbsp;  &nbsp; ₹ ${itemsTotal}</div>
            <div class="item-total"><b>Discount:</b>  &nbsp;  &nbsp;  &nbsp; ₹ ${itemsDiscountPrice}</div>
            <div class="item-total"><b>Delivery:</b>  &nbsp;  &nbsp; &nbsp; ₹ 400</div>
            <div class="item-total"><b>GST price:</b>  &nbsp;  &nbsp;        ₹ ${gstPrice}</div>
            <hr style="color: black; height: 2.5px; background-color: black;">
            <div class="grand-total"><b>Grand Total:</b>  &nbsp;  &nbsp;   ₹ ${grandTotal} /-</div>
            <button class = "pay-btn">Address & Pay now</button>
    `;
}