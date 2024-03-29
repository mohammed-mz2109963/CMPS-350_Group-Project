let isBuyer = false;
let isSeller = false;
let isAdmin = false;

document.addEventListener('DOMContentLoaded', function() {
    // Fetch user data from users.json
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const usersData = data; // Store the fetched user data
            console.log("User data loaded successfully:", usersData);

            // Add event listener to the login form
            document.getElementById('loginForm').addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent form submission

                const username = document.querySelector('#username').value;
                const password = document.querySelector('#password').value;

                // Check if username and password match any user in the usersData
                const user = usersData.users.find(user => user.username === username && user.password === password);
                
                if (user) {
                    // Set variables based on the type of user
                    if (user.type === 'buyer') {
                        isBuyer = true;
                        isSeller = false;
                        isAdmin = false;
                    } else if (user.type === 'seller') {
                        isBuyer = false;
                        isSeller = true;
                        isAdmin = false;
                    } else if (user.type === 'admin') {
                        isBuyer = false;
                        isSeller = false;
                        isAdmin = true;
                    }

                    // Redirect to appropriate page or perform other actions
                    // For example:
                    window.location.href = 'HomePage.html'; // Redirect to dashboard
                    
                    // After the login is successful, toggle the seller area
                    toggleSellerArea(isSeller);
                } else {
                    alert('Invalid username or password');
                }
            });
        })
        .catch(error => {
            console.error("Error loading user data:", error);
        });
});


// Function to show or hide the seller area based on the user type
// Function to show or hide the seller area based on the user type
function toggleSellerArea(isSeller) {
    if (isSeller) {
        document.getElementById('seller-area').style.display = 'block';
    } else {
        document.getElementById('seller-area').style.display = 'none';
    }
}