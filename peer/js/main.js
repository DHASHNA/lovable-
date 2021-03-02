// database initializing
var database = firebase.database();

//product filter array
var filter_Arr = [];

// Remove items from the cart list
const deleteBtn = document.getElementsByClassName("delete-btn");
for (i = 0; i < deleteBtn.length; i++) {
  var deleteBtnEl = deleteBtn[i];
  deleteBtnEl.addEventListener("click", removeCartItem);
}

//initial Cart Count
var total = 0;

//remove cart items from the cart list
function removeCartItem(event) {
  var deleteBtnClick = event.target;

  //cart list Count
  var qty = document.getElementById("qty");
  total = total - 1;
  qty.innerText = total;
  // ==============================================//
  if(qty.innerText != 0){
    document.getElementById('buy-p').hidden = false;
  }else{
    document.getElementById('buy-p').hidden = true;
  }

  deleteBtnClick.parentElement.parentElement.remove();
  updateCartTotal();
}

//cart total function ->updateCartTotal
var modalFooter = document.getElementsByClassName("modal-footer")[0];
var totalPrice = modalFooter.getElementsByClassName("Total")[0];
function updateCartTotal() {
  var total = 0;
  var cartWrap = document.getElementsByClassName("cart-wrap");
  for (i = 0; i < cartWrap.length; i++) {
    var cartWrapEl = cartWrap[i];
    var cartPriceQty = cartWrapEl.getElementsByClassName("cart-priceQty")[0];

    var pprice = cartPriceQty.getElementsByClassName("pprice")[0];

    var qty = cartPriceQty.getElementsByClassName("qty")[0];
    var priceConvert = parseInt(pprice.innerText.replace("x", ""));
    total = total + priceConvert * qty.value;
  }

  totalPrice.innerText = `Total: ${total}`;
}

//Qty of product change
var qty = document.getElementsByClassName("qty");
for (i = 0; i < qty.length; i++) {
  var qtyEl = qty[i];
  qtyEl.addEventListener("change", inputValue);
}
// Qty value not equal to zero
function inputValue(event) {
  var selectInput = event.target;
  if (isNaN(selectInput.value) || selectInput.value <= 0) {
    selectInput.value = 1;
  }
  updateCartTotal();
}

// add cart ->which is used for getting the details from the clicked btn product
// then push into uploadToCart function
function addcartClicked(event) {
  var selectCart = event.target;

  //Sweet alert -> which is used for confirmertion of btn click, it will popup
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200
  });
  Toast.fire({
    icon: "success",
    title: "Your work has been saved"
  });

  //cart products count

  var qty = document.getElementById("qty");
  total = total + 1;
  qty.innerText = total;
  
//The product count is equal to zero the  buy btn is hide
if(qty.innerText != 0){
  document.getElementById('buy-p').hidden = false;
}else{
  document.getElementById('buy-p').hidden = true;
}

  //add cart parent element getting

  var addCartBtnParent = selectCart.parentElement;
  var imageEl = addCartBtnParent.getElementsByClassName("imgSrc")[0].src;
  var productDetailsEl = addCartBtnParent.getElementsByClassName("product-details")[0];
  var productNameEl = productDetailsEl.getElementsByClassName("product-name")[0].innerText;
  var priceEl = productDetailsEl.getElementsByClassName("price")[0].innerText;
  var priceConvertEl = priceEl.replace("Rs", "");
  var priceConvertPriceEl = priceConvertEl.replace("Prcie:", "");
  uploadTocart(imageEl, productNameEl, priceConvertPriceEl);
}

//upload to cart ->when the addcart btn click the owner of the btn product was push into cart list
function uploadTocart(imageEl, productNameEl, priceConvertPriceEl) {
  var imageNewEl = imageEl;
  var productNewNameEl = productNameEl;
  var priceNewEl = priceConvertPriceEl;

  var modalBody = document.getElementsByClassName("modal-body")[0];
  var newDiv = document.createElement("div");
  newDiv.classList.add("cart-wrap");

  var newProduct = `
    <div class="cart-img">
       <img src="${imageNewEl}" class="img">
    </div>
    <div class="cart-priceQty">
          <p class="cartProduct-name">${productNewNameEl}</p><br>
         <p class="pprice">${priceNewEl} X</p><input type="number" value="1" class="qty">
    </div>
    <div class="delete-btn-div">
        <button type="button" class="delete-btn btn-outline-danger">delete</button>
  </div>
   `;
  newDiv.innerHTML = newProduct;
  modalBody.append(newDiv);

  newDiv.getElementsByClassName("delete-btn")[0].addEventListener("click", removeCartItem);
  newDiv.getElementsByClassName("qty")[0].addEventListener("change", inputValue);

  updateCartTotal();
}

