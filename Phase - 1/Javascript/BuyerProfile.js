document.addEventListener('DOMContentLoaded', function() {
    // Function to load data from users.json into local storage if local storage does not exist
    function loadDataIntoLocalStorage() {
        if (!localStorage.getItem('users')) {
            fetch('../users.json')
                .then(response => response.json())
                .then(data => {
                    // Store data in local storage
                    localStorage.setItem('users', JSON.stringify(data.users));
                    // Display buyer details after loading data into local storage
                    displayBuyerDetails();
                })
                .catch(error => console.error('Error loading data into local storage:', error));
        } else {
            // Display buyer details if local storage already exists
            displayBuyerDetails();
        }
    }

    // Load data into local storage
    loadDataIntoLocalStorage();

    // Function to display buyer details
    function displayBuyerDetails() {
        // Retrieve users data from local storage
        const usersString = localStorage.getItem('users');

        // Parse users data
        let users = [];
        try {
            users = JSON.parse(usersString);
        } catch (error) {
            console.error('Error parsing users data:', error);
            return;
        }

        // Find the buyer object
        const buyer = users.find(user => user.type === 'buyer');

        if (!buyer) {
            console.error('Buyer data not found.');
            return;
        }

        // Log buyer details to console
        console.log('Buyer:', buyer);

        // Update profile info section
        document.getElementById('name').textContent = `Name: ${buyer.name}`;
        document.getElementById('surname').textContent = `Surname: ${buyer.surname}`;
        document.getElementById('account-type').textContent = `Account Type: Buyer`;
        document.getElementById('balance').textContent = `Account Balance: $${buyer.money_balance}`;

        // Update shipping address section
        const address = buyer.shipping_address;
        const addressHTML = `
            <p>Contact Person's Name: ${address.contact_person_name}</p>
            <p>Street No./Name: ${address.street}</p>
            <p>Apartment Number or Suite Number: ${address.apartment_suite_number}</p>
            <p>City & State: ${address.city}, ${address.state}</p>
            <p>Zip Code: ${address.zip_code}</p>
            <p>Contact Person's Mobile Number: ${address.mobile_number}</p>
        `;
        document.querySelector('.shipping-address').innerHTML = addressHTML;

        // Display purchase history
        displayPurchaseHistory();
    }

    // Function to display purchase history
    function displayPurchaseHistory() {
        // Retrieve purchase history from local storage
        const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

        // Map each purchased car to HTML and join them into a string
        const purchaseHistoryHTML = purchaseHistory.map((car, index) => `
            <div class="history-obj">
                <h3>Purchased Car ${index + 1}</h3>
                <p>Make: ${car.carMake}</p>
                <p>Model: ${car.carModel}</p>
                <p>Year: ${car.carYear}</p>
                <p>Price: $${car.carPrice}</p>
            </div>
        `).join('');

        // Append the purchase history HTML to the history container
        document.getElementById('history-container').innerHTML = purchaseHistoryHTML;
    }

    // Add event listener to the "Add Balance" button
    document.getElementById('add-balance').addEventListener('click', function(event) {
        addBalance(1000); // Add $1000 to the balance
    });

    // Add event listener to the form for updating buyer details
    document.getElementById('buyer-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = {
            shipping_address: {
                contact_person_name: document.getElementById('contact-person-name').value,
                street: document.getElementById('street').value,
                apartment_suite_number: document.getElementById('apartment-suite-number').value,
                city: document.getElementById('city-state').value,
                state: '', // You can add state field here if needed
                zip_code: document.getElementById('zip-code').value,
                mobile_number: document.getElementById('mobile-number').value
            }
        };

        // Update buyer details in local storage
        updateBuyerDetails(formData);
    });
});
