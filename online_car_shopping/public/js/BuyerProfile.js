import userRepo from './repository/user-repo.js'

    const buyerForm=document.querySelector("#seller-form")
    const accType=document.querySelector("#account-type")
    const shipping=document.querySelector("#shipping-address")
    const addB=document.querySelector("#add-balance")

    const bname=document.querySelector('#name')
    const bsname=document.querySelector('#surname')
    const balance=document.querySelector('#balance')

    

    document.addEventListener('DOMContentLoaded',function(){
    window.handleBuyerProfile=handleBuyerProfile;
    window.addAmount=addAmount;

    handleBuyerProfile()
    });

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

     addB.addEventListener('click',addAmount)

    async function addAmount() {
        const users =  await userRepo.getUsersByType("buyer")
        const buyer= users.find(user => user.type === 'buyer')

        if(buyer){
        userRepo.addBalance(buyer)
        }
        handleBuyerProfile()
    }


    