// popup function -> when the product was click this function will triger

function popup_fn(event) {
  var selectOne = event.target;
  var product_X = selectOne.parentElement.parentElement;
  var productImg_X = product_X.getElementsByClassName("imgSrc")[0].src;
  var productTitle_X = product_X.getElementsByClassName("product-name")[0].innerText;
  var productPrice_X = product_X.getElementsByClassName("price")[0].innerText;

  var priceConvertEl1 = productPrice_X.replace("Rs", "");
  var priceConvertPriceEl = priceConvertEl1.replace("Prcie:", "");

  var productPharagraph_X = product_X.getElementsByClassName("prodetails")[0].innerText;
  selectedProduct(productImg_X, productTitle_X, priceConvertPriceEl, productPharagraph_X);
}

//products push into popup function
function selectedProduct(productImg_X, productTitle_X, priceConvertPriceEl, productPharagraph_X) {
  var Eachproduct1 = document.getElementsByClassName("Each-product1")[0];
  var Selectedproduct = `<div class="product-wrap selected-product-wrap">
<img src="${productImg_X}" class="imgSrc" />
<div class="product-details">
  <h4 class="product-name">${productTitle_X}</h4>
  <p class="price">Prcie:&nbsp;${priceConvertPriceEl}</p>
  <p>${productPharagraph_X}</p>
</div>
</div>
<button class="add-cart"><i class="fa fa-shopping-cart"></i> Add Cart</button>
`;
  Eachproduct1.innerHTML = Selectedproduct;
  Eachproduct1.getElementsByClassName("add-cart")[0].addEventListener("click", addcartClicked);
}


// ============================================================================================

// Creating object for storing the data into the firebase
var selctedProductCont = document.getElementsByClassName("selcted-product-cont");
var arr = [];
var buyProduct = document.getElementById("buy-p");
buyProduct.addEventListener("click", () => {
  var cartWrap = document.getElementsByClassName("cart-wrap");
  for (i = 0; i < cartWrap.length; i++) {
    var cartWrapEl = cartWrap[i];
    var imgEl = cartWrapEl.getElementsByClassName("img")[0].src;
    var cartProductName = cartWrapEl.getElementsByClassName("cartProduct-name")[0].innerText;
    var pprice = cartWrapEl.getElementsByClassName("pprice")[0].innerText;
    var qty = cartWrapEl.getElementsByClassName("qty")[0].value;
    var total = document.getElementById("totalPrice").innerText;
    var obj = {
      img: `${imgEl}`,
      Name: `${cartProductName}`,
      Price: `${pprice}`,
      qty: `${qty}`
    };
    arr.push(obj);
  }

  var date =new Date();
  var date1 = date.getMilliseconds();
  var products_IdNum = Math.floor(Math.random()*1000*date1+1);
  var ref_obj = {
    Total: `${total}`,
    Date: `${date}`,
    id: `${products_IdNum}`
  }
  arr.push(ref_obj);

});

// --------------------------------------------------------------------------------------------



document.getElementById('original-Buy').addEventListener('click',()=>{

//address
const address_name = document.getElementById('userName').value;
const address_pno = document.getElementById('phoneNumber').value;
const address_pincode = document.getElementById('pinCode').value;
const address_DoorNo = document.getElementById('DoorNo').value;
const address_street = document.getElementById('street').value;
const address_landmark = document.getElementById('landmark').value;
const address_city  = document.getElementById('city').value;
var address = {
  Name:`${address_name}`,
  phoneNo: `${address_pno}`,
  pincode:`${address_pincode}`,
  DoorNo:`${address_DoorNo}`,
  street:`${address_street}`,
  landmark:`${address_landmark}`,
  city:`${address_city}`
};

arr.push(address);
  database.ref('orders').push({
    products:arr, 
  });
 
})

database.ref('orders').on('value',(snapshot)=>{
snapshot.forEach((userOrders)=>{
  productsKey = userOrders.key;
  productData = userOrders.val();

  

});
});

