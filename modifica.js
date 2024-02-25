// Api endpoint & key authorization
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const keyAuthoriz = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0Yjk3ZTljNDM3MDAwMTkzYzM2MjkiLCJpYXQiOjE3MDg0Mzk5MzQsImV4cCI6MTcwOTY0OTUzNH0.wx9aBHYm_FvDR2pNWkxwIiVpfdiCmFWuZMn3Hz3RmoE";

//Input
const titleName = document.getElementById('titleName');
const descProd = document.getElementById('descProd');
const brandProd = document.getElementById('brandProd');
const inputImage = document.getElementById('inputImage');
const priceProd = document.getElementById('priceProd');

//Alert update
const upEdit = document.getElementById('upEdit');

//Alert denger
const dangerEdit = document.getElementById('dangerEdit');

// Params
let activeParams = window.location.search;
const params = new URLSearchParams(activeParams);
const productId = params.get('id');

window.onload = editShow();

async function editShow () {
    try {
        let res = await fetch(`${endpoint}${productId}` , { headers: { "Authorization": keyAuthoriz} });
        let json = await res.json();

        titleName.value = json.name;
        descProd.value = json.description;
        brandProd.value = json.brand;
        inputImage.value = json.imageUrl;
        priceProd.value = json.price;

    } catch (error) {
        console.log(error);
    }
}

async function editProd() {
    if(titleName.value && descProd.value && brandProd.value && inputImage.value && priceProd.value) {
        try {
            let myEdit = {"name": titleName.value, "description": descProd.value, "brand": brandProd.value, "imageUrl": inputImage.value, "price": priceProd.value};

            let res = await fetch(`${endpoint}${productId}` , { method: "PUT", body: JSON.stringify(myEdit), headers: {"Content-Type": "application/json", "Authorization": keyAuthoriz} });

            upEdit.classList.toggle('d-none'); //alert edit
            setTimeout(() => {
                upEdit.classList.toggle('d-none');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    } else {
        dangerEdit.classList.toggle('d-none');
        setTimeout(() => {
            dangerEdit.classList.toggle('d-none');
        }, 3000);
    }
}