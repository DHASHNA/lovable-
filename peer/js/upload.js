// firebase initialize
var database = firebase.database();

// firebase Storage init
var storage = firebase.storage();

// files uploading to firebase
var uploadEl = document.getElementById('upload');

var urlImage;

var imageGet = document.getElementById('image-file');
imageGet.addEventListener('change',()=>{
var imageEl = imageGet.files[0];
// file name getting
var imageName = imageEl.name;

// storage ref
var storageRef = storage.ref('upload/'+imageName); 

// upload image
var uploadEl = storageRef.put(imageEl);

// access the image
uploadEl.on('state_changed',function progress(snapshot){

    var progressEl = document.getElementById('progress');
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    progressEl.value = percentage;

 },function error(err){
     console.log(err.message);
 },
  function completed(){
    uploadEl.snapshot.ref.getDownloadURL().then(function(url){ 
         urlImage = `${url}`;
        var imgsrc = document.getElementById('imgscr');
         imgsrc.innerHTML = `<img src="${urlImage}" style="height:100px;width:150px; id="productImgEl">`
      });
  });
});


function clrscr(){
  var contentWrap = document.getElementById('content-wrap');
  var textArea = document.getElementById('Description');
  var inputEl = contentWrap.querySelectorAll('input');
   inputEl.forEach((valueEl1)=>{
    valueEl1.value = '';
   });
   textArea.value = '';
}

var productNameEl = document.getElementById('productName');
var priceProductEl = document.getElementById('priceProduct');
var Description = document.getElementById('Description');
var choose_type = document.getElementById('catagory');
uploadEl.addEventListener('click',()=>{
  var nameEl_p = productNameEl.value;
  var priceEl_p = priceProductEl.value;
  var details_p = Description.value;
  var imageUrl = urlImage;

  var product_type = choose_type.value;

  switch(product_type){

  case "Frames": 
  database.ref('FramesList').push({
    name : nameEl_p,
    price : priceEl_p,
    imgUrl : imageUrl,
    Description : details_p
  });
  break;

  case "gifts": 
  database.ref('GiftsList').push({
    name : nameEl_p,
    price : priceEl_p,
    imgUrl : imageUrl,
    Description : details_p
  });
  break;

  case "handCraft": 
  database.ref('HandCraftList').push({
    name : nameEl_p,
    price : priceEl_p,
    imgUrl : imageUrl,
    Description : details_p
  });
  break;

default: console.log("hello bro");
break;
 }
 clrscr();
});
// ===============================================================
// save changes btn 
var saveChange = document.getElementById('save_change');
var unique_Id = document.getElementById('unique_id');

// frame section
var frameBody = document.getElementById('frame-body');
// getting data from the database
database.ref('FramesList').on('value',(snapshot)=>{
  frameBody.innerHTML = "";
   snapshot.forEach((AdminData)=>{
     key = AdminData.key;
    Product_data = AdminData.val();
    frameBody.innerHTML += `<tr>
    <td>${key}</td>
    <td>${Product_data.name}</td>
    <td>${Product_data.price}</td>
    <td><img src="${Product_data.imgUrl}"></td>
    <td><button onclick="editBtn1('${key}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Edit</button><button onclick="remove1('${key}')">Delete</button></td>
    </tr>`
   });
})
 
// edit product details;
function editBtn1(key_el){
  saveChange.hidden = false;
  database.ref('FramesList/'+key_el).once('value',(snapshot)=>{
    unique_Id.value = key_el; 
    productNameEl.value = snapshot.val().name;
    priceProductEl.value = snapshot.val().price;
    Description.value = snapshot.val().Description;
  });
}

function save_change(){
 
  saveChange.hidden = true;

  var productkey = unique_Id.value;
   p_name =  productNameEl.value;
   p_price = priceProductEl.value;
   p_description = Description.value;
   p_img = urlImage;
database.ref('FramesList/'+productkey).update({
  name : p_name,
  price : p_price,
  imgUrl : p_img,
  Description : p_description
});
clrscr();
}

function remove1(keyEl2){
  database.ref('FramesList/'+keyEl2).remove();
}


// // =================================================================
// // gift section

// // gifts section
var giftBody = document.getElementById('Gift-body');
var unique_Id = document.getElementById('unique_id');
// getting data from the database
database.ref('GiftsList').on('value',(snapshot)=>{
  giftBody.innerHTML = "";
   snapshot.forEach((AdminData)=>{
     key = AdminData.key;
    Product_data = AdminData.val();
    giftBody.innerHTML += `<tr>
    <td>${key}</td>
    <td>${Product_data.name}</td>
    <td>${Product_data.price}</td>
    <td><img src="${Product_data.imgUrl}"></td>
    <td><button onclick="editBtn2('${key}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Edit</button><button onclick="remove2('${key}')">Delete</button></td>
    </tr>`
   });
})
 
// edit product details;
function editBtn2(key_el){
  saveChange.hidden = false;
  database.ref('GiftsList/'+key_el).once('value',(snapshot)=>{
    unique_Id.value = key_el; 
    productNameEl.value = snapshot.val().name;
    priceProductEl.value = snapshot.val().price;
    Description.value = snapshot.val().Description;
  });
}

function save_change(){
  saveChange.hidden = true;
  var productkey = unique_Id.value;
   p_name =  productNameEl.value;
   p_price = priceProductEl.value;
   p_description = Description.value;
   p_img = urlImage;
  database.ref('GiftsList/'+productkey).update({
  name : p_name,
  price : p_price,
  imgUrl : p_img,
  Description : p_description
});
clrscr();
}

function remove2(keyEL){
  database.ref('GiftsList/'+keyEL).remove();
}

// ===============================================================
// HandCraft section

// HandCraft section
var CraftBody = document.getElementById('Craft-body');
var unique_Id = document.getElementById('unique_id');
// getting data from the database
database.ref('HandCraftList').on('value',(snapshot)=>{
  CraftBody.innerHTML = "";
   snapshot.forEach((AdminData)=>{
     key = AdminData.key;
    Product_data = AdminData.val();
    CraftBody.innerHTML += `<tr>
    <td>${key}</td>
    <td>${Product_data.name}</td>
    <td>${Product_data.price}</td>
    <td><img src="${Product_data.imgUrl}"></td>
    <td><button onclick="editBtn3('${key}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Edit</button><button onclick="remove3('${key}')">Delete</button></td>
    </tr>`
   });
})
 
// edit product details;
function editBtn3(key_el){
  saveChange.hidden = false;
  database.ref('HandCraftList/'+key_el).once('value',(snapshot)=>{
    unique_Id.value = key_el; 
    productNameEl.value = snapshot.val().name;
    priceProductEl.value = snapshot.val().price;
    Description.value = snapshot.val().Description;
  });
}

function save_change(){
  saveChange.hidden = true;
  var productkey = unique_Id.value;
   p_name =  productNameEl.value;
   p_price = priceProductEl.value;
   p_description = Description.value;
   p_img = urlImage;
database.ref('HandCraftList/'+productkey).update({
  name : p_name,
  price : p_price,
  imgUrl : p_img,
  Description : p_description
});
clrscr();
}

function remove3(key1){
  database.ref('HandCraftList/'+key1).remove();
}
