// let isBuyer = false;
// let isSeller = false;
// let isAdmin = false;
import userRepo from './repository/user-repo.js'

const signInForm=document.querySelector("#loginForm")
const userName=document.querySelector('#name')
const pass=document.querySelector('#password')


document.addEventListener('DOMContentLoaded',function(){

    window.handleSignIn=handleSignIn
    handleSignIn()


});

signInForm.addEventListener('submit', handleSignIn) 
                    

async function handleSignIn(e){
    e.preventDefault();

    const usersData=  await userRepo.getUsers()
    console.log("User data loaded successfully:", usersData);

    const username=userName.value
    const password=pass.value

    console.log("Submitted username:", username);
    console.log("Submitted password:", password);

    const user = usersData.users.find(user => user.username === username && user.password === password);
    
    if (user) {
        console.log("User found:", user);

                            
        if (user.type === 'buyer') {
            window.location.href = "BuyerHomePage.html";
        } else if (user.type === 'seller') {
            window.location.href = "SellerHomePage.html";
        } else if (user.type === 'admin') {
            window.location.href = "AdminHomePage.html";
        }
    }else {
        alert('Invalid username or password');
    }



}




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