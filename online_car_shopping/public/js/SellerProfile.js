
import userRepo from './repository/user-repo.js'

const sellerForm=document.querySelector("#seller-form")
const accType=document.querySelector("#account-type")
const accDetails=document.querySelector('#account-details')
//const history=document.querySelector('#history-container')
const company = document.querySelector('company-name');
const bankAcc = document.querySelector('bank-account');


document.addEventListener('DOMContentLoaded',function(){
window.handleSellerProfile=handleSellerProfile

handleSellerProfile()

});

sellerForm.addEventListener('submit',handleInfo)




async function handleSellerProfile(){
    // e.preventDefault
    const sellerData =  await userRepo.getUsersByType("seller")
    console.log("seller data loaded successfully:", sellerData);



    if (sellerData) {
            // Update profile info section
            accType.textContent = `Account Type: Seller`;

            // Update account details section
            accDetails.innerHTML = `
                <p>Company Name: ${sellerData.company_name}</p>
                <p>Bank Account: ${sellerData.bank_account}</p>
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

async function handleInfo(e){
    e.preventDefault
    const sellerData =  await userRepo.getUsersByType("seller")
    

    console.log("seller data loaded successfully:", sellerData);

         if (sellerData) {
            // Update seller details if the form fields are not empty
            if (company.trim() !== '') {
                sellerData.company_name = company;
            }
            if (bankAcc.trim() !== '') {
                sellerData.bank_account = bankAcc;
            }

            
            



            // Display updated details
            handleSellerProfile();
        }


}




document.addEventListener('DOMContentLoaded', function() {
    // Function to display seller details
    function displaySellerDetails() {
        // Retrieve seller details from local storage
        const usersData = JSON.parse(localStorage.getItem('users')) || [];

        // Find the seller object
        const sellerDetails = usersData.find(user => user.type === 'seller');

        if (sellerDetails) {
            // Update profile info section
            document.getElementById('account-type').textContent = `Account Type: Seller`;

            // Update account details section
            document.querySelector('.account-details').innerHTML = `
                <p>Company Name: ${sellerDetails.company_name}</p>
                <p>Bank Account: ${sellerDetails.bank_account}</p>
            `;
        }

        // Display sale history
        displaySaleHistory();
    }

    // Function to display sale history
    function displaySaleHistory() {
        // Retrieve sale history from local storage
        const saleHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

        // Map each sold car to HTML and join them into a string
        const saleHistoryHTML = saleHistory.map((car, index) => `
            <div class="history-obj">
                <h3>Sold Car ${index + 1}</h3>
                <p>Make: ${car.carMake}</p>
                <p>Model: ${car.carModel}</p>
                <p>Year: ${car.carYear}</p>
                <p>Price: $${car.carPrice}</p>
            </div>
        `).join('');

        // Append the sale history HTML to the history container
        document.getElementById('history-container').innerHTML = saleHistoryHTML;
    }

    // Display seller details on page load
    displaySellerDetails();

    // Function to update seller details
    document.getElementById('seller-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Retrieve form inputs
        const companyName = document.getElementById('company-name').value;
        const bankAccount = document.getElementById('bank-account').value;

        // Fetch users data from local storage
        let usersData = JSON.parse(localStorage.getItem('users')) || [];

        // Find the seller object
        const sellerIndex = usersData.findIndex(user => user.type === 'seller');
        if (sellerIndex !== -1) {
            // Update seller details if the form fields are not empty
            if (companyName.trim() !== '') {
                usersData[sellerIndex].company_name = companyName;
            }
            if (bankAccount.trim() !== '') {
                usersData[sellerIndex].bank_account = bankAccount;
            }

            // Update users data in local storage
            localStorage.setItem('users', JSON.stringify(usersData));

            // Display updated details
            displaySellerDetails();
        }
    });
});
