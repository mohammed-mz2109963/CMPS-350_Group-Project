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

    // Display buyer details on page load
    displayBuyerDetails();

    // Function to update buyer details
    document.getElementById('buyer-form').addEventListener('submit', function(event) {
        // Form submission handling
    });
});