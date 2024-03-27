let items = document.querySelectorAll(".add");

let cars = [
    {
        name: "Ferrari",
        price: 80000,
        added: 0
    },
    {
        name: "Lambo",
        price: 70000,
        added: 0
    },
    {
        name: "Porche",
        price: 50000,
        added: 0
    },
    {
        name: "Toyota",
        price: 30000,
        added: 0
    },
];

for (let i=0; i<items.length; i++){
    items[i].addEventListener("click", () =>{
        itemsInCart();
    })
}

function loadCartDetails(){
    let quantity = localStorage.getItem("itemsInCart");
    if(quantity) {
        document.querySelector(".cart-span span").textContent = quantity;
    }
}


function itemsInCart() {
    let quantity = localStorage.getItem("itemsInCart");
    quantity = parseInt(quantity);
    if (quantity) {
        localStorage.setItem("itemsInCart", quantity +1);
        document.querySelector(".cart-span span").textContent = quantity + 1;
        
    }
    else {
        localStorage.setItem("itemsInCart", 1);
        document.querySelector(".cart-span span").textContent = 1;
    }
    
}

loadCartDetails();