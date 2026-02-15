import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { success } from 'zod';


export async function Get(){
    try{
        const users = await prisma.user.findMany();

        return NextResponse.json({
            success: true,
            users,
        });
    } catch (error){
        return NextResponse.json(
            {success: false, error: "Dataabase query failed"},
            {status: 500}
        );
    }
}