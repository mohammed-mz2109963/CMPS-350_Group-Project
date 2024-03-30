document.addEventListener('DOMContentLoaded', function() {
    // Function to display seller details
    function displaySellerDetails() {
        // Fetch users data from users.json in the parent directory
        fetch('../users.json')
            .then(response => response.json())
            .then(data => {
                // Retrieve seller details from users data
                const sellerDetails = data.users.find(user => user.type === 'seller');

                // Update profile info section
                document.getElementById('account-type').textContent = `Account Type: Seller`;

                // Update account details section
                document.querySelector('.account-details').innerHTML = `
                    <p>Company Name: ${sellerDetails.company_name}</p>
                    <p>Bank Account: ${sellerDetails.bank_account}</p>
                `;
            })
            .catch(error => console.error('Error fetching seller data:', error));
    }

    // Display seller details on page load
    displaySellerDetails();

    // Function to update seller details
    document.getElementById('seller-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Retrieve form inputs
        const companyName = document.getElementById('company-name').value;
        const bankAccount = document.getElementById('bank-account').value;

        // Fetch users data from users.json in the parent directory
        fetch('../users.json')
            .then(response => response.json())
            .then(data => {
                // Retrieve users data
                let usersData = data.users;
                
                // Find the seller object
                const sellerIndex = usersData.findIndex(user => user.type === 'seller');
                if (sellerIndex !== -1) {
                    // Update seller details
                    usersData[sellerIndex].company_name = companyName;
                    usersData[sellerIndex].bank_account = bankAccount;

                    // Update users data
                    data.users = usersData;

                    // Update users.json file using fetch API
                    fetch('../users.json', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(() => {
                        // Display updated details
                        displaySellerDetails();
                    })
                    .catch(error => console.error('Error updating seller data:', error));
                }
            })
            .catch(error => console.error('Error fetching seller data:', error));
    });
});
