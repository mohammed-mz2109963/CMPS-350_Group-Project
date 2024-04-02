import userRepo from './repository/user-repo.js'

    const buyerForm=document.querySelector("#buyer-form")
    const accType=document.querySelector("#account-type")
    const shipping=document.querySelector("#shipping-address")
    const addB=document.querySelector("#add-balance")
    //const history=document.querySelector('#history-container')
    

    const bname=document.querySelector('#name')
    const bsname=document.querySelector('#surname')
    const balance=document.querySelector('#balance')

    

    document.addEventListener('DOMContentLoaded',function(){
    window.handleBuyerProfile=handleBuyerProfile;
    window.addAmount=addAmount;
    window.handleForm=handleForm;

    handleBuyerProfile()
    });

    addB.addEventListener('click',addAmount)
    buyerForm.addEventListener('submit',handleForm)

    async function handleBuyerProfile(){

    const users =  await userRepo.getUsersByType("buyer")
    const buyer= users.find(user => user.type === 'buyer')

    console.log("buyer data loaded successfully:", buyer);

    if (buyer) {
            console.log("buyer data loaded successfully:", buyer);

        bname.textContent = `Name: ${buyer.name}`;
        bsname.textContent = `Surname: ${buyer.surname}`;
        accType.textContent = `Account Type: Buyer`
        balance.textContent=`Balance: $${buyer.money_balance}`


       // const address = buyer?.shipping_address ?? {};

        //console.log(address)
        const addressHTML = `
            <p>Contact Person's Name: ${buyer.shipping_address.contact_person_name}</p>
            <p>Street No./Name: ${buyer.shipping_address.street}</p>
            <p>Apartment Number or Suite Number: ${buyer.shipping_address.apartment_suite_number}</p>
            <p>City & State: ${buyer.shipping_address.city}, ${buyer.shipping_address.state}</p>
            <p>Zip Code: ${buyer.shipping_address.zip_code}</p>
            <p>Contact Person's Mobile Number: ${buyer.shipping_address.mobile_number}</p>
        `;

        shipping.innerHTML = addressHTML;

        }
    }

     

    async function addAmount() {
        const users =  await userRepo.getUsersByType("buyer")
        const buyer= users.find(user => user.type === 'buyer')

        if(buyer){
        await userRepo.addBalance(buyer)
        }
        handleBuyerProfile()
    }

    async function handleForm(e){
        
        e.preventDefault()

        const users =  await userRepo.getUsersByType("buyer")
        const buyer= users.find(user => user.type === 'buyer')

        const formData = {
            shipping_address: {
                contact_person_name: document.querySelector('#contact-person-name').value,
                street: document.querySelector('#street').value,
                apartment_suite_number: document.querySelector('#apartment-suite-number').value,
                city: document.querySelector('#city').value,
                state: document.querySelector('#state').value,
                zip_code: document.querySelector('#zip-code').value,
                mobile_number: document.querySelector('#mobile-number').value
            }
        };

        buyer.shipping_address=formData.shipping_address
        console.log(buyer)

        await userRepo.updateUser(buyer)
        handleBuyerProfile()

    }









    // async function displayPurchaseHistory() {

    //     const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    //     const purchaseHistoryHTML = purchaseHistory.map((car, index) => `
    //         <div class="history-obj">
    //             <h3>Purchased Car ${index + 1}</h3>
    //             <p>Make: ${car.carMake}</p>
    //             <p>Model: ${car.carModel}</p>
    //             <p>Year: ${car.carYear}</p>
    //             <p>Price: $${car.carPrice}</p>
    //         </div>
    //     `).join('');


    //     document.getElementById('history-container').innerHTML = purchaseHistoryHTML;
    // }


