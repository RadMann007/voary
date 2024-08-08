"use server"

import {PrismaClient, User} from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function insertOneUser(data: User) {
    await prisma.user.create({
        data: {
            email: data.email,
            firstname: data.firstname,
            name: data.name,
            password: data.password
        }
    });

    revalidatePath("/")

    return null;
}

export async function getAllUser() {
   const userLst = await prisma.user.findMany();
   prisma.$disconnect;
   return userLst;
}