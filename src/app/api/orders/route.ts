
import { createOrder } from "@/app/utils/createOrder";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextResponse):Promise<any> {
    let body = request.body;
    try {
    const {jsonResponse, httpStatusCode} = await createOrder(JSON.stringify(body))
    console.log('status :', httpStatusCode)
    console.log('created order json response:', jsonResponse);
    return Response.json(jsonResponse);
    // return jsonResponse;
        
    } catch (error) {
        console.log(error);
        return Response.error()
    }

   
    }

