import userRepo from './repository/user-repo.js'
import carRepo from './repository/car-repo.js'

const shipping=document.querySelector("#shipping-details")
const display=document.querySelector("#car-object")


document.addEventListener('DOMContentLoaded',function(){
window.shippingDetails=shippingDetails
window.displayCarObjects=displayCarObjects

shippingDetails()
displayCarObjects()


})



async function shippingDetails(){
    
        const users =  await userRepo.getUsersByType("buyer")
        const buyer= users.find(user => user.type === 'buyer')

        
        const addressHTML = `
            <div class="shipping-obj">
                <h1>Shipping Address</h1><br>
                <p>Contact Person's Name: ${buyer.shipping_address.contact_person_name}</p>
                <p>Street No./Name: ${buyer.shipping_address.street}</p>
                <p>Apartment Number or Suite Number: ${buyer.shipping_address.apartment_suite_number}</p>
                <p>City & State: ${buyer.shipping_address.city}, ${buyer.shipping_address.state}</p>
                <p>Zip Code: ${buyer.shipping_address.zip_code}</p>
                <p>Contact Person's Mobile Number: ${buyer.shipping_address.mobile_number}</p>
            </div>
        `;
        shipping.innerHTML = addressHTML;
    
}


async function displayCarObjects() {

        const cars=await carRepo.getCars()

        const cart = localStorage.getItem('cartItems');
        console.log(cart)
        if (!cart) {
            console.error('No cars in the cart');
            alert("No cars in the cart");
            return;
        }

        const carObjects = JSON.parse(cart);
        if (!Array.isArray(carObjects)) {
            console.error('Invalid car objects data');
            return;
        }


        try {
        const cars = await carRepo.getCars();
        console.log(cars)
        let carObjectHTML = '';
        carObjects.forEach((cartItem, index) => {
            const car = cars.find(car => car.id === parseInt(cartItem.carId));
            if (car) {
                carObjectHTML += `
                    <div class="car-obj car-item">
                        <h3>Car ${index + 1}</h3>
                        <p>Make: ${car.make}</p>
                        <p>Model: ${car.model}</p>
                        <p>Year: ${car.year}</p>
                        <p>Price: $${car.price}</p>
                        <p>Count: ${cartItem.count}</p>
                        <button class="confirm-payment-btn" data-index="${index}">Confirm Payment</button>
                    </div>
                `;
            } else {
                console.error(`Car with ID ${cartItem.carId} not found`);
            }
        });

        display.innerHTML = carObjectHTML;
    } catch (error) {
        console.error('Error fetching cars:', error);
    }
    }



