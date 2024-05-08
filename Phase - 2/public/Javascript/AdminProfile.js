document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');

    // Append cart items to the cart container
    cartItems.forEach(item => {
        const cartObj = createAdminPageObj(item);
        cartContainer.appendChild(cartObj);
    });

    // Retrieve purchase history items from local storage
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const purchaseHistoryContainer = document.getElementById('purchase-history-container');

    // Append purchase history items to the purchase history container
    purchaseHistory.forEach(item => {
        const historyObj = createAdminPageObj(item);
        purchaseHistoryContainer.appendChild(historyObj);
    });

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersContainer = document.getElementById('users-container');

    // Append users to the users container
    users.forEach(user => {
        const userObj = createAdminPageObj(user);
        usersContainer.appendChild(userObj);
    });

    // Function to create admin page objects
    function createAdminPageObj(data) {
        const obj = document.createElement('div');
        obj.classList.add('admin-page-obj');
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const p = document.createElement('p');
                p.textContent = `${key}: ${data[key]}`;
                obj.appendChild(p);
            }
        }
        return obj;
    }
});
