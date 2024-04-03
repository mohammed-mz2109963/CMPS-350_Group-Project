import carRepo from './repository/car-repo.js'

const form=document.querySelector("#search-car-form")


const yearSelect = document.querySelector("#year");
const typeSelect = document.querySelector("#car_type");
const makeSelect = document.querySelector("#make");
const modelSelect = document.querySelector("#model");
const searchCar = document.querySelector("#search-cars");
const featCars=document.querySelector("#cars")
//const fcart=document.querySelector("#fcart-btn")
//const cart=document.querySelector("#cart-btn")


form.addEventListener('submit',showSelectedCars)
makeSelect.addEventListener('change',handleMakeChange)
typeSelect.addEventListener('change',handleTypeChange)
yearSelect.addEventListener('change',handleYearChange)
form.addEventListener('reset',handleReset)
//fcart.addEventListener('click',addCart)
//cart.addEventListener('click',addCart)

// document.addEventListener('click', function(event) {
//     if (event.target && event.target.id === 'cart-btn') {
//         addCart();
//     }
// });

// featCars.addEventListener('click', function(event) {
//     if (event.target && event.target.id === 'fcart-btn') {
//         addCart();
//     }
// });



document.addEventListener("DOMContentLoaded", async () => {
    window.showSelectedCars=showSelectedCars
    window.handleMakeChange=handleMakeChange
    window.handleTypeChange=handleTypeChange
    window.handleYearChange=handleYearChange
    window.showSelectedCars=showSelectedCars
    window.fillPage=fillPage
    window.handleReset=handleReset
    window.formToObj=formToObj
    window.addCart-addCart

    fillPage()

   featCars.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains("fcart-btn")) {
            const carId = event.target.dataset.carId;
            addCart(carId); 
        }
    });

       searchCar.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains("cart-btn")) {
            const carId = event.target.dataset.carId;
            addCart(carId); 
        }
    });

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const notifySpan = document.getElementById('notify');
    if (notifySpan) {
        notifySpan.textContent = cartItems.reduce((total, item) => total + item.count, 0);
    } else {
        console.error("Element with ID 'notify' not found in the DOM.");
    }

  

});


