import CarsRepo from "@/app/repo/cars-repo"
const carsRepo = new CarsRepo()


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    const cars = await carsRepo.getAccounts(type)
    return Response.json(cars, { status: 200 })
}