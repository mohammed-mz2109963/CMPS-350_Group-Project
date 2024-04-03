import userRepo from './repository/user-repo.js'
import carRepo from './repository/car-repo.js'

const shipping=document.querySelector("#shipping-details")



document.addEventListener('DOMContentLoaded',function(){

shippingDetails()


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



