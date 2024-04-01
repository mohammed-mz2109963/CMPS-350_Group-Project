import carRepo from './repository/car-repo.js'
//import userRepo from './repository/user-repo.js'

const sellForm = document.querySelector("#sell-form");

const sellerName = document.querySelector('#seller-name')
const sellerEmail = document.querySelector('#seller-email')
const sellerPhone = document.querySelector('#seller-phone')
const sellerContact = document.querySelector('#input[name="seller-contact"]:checked')
const carYear = document.querySelector('#car-year')
const carMake = document.querySelector('#car-make')
const carModel = document.querySelector('#car-model')
const carType = document.querySelector('#car-type')
const carPrice = document.querySelector('#car-price')
// const carDistance = document.querySelector('#car-distance')
const carImage = document.querySelector('#car-image')

sellForm.addEventListener('submit', handleSellForm)


document.addEventListener('DOMContentLoaded', function() {

    window.handleSellForm=handleSellForm
    

});

async function handleSellForm(e){

    e.preventDefault();

    
    
//     const sName = sellerName.value;
//     const sEmail = sellerEmail.value;
//     const sPhone = sellerPhone.value;
//     const sContact = sellerContact.value;
    
//     const cYear = carYear.value;
//     const cMake = carMake.value;
//     const cModel = carModel.value;
//     const cType = carType.value;
//     const cPrice = carPrice.value;
//    //const cDistance = carDistance.value;
//     const cImage = carImage.files[0].name;

    let userData={}

    if (sellerContact && sellerContact.value) {
         userData={
            name : sellerName.value,
            email : sellerEmail.value,
            phone : sellerPhone.value,
            contact : sellerContact.value,
        }
    }
    else{

        userData={
            name : sellerName.value,
            email : sellerEmail.value,
            phone : sellerPhone.value,
            contact : "none",
        }

    }

    let carData={}

   

    if (carImage.files && carImage.files.length > 0) {
         carData={
            year : parseInt(carYear.value),
            make : carMake.value,
            model : carModel.value,
            type : carType.value,
            price : parseInt(carPrice.value),
            // cDistance = carDistance.value,
            image_url : carImage.files[0].name
        }
    }
    else{
        carData={
            year : parseInt(carYear.value),
            make : carMake.value,
            model : carModel.value,
            type : carType.value,
            price : parseInt(carPrice.value),
            // cDistance = carDistance.value,
            image_url : "No image available"
        }

    }

    let cars = await carRepo.getCars();
    cars = cars || [];

    let carID;

    do {
            carID = Math.floor(Math.random() * 10000 +1);
        } while (cars.some(car => car.id === carID));

    const carObject = {
    id: carID,
    ...carData
    };

    console.log(carObject)
    await carRepo.addCar(carObject)

    console.log(carObject)

   

    let updatedCars = await carRepo.getCars();
   
    console.log(updatedCars[updatedCars.length - 1].id )

    if (updatedCars[updatedCars.length - 1].id ===carObject.id) {
            alert('Form submitted successfully!');
            // Redirect to Homepage.html
            window.location.href = 'SellerHomePage.html';
        } 
        else {
            alert('Failed to submit form. Please try again.');
        }
    sellForm.reset();

}


