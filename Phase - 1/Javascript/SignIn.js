// let isBuyer = false;
// let isSeller = false;
// let isAdmin = false;

document.addEventListener('DOMContentLoaded', function() {
    // Check if the current page is the sign-in page
    if (window.location.pathname.includes("SignIn.html")) {
        // Fetch user data from users.json
        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                const usersData = data; // Store the fetched user data
                console.log("User data loaded successfully:", usersData);

                // Add event listener to the login form
                document.getElementById('loginForm').addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent form submission

                    const username = document.querySelector('#name').value;
                    const password = document.querySelector('#password').value;

                    console.log("Submitted username:", username);
                    console.log("Submitted password:", password);

                    // Check if username and password match any user in the usersData
                    const user = usersData.users.find(user => user.username === username && user.password === password);
                    
                    if (user) {
                        console.log("User found:", user);

                        // Redirect to appropriate page based on the user type
                        if (user.type === 'buyer') {
                            window.location.href = "BuyerHomePage.html";
                        } else if (user.type === 'seller') {
                            window.location.href = "SellerHomePage.html";
                        } else if (user.type === 'admin') {
                            window.location.href = "AdminHomePage.html";
                        }

                    } else {
                        alert('Invalid username or password');
                    }
                });
            })
            .catch(error => {
                console.error("Error loading user data:", error);
            });
    }
});



// Function to show or hide the seller area based on the user type
// function toggleSellerArea(isSeller) {
//     const sellerArea = document.getElementById('seller-area');
//     console.log("toggleSellerArea called");
//     console.log("isSeller:", isSeller);
//     if (isSeller) {
//         sellerArea.style.display = 'flex'; // Show seller area
//     } else {
//         sellerArea.style.display = 'none'; // Hide seller area
//     }
// }