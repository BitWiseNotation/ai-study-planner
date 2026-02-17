import { NextResponse } from "next/server";
import {z} from "zod";
import bycrypt from "bcrypt";
import { prisma } from "@/lib/prisma";


const registerSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
});

export async function POST(request: Request) {
    try {
        const body= await request.json();    // reads raw request body and parses it into json then returns javascript object 

        const validation = registerSchema.safeParse(body);

        if (!validation.success){
            return NextResponse.json(
                {error: validation.error.issues},
                {status: 400}                                 //400= client mistake / 401 unauthorized access / 403 forbidden . 500 server failure
            );
        }

        const {name, email,password} = validation.data;

        

        //hash password
        const hashedPassword = await bycrypt.hash(password, 10);


        //create user 

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
            },
        });

        return NextResponse.json({
            message: "User created Successfully",
            user: {
                id: user.id,
                name:user.name,
                email: user.email,
            },
        },
        {status: 201}
    );

    } catch (error: any) {
        if(error.code === "P2002"){
            return NextResponse.json(
                {error: "Email Already Regisrtered"},
                {status: 409}
            );
        }
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        );
    }
}
