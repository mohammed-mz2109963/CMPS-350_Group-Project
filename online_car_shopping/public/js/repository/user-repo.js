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

    async addBalance(buyer) {

        const type="buyer"
        
        buyer.money_balance += 1000;

        
        const response = await fetch(`${baseUrl}?type=${type}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buyer)
        });

        
        if (!response.ok) {
            throw new Error('Failed to update balance.');
        }

        return buyer;
    }
    
    
}

export default new UserRepo()