const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Create buyers
    const buyers = await prisma.user.createMany({
        data: [
        {
            id: 1,
            type: "buyer",
            username: "BUYER1",
            password: "BUYER1@Scambox",
            name: "buyer1_name",
            surname: "buyer1_surname",
            money_balance: 1000,
            contact_person_name: "Buyer 1",
            street: "123 Buyer Street",
            apartment_suite_number: "Apt 404",
            city: "Doha",
            state: "Qatar",
            zip_code: "22744",
            mobile_number: "123-456-7890"
        },
        {
            id: 2,
            type: "buyer",
            username: "BUYER2",
            password: "BUYER2@Scambox",
            name: "buyer2_name",
            surname: "buyer2_surname",
            money_balance: 1500,
            contact_person_name: "Buyer 2",
            street: "456 Buyer Street",
            apartment_suite_number: "Apt 101",
            city: "Mesaieed",
            state: "Qatar",
            zip_code: "22744",
            mobile_number: "987-654-3210"
        },
        {
            id: 3,
            type: "buyer",
            username: "BUYER3",
            password: "BUYER3@Scambox",
            name: "buyer3_name",
            surname: "buyer3_surname",
            money_balance: 2000,
            contact_person_name: "Buyer 3",
            street: "789 Buyer Street",
            apartment_suite_number: "Apt 303",
            city: "Lucknow",
            state: "India",
            zip_code: "90210",
            mobile_number: "111-222-3333"
            }
            ]
        });

    // Create sellers
    const sellers = await prisma.user.createMany({
        data: [
        {
            id: 4,
            type: "seller",
            username: "SELLER1",
            password: "SELLER1@Scambox",
            company_name: "Seller Company 1",
            bank_account: "123456789"
        },
        {
            id: 5,
            type: "seller",
            username: "SELLER2",
            password: "SELLER2@Scambox",
            company_name: "Seller Company 2",
            bank_account: "987654321"
        }
        ]
    });

    //console.log("Sellers:", sellers[1]);

    // Create products
    const products = await prisma.product.createMany({
        data: [
        {
            id: 1001,
            name: "Car 1",
            description: "Sample description for Car 1",
            price: 50000,
            type: "sedan",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 4
        },
        {
            id: 1002,
            name: "Car 2",
            description: "Sample description for Car 2",
            price: 60000,
            type: "SUV",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 4
        },
        {
            id: 1003,
            name: "Car 3",
            description: "Sample description for Car 3",
            price: 70000,
            type: "coupe",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1004,
            name: "Car 4",
            description: "Sample description for Car 4",
            price: 80000,
            type: "hatchback",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1005,
            name: "Car 5",
            description: "Sample description for Car 5",
            price: 90000,
            type: "hyper",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1006,
            name: "Car 6",
            description: "Sample description for Car 6",
            price: 100000,
            type: "sports",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 4
        },
        {
            id: 1007,
            name: "Car 7",
            description: "Sample description for Car 7",
            price: 110000,
            type: "convertible",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1008,
            name: "Car 8",
            description: "Sample description for Car 8",
            price: 120000,
            type: "sports",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 4
        },
        {
            id: 1009,
            name: "Car 9",
            description: "Sample description for Car 9",
            price: 130000,
            type: "coupe",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1010,
            name: "Car 10",
            description: "Sample description for Car 10",
            price: 140000,
            type: "hyper",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1011,
            name: "Car 11",
            description: "Sample description for Car 11",
            price: 150000,
            type: "sedan",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        {
            id: 1012,
            name: "Car 12",
            description: "Sample description for Car 12",
            price: 160000,
            type: "sedan",
            image_url: "https://stmartinblue.com/images/cars/default_car.jpg",
            seller_id: 5
        },
        ]
    });

    // Create purchases
    const purchases = await prisma.purchase.createMany({
        data: [
        {
            buyer_id: 1,
            product_id: 1001
        },
        {
            buyer_id: 2,
            product_id: 1002
        },
        {
            buyer_id: 3,
            product_id: 1003
        },
        {
            buyer_id: 2,
            product_id: 1005
        },
        {
            buyer_id: 2,
            product_id: 1008
        },
        {
            buyer_id: 3,
            product_id: 1011
        },
        {
            buyer_id: 2,
            product_id: 1012
        }
        ]
    });

    // Output entire data for products and purchases
    console.log("Buyers:");
    console.log(buyers);
    console.log("Sellers:");
    console.log(sellers);
    console.log("Products:");
    console.log(products);
    console.log("Purchases:");
    console.log(purchases);

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });