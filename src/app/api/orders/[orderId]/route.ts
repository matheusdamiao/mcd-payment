import { generateAccessToken } from "@/app/utils/authTokenGenerator";
import { captureOrder } from "@/app/utils/captureOrder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: { params: any }):Promise<any> {
    let response: Response;
    const orderId = context.params;
  
    const id = String(Object.values(orderId));
    console.log(id);
    
    const { jsonResponse, httpStatusCode } = await captureOrder(id);
    console.log('status capture + ',httpStatusCode)
    console.log(jsonResponse);
    return Response.json(jsonResponse)
    }