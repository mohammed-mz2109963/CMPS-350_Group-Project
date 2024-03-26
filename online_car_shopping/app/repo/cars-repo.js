import fs from 'fs-extra'

import path from 'path'

export default class CarsRepo{

 constructor() {
        this.path = path.join(process.cwd(), 'app/data/cars.json')
        console.log(this.path);
    }

async getCars(car) {
        const cars = await fs.readJSON(this.path)

        if (car) {
            return cars.filter(car => car
                .acctType.toLowerCase() === car.toLowerCase())
        }

        return cars;
    }






}