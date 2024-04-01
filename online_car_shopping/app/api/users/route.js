import UsersRepo from "@/app/repo/users-repo"
const usersRepo = new UsersRepo()


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    
    let type;

    console.log("inside route.js of api/users")
    if (searchParams.get("type")){
        type=searchParams.get("type")
        
        const users = await usersRepo.getUsersByType(type)
        return Response.json(users, { status: 200 })
        
    }
    else{
        
    const users = await usersRepo.getUsers()
    return Response.json(users, { status: 200 })

    }

    
}