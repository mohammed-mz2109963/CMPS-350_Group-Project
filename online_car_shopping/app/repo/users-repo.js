import fs from 'fs-extra'

import path from 'path'

export default class UsersRepo{

    constructor() {
        this.path = path.join(process.cwd(), 'app/data/users.json')
        console.log(this.path);
    }

    async getUsers() {
        const users = await fs.readJSON(this.path)

        return users;
    }

    async getUsersByType(type) {
        const users = await fs.readJSON(this.path)

        if (type) {
            return users.filter(user => user
                .type === type)
        }

        return users;
    }

    async updateUser(user) {
        const users = await this.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            await fs.writeJSON(this.path, users);
            return true; 
        }
        return false; 
    }

        // async addBalance(buyerId, amount) {
        //     const users = await this.getUsers();
        //     const buyer = users.find(user => user.id === buyerId);
        //     if (!buyer || buyer.type !== 'buyer') {
        //         throw new Error('Invalid buyer.');
        //     }
        //     buyer.money_balance += amount;
        //     await this.updateUser(buyer);
        //     return buyer;
        // }



    
}