async function addCart(carId){
    console.log("cart clicked")
        console.log(carId)

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = cartItems.findIndex(item => item.carId === carId);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].count++;
    } else {
        cartItems.push({ carId: carId, count: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const notifySpan = document.getElementById('notify');
    if (notifySpan) {
        notifySpan.textContent = cartItems.reduce((total, item) => total + item.count, 0);
    } else {
        console.error("Element with ID 'notify' not found in the DOM.");
    }

        
    }


async function handleYearChange(){
    let year=yearSelect.value
    if(year===""){ 
        return;
    }
    console.log(year)
    year = year.toString()
    console.log(year)
    console.log(typeof year)

    let cars=await carRepo.getCarsByYear(year)
    console.log('handleYearChange :',cars)

    if(typeSelect.value){
            cars=cars.filter(car=>car.type==typeSelect.value)
        }
    if(makeSelect.value){
            cars=cars.filter(car=>car.make==makeSelect.value)
        }

        cars = cars.filter(car => {
            if (!cars.includes(car.type)) {
            cars.push(car.type);
            return true;
            }
            return false;
            });

        typeSelect.innerHTML = [
            `<option value="">Select Type</option>`, 
            ...cars.map(car => `<option value='${car.type}'>${car.type}</option>`) 
        ].join('');

        if(!makeSelect.value){

            cars = cars.filter(car => {
        if (!cars.includes(car.make)) {
            cars.push(car.make);
            return true;
        }
        return false;
        });

        makeSelect.innerHTML = [
            `<option value="">Select Make</option>`, 
            ...cars.map(car => `<option value='${car.make}'>${car.make}</option>`) 
        ].join('');
        }



}


async function handleTypeChange(){
    const type=typeSelect.value
     if(type===""){ 
        return;
    }
    console.log(type)

    let cars=await carRepo.getCarsByType(type)

    if(yearSelect.value){
            cars=cars.filter(car=>car.year==yearSelect.value)
        }
    if(makeSelect.value){
            cars=cars.filter(car=>car.make==makeSelect.value)
        }

    cars = cars.filter(car => {
        if (!cars.includes(car.make)) {
            cars.push(car.make);
            return true;
        }
        return false;
        });

    makeSelect.innerHTML = [
            `<option value="">Select Make</option>`, 
            ...cars.map(car => `<option value='${car.make}'>${car.make}</option>`) 
        ].join('');

    if(!yearSelect.value){

        cars = cars.filter(car => {
        if (!cars.includes(car.year)) {
            cars.push(car.year);
            return true;
        }
        return false;
        });



        yearSelect.innerHTML = [
            `<option value="">Select Year</option>`, 
            ...cars.map(car => `<option value='${car.year}'>${car.year}</option>`) 
        ].join('');
    }

        
        

}


async function handleMakeChange(){
        
        const make=makeSelect.value
         if(make===""){ 
        return;
    }
        console.log(make)
        

        let cars=await carRepo.getCarsByMake(make)

        if(yearSelect.value){
            cars=cars.filter(car=>car.year==yearSelect.value)
        }
        if(typeSelect.value){
            cars=cars.filter(car=>car.type==typeSelect.value)
        }


        cars = cars.filter(car => {
        if (!cars.includes(car.model)) {
            cars.push(car.model);
            return true;
        }
        return false;
        });

        
        modelSelect.innerHTML = [
            `<option value="">Select Model</option>`, 
            ...cars.map(car => `<option value='${car.model}'>${car.model}</option>`) 
        ].join('');

       if(!yearSelect.value){

        cars = cars.filter(car => {
        if (!cars.includes(car.year)) {
            cars.push(car.year);
            return true;
        }
        return false;
        });

        yearSelect.innerHTML = [
            `<option value="">Select Year</option>`, 
            ...cars.map(car => `<option value='${car.year}'>${car.year}</option>`) 
        ].join('');
        }

        if(!typeSelect.value){


        cars = cars.filter(car => {
        if (!cars.includes(car.type)) {
            cars.push(car.type);
            return true;
        }
        return false;
        });


        typeSelect.innerHTML = [
            `<option value="">Select Type</option>`, 
            ...cars.map(car => `<option value='${car.type}'>${car.type}</option>`) 
        ].join('');
        }


}




async function showSelectedCars(e){

    
    e.preventDefault();
    console.log(e)
    const carSearch = formToObj(e.target)
    console.log(carSearch)

    let cars;
    cars=await carRepo.getCars()

    if (carSearch.year && carSearch.year !== "") {
        cars = cars.filter(car => car.year === parseInt(carSearch.year));
    }
    if (carSearch.car_type && carSearch.car_type !== "") {
        cars = cars.filter(car => car.type === carSearch.car_type);
    }
    if (carSearch.make && carSearch.make !== "") {
        cars = cars.filter(car => car.make === carSearch.make);
    }
    if (carSearch.model && carSearch.model !== "") {
        cars = cars.filter(car => car.model === carSearch.model);
    }
    if (carSearch.min_price && carSearch.min_price !== "") {
        cars = cars.filter(car => car.price >= parseInt(carSearch.min_price));
    }
    if (carSearch.max_price && carSearch.max_price !== "") {
        cars = cars.filter(car => car.price <= parseInt(carSearch.max_price));
    }

    console.log(cars);

    let hrefText=""
    let descText=""
    // let cart=""
    let isBuyer=false

    const currentPagePath = window.location.pathname;

    if (currentPagePath.toLowerCase() === '/buyerhomepage.html') {
        console.log("User is on the buyer page");
        descText="Add to cart"
        // cart="cart-button"
        isBuyer=true
    } else if (currentPagePath.toLowerCase() === '/sellerhomepage.html') {
        console.log("User is on the seller page");
        
        
    } else if (currentPagePath.toLowerCase() === '/guesthomepage.html'){
        console.log("User is on a guest page");
        descText="Login to continue"
        hrefText="/signin.html"
    }


    let listHTML='';
    let itemCount=1

    cars.map(car=>{

        listHTML += `

                <div class="car-card">
                    <img src="${car.image_url}">

                    <p class="car-info">Model: ${car.model} <br> Year: ${car.year}</p>
                    <br>
                    <h4 class="car-name">${car.make} </h4>

                    <h4 class="car-price">$${car.price}</h4>
                    <br>
                    
                    ${isBuyer ? 
                    `<input  type="button" class="cart-btn" data-car-id="${car.id}" id="cart-btn" value="Add to cart">`
                    :   `<a class="add-item${itemCount}" id="cart-button" href=${hrefText}>${descText}</a>`
                    }
                    <br>

                </div>
                
           `;
            itemCount++;
            // console.log(cart)
        }
    )

    searchCar.innerHTML=listHTML;

    //     const fcart = document.querySelector("#fcart-btn");
    // if (fcart) {
    //     fcart.addEventListener('click', addCart);
    // } else {
    //     console.error("Element with ID 'fcart-btn' not found in the DOM.");
    // }

}






async function fillPage(){
    

        let cars;
    cars = await carRepo.getCars();

    
        const uniqueYears = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
    yearSelect.innerHTML = [
        `<option value="">Select Year</option>`,
        ...uniqueYears.map(year => `<option value="${year}">${year}</option>`)
    ].join('');
    
    const uniqueTypes = [...new Set(cars.map(car => car.type))];
    typeSelect.innerHTML = [
        `<option value="">Select Type</option>`,
        ...uniqueTypes.map(type => `<option value="${type}">${type}</option>`)
    ].join('');

    
    const uniqueMakes = [...new Set(cars.map(car => car.make))];
    makeSelect.innerHTML = [
        `<option value="">Select Make</option>`,
        ...uniqueMakes.map(make => `<option value="${make}">${make}</option>`)
    ].join('');



    const totalCars = cars.length;

    const randomCars = [];

    while (randomCars.length < 8) {
        const randomIndex = Math.floor(Math.random() * totalCars);
        const randomCar = cars[randomIndex];

        if (!randomCars.includes(randomCar)) {
            randomCars.push(randomCar);
        }
    }

    console.log(randomCars);

    let hrefText=""
    let descText=""
    let isBuyer=true

    const currentPagePath = window.location.pathname;

    if (currentPagePath.toLowerCase() === '/buyerhomepage.html') {
        console.log("User is on the buyer page");
        


    } else if (currentPagePath.toLowerCase() === '/sellerhomepage.html') {
        console.log("User is on the seller page");
        isBuyer=false
        
    } else if (currentPagePath.toLowerCase() === '/guesthomepage.html'){
        console.log("User is on a guest page");
        descText="Login to continue"
        hrefText="/signin.html"
        isBuyer=false
    }


    let listHTML='';
    let itemCount=1

    randomCars.map(car=>{
        
        listHTML += `
            
                <div class="car-box">
                    <img src="${car.image_url}">
                    <br>

                    <p class="car-info">Model: ${car.model} <br> Year: ${car.year}</p>
                    <br>
                    <h4 class="car-name">${car.make} </h4>

                    <h4 class="car-price">$ ${car.price}</h4>
                    
                    <br>
                    ${isBuyer ? 
                    `<input  type="button" class="fcart-btn" data-car-id="${car.id}" id="fcart-btn" value="Add to cart">`
                    :   `<a class="add-item${itemCount}" id="fcart-button" href=${hrefText}>${descText}</a>`
                    }
                </div>
           `;
                itemCount++;
        
            
        }
    )

    featCars.innerHTML=listHTML;

    


}


async function handleReset(){
    form.reset;
     let cars;
    cars = await carRepo.getCars();

    
        const uniqueYears = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
    yearSelect.innerHTML = [
        `<option value="">Select Year</option>`,
        ...uniqueYears.map(year => `<option value="${year}">${year}</option>`)
    ].join('');
    
    const uniqueTypes = [...new Set(cars.map(car => car.type))];
    typeSelect.innerHTML = [
        `<option value="">Select Type</option>`,
        ...uniqueTypes.map(type => `<option value="${type}">${type}</option>`)
    ].join('');

    
    const uniqueMakes = [...new Set(cars.map(car => car.make))];
    makeSelect.innerHTML = [
        `<option value="">Select Make</option>`,
        ...uniqueMakes.map(make => `<option value="${make}">${make}</option>`)
    ].join('');

    searchCar.innerHTML="";

}


function formToObj(form) {
    
    const formData = new FormData(form);
    let formObject = {};

    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    return formObject;
}


