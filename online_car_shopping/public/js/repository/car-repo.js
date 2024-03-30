const baseUrl = '/api/cars/'

class CarRepo{


    async getCarsByYear(year){
        let response;
       
        console.log(year)
        
        response = await fetch(`${baseUrl}?year=${year}`);
        return response.json();
    }

    async getCarsByMake(make){
        let response;

        console.log(make)
        response = await fetch(`${baseUrl}?make=${make}`);
        
        return response.json();
    }

    async getCarsByType(type){
        let response;

        console.log(type)
        response = await fetch(`${baseUrl}?type=${type}`);
        return response.json();
    }


    async getCars(){
        
        let response;
        console.log("getCars Function")
        response = await fetch(`${baseUrl}`);
        return response.json();
    

    }

    async getSelectedCars(carSearch){
        let response;




    }
    
}

export default new CarRepo()