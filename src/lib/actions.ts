"use server"

import { PrismaClient, Utilisateur } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertOneUser({ data }: { data: Utilisateur }) {
    await prisma.utilisateur.create({
        data: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            password: data.password
        }
    });
    return null;
}

export async function getAllUser() {
    try {
        await prisma.$connect();
        const userLst = await prisma.utilisateur.findMany();
        return userLst;
    } catch (error) {
        return [];
    } finally {
        await prisma.$disconnect();
    }
   
}

export async function connectUser({ email, mdp }: { email: string, mdp: string }) {
    try {
        await prisma.$connect();
        const user = await prisma.utilisateur.findUnique({
            where: { email: email, password: mdp }
        });

        if (user != null) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }


}