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




    
}