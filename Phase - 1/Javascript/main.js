document.addEventListener('DOMContentLoaded', function() {
    let isBuyer = false;
    let isSeller = false;
    let isAdmin = false;

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
                    } else if (user.type === 'seller') {
                        isSeller = true;
                    } else if (user.type === 'admin') {
                        isAdmin = true;
                    }

                    // Redirect to appropriate page or perform other actions
                    // For example:
                    window.location.href = 'HomePage.html'; // Redirect to dashboard
                } else {
                    alert('Invalid username or password');
                }
            });
        })
        .catch(error => {
            console.error("Error loading user data:", error);
        });
});
