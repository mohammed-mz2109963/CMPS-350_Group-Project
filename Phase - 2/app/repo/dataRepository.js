import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DataRepository
{
    // Function to get all users
    async getAllUsers()
    {
        return prisma.user.findMany();
    }

    // Function to get user by ID
    async getUserById(userId)
    {
        return prisma.user.findUnique({
            where: { id: userId }
        });
    }

    // Function to create a new user
    async createUser(data)
    {
        return prisma.user.create({
            data
        });
    }

    // Function to update user
    async updateUser(userId, data)
    {
        return prisma.user.update({
            where: { id: userId },
            data
        });
    }

    // Function to delete user
    async deleteUser(userId)
    {
        return prisma.user.delete({
            where: { id: userId }
        });
    }

    // Function to get all products
    async getAllProducts()
    {
        return prisma.product.findMany();
    }

    // Function to get products by type
    async getProductsByType(type)
    {
        return prisma.product.findMany({
            where: { type }
        });
    }

    // Function to create a new product
    async createProduct(data)
    {
        return prisma.product.create({
            data
        });
    }

    // Function to update product
    async updateProduct(productId, data)
    {
        return prisma.product.update({
            where: { id: productId },
            data
        });
    }

    // Function to delete product
    async deleteProduct(productId)
    {
        return prisma.product.delete({
            where: { id: productId }
        });
    }

    // Function to get all purchases
    async getAllPurchases()
    {
        return prisma.purchase.findMany();
    }

    // Function to create a new purchase
    async createPurchase(data)
    {
        return prisma.purchase.create({
            data
        });
    }

    // Function to update purchase
    async updatePurchase(purchaseId, data)
    {
        return prisma.purchase.update({
            where: { id: purchaseId },
            data
        });
    }

    // Function to delete purchase
    async deletePurchase(purchaseId)
    {
        return prisma.purchase.delete({
            where: { id: purchaseId }
        });
    }
}

export default new DataRepository;