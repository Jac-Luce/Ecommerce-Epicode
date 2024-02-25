// Api endpoint e key authorization
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const keyAuthoriz = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0Yjk3ZTljNDM3MDAwMTkzYzM2MjkiLCJpYXQiOjE3MDg0Mzk5MzQsImV4cCI6MTcwOTY0OTUzNH0.wx9aBHYm_FvDR2pNWkxwIiVpfdiCmFWuZMn3Hz3RmoE";

// Params
let activeParams = window.location.search;
const params = new URLSearchParams(activeParams);
const productId = params.get('id');

let desc;

window.onload = productDesc();

async function productDesc() {
    try {
        let res = await fetch(`${endpoint}${productId}` , { headers: { "Authorization": keyAuthoriz} });
        let json = await res.json();
        console.log(json);
        desc = json;
        console.log(desc);

        let imgCard = document.getElementById('imgCard');
        imgCard.src = desc.imageUrl;

        let titleProd = document.querySelector('.card-title');
        titleProd.innerText = desc.name;

        let descProd = document.querySelector('.desc');
        descProd.innerText = desc.description;

        let brandPrice = document.querySelector('.brandPrice');
        brandPrice.innerText = "Brand: " + desc.brand + " " + desc.price + "€";
    } catch (error) {
        console.log(error);
    }
}

//productDesc();


