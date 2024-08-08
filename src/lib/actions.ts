"use server"

import { UserInterface } from '@/components/custom/inscriptionPage';
import {PrismaClient} from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function insertOneUser(data: UserInterface) {
    await prisma.utilisateur.create({
        data: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            password: data.password
        }
    });

    revalidatePath("/")

    return null;
}

export async function getAllUser() {
   const userLst = await prisma.utilisateur.findMany();
   prisma.$disconnect;
   return userLst;
}