import TransactionRepo from "@/app/repo/transactions-repo";
const transactionRepo = new TransactionRepo();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    try {
        const userTransactions = await transactionRepo.getTransactionHistoryById(userId);
        return Response.json(userTransactions, { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}

export async function POST(request) {
    const data = await request.json();

    try {
        const result = await transactionRepo.addTransaction(data);
        if (result) {
            return new Response("Transaction added successfully", { status: 200 });
        } else {
            return new Response("Error adding transaction", { status: 500 });
        }
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}

export async function PUT(request) {
    const data = await request.json();

    try {
        const updatedTransaction = await transactionRepo.updateTransaction(data);
        return Response.json(updatedTransaction, { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
