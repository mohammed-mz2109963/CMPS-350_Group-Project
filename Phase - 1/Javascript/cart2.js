document.addEventListener('DOMContentLoaded', function() {
    // Function to display buyer's shipping address
    function displayShippingAddress() {
        let users = localStorage.getItem('users');
        if (!users) {
            console.error('User data not found');
            return;
        }
        const buyerDetails = JSON.parse(users).find(user => user.type === 'buyer');
        const address = buyerDetails.shipping_address;
        const addressHTML = `
            <div class="shipping-obj">
                <h1>Shipping Address</h1><br>
                <p>Contact Person's Name: ${address.contact_person_name}</p>
                <p>Street No./Name: ${address.street}</p>
                <p>Apartment Number or Suite Number: ${address.apartment_suite_number}</p>
                <p>City & State: ${address.city}, ${address.state}</p>
                <p>Zip Code: ${address.zip_code}</p>
                <p>Contact Person's Mobile Number: ${address.mobile_number}</p>
            </div>
        `;
        document.getElementById('shipping-details').innerHTML = addressHTML;
    }

    // Function to display car objects in cart
    function displayCarObjects() {
        let cart = localStorage.getItem('cart');
        if (!cart) {
            console.error('No cars in the cart');
            alert("No cars in the cart");
            return;
        }
        const carObjects = JSON.parse(cart);
        let carObjectHTML = '';
        carObjects.forEach((car, index) => {
            carObjectHTML += `
                <div class="car-obj car-item">
                    <h3>Car ${index + 1}</h3>
                    <p>Make: ${car.carMake}</p>
                    <p>Model: ${car.carModel}</p>
                    <p>Year: ${car.carYear}</p>
                    <p>Price: $${car.carPrice}</p><br>
                    <button class="confirm-payment-btn" data-index="${index}">Confirm Payment</button>
                </div>
            `;
        });
        document.getElementById('car-object').innerHTML = carObjectHTML;
    }

    // Function to confirm payment
    function confirmPayment(carIndex) {
        let users = localStorage.getItem('users');
        if (!users) {
            console.error('User data not found');
            return;
        }
        let cart = localStorage.getItem('cart');
        if (!cart) {
            console.error('No cars in the cart');
            return;
        }
        const buyerDetails = JSON.parse(users).find(user => user.type === 'buyer');
        const carObjects = JSON.parse(cart);
        const car = carObjects[carIndex];
        if (buyerDetails.money_balance >= car.carPrice) {
            // Deduct amount from balance
            buyerDetails.money_balance -= car.carPrice;
            // Update user data in local storage
            localStorage.setItem('users', JSON.stringify(users));

            // Add sold car to purchase history
            let purchaseHistory = localStorage.getItem('purchaseHistory');
            if (!purchaseHistory) {
                purchaseHistory = [];
            } else {
                purchaseHistory = JSON.parse(purchaseHistory);
            }
            purchaseHistory.push(car);
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

            // Update display
            displayCarObjects();
            displayPurchaseHistory();
            displayShippingAddress();
        } else {
            console.error('Insufficient funds');
            alert('Insufficient funds');
        }
    }

    // Function to display purchase history
    function displayPurchaseHistory() {
        let purchaseHistory = localStorage.getItem('purchaseHistory');
        if (!purchaseHistory) {
            console.error('No purchase history found');
            return;
        }
        const purchaseHistoryHTML = JSON.parse(purchaseHistory).map((car, index) => `
            <div class="purchase-item">
                <h3>Purchased Car ${index + 1}</h3>
                <p>Make: ${car.carMake}</p>
                <p>Model: ${car.carModel}</p>
                <p>Year: ${car.carYear}</p>
                <p>Price: $${car.carPrice}</p>
            </div>
        `).join('');
        document.getElementById('purchase-history').innerHTML = purchaseHistoryHTML;
    }

    // Display buyer's shipping address
    displayShippingAddress();

    // Display car objects in cart
    displayCarObjects();

    // Display purchase history
    displayPurchaseHistory();

    // Add event listener to confirm payment buttons
    document.querySelectorAll('.confirm-payment-btn').forEach(button => {
        button.addEventListener('click', function() {
            const carIndex = parseInt(this.getAttribute('data-index'));
            confirmPayment(carIndex);
        });
    });
});
