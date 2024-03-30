import carRepo from './repository/car-repo.js'

const form=document.querySelector("#search-car-form")


const yearSelect = document.querySelector("#year");
const typeSelect = document.querySelector("#car_type");
const makeSelect = document.querySelector("#make");
const modelSelect = document.querySelector("#model");
const searchCar = document.querySelector("#search-cars");
const featCars=document.querySelector("#cars")


form.addEventListener('submit',showSelectedCars)
makeSelect.addEventListener('change',handleMakeChange)
typeSelect.addEventListener('change',handleTypeChange)
yearSelect.addEventListener('change',handleYearChange)
form.addEventListener('reset',handleReset)


document.addEventListener("DOMContentLoaded", async () => {
    window.showSelectedCars=showSelectedCars
    window.handleMakeChange=handleMakeChange
    window.handleTypeChange=handleTypeChange
    window.handleYearChange=handleYearChange
    window.showSelectedCars=showSelectedCars
    window.fillPage=fillPage
    window.handleReset=handleReset
    window.formToObj=formToObj

    fillPage()

    

});



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

    let listHTML='';
    let itemCount=1

    cars.forEach(car=>{

        listHTML += `

                <div class="car-card">
                    <img src="${car.image_url}">

                    <p class="car-info">Model: ${car.model} <br> Year: ${car.year}</p>
                    <br>
                    <h4 class="car-name">${car.make} </h4>

                    <h4 class="car-price">$${car.price}</h4>
                    <br>
                    <a class="add-item${itemCount}" href="SignIn.html">Login to Continue</a>

                </div>
           `;
            itemCount++;
        }
    )

    searchCar.innerHTML=listHTML;

}



async function fillPage(){
    

    let cars;
    cars = await carRepo.getCars();

    const totalCars = cars.length;

    const randomCars = [];

    while (randomCars.length < 6) {
        const randomIndex = Math.floor(Math.random() * totalCars);
        const randomCar = cars[randomIndex];

        if (!randomCars.includes(randomCar)) {
            randomCars.push(randomCar);
        }
    }

    console.log(randomCars);




    let listHTML='';
    let itemCount=1

    randomCars.forEach(car=>{
        
        listHTML += `

                <div class="car-box">
                    <img src="${car.image_url}">

                    <p class="car-info">Model: "${car.model}" Year: "${car.year}"</p>
                    <br>
                    <h4 class="car-name">"${car.make}" </h4>

                    <h4 class="car-price">$"${car.price}"</h4>
                    
                    <br>
                    <a class="add-item${itemCount}" href="SignIn.html">Login to Continue</a>
                </div>
           `;
        itemCount++;
        }
    )

    featCars.innerHTML=listHTML;

}


function handleReset(){
    form.reset;
}


function formToObj(form) {
    
    const formData = new FormData(form);
    let formObject = {};

    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    return formObject;
}


