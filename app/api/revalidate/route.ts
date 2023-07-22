import { revalidate } from './../../page';
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {
	const token = request.nextUrl.searchParams.get('token');

	if(token !== process.env.MY_SECRET_TOKEN) {
		return new NextResponse(JSON.stringify({ message: 'Invalid token' }), {
			status: 401,
			statusText: 'Unauthorized',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
	
	const path = request.nextUrl.searchParams.get('path');

	if(path) {
		revalidatePath(path);
	} else {
		return new NextResponse(JSON.stringify({ message: 'Path not provided' }), {
			status: 422,
			statusText: 'Invalid params',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	return NextResponse.json({revalidated: true})
}