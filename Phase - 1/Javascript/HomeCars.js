document.addEventListener('DOMContentLoaded', function() {
    // Function to append cars from local storage
    function appendCarsFromLocalStorage() {
        const carsForSale = JSON.parse(localStorage.getItem('cars_for_sale')) || [];
        let carsContainer = document.getElementById('search-cars-guest');
        if (!carsContainer) {
            carsContainer = document.getElementById('search-cars');
        }

        // Clear existing content
        carsContainer.innerHTML = '';

        // Append each car to the guest container
        carsForSale.forEach(car => {
            const carBox = document.createElement('div');
            carBox.classList.add('car-box');
            carBox.classList.add('search-car-box');
            carBox.id = 'search-car-box-' + car.id;

            // Create car details elements
            const carImg = document.createElement('img');
            carImg.src = './CSS/images/cars/' + car.carImage;

            const carInfo = document.createElement('p');
            carInfo.textContent = `Year: ${car.carYear} | Make: ${car.carMake} | Model: ${car.carModel} | Type: ${car.carType}`;

            const carPrice = document.createElement('h4');
            carPrice.classList.add('car-price');
            carPrice.textContent = '$' + car.carPrice;

            const carDescription = document.createElement('p');
            carDescription.classList.add('car-description');
            carDescription.textContent = `Distance: ${car.carDistance}`;

            const sellerInfo = document.createElement('p');
            sellerInfo.textContent = `Seller: ${car.sellerName} | Contact: ${car.sellerContact ? 'Yes' : 'No'}`;

            const link = document.createElement('a');
            link.textContent = 'Add to Cart';
            link.classList.add('add');
            link.classList.add('item');

            // Append elements to the car box
            carBox.appendChild(carImg);
            carBox.appendChild(carInfo);
            carBox.appendChild(carPrice);
            carBox.appendChild(carDescription);
            carBox.appendChild(sellerInfo);
            carBox.appendChild(link);

            // Append car box to the guest container
            carsContainer.appendChild(carBox);
        });
    }

    // Append cars from local storage on page load
    appendCarsFromLocalStorage();

    // Function to filter cars based on search criteria
    function filterCars() {
        // Get search criteria
        const year = document.getElementById('year').value;
        const carType = document.getElementById('car-type').value;
        const carMake = document.getElementById('car-make').value;
        const carModel = document.getElementById('model').value;

        const carsForSale = JSON.parse(localStorage.getItem('cars_for_sale')) || [];

        // Check if all search criteria are default or empty
        const isDefaultCriteria = year === 'Select Year' &&
                                carType === 'Select Type' &&
                                carMake === 'Select Make' &&
                                carModel.trim() === '';

        // If all criteria are default or empty, display all cars
        if (isDefaultCriteria) {
            appendCarsFromLocalStorage();
            return;
        }

        // Filter cars based on selected criteria
        const filteredCars = carsForSale.filter(car => {
            return (year === 'Select Year' || car.carYear === year) &&
                (carType === 'Select Type' || car.carType === carType) &&
                (carMake === 'Select Make' || car.carMake === carMake) &&
                (carModel === '' || car.carModel.toLowerCase().includes(carModel.toLowerCase()));
        });

        // Append filtered cars to the guest container
        let carsContainer = document.getElementById('search-cars-guest');
        if (!carsContainer) {
            carsContainer = document.getElementById('search-cars');
        }
        carsContainer.innerHTML = '';
        filteredCars.forEach(car => {
            const carBox = document.createElement('div');
            carBox.classList.add('car-box');
            carBox.classList.add('search-car-box');
            carBox.id = 'search-car-box-' + car.id;
            // Create car details elements and append them to car box (similar to appendCarsFromLocalStorage function)
            const carImg = document.createElement('img');
            carImg.src = './CSS/images/cars/' + car.carImage;

            const carInfo = document.createElement('p');
            carInfo.textContent = `Year: ${car.carYear} | Make: ${car.carMake} | Model: ${car.carModel} | Type: ${car.carType}`;

            const carPrice = document.createElement('h4');
            carPrice.classList.add('car-price');
            carPrice.textContent = '$' + car.carPrice;

            const carDescription = document.createElement('p');
            carDescription.classList.add('car-description');
            carDescription.textContent = `Distance: ${car.carDistance}`;

            const sellerInfo = document.createElement('p');
            sellerInfo.textContent = `Seller: ${car.sellerName} | Contact: ${car.sellerContact ? 'Yes' : 'No'}`;

            const link = document.createElement('a');
            link.textContent = 'Add to Cart';
            link.classList.add('add');
            link.classList.add('item');

            // Append elements to the car box
            carBox.appendChild(carImg);
            carBox.appendChild(carInfo);
            carBox.appendChild(carPrice);
            carBox.appendChild(carDescription);
            carBox.appendChild(sellerInfo);
            carBox.appendChild(link);

            // Append car box to the guest container
            carsContainer.appendChild(carBox);
        });
    }

    // Attach event listeners to search form fields
    document.getElementById('search-car-form').addEventListener('submit', function(event) {
        event.preventDefault();
        filterCars();
    });

    // Attach event listener to form reset
    document.getElementById('search-car-form').addEventListener('reset', function(event) {
        event.preventDefault();
        appendCarsFromLocalStorage(); // Display all cars again
    });

    document.getElementById('year').addEventListener('change', filterCars);
    document.getElementById('car-type').addEventListener('change', filterCars);
    document.getElementById('car-make').addEventListener('change', filterCars);
    document.getElementById('model').addEventListener('input', filterCars);
});
