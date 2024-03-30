import fs from 'fs-extra'

import path from 'path'

export default class CarsRepo{

 constructor() {
        this.path = path.join(process.cwd(), 'app/data/cars.json')
        console.log(this.path);
    }


    async getCars() {
        const cars = await fs.readJSON(this.path)

        return cars;
    }


    async getCarsByYear(year) {
        console.log(year)

        const cars = await fs.readJSON(this.path)
        const carYear=parseInt(year)
        
        if (carYear) {
            return cars.filter(car => car
                .year === carYear)
        }
        console.log(cars)
        return cars;
    }

    async getCarsByType(type) {
        const cars = await fs.readJSON(this.path)

        if (type) {
            return cars.filter(car => car
                .type === type)
        }

        return cars;
    }
    async getCarsByMake(make) {
        const cars = await fs.readJSON(this.path)

        if (make) {
            return cars.filter(car => car
                .make === make)
        }

        return cars;
    }

    





}