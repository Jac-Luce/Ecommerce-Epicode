// Api endpoint e key authorization
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const keyAuthoriz = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0Yjk3ZTljNDM3MDAwMTkzYzM2MjkiLCJpYXQiOjE3MDg0Mzk5MzQsImV4cCI6MTcwOTY0OTUzNH0.wx9aBHYm_FvDR2pNWkxwIiVpfdiCmFWuZMn3Hz3RmoE";

//Card Container
const cardContainer = document.getElementById('cardContainer');

//Input
const titleName = document.getElementById('titleName');
const descProd = document.getElementById('descProd');
const brandProd = document.getElementById('brandProd');
const inputImage = document.getElementById('inputImage');
const priceProd = document.getElementById('priceProd');

// Creo array di prodotti da inserire nell'API
const addProduct = [
    {"name": "T-shirt", "description": "100% cotone", "brand": "Zara", "imageUrl": "https://www.buyitalianstyle.com/13382-large_default/maglia-bimba-manica-lunga-unicorno-nome.jpg", "price": 35},
    {"name": "Jeans", "description": "Jeans slavato", "brand": "Ovs", "imageUrl": "https://msj-prod.s3.eu-central-1.amazonaws.com/ProductImage/Big/ti_4lwdzlgvu/cu_1/09459C050-1325-44D1-B993-0837B289DF2F.jpg", "price": 40},
    {"name": "Gonna midi", "description": "Lunghezza sotto ginocchio", "brand": "Vicolo", "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/gonne-midi-autunno-inverno-tendenze-2022-2-1659967608.jpg?crop=1.00xw:0.668xh;0,0.262xh&resize=1200:*", "price": 100},
    {"name": "Camicia", "description": "100% cotone", "brand": "Zara", "imageUrl": "https://www.lestyledeparis.com/cdn/shop/products/9.30vanit_1000x.jpg?v=1675680647", "price": 25},
    {"name": "Occhiali da sole", "description": "forma cat eye", "brand": "Moschino", "imageUrl": "https://assets.burberry.com/is/image/Burberryltd/1B323356-486A-4001-92DE-32BE2E2D5A58?$BBY_V3_SL_1$&wid=1501&hei=1500", "price": 190},
    {"name": "Sandalo gioiello", "description": "tacco 10cm", "brand": "Jimmy Choo", "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/sandali-gioiello-saldi-estate-2019-1563779783.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*", "price": 450},
    {"name": "Cappello", "description": "80% lana 20% poliestere", "brand": "Zara", "imageUrl": "https://www.camomillaitalia.com/dw/image/v2/BHDG_PRD/on/demandware.static/-/Sites-masterCatalog/default/dwedba4aa1/images/523CAMILLAAQUAM.jpg?sw=900&sfrm=png&q=90", "price": 15},
];

window.onload = endpointControll();

// Chiamata fetch all'endpoint per visualizzare il contenuto iniziale
async function endpointControll() {
    try {
        let res = await fetch(endpoint , { headers: { "Authorization": keyAuthoriz} });
        let json = await res.json();
        cardContainer.innerHTML = "";
        json.forEach(element => {
            createCardTemplate(element);
        });
    } catch (error) {
        console.log(error);
    }
}


//Funzione per inserire gli oggetti nell'api
async function addArrayObject() {
    for(let products of addProduct) {
        try {
            let res = await fetch(endpoint,{ method: "POST", body: JSON.stringify(products), headers: { "Content-type": "application/json;charset=UTF-8", "Authorization": keyAuthoriz}} );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
   }
}

//endpointControll();

//Creazione template
function createCardTemplate ({name, imageUrl, price, _id}) {
     /* <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div> */
    let cardBox = document.createElement('div');
    cardBox.classList.add('card', 'me-4', 'mb-5', 'd-flex', 'position-relative', 'border-0');
    cardBox.style.width = "12rem";
      
    let imgCard = document.createElement('img');
    imgCard.classList.add('card-img-top', 'img-fluid', 'imgStyle', 'rounded');
    imgCard.src = imageUrl;

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'fs-6', 'text-center', 'mb-0');
    cardTitle.innerText = name;

    let priceCard = document.createElement('p');
    priceCard.classList.add('card-text', 'price', 'text-center', 'fst-italic', 'text-muted', 'mb-1');
    priceCard.innerText = "Price: " + price + "€";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(priceCard);

    cardBox.appendChild(imgCard);
    cardBox.appendChild(cardBody);

    cardContainer.appendChild(cardBox);

    //Tasti Edit e Delete
    let divBtn = document.createElement('div');
    divBtn.classList.add('d-flex' , 'position-absolute', 'top-50', 'end-0', 'mt-5');

    let editBtn = document.createElement('a');
    editBtn.classList.add('btn', 'btn-outline-info', 'btn-sm', 'btnEditDel', 'rounded-circle');
    editBtn.href = `modifica.html?id=${_id}`; //modifica dati prodotto
    editBtn.target = '_blank'; //comando che consente di aprire un'altra scheda
    let editImg = document.createElement('i');
    editImg.classList.add('fa-solid', 'fa-pencil');
    editBtn.appendChild(editImg);

    let delBtn = document.createElement('a');
    delBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mx-1', 'btnEditDel', 'rounded-circle');
    delBtn.addEventListener('click', () => { //elimina prodotto
        deleteCard(_id);
    })
    let delImg = document.createElement('i');
    delImg.classList.add('fa-solid', 'fa-trash');
    delBtn.appendChild(delImg);
    divBtn.appendChild(editBtn);
    divBtn.appendChild(delBtn);

    cardBox.appendChild(divBtn);

    //link descrizione
    let linkDesc = document.createElement('a');
    linkDesc.classList.add('text-muted', 'linkDesc', 'ms-2');
    linkDesc.href = `descrizione.html?id=${_id}`;
    linkDesc.innerText = "See More!";
    cardBody.appendChild(linkDesc);
}

// Funzione per eliminare un prodotto
async function deleteCard(id){
    let res = await fetch(endpoint + id,{ method: "DELETE", headers: { "Content-type": "application/json;charset=UTF-8", "Authorization": keyAuthoriz}} );
}

//Funzione per aggiungere un prodotto
async function addNewProduct() {
    if(titleName.value && descProd.value && brandProd.value && inputImage.value && priceProd.value) {
        let newProd = {"name": titleName.value, "description": descProd.value, "brand": brandProd.value, "imageUrl": inputImage.value, "price": priceProd.value, "time": new Date()};

        try {
            
            let res = await fetch(endpoint,{ method: "POST", body: JSON.stringify(newProd), headers: { "Content-type": "application/json;charset=UTF-8", "Authorization": keyAuthoriz}} );
            endpointControll();

        } catch (error) {
            console.log(error);
        }
    }
}