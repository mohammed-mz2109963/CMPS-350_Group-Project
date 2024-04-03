
import userRepo from './repository/user-repo.js'

const sellerForm=document.querySelector("#seller-form")
const accType=document.querySelector("#account-type")
const accDetails=document.querySelector('#account-details')
//const history=document.querySelector('#history-container')
const company = document.querySelector('#company-name');
const bankAcc = document.querySelector('#bank-account');


document.addEventListener('DOMContentLoaded',function(){
window.handleSellerProfile=handleSellerProfile
window.handleForm=handleForm

handleSellerProfile()

});

sellerForm.addEventListener('submit',handleForm)




async function handleSellerProfile(){
    // e.preventDefault
    const users =  await userRepo.getUsersByType("seller")
    const seller= users.find(user => user.type === 'seller')

    console.log("seller data loaded successfully:", seller);


    if (seller) {

            console.log("seller data loaded successfully:", seller);

            // Update profile info section
            accType.textContent = `Account Type: Seller`;

            // Update account details section
            accDetails.innerHTML = `
                <p>Company Name: ${seller.company_name}</p>
                <p>Bank Account: ${seller.bank_account}</p>
            `;
    }

        // const saleHistory = await dealRepo.getDealsByUser("user");

        // // Map each sold car to HTML and join them into a string
        // const saleHistoryHTML = saleHistory.map((car, index) => `
        //     <div class="history-obj">
        //         <h3>Sold Car : ${index + 1}</h3>
        //         <p>Make: ${car.carMake}</p>
        //         <p>Model: ${car.carModel}</p>
        //         <p>Year: ${car.carYear}</p>
        //         <p>Price: $${car.carPrice}</p>
        //     </div>
        // `).join('');

        // // Append the sale history HTML to the history container
        // history.innerHTML = saleHistoryHTML;



}

async function handleForm(e){
        
        e.preventDefault()

        const users =  await userRepo.getUsersByType("seller")
        const seller= users.find(user => user.type === 'seller')

       

        seller.company_name=company.value;
        seller.bank_account=bankAcc.value;

        console.log(seller)

        await userRepo.updateUser(seller)
        
        handleSellerProfile()

    }
