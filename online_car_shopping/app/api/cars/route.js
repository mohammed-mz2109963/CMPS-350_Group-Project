import CarsRepo from "@/app/repo/cars-repo"
const carsRepo = new CarsRepo()


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    
    let type;

    console.log("inside route.js of api/cars")
    if(searchParams.get("year")){
        type=searchParams.get("year")
        console.log(type)
        const cars = await carsRepo.getCarsByYear(type)
        return Response.json(cars, { status: 200 })

    }
    else if (searchParams.get("type")){
        type=searchParams.get("type")
        
        const cars = await carsRepo.getCarsByType(type)
        return Response.json(cars, { status: 200 })
        
    }
    else if(searchParams.get("make")){
        type=searchParams.get("make")
        const cars = await carsRepo.getCarsByMake(type)
        return Response.json(cars, { status: 200 })
    }
    else{
        

    const cars = await carsRepo.getCars()
    return Response.json(cars, { status: 200 })

    }

    
}

export async function POST(request) {
    const carObject = await request.json()
    const newCar = await carsRepo.addCar(carObject)
    return Response.json(newCar, { status: 201 })
}