const baseUrl = '/api/users/transaction'

class TransactionRepo{



    async getTransactionHistoryById(){
        
        let response;
        console.log("getTransactionHistory Function")
        response = await fetch(`${baseUrl}?userId=${type}`);
        return response.json();
    

    }


    async updateTransactionHistoryByUser(transaction){
        console.log(transaction)
        let type=""


        const response = await fetch(`${baseUrl}?type=${type}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        
        if (!response.ok) {
            throw new Error('Failed to update user.');
        }

        return user;


    }

    
    
}

export default new TransactionRepo()
