"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { databaseHelper } from '@/lib/utils';
import React, { useState } from 'react';

import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function UserProfilePage() {

    const [nomPoste, setNomPoste] = useState("");

    const sendData = async () => {
        const db = await databaseHelper();
        if (nomPoste === "") {
            alert("veuillez remplir tout les champs");
            return;
        } else {
            try {
                await db.execute("INSERT INTO profil (poste) VALUES ($1);", [nomPoste]);
                setNomPoste("");
                alert("Success!")
            } catch (error) {
                alert(error)
            }
        }
    }

    return (

        <ContentLayout title="Profil utilisateur">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Accueil</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Tableau de bord</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Profil utilisateur</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className='p-4 flex flex-col gap-4 mt-2'>
                <CardHeader>
                    Ajouter un profil utilisateur
                </CardHeader>
                <div className='flex flex-col gap-4'>
                    <Input value={nomPoste} className='' placeholder='Poste' onChange={e => setNomPoste(e.target.value)} />
                    <Button onClick={sendData} className='w-full'>Ajouter</Button>
                </div>
            </Card >
        </ContentLayout>


    )
}
