const baseUrl = '/api/users/'

class UserRepo{


    async getUsersByType(type){
        let response;

        console.log(type)
        response = await fetch(`${baseUrl}?type=${type}`);
        return response.json();
    }


    async getUsers(){
        
        let response;
        console.log("getUsers Function")
        response = await fetch(`${baseUrl}`);
        return response.json();
    

    }

    
    
}

export default new UserRepo()