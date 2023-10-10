import prisma from '../../../../utils/prisma'
import { NextResponse, NextRequest } from 'next/server'


export async function GET(request:NextRequest) {
  //if you want to use a get request remember that you cannot pass in a body so you'll have to do everything through the URL params. You could use a client to simplfy this process, I recommend insomnia. The string for the example is below
 // http://localhost:3001/api/council/getCouncil?id=12&name=City%20of%20Port%20Phillip

// you can try this with curl, curl http://localhost:3001/api/council/getCouncil?id=12&name=City%20of%20Port%20Phillip

//please follow this convention below because it means that you can have either "or" or None for the filters instead of having to write multiple cases

  const id = Number(request.nextUrl.searchParams.get('id'));
  const name = request.nextUrl.searchParams.get('name');
  const where = {};

  if (id) {
    where.id = id;
  }

  if (name) {
    where.name = name;
  }
  
  //in case you want to have foreign keys
  // if (bin) {
  //   // where: { id: 11 },
  //   // include: {
  //   //   bins: true,
  //   // },
  //   where.include = {bins:true}
  // }

  const res = await prisma.council.findMany({
    where,
  });


  return Response.json(res)
}



export async function POST(request:NextRequest) {

  //this isn't a strict get request, but with this process at the very least you can send a json payload through directly, however be wary if you would also like to use this please run by Reb before you do. Below is the curl request

  //curl -X POST \
  // -H "Content-Type: application/json" \
  // -d '{"id": 12,"name": "City of Port Phillip"}' \
  // http://localhost:3001/api/council/getCouncil

  const payload = await request.json();
  const where = {};
  
  if (payload.id) {
    where.id = Number(payload.id);
  }
  
  if (payload.name) {
    where.name = payload.name;
  }
  
  const res = await prisma.council.findMany({
    where,
  });
  

  return res? NextResponse.json(res): NextResponse.error()
}
