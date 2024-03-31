document.addEventListener('DOMContentLoaded', function() {
    let carsForSale; // Declare carsForSale as a global variable

    // Function to append cars from local storage
    function appendCarsFromLocalStorage() {
        carsForSale = JSON.parse(localStorage.getItem('cars_for_sale')) || [];
        let carsContainer;
        
        // Check if the div with ID "search-cars-admin" exists
        if (document.getElementById('search-cars-admin')) {
            carsContainer = document.getElementById('search-cars-admin');
        } else if (document.getElementById('search-cars-guest')) {
            carsContainer = document.getElementById('search-cars-guest');
        } else {
            carsContainer = document.getElementById('search-cars');
        }

        // Clear existing content
        carsContainer.innerHTML = '';

        // Append each car to the container
        carsForSale.forEach(car => {
            const carBox = createCarBox(car, carsContainer.id);
            carsContainer.appendChild(carBox);
        });
    }

    function createCarBox(car, containerId) {
        const carBox = document.createElement('div');
        carBox.classList.add('car-box');
        carBox.classList.add('search-car-box');
        carBox.classList.add('search-car-object'); // Add search-car-object class
        carBox.id = 'search-car-box-' + car.id;
    
        // Create car details elements
        const carImg = document.createElement('img');
        carImg.src = car.carImage;
    
        const carInfo = document.createElement('p');
        carInfo.textContent = `Year: ${car.carYear} | Make: ${car.carMake} | Model: ${car.carModel} | Type: ${car.carType}`;
    
        const carPrice = document.createElement('h4');
        carPrice.classList.add('car-price');
        carPrice.textContent = '$' + car.carPrice;
    
        const carDescription = document.createElement('p');
        carDescription.classList.add('car-description');
        carDescription.textContent = `Distance Travelled [km]: ${car.carDistance}`;
    
        const sellerInfo = document.createElement('p');
        sellerInfo.textContent = `Seller: ${car.sellerName} | Contact: ${car.sellerContact ? 'Yes' : 'No'}`;
    
        // Create button based on containerId
        let buttonLabel = 'Add to Cart';
        let onClickFunction = function() {
            addToCart(car.id);
        };
        
        if (containerId === 'search-cars-guest') {
            buttonLabel = 'Login to Continue';
            onClickFunction = function() {
                window.location.href = 'SignIn.html';
            };
        } else if (containerId === 'search-cars-admin') {
            buttonLabel = 'Remove';
            onClickFunction = function() {
                removeCar(car.id);
            };
        } else {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
            const isInCart = cart.some(item => item.id === car.id);
            const isInPurchaseHistory = purchaseHistory.some(item => item.id === car.id);
        
            if (isInCart || isInPurchaseHistory) {
                buttonLabel = isInCart ? 'Pending' : 'Sold Out';
                onClickFunction = null;
            }
        }

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.dataset.carId = car.id;
        addToCartButton.textContent = buttonLabel;
        if (onClickFunction) {
            addToCartButton.onclick = onClickFunction;
        } else {
            addToCartButton.disabled = true;
        }

        // Append elements to the car box
        carBox.appendChild(carImg);
        carBox.appendChild(carInfo);
        carBox.appendChild(carPrice);
        carBox.appendChild(carDescription);
        carBox.appendChild(sellerInfo);
        carBox.appendChild(addToCartButton);
    
        return carBox;
    }
    
    function addToCart(carId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    
        // Check if the car object already exists in either cart or purchaseHistory
        const isInCart = cart.some(item => item.id === carId);
        const isInPurchaseHistory = purchaseHistory.some(item => item.id === carId);
    
        // If the car object exists in either cart or purchaseHistory, handle accordingly
        if (isInCart || isInPurchaseHistory) {
            alert('This car is already in cart or has been sold out!');
            return;
        }
    
        // Find the car object in the carsForSale array
        const carIndex = carsForSale.findIndex(item => item.id === carId);
    
        if (carIndex !== -1) {
            // Add the whole car object to the cart
            cart.push(carsForSale[carIndex]);
            localStorage.setItem('cart', JSON.stringify(cart));
    
            // Update the button text and disable it
            const addToCartButton = document.querySelector(`.add-to-cart[data-car-id="${carId}"]`);
            if (addToCartButton) {
                addToCartButton.textContent = 'Pending';
                addToCartButton.disabled = true;
            }
            alert('Car added to cart successfully!');
        }
    }
    
    function removeCar(carId) {
        let carsForSale = JSON.parse(localStorage.getItem('cars_for_sale')) || [];
        const carIndex = carsForSale.findIndex(item => item.id === carId);
    
        if (carIndex !== -1) {
            // Remove the car object from the array
            carsForSale.splice(carIndex, 1);
            localStorage.setItem('cars_for_sale', JSON.stringify(carsForSale));
    
            // Refresh the display
            appendCarsFromLocalStorage();
            alert('Car removed successfully!');
        }
    }
    
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
                    (carMake === 'Select Make' || car.carMake === document.getElementById('car-make').value) &&
                    (carModel === '' || car.carModel.toLowerCase().includes(carModel.toLowerCase()));
        });
    
        // Clear existing content
        let carsContainer;
        if (document.getElementById('search-cars-guest')) {
            carsContainer = document.getElementById('search-cars-guest');
        } else if (document.getElementById('search-cars-admin')) {
            carsContainer = document.getElementById('search-cars-admin');
        } else {
            carsContainer = document.getElementById('search-cars');
        }
        carsContainer.innerHTML = '';
    
        // Append filtered cars to the container
        filteredCars.forEach(car => {
            const carBox = createCarBox(car, carsContainer.id);
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

    // Append cars from local storage on page load
    appendCarsFromLocalStorage();
});
