let items = document.querySelectorAll(".add");

let cars = [
    {
        name: "Ferrari",
        id: "ferrari",
        price: 80000,
        added: 0
    },
    {
        name: "Lambo",
        id: "lambo",
        price: 70000,
        added: 0
    },
    {
        name: "Porsche",
        tag: "porsche",
        price: 60000,
        added: 0
    },
    {
        name: "Toyota",
        id: "toyota",
        price: 30000,
        added: 0
    },
];

for (let i=0; i<items.length; i++){
    items[i].addEventListener("click", () =>{
        itemsInCart(cars[i]);
        invoice(cars[i]);
    })
}

function loadCartDetails(){
    let quantity = localStorage.getItem("itemsInCart");
    if(quantity) {
        document.querySelector(".cart-span span").textContent = quantity;
    }
}


function itemsInCart(car) {
  
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
    
    setItems(car);
}

function setItems(car){
    let cartItems = localStorage.getItem("prodcutsInCart");
    cartItems = JSON.parse(cartItems);
    

    if(cartItems!= null){
        if(cartItems[car.id] == undefined){cartItems = {
        ...cartItems,
        [car.id]: car
        }}
        cartItems[car.id].added += 1;
    }
    else {
        car.added = 1;
        cartItems = {[car.id]: car}
    }
    
    localStorage.setItem("prodcutsInCart", JSON.stringify(cartItems));
}

function invoice (car){
    // console.log("the product price is", car.price);
    let totCost = localStorage.getItem("invoice");
    
    console.log("My cart cost is ", totCost);
    console.log(typeof totCost);

    if(totCost != null){
        totCost = parseInt(totCost);
        localStorage.setItem("invoice", totCost + car.price);
    }
    else{
        localStorage.setItem("invoice", car.price);
    }
    
} 


loadCartDetails();