//===============================================================================================//
// frames collection
var frame_wrappper = document.getElementsByClassName("frame-wrapper row")[0];
database.ref("FramesList").on("value", (snapshot) => {
  frame_wrappper.innerHTML = "";
  snapshot.forEach((userData) => {
    
    Product_Id = userData.key;
    new_product = userData.val();
    filter_Arr.push(new_product);
    frame_wrappper.innerHTML += `
  <div class="Each-product col-md-3" data-filter="${new_product.name}" data-search="${new_product.name}">
  <div class="product-wrap" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
<img src="${new_product.imgUrl}" class="imgSrc" />
<div class="product-details">
  <h4 class="product-name">${new_product.name}</h4>
  <p class="price">Prcie:&nbsp;${new_product.price} Rs</p>
  <p class="prodetails">
    ${new_product.Description}
  </p>
</div>
</div>
<button class="add-cart"><i class="fa fa-shopping-cart"></i> Add Cart</button>
</div>
`;
  });

  var clickBtn = frame_wrappper.getElementsByClassName("add-cart");
  for (i = 0; i < clickBtn.length; i++) {
    var btnList = clickBtn[i];
    btnList.addEventListener("click", addcartClicked);
  }

  var productWrapEl = frame_wrappper.getElementsByClassName("product-wrap");
  for (i = 0; i < productWrapEl.length; i++) {
    var productEl = productWrapEl[i];
    productEl.addEventListener("click", popup_fn);
  }
});



// =======================================================================================
// Gifts collection

var frame_wrapper1 = document.getElementsByClassName("frame-wrapper1 row")[0];
database.ref("GiftsList").on("value", (snapshot) => {
  frame_wrapper1.innerHTML = "";
  snapshot.forEach((userData) => {
    Product_Id = userData.key;
    new_product = userData.val();
    frame_wrapper1.innerHTML += `
  <div class="Each-product col-md-3" data-filter="${new_product.name}" data-search="${new_product.name}">
  <div class="product-wrap" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
<img src="${new_product.imgUrl}" class="imgSrc" />
<div class="product-details">
  <h4 class="product-name">${new_product.name}</h4>
  <p class="price">Prcie:&nbsp;${new_product.price} Rs</p>
  <p class="prodetails">
    ${new_product.Description}
  </p>
</div>
</div>
<button class="add-cart"><i class="fa fa-shopping-cart"></i> Add Cart</button>
</div>
`;
  });

  var clickBtn = frame_wrapper1.getElementsByClassName("add-cart");
  for (i = 0; i < clickBtn.length; i++) {
    var btnList = clickBtn[i];
    btnList.addEventListener("click", addcartClicked);
  }

  var productWrapEl = frame_wrapper1.getElementsByClassName("product-wrap");
  for (i = 0; i < productWrapEl.length; i++) {
    var productEl = productWrapEl[i];
    productEl.addEventListener("click", popup_fn);
  }
});

// ===========================================================================
// Hand Craft products

var frame_wrapper2 = document.getElementsByClassName("frame-wrapper2 row")[0];
database.ref("HandCraftList").on("value", (snapshot) => {
  frame_wrapper2.innerHTML = "";
  snapshot.forEach((userData) => {
    Product_Id = userData.key;
    new_product = userData.val();
    frame_wrapper2.innerHTML += `
  <div class="Each-product col-md-3" data-filter="${new_product.name}" data-search="${new_product.name}">
  <div class="product-wrap" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
<img src="${new_product.imgUrl}" class="imgSrc" />
<div class="product-details">
  <h4 class="product-name">${new_product.name}</h4>
  <p class="price">Prcie:&nbsp;${new_product.price} Rs</p>
  <p class="prodetails">
    ${new_product.Description}
  </p>
</div>
</div>
<button class="add-cart"><i class="fa fa-shopping-cart"></i> Add Cart</button>
</div>
`;
  });

  var clickBtn = frame_wrapper2.getElementsByClassName("add-cart");
  for (i = 0; i < clickBtn.length; i++) {
    var btnList = clickBtn[i];
    btnList.addEventListener("click", addcartClicked);
  }

  var productWrapEl = frame_wrapper2.getElementsByClassName("product-wrap");
  for (i = 0; i < productWrapEl.length; i++) {
    var productEl = productWrapEl[i];
    productEl.addEventListener("click", popup_fn);
  }
});
