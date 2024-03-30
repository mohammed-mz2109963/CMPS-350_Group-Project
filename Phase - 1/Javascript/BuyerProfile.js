document.addEventListener('DOMContentLoaded', function() {
    // Function to display buyer details
    function displayBuyerDetails() {
        // Retrieve users from localStorage
        let users = localStorage.getItem('users');

        // If users data doesn't exist in localStorage, load it from the JSON file
        if (!users) {
            fetch('../users.json')
                .then(response => response.json())
                .then(data => {
                    // Store users data in localStorage
                    localStorage.setItem('users', JSON.stringify(data.users));
                    // Call displayBuyerDetails again to display buyer details
                    displayBuyerDetails();
                })
                .catch(error => console.error('Error fetching users data:', error));
            return;
        }

        // Retrieve buyer details from users
        const buyerDetails = JSON.parse(users).find(user => user.type === 'buyer');

        // Update profile info section
        document.getElementById('name').textContent = `Name: ${buyerDetails.name}`;
        document.getElementById('surname').textContent = `Surname: ${buyerDetails.surname}`;
        document.getElementById('account-type').textContent = `Account Type: Buyer`;
        
        // Display account balance
        document.getElementById('balance').textContent = `Account Balance: $${buyerDetails.money_balance}`;
        
        // Update shipping address section
        const address = buyerDetails.shipping_address;
        const addressHTML = `
            <p>Contact Person's Name: ${address.contact_person_name}</p>
            <p>Street No./Name: ${address.street}</p>
            <p>Apartment Number or Suite Number: ${address.apartment_suite_number}</p>
            <p>City & State: ${address.city}, ${address.state}</p>
            <p>Zip Code: ${address.zip_code}</p>
            <p>Contact Person's Mobile Number: ${address.mobile_number}</p>
        `;
        document.querySelector('.shipping-address').innerHTML = addressHTML;
    }

    // Function to add balance
    function addBalance(amount) {
        let users = JSON.parse(localStorage.getItem('users'));
        const buyerIndex = users.findIndex(user => user.type === 'buyer');
        users[buyerIndex].money_balance += amount;
        localStorage.setItem('users', JSON.stringify(users));
        displayBuyerDetails(); // Update displayed balance
    }

    // Display buyer details on page load
    displayBuyerDetails();

    // Add event listener to the "Add Balance" button
    document.getElementById('add-balance').addEventListener('click', function(event) {
        addBalance(1000); // Add $1000 to the balance
    });

    // Function to update buyer details
    document.getElementById('buyer-form').addEventListener('submit', function(event) {
        // Form submission handling
    });
});
