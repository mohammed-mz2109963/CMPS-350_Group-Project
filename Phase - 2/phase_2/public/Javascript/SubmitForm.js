document.addEventListener('DOMContentLoaded', function() {
    const sellForm = document.getElementById('sell-form');

    sellForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const sellerName = document.getElementById('seller-name').value;
        const sellerEmail = document.getElementById('seller-email').value;
        const sellerPhone = document.getElementById('seller-phone').value;
        const sellerContact = document.querySelector('input[name="seller-contact"]:checked').value;
        const carYear = document.getElementById('car-year').value;
        const carMake = document.getElementById('car-make').value;
        const carModel = document.getElementById('car-model').value;
        const carType = document.getElementById('car-type').value;
        const carPrice = document.getElementById('car-price').value;
        const carDistance = document.getElementById('car-distance').value;
        const carImageURL = document.getElementById('car-image-url').value; // Get the URL from input field

        // Generate unique ID
        let carID;
        let carsForSale = JSON.parse(localStorage.getItem('cars_for_sale')) || [];
        do {
            carID = Math.floor(Math.random() * 10000);
        } while (carsForSale.some(car => car.id === carID));

        // Create car object
        const carObject = {
            id: carID,
            sellerName: sellerName,
            sellerEmail: sellerEmail,
            sellerPhone: sellerPhone,
            sellerContact: sellerContact,
            carYear: carYear,
            carMake: carMake,
            carModel: carModel,
            carType: carType,
            carPrice: carPrice,
            carDistance: carDistance,
            carImage: carImageURL // Store the URL directly
        };

        // Add new car object to array
        carsForSale.push(carObject);

        // Save updated data back to local storage
        localStorage.setItem('cars_for_sale', JSON.stringify(carsForSale));

        // Optionally, you can clear the form fields after submission
        sellForm.reset();

        // Display alert indicating form submission status
        if (localStorage.getItem('cars_for_sale')) {
            alert('Form submitted successfully!');
            // Redirect to Homepage.html
            //window.location.href = 'Homepage.html';
        } else {
            alert('Failed to submit form. Please try again.');
        }
    });
});
