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

        //check if user already exists

        const existingUser = await prisma.user.findUnique({
            where:{email},
        });

        if (existingUser) {
            return NextResponse.json(
                {error: "Email already Registered"},
                {status: 409}
            )
        }

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
                email: user.email,
            },
        },
        {status: 201}
    );

    } catch (error) {
        return NextResponse.json(
            {error: "Internal Server Error"},     
            {status:500}
        );
    }
}
