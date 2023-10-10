import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../utils/prisma';

// This APi is used to validate the scanning of a QR code before forwarding to explore page
export async function GET(req: NextRequest){
    const specificCouncil = req.nextUrl.searchParams.get('council');
    const specificBin = req.nextUrl.searchParams.get('bin');
    if (!specificCouncil || !specificBin){
        return false;
    }
    
    try{const bin = await prisma.bin.findFirst({
        where: {
          council: {
            name: specificCouncil
          },
          type: specificBin
        }
      });
      console.log(bin !== null);
      return NextResponse.json(bin !== null);
    }
    catch(error){
        console.log(error);
        return NextResponse.json(false);
    